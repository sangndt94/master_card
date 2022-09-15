// (C) 2020 GoodData Corporation
import stringify from "json-stable-stringify";

import { IValidElementsResponse } from "@gooddata/gooddata-js";
import { IFilterState, FilterId } from "./filterTypes";
import { findFilterById, getRestrictingFilters, defaultElementsOptionsAfm } from "./filterUtils";
import getElements from "../utils/getElements";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";
import { sanitizeValidElementsResponse } from "../components/filters/utils";
import { getVisualizationFilter } from "./visualizationFilterAdapters";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const YEAR = 365 * DAY;

export const defaultMaximumAge = DAY;

export const defaultElementsLimit = 50;

export interface IElementsPromiseCache {
    [key: string]: {
        timestamp: number;
        promise: Promise<IValidElementsResponse>;
    };
}

export type FilterContext = Pick<
    IFilterState,
    "projectId" | "attributeDisplayFormIdentifier" | "restrictedByMeasureIdentifiers" | "order"
>;

export type RestrictingFilterContext = Pick<
    IFilterState,
    "projectId" | "attributeDisplayFormIdentifier" | "selectedItems" | "filterType"
>;

export interface IFilterElementsContext {
    filter: FilterContext;
    restrictingFilters?: RestrictingFilterContext[];
}

export interface IAutoSelectContextCache {
    [key: string]: string;
}

// Generates the key for a single elements request cache entry
// Don't stringify the result here yet, it needs to be combined with paging later
// Consider optimizing based on the fact that filterDeclaration should not change.
// In that case, filterId should be enough as a context.
export const getFilterElementsContext = (
    filterId: FilterId,
    filtersState: IFilterState[],
): IFilterElementsContext => {
    const filter = findFilterById(filtersState, filterId);
    const { projectId, attributeDisplayFormIdentifier, restrictedByMeasureIdentifiers, order } = filter;

    // Takes into account projectId, attributeDisplayFormIdentifier, restrictedByMeasureIdentifiers
    const context: IFilterElementsContext = {
        filter: {
            projectId,
            attributeDisplayFormIdentifier,
            restrictedByMeasureIdentifiers,
            order,
        },
    };
    // Ignores restricting filters if they have no selectedItems
    const restrictingFilters = getRestrictingFilters(filter, filtersState).filter(
        (restrictingFilter) => restrictingFilter.selectedItems.length > 0,
    );
    if (restrictingFilters.length > 0) {
        context.restrictingFilters = restrictingFilters.map(
            ({ projectId, attributeDisplayFormIdentifier, selectedItems, filterType }) => {
                // Takes into account restricting filters' projectId, attributeDisplayFormIdentifier, selectedItems, filterType
                return {
                    projectId,
                    attributeDisplayFormIdentifier,
                    selectedItems,
                    filterType,
                };
            },
        );
    }
    return context;
};

export const getFilterElementsWithPagingContext = (
    filterId: FilterId,
    filtersState: IFilterState[],
    offset: number,
    limit: number = defaultElementsLimit,
    search?: string,
): string => {
    const filterElementsContext = getFilterElementsContext(filterId, filtersState);
    const pagingContext = {
        offset,
        limit,
        search,
    };
    // This could benefit from memoization
    return stringify({ ...filterElementsContext, ...pagingContext });
};

export const getElementsOptions = (
    filterId: FilterId,
    filtersState: IFilterState[],
): IValidElementsOptions => {
    const filter = findFilterById(filtersState, filterId);
    const {
        attributeDisplayFormIdentifier,
        restrictedByFilterIds,
        restrictedByMeasureIdentifiers,
        restrictiveDefinition,
        restrictiveDefinitionContent,
        afm,
        order,
    } = filter;
    const options: IValidElementsOptions = {};
    if (order) {
        options.order = order;
    }
    if (restrictiveDefinition) {
        options.restrictiveDefinition = restrictiveDefinition;
    }
    if (restrictiveDefinitionContent) {
        options.restrictiveDefinitionContent = restrictiveDefinitionContent;
    }
    if (afm) {
        options.afm = afm;
    }
    if (restrictedByMeasureIdentifiers.length > 0) {
        options.afm = options.afm ? { ...options.afm } : { ...defaultElementsOptionsAfm };
        options.afm.measures = options.afm.measures ? [...options.afm.measures] : [];
        options.afm.measures.push(
            ...restrictedByMeasureIdentifiers.map((measureIdentifier) => {
                return {
                    localIdentifier: measureIdentifier,
                    definition: { measure: { item: { identifier: measureIdentifier } } },
                };
            }),
        );
    }
    if (restrictedByFilterIds.length > 0) {
        const restrictingFiltersWithSelectedElements = getRestrictingFilters(filter, filtersState).filter(
            (restrictingFilter) => {
                return restrictingFilter.selectedItems.length > 0;
            },
        );
        if (restrictingFiltersWithSelectedElements.length > 0) {
            options.afm = options.afm ? { ...options.afm } : { ...defaultElementsOptionsAfm };
            options.afm.attributes = options.afm.attributes ? [...options.afm.attributes] : [];
            options.afm.filters = options.afm.filters ? [...options.afm.filters] : [];
            restrictingFiltersWithSelectedElements.forEach((restrictingFilter) => {
                options.afm.attributes.push({
                    displayForm: {
                        identifier: attributeDisplayFormIdentifier,
                    },
                    localIdentifier: attributeDisplayFormIdentifier,
                });
                options.afm.filters.push(getVisualizationFilter(restrictingFilter, false));
            });
        }
    }
    return options;
};

export const getCachedElements = (
    cache: IElementsPromiseCache,
    filterId: FilterId,
    filtersState: IFilterState[],
    offset: number,
    limit: number = defaultElementsLimit,
    search?: string,
    // Having a maximumAge as a parameter means the cache cannot be automatically pruned of stale entries
    // Consider adding an upper age limit
    maximumAge: number = defaultMaximumAge,
): Promise<IValidElementsResponse> => {
    const now = new Date().getTime();
    const filter = findFilterById(filtersState, filterId);

    // This could benefit from memoization
    const filterContext = getFilterElementsWithPagingContext(filterId, filtersState, offset, limit, search);

    const cacheMatch = cache[filterContext];

    // If cached promise is available and fresh
    if (cacheMatch && now - cacheMatch.timestamp <= maximumAge) {
        return cacheMatch.promise;
    }

    const options: IValidElementsOptions = {
        filter: search,
        offset,
        limit,
        ...getElementsOptions(filter.id, filtersState),
    };

    const promise = getElements(filter.projectId, filter.attributeDisplayFormIdentifier, options)
        .then((elementsResponse) => {
            return sanitizeValidElementsResponse(filter.attributeDisplayFormIdentifier, elementsResponse);
        })
        // TODO: Keep this for development until presentational filters are implemented to test pending states
        // .then(() => {
        //     // Load forever
        //     return new Promise(() => {}) as any;
        // })
        // TODO: Keep this for development until presentational filters are implemented to test connection errors
        // .then((data) => {
        //     // Randomly fail
        //     if (Math.random() > 0.5) {
        //         return Promise.reject(new Error("Simulated error"));
        //     }
        //     return data;
        // })
        .catch((reason) => {
            // clear errors from cache
            delete cache[filterContext];
            return Promise.reject(reason); // Pass the error
        });

    // save to cache
    cache[filterContext] = {
        promise,
        timestamp: now,
    };
    return promise;
};
