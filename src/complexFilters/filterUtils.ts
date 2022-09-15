// (C) 2020 GoodData Corporation

import {
    IFilterState,
    IFilterDeclaration,
    FilterId,
    SetSelectedItems,
    SetFiltersState,
    IFilterDeclarationMap,
    FilterType,
} from "./filterTypes";
import produce from "immer";
import isEqual from "lodash/isEqual";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";
import { SetStateAction } from "react";

export const initializeFilter = (filterDeclaration: IFilterDeclaration): IFilterState => {
    const defaultFilterType = filterDeclaration.defaultFilterType || "positiveAttributeFilter";
    const restrictedByFilterIds = filterDeclaration.restrictedByFilterIds || [];
    const newFilter: IFilterState = {
        ...filterDeclaration,
        placeholder: filterDeclaration.placeholder || "All",
        isMultiSelect: filterDeclaration.isMultiSelect || false,
        defaultFilterType,
        filterType: defaultFilterType,
        restrictedByFilterIds,
        restrictedByMeasureIdentifiers: filterDeclaration.restrictedByMeasureIdentifiers || [],
        isPendingSelectedElements: Boolean(filterDeclaration.autoSelect),
        // This is a guess. Restricting by a filter that is not autoSelect or has initially selected values should will result in isPendingDependency: false after updateFilterPendingStates is called.
        isPendingDependency: restrictedByFilterIds.length > 0,
        selectedItems: filterDeclaration.selectedItems || [],
        selectedItemsApplied: filterDeclaration.selectedItemsApplied || [],
        error: undefined,
    };
    return newFilter;
};

export const setDispatch = <V>(dispatch: React.SetStateAction<V>, previousValue: V): V => {
    if (typeof dispatch === "function") {
        const dispatchFunction = dispatch as (prev: V) => V;
        return dispatchFunction(previousValue);
    }
    return dispatch;
};

export const findFilterById = <V extends { id: FilterId }>(filters: V[], filterId: FilterId): V => {
    const filterMatch = filters.find((filter) => filter.id === filterId);
    if (filterMatch) {
        return filterMatch;
    }
    throw new Error(
        `Filter with id ${filterId} not found! Available filters: ${filters
            .map((filter) => filter.id)
            .join(", ")}`,
    );
};

export const isFilterPendingSelectedItems = (filter: IFilterState): boolean => {
    return filter.autoSelect ? filter.selectedItems.length === 0 : false;
};

export const isFilterPendingDependency = (filter: IFilterState, filters: IFilterState[]): boolean => {
    return filter.restrictedByFilterIds.some((restrictingFilterId) => {
        const restrictingFilter: IFilterState = findFilterById(filters, restrictingFilterId);

        // Beware circular dependency
        return (
            isFilterPendingSelectedItems(restrictingFilter) ||
            isFilterPendingDependency(restrictingFilter, filters)
        );
    });
};

export const areAppliedFiltersReady = (filtersState: IFilterState[]): boolean => {
    return filtersState.every((filter) => !filter.autoSelect || filter.selectedItemsApplied.length > 0);
};

/* Filters are pending if some filter isPendingSelectedItems,
 * because pendingDependency just means some other filter is pending selected items.
 */
export const areFiltersPending = (filters: IFilterState[]): boolean => {
    return filters.some((filter) => {
        return isFilterPendingSelectedItems(filter);
    });
};

export const updateFilterPendingStates = (filters: IFilterState[]): IFilterState[] => {
    return produce(filters, (filtersDraft) => {
        filtersDraft.forEach((filterDraft) => {
            filterDraft.isPendingSelectedElements = isFilterPendingSelectedItems(filterDraft);
        });
        filtersDraft.forEach((filterDraft) => {
            filterDraft.isPendingDependency = isFilterPendingDependency(filterDraft, filtersDraft);
        });
    });
};

export const getDependencyTreeFilterIds = (
    filterIdsToCheck: FilterId[],
    filtersState: IFilterState[],
    excludeFilterIds: FilterId[] = filterIdsToCheck,
): FilterId[] => {
    const dependentFilters = filtersState.filter(({ id, restrictedByFilterIds }) => {
        return (
            !excludeFilterIds.includes(id) &&
            filterIdsToCheck.some((filterIdToCheck) => restrictedByFilterIds.includes(filterIdToCheck))
        );
    });
    const dependentFilterIds = dependentFilters.map((filter) => filter.id);

    if (dependentFilterIds.length > 0) {
        const nextExcludeFilterIds = [...excludeFilterIds, ...dependentFilterIds];
        const nextLevelDependentFilterIds = getDependencyTreeFilterIds(
            dependentFilterIds,
            filtersState,
            nextExcludeFilterIds,
        );
        return [...dependentFilterIds, ...nextLevelDependentFilterIds];
    }
    return dependentFilterIds;
};

// Do not apply filters if any filters are pending selected values. Always keep selectedItemsApplied in valid state.
export const applyFilters = (filterIds: FilterId[], setFiltersState: SetFiltersState): void => {
    setFiltersState((filtersState) => {
        const filtersWithChanges = filtersState.filter(
            (filter) =>
                (filterIds.includes(filter.id) &&
                    !isEqual(filter.selectedItemsApplied, filter.selectedItems)) ||
                !isEqual(filter.defaultFilterType, filter.filterType),
        );
        if (filtersWithChanges.length > 0) {
            return filtersState.map((filter) => {
                if (filtersWithChanges.includes(filter)) {
                    return {
                        ...filter,
                        selectedItemsApplied: filter.selectedItems,
                        filterType: filter?.defaultFilterType,
                    };
                }
                return filter;
            });
        }

        return filtersState;
    });
};

export const setAttributeFilter = (setFiltersState: SetFiltersState, filterId): void => {
    setFiltersState((filtersState) => {
        const filterById = filtersState.filter((item) => item.id === filterId);

        let attributeFilter: FilterType =
            filterById[0].defaultFilterType === "positiveAttributeFilter"
                ? "negativeAttributeFilter"
                : "positiveAttributeFilter";

        if (filterById.length > 0) {
            return filtersState.map((filter) => {
                if (filterById.includes(filter)) {
                    return {
                        ...filter,
                        defaultFilterType: attributeFilter,
                    };
                }
                return filter;
            });
        }
        return filtersState;
    });
};

export const resetFilters = (filterIds: FilterId[], setFiltersState: SetFiltersState): void => {
    setFiltersState((filtersState) => {
        return produce(filtersState, (filtersStateDraft) => {
            filterIds.forEach((filterId) => {
                const filterDraft = findFilterById(filtersStateDraft, filterId);
                if (!isEqual(filterDraft.selectedItemsApplied, filterDraft.selectedItems)) {
                    filterDraft.selectedItems = filterDraft.selectedItemsApplied;
                }
                if (!isEqual(filterDraft?.filterType, filterDraft?.defaultFilterType)) {
                    filterDraft.defaultFilterType = filterDraft?.filterType;
                }
            });
            return filtersStateDraft;
        });
    });
};

// Clears both selectedItemsApplied and selectedItems
// Does not touch autoselect filters
// Clears errors
export const clearFilters = (
    filterIds: FilterId[],
    setFiltersState: SetFiltersState,
    ignoreAutoSelect: boolean = false,
): void => {
    const clearSelectedItemsFilterIds: FilterId[] = [];

    setFiltersState((filtersState) => {
        return produce(filtersState, (filtersStateDraft) => {
            filtersStateDraft.forEach((filterDraft) => {
                const shouldClear =
                    filterIds.includes(filterDraft.id) &&
                    // Do not clear autoselect filters if not ignoreAutoSelect === false
                    (!ignoreAutoSelect || !filterDraft.autoSelect);
                if (shouldClear) {
                    filterDraft.error = undefined;
                    if (filterDraft.selectedItems.length > 0) {
                        clearSelectedItemsFilterIds.push(filterDraft.id);
                    }
                    if (filterDraft.selectedItemsApplied.length > 0) {
                        filterDraft.selectedItemsApplied = [];
                    }
                }
                filterDraft.filterType = "positiveAttributeFilter";
                filterDraft.defaultFilterType = "positiveAttributeFilter";
            });

            return filtersStateDraft;
        });
    });
    // clear filters' selectedItems using updateFilterSelectedItems to properly update dependencies and pending states
    clearSelectedItemsFilterIds.forEach((filterId) =>
        updateFilterSelectedItems(filterId, () => [], setFiltersState),
    );
};

// Do not use this to set selectedItems, use updateFilterSelectedItems
export const updateFilter = (
    updatedFilterId: FilterId,
    setFilterDispatch: SetStateAction<IFilterState>,
    setFiltersState: SetFiltersState,
): void => {
    setFiltersState((filtersState) => {
        const updatedFilterIndex = filtersState.findIndex((filter) => filter.id === updatedFilterId);
        if (updatedFilterIndex === -1) {
            // tslint:disable-next-line: no-console
            console.warn(
                `Trying to update invalid filterId ${updatedFilterId}. Available filter ids: ${filtersState
                    .map((filter) => filter.id)
                    .join(", ")}`,
            );
            return filtersState;
        }
        const updatedFilters = produce(filtersState, (filtersStateDraft) => {
            // update selected items
            const updatedFilterDraft = filtersStateDraft[updatedFilterIndex];
            filtersStateDraft[updatedFilterIndex] = setDispatch<IFilterState>(
                setFilterDispatch,
                updatedFilterDraft,
            );
            return filtersStateDraft;
        });
        return updatedFilters;
    });
};

export const updateFilterSelectedItems = (
    updatedFilterId: FilterId,
    selectedItemsDispatch: SetSelectedItems,
    setFiltersState: SetFiltersState,
): void => {
    const dependentFiltersIdsToClear = [];

    setFiltersState((filters) => {
        const updatedFilterMatch = findFilterById(filters, updatedFilterId);
        const updatedFilterIndex = filters.indexOf(updatedFilterMatch);
        if (!updatedFilterMatch) {
            // tslint:disable-next-line: no-console
            console.warn(
                `Trying to update invalid filterId ${updatedFilterId}. Available filter ids: ${filters
                    .map((filter) => filter.id)
                    .join(", ")}`,
            );
            return filters;
        }

        const updatedFilters = produce(filters, (filtersDraft) => {
            // update selected items
            const updatedFilterDraft = filtersDraft[updatedFilterIndex];
            const updatedSelectedItems = setDispatch<IFilterState["selectedItems"]>(
                selectedItemsDispatch,
                updatedFilterDraft.selectedItems,
            );
            const didUpdatedFilterSelectedValuesChange = !isEqual(
                updatedSelectedItems,
                updatedFilterDraft.selectedItems,
            );
            if (didUpdatedFilterSelectedValuesChange) {
                updatedFilterDraft.selectedItems = updatedSelectedItems;
                dependentFiltersIdsToClear.push(
                    ...getDependencyTreeFilterIds([updatedFilterId], filtersDraft),
                );
            }

            return filtersDraft;
        });

        return updateFilterPendingStates(updatedFilters);
    });

    // Clear dependent filters in parallel
    // Circular dependency would cause an infinite loop here
    dependentFiltersIdsToClear.forEach((dependentFilterId) => {
        updateFilterSelectedItems(dependentFilterId, [], setFiltersState);
    });
};

export const checkCircularDependency = (
    filtersToCheck: IFilterState[],
    allFilters: IFilterState[] = filtersToCheck,
    dependentIds: FilterId[] = [],
): void => {
    filtersToCheck.forEach((filter) => {
        const hasCircularDependency = dependentIds.includes(filter.id);
        if (hasCircularDependency) {
            throw Error(
                `Circular dependency found in filters: ${dependentIds.concat(filter.id).join(" > ")}`,
            );
        }
        const restrictingFilters = getRestrictingFilters(filter, allFilters);
        checkCircularDependency(restrictingFilters, allFilters, [...dependentIds, filter.id]);
    });
};

export const checkMissingDependency = (
    filterDeclarationMap: IFilterDeclarationMap,
    usedFilterIds: FilterId[],
): void => {
    usedFilterIds.forEach((filterId) => {
        const filterDeclaration = filterDeclarationMap[filterId];
        if (!filterDeclaration) {
            throw new Error(
                `Invalid filterId ${filterId}. Available filter ids: ${Object.keys(filterDeclarationMap).join(
                    ", ",
                )}`,
            );
        }
        const { restrictedByFilterIds = [] } = filterDeclaration;
        restrictedByFilterIds.forEach((restrictingFilterId) => {
            const isRestrictingFilterUsed = usedFilterIds.includes(restrictingFilterId);
            if (!isRestrictingFilterUsed) {
                throw new Error(
                    `Invalid filter dependency ${restrictingFilterId} in filter ${filterId}. Available Used filter ids: ${usedFilterIds.join(
                        ", ",
                    )}`,
                );
            }
        });
    });
};

export const getFiltersState = (
    filterDeclarationMap: IFilterDeclarationMap,
    usedFilterIds: FilterId[],
): IFilterState[] => {
    const initiatedFilters = usedFilterIds.map((filterId) => {
        const filterDeclaration = filterDeclarationMap[filterId];
        if (!filterDeclaration) {
            throw new Error(
                `Invalid filterId ${filterId}. Available filter ids: ${Object.keys(filterDeclarationMap).join(
                    ", ",
                )}`,
            );
        }
        return initializeFilter(filterDeclaration);
    });

    checkCircularDependency(initiatedFilters);

    return updateFilterPendingStates(initiatedFilters);
};

export const getUsedFiltersState = (
    filtersState: IFilterState[],
    usedFilterIds: FilterId[],
): IFilterState[] => {
    const usedFiltersState = usedFilterIds.map((filterId) => {
        return findFilterById(filtersState, filterId);
    });
    return updateFilterPendingStates(usedFiltersState);
};

export const defaultElementsOptionsAfm: IValidElementsOptions["afm"] = {
    attributes: [],
    filters: [],
    measures: [],
};

export const getRestrictingFilters = (filter: IFilterState, filtersState: IFilterState[]): IFilterState[] => {
    return filtersState.filter((filterState) => {
        return filter.restrictedByFilterIds.includes(filterState.id);
    });
};

export type FilterContext = Pick<
    IFilterState,
    "projectId" | "attributeDisplayFormIdentifier" | "restrictedByMeasureIdentifiers"
>;
export type RestrictingFilterContext = Pick<
    IFilterState,
    "projectId" | "attributeDisplayFormIdentifier" | "selectedItems"
>;

export interface IFilterElementsContext {
    filter: FilterContext;
    restrictingFilters?: RestrictingFilterContext[];
}
