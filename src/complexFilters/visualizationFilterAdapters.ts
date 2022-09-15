// (C) 2020 GoodData Corporation

import { IFilterState, VisualizationFilter, FilterType } from "./filterTypes";
import { AFM } from "@gooddata/typings";
import pick from "lodash/pick";
import stringify from "json-stable-stringify";
import memoize from "lodash/memoize";
import { Model } from "@gooddata/react-components";

export const validateFilterType = (filter: IFilterState, expectedType: FilterType): void => {
    if (filter.filterType !== expectedType) {
        throw new Error(`unexpected filter type "${filter.filterType}". Expected ${expectedType}`);
    }
};

export const getVisualizationFilterContext = (filter: IFilterState): string => {
    // Filter is irrelevant if nothing is selected
    if (filter.selectedItemsApplied.length === 0) {
        return "";
    }
    const relevantProps: Array<keyof IFilterState> = [
        "projectId",
        "attributeDisplayFormIdentifier",
        "filterType",
        "selectedItemsApplied", // visualizationFilters should always ignore selectedItems
    ];
    const context = pick<IFilterState>(filter, ...relevantProps);
    return stringify(context);
};

export const getPositiveAttributeFilter = (
    filter: IFilterState,
    useSelectedItemsApplied: boolean,
): AFM.IPositiveAttributeFilter => {
    validateFilterType(filter, "positiveAttributeFilter");
    return Model.positiveAttributeFilter(
        filter.attributeDisplayFormIdentifier,
        useSelectedItemsApplied ? filter.selectedItemsApplied : filter.selectedItems,
        true,
    );
};

export const getNegativeAttributeFilter = (
    filter: IFilterState,
    useSelectedItemsApplied: boolean,
): AFM.INegativeAttributeFilter => {
    validateFilterType(filter, "negativeAttributeFilter");
    return Model.negativeAttributeFilter(
        filter.attributeDisplayFormIdentifier,
        useSelectedItemsApplied ? filter.selectedItemsApplied : filter.selectedItems,
        true,
    );
};

export const visualizationFilterAdapterMap: {
    [key in FilterType]?: (filter: IFilterState, useSelectedItemsApplied: boolean) => VisualizationFilter;
} = {
    positiveAttributeFilter: getPositiveAttributeFilter,
    negativeAttributeFilter: getNegativeAttributeFilter,
};

export const getVisualizationFilter = (
    filter: IFilterState,
    useSelectedItemsApplied: boolean = true,
): VisualizationFilter => {
    const adapterMatch = visualizationFilterAdapterMap[filter.filterType];
    if (!adapterMatch) {
        throw new Error(
            `Filter type "${filter.filterType}" not supported! Supported types: ${Object.keys(
                visualizationFilterAdapterMap,
            ).join(", ")}`,
        );
    }
    return adapterMatch(filter, useSelectedItemsApplied);
};

// context is used as memoization key by default (must be first parameter)
export const memoizedGetVisualizationFilter = memoize(
    (_context: string, filter: IFilterState): VisualizationFilter => {
        return getVisualizationFilter(filter);
    },
);
