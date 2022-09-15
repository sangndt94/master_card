// (C) 2019 GoodData Corporation
import { useContext, useCallback, useMemo } from "react";
import produce from "immer";

import { getVisFilters } from "../utils/visualizationFilters";
import { defaultFilterQueryOptions } from "../components/filters/constants";
import {
    isParentChildAttributeFilter,
    IParentChildAttributeFilter,
    IFilterCollection,
    IBasicAttributeFilter,
    INormalizedAttributeFilter,
    IAttributeFilterValue,
} from "../types";
import isEqual from "lodash/isEqual";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";
import { AFM } from "@gooddata/typings";

const childSuffix = "child";
const parentSuffix = "parent";

const getFilterIdsIgnoredByClear = (regexp: RegExp) => (ignoredFilterIds: string[]) =>
    ignoredFilterIds.filter((id) => regexp.test(id)).map((id) => id.replace(regexp, ""));

const getSuffixRegExp = (suffix: string) => new RegExp(`_${suffix}$`);

const getChildFilterIdsIgnoredByClear = getFilterIdsIgnoredByClear(getSuffixRegExp(childSuffix));
const getParentFilterIdsIgnoredByClear = getFilterIdsIgnoredByClear(getSuffixRegExp(parentSuffix));

export const getClearFilters = (setFilterState: IFilterContext["setFilterState"]) => (
    ignoredFilterIds: string[] = [],
) => {
    setFilterState((filterState) => {
        const ignoredChildIds = getChildFilterIdsIgnoredByClear(ignoredFilterIds);
        const ignoredParentIds = getParentFilterIdsIgnoredByClear(ignoredFilterIds);

        const clearedFilterState = produce(filterState, (draft) => {
            Object.keys(filterState).forEach((filterId) => {
                const filter = draft[filterId];
                if (isParentChildAttributeFilter(filter)) {
                    if (
                        !ignoredChildIds.includes(filterId) &&
                        // do not clear autoSelect filters
                        isNaN(Number(filter.childAutoSelectIndex))
                    ) {
                        filter.childValues = [];
                        filter.childValuesUnsaved = null;
                    }
                    if (
                        !ignoredParentIds.includes(filterId) &&
                        // do not clear autoSelect filters
                        isNaN(Number(filter.parentAutoSelectIndex))
                    ) {
                        filter.parentValues = [];
                        filter.parentValuesUnsaved = null;
                    }
                } else if (
                    !ignoredFilterIds.includes(filterId) &&
                    // do not clear autoSelect filters
                    isNaN(Number(filter.autoSelectIndex))
                ) {
                    filter.selectedValues = [];
                    filter.selectedValuesUnsaved = null;
                }
            });
        });

        return clearedFilterState;
    });
};

export const getApplyFilters = (setFilterState: IFilterContext["setFilterState"]) => (
    ignoredFilterIds: string[] = [],
) => {
    setFilterState((filterState) => {
        const ignoredChildIds = getChildFilterIdsIgnoredByClear(ignoredFilterIds);
        const ignoredParentIds = getParentFilterIdsIgnoredByClear(ignoredFilterIds);

        const appliedFilterState = produce(filterState, (draft) => {
            Object.keys(filterState).forEach((filterId) => {
                const filter = draft[filterId];
                if (isParentChildAttributeFilter(filter)) {
                    if (!ignoredChildIds.includes(filterId) && filter.childValuesUnsaved) {
                        filter.childValues = filter.childValuesUnsaved;
                        filter.childValuesUnsaved = null;
                    }
                    if (!ignoredParentIds.includes(filterId) && filter.parentValuesUnsaved) {
                        filter.parentValues = filter.parentValuesUnsaved;
                        filter.parentValuesUnsaved = null;
                    }
                } else if (!ignoredFilterIds.includes(filterId) && filter.selectedValuesUnsaved) {
                    filter.selectedValues = filter.selectedValuesUnsaved;
                    filter.selectedValuesUnsaved = null;
                }
            });
        });
        return appliedFilterState;
    });
};

export const getResetFilters = (setFilterState: IFilterContext["setFilterState"]) => (
    onlyFilterIds = null,
) => {
    setFilterState((filterState) => {
        const appliedFilterState = produce(filterState, (draft) => {
            Object.keys(filterState).forEach((filterId) => {
                const filter = draft[filterId];
                if (isParentChildAttributeFilter(filter)) {
                    if (
                        (onlyFilterIds === null || onlyFilterIds.includes(`${filterId}_child`)) &&
                        filter.childValuesUnsaved
                    ) {
                        filter.childValuesUnsaved = null;
                    }
                    if (
                        (onlyFilterIds === null || onlyFilterIds.includes(`${filterId}_parent`)) &&
                        filter.parentValuesUnsaved
                    ) {
                        filter.parentValuesUnsaved = null;
                        if (
                            filter.clearChildOnParentChange &&
                            (filter.childValuesUnsaved
                                ? filter.childValuesUnsaved.length > 0
                                : filter.childValues.length > 0)
                        ) {
                            filter.childValuesUnsaved = [];
                        }
                    }
                } else if (
                    (onlyFilterIds === null || onlyFilterIds.includes(filterId)) &&
                    filter.selectedValuesUnsaved
                ) {
                    filter.selectedValuesUnsaved = null;
                }
            });
        });
        return appliedFilterState;
    });
};

export interface IParentChildValuesType {
    parentValues?: IAttributeFilterValue[];
    childValues?: IAttributeFilterValue[];
}
export type BasicValuesType = IAttributeFilterValue[];

// isUnsaved = true means the value is not immediately applied to visFilters
// unsaved values get applied with applyFilters()
export const getUpdateFilter = (setFilterState: IFilterContext["setFilterState"]) => (
    filterId: string,
    values: BasicValuesType | IParentChildValuesType,
    isUnsaved = false,
) => {
    setFilterState((filterState) => {
        return produce(filterState, (draft) => {
            const filter = draft[filterId];
            if (isParentChildAttributeFilter(filter)) {
                const { childValues, parentValues } = values as IParentChildValuesType;
                if (childValues !== undefined) {
                    const property = isUnsaved ? "childValuesUnsaved" : "childValues";
                    if (childValues !== null && isEqual(childValues, filterState[filterId][property])) {
                        return draft;
                    }
                    filter[property] = childValues || [];

                    // clear unsaved values when isUnsaved === false
                    if (!isUnsaved) {
                        delete filter.childValuesUnsaved;
                    }
                }
                if (parentValues !== undefined) {
                    const parentProperty = isUnsaved ? "parentValuesUnsaved" : "parentValues";
                    if (
                        parentValues !== null &&
                        isEqual(parentValues, filterState[filterId][parentProperty])
                    ) {
                        return draft;
                    }
                    filter[parentProperty] = parentValues || [];
                    if (filter.clearChildOnParentChange) {
                        // we want to clear unsaved changes even if isUnsaved === false
                        delete filter.childValuesUnsaved;

                        if (!isUnsaved) {
                            filter.childValues = [];
                        }
                    }
                }
            } else {
                const property = isUnsaved ? "selectedValuesUnsaved" : "selectedValues";
                if (values !== null && isEqual(values, filterState[filterId][property])) {
                    return draft;
                }
                filter[property] = (values as BasicValuesType) || []; // consider default value might be null if isMulti === false
                if (!isUnsaved) {
                    delete filter.selectedValuesUnsaved;
                }
            }
            return draft;
        });
    });
};

const getFilterIdComponents = <V extends string = string>(id: V) => id.split("_");

// This is the backend format for AFM.IExpressionFilter. Current AFM.IExpressionFilter type is incorrect
export interface IExpressionFilter {
    expression: {
        value: string;
    };
}

const getChildFilterExpression = (
    filterData: IParentChildAttributeFilter,
): IExpressionFilter["expression"] => {
    const parentValues = filterData.parentValuesUnsaved || filterData.parentValues;
    const inValues = parentValues.map((parentItem) => `[${parentItem.value}]`).join(", ");
    return {
        value:
            // parent attribute identifier surrounded by '{}'
            `({${filterData.parentAttributeIdentifier}}` +
            // selected parent values surrounded by '[]' and separated by ','
            ` IN (${inValues}))` +
            // attribute identifier of common attribute between parent
            // and child attributes surrounded by '{}'
            ` OVER {${filterData.commonAncestorAttributeIdentifier}}` +
            // child attribute identifier surrounded by '{}'
            ` TO {${filterData.childAttributeIdentifier}}`,
    };
};

export const getChildFilterQueryOptions = (
    filterData: IParentChildAttributeFilter,
    childAttributeQueryOptions: Partial<IValidElementsOptions> = defaultFilterQueryOptions,
): Partial<IValidElementsOptions> => {
    const parentValues = filterData.parentValuesUnsaved || filterData.parentValues;
    const expressionFilter = {
        expression: getChildFilterExpression(filterData),
    };
    return parentValues.length
        ? {
              ...childAttributeQueryOptions,
              afm: {
                  attributes: [
                      {
                          displayForm: {
                              identifier: filterData.childAttributeDisplayFormIdentifier,
                          },
                          localIdentifier: "childAttribute",
                      },
                  ],
                  filters: [
                      (expressionFilter as unknown) as AFM.IExpressionFilter, // AFM.IExpressionFilter is not correct
                  ],
              },
          }
        : childAttributeQueryOptions;
};

const normalizeFilterById = (
    id: string,
    filters: IFilterCollection,
    updateFilter: (filterId: string, values, isUnsaved?: boolean) => void,
): INormalizedAttributeFilter => {
    const [filterId, suffix] = getFilterIdComponents(id);

    // parent child filter - parent
    if (suffix === parentSuffix) {
        const {
            parentValues,
            parentValuesUnsaved,
            parentPlaceholder,
            parentAttributeDisplayFormIdentifier,
            parentPreset,
            parentIsMulti = true,
            parentAutoSelectIndex,
            parentAttributeQueryOptions,
            parentIsHidden,
        } = filters[filterId] as IParentChildAttributeFilter;
        return {
            id,
            selectedValues: parentValues,
            selectedValuesUnsaved: parentValuesUnsaved || null,
            placeholder: parentPlaceholder,
            displayFormIdentifier: parentAttributeDisplayFormIdentifier,
            preset: parentPreset,
            isMulti: parentIsMulti,
            autoSelectIndex: parentAutoSelectIndex,
            attributeQueryOptions: parentAttributeQueryOptions,
            isHidden: parentIsHidden,
            onChange: (value, isUnsaved = false) =>
                updateFilter(filterId, { parentValues: parentIsMulti ? value : [value] }, isUnsaved),
        };
    }

    // parent child filter - child
    if (suffix === childSuffix) {
        const filter = filters[filterId] as IParentChildAttributeFilter;
        const {
            childValues,
            childValuesUnsaved,
            childPlaceholder,
            childAttributeDisplayFormIdentifier,
            childPreset,
            childIsMulti = true,
            childAutoSelectIndex,
            childAttributeQueryOptions,
            childIsHidden,
        } = filter;
        return {
            id,
            selectedValues: childValues,
            selectedValuesUnsaved: childValuesUnsaved || null,
            placeholder: childPlaceholder,
            displayFormIdentifier: childAttributeDisplayFormIdentifier,
            preset: childPreset,
            isMulti: childIsMulti,
            autoSelectIndex: childAutoSelectIndex,
            attributeQueryOptions: getChildFilterQueryOptions(filter, childAttributeQueryOptions),
            isHidden: childIsHidden,
            onChange: (value, isUnsaved = false) => {
                return updateFilter(filterId, { childValues: childIsMulti ? value : [value] }, isUnsaved);
            },
        };
    }

    const filter = filters[filterId] as IBasicAttributeFilter;
    // basic filter - just strip the type property
    const { type, isMulti = true, ...filterData } = filter;
    return {
        ...filterData,
        isMulti,
        id,
        onChange: (value, isUnsaved = false) => {
            return updateFilter(filterId, isMulti ? value : [value], isUnsaved);
        },
    };
};

export interface IFilterContext {
    filterState: IFilterCollection;
    setFilterState: React.Dispatch<React.SetStateAction<IFilterCollection>>;
}

const createUseFilters = <V extends string = string>(context: React.Context<IFilterContext>) => (
    ...filterIds: V[]
) => {
    const { filterState, setFilterState } = useContext(context);

    const unavailableFilters = filterIds.filter((id) => {
        const [filterId] = getFilterIdComponents<V>(id);
        return !filterState[filterId];
    });
    if (unavailableFilters.length > 0) {
        throw Error(`Unavailable filter ids: ${unavailableFilters.join(", ")}`);
    }

    const updateFilter = useCallback(getUpdateFilter(setFilterState), []);
    const clearFilters = useCallback(getClearFilters(setFilterState), []);

    // filters appearing as if every filter was basic
    const filters = useMemo(() => filterIds.map((id) => normalizeFilterById(id, filterState, updateFilter)), [
        filterIds,
        filterState,
    ]);

    // visFilters do not change with unsaved values. This avoids creating a new reference on visFilters when only unsaved values change.
    const activeFilters = filters.map(({ selectedValuesUnsaved, ...filter }) => filter);
    const visFilters = useMemo(() => getVisFilters(activeFilters), [JSON.stringify(activeFilters)]);

    const applyFilters = getApplyFilters(setFilterState);
    const resetFilters = getResetFilters(setFilterState);

    return {
        filters,
        visFilters,
        clearFilters,
        applyFilters,
        resetFilters,
    };
};

export default createUseFilters;
