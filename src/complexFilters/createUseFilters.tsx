// (C) 2020 GoodData Corporation
import React, { useCallback, createContext, useContext, useState, useMemo, useEffect } from "react";
import noop from "lodash/noop";
import stringify from "json-stable-stringify";
import {
    IFilterDeclarationMap,
    IFiltersContext,
    UseFilterElements,
    GetFilterElements,
    IFilterState,
    UseFiltersState,
    IUseFiltersState,
    FilterId,
    VisualizationFilter,
} from "./filterTypes";
import {
    findFilterById,
    getFiltersState,
    getUsedFiltersState,
    checkMissingDependency,
    updateFilterSelectedItems,
    applyFilters,
    areFiltersPending,
    resetFilters,
    clearFilters,
    areAppliedFiltersReady,
    updateFilter,
    setAttributeFilter,
} from "./filterUtils";
import { getVisualizationFilterContext, memoizedGetVisualizationFilter } from "./visualizationFilterAdapters";
import {
    getFilterElementsContext,
    IElementsPromiseCache,
    getCachedElements,
    IAutoSelectContextCache,
} from "./filterElements";
import produce from "immer";
import { initiateAutoSelect } from "./filterAutoSelect";

// This should be run only once per product (app).
// Sharing the returned hooks means sharing filter declarations, elements cache and selected items
// Could be shared between projects with the same projectId
export const createUseFilters = (filterDeclarationMap: IFilterDeclarationMap) => {
    const allFilterIds = Object.keys(filterDeclarationMap);

    const initialFiltersState = getFiltersState(filterDeclarationMap, allFilterIds);

    const FilterStateContext: React.Context<IFiltersContext> = createContext<IFiltersContext>({
        filtersState: initialFiltersState,
        setFiltersState: noop,
    });

    const FilterStateProvider: React.FC<{}> = ({ children }) => {
        const [filtersState, setFiltersState] = useState<IFilterState[]>(initialFiltersState);

        return (
            <FilterStateContext.Provider
                value={{
                    filtersState,
                    setFiltersState,
                }}
            >
                {children}
            </FilterStateContext.Provider>
        );
    };

    const elementsCache: IElementsPromiseCache = {};

    // This cache is a subset of elementsCache and holds references to ongoing autoSelect promises
    const autoSelectContextCache: IAutoSelectContextCache = {};

    const useFiltersState: UseFiltersState = (usedFilterIds = allFilterIds) => {
        const { filtersState, setFiltersState } = useContext<IFiltersContext>(FilterStateContext);

        const usedFilters = useMemo(() => {
            return getUsedFiltersState(filtersState, usedFilterIds);
        }, [filtersState, ...usedFilterIds]);

        // When usedFilterIds change
        useEffect(() => {
            checkMissingDependency(filterDeclarationMap, usedFilterIds);
        }, usedFilterIds);

        const updateFilterSelectedItemsRef = useCallback<IUseFiltersState["updateFilterSelectedItems"]>(
            (filterId, selectedItemsDispatch) =>
                updateFilterSelectedItems(filterId, selectedItemsDispatch, setFiltersState),
            [],
        );

        const updateFilterErrorRef = useCallback<IUseFiltersState["updateFilterError"]>((filterId, error) => {
            updateFilter(
                filterId,
                (filter) => {
                    filter.error = error;
                    return filter;
                },
                setFiltersState,
            );
            setFiltersState((filtersState) => {
                const filterIndex = filtersState.findIndex((filter) => filter.id === filterId);
                return produce(filtersState, (filtersStateDraft) => {
                    filtersStateDraft[filterIndex].error = error;
                    return filtersStateDraft;
                });
            });
        }, []);

        const applyFiltersRef = useCallback<IUseFiltersState["applyFilters"]>(
            (filterIds = usedFilterIds) => applyFilters(filterIds, setFiltersState),
            [usedFilterIds],
        );

        const resetFiltersRef = useCallback<IUseFiltersState["resetFilters"]>(
            (filterIds = usedFilterIds) => resetFilters(filterIds, setFiltersState),
            [usedFilterIds],
        );

        const clearFiltersRef = useCallback<IUseFiltersState["clearFilters"]>(
            (filterIds = usedFilterIds, ignoreAutoSelect) =>
                clearFilters(filterIds, setFiltersState, ignoreAutoSelect),
            [usedFilterIds],
        );

        const setAttributeFilterRef = useCallback<IUseFiltersState["setAttributeFilter"]>(
            (filterId) => setAttributeFilter(setFiltersState, filterId),
            [usedFilterIds],
        );

        // Filters pending selected items and NOT pending dependency are ready for auto select
        const filtersReadyToAutoSelect = filtersState.filter(
            (filter) => filter.isPendingSelectedElements && !filter.isPendingDependency && !filter.error,
        );

        const filtersReadyToAutoSelectIds = filtersReadyToAutoSelect.map((filter) => filter.id);

        useEffect(() => {
            initiateAutoSelect(
                filtersState,
                filtersReadyToAutoSelect,
                updateFilterSelectedItemsRef,
                updateFilterErrorRef,
                elementsCache,
                autoSelectContextCache,
            );
        }, [filtersReadyToAutoSelectIds.join(", ")]);

        const areFiltersReady = !areFiltersPending(filtersState);

        const autoSelectFilters = filtersState.filter((filter) => filter.autoSelect);
        const areAppliedFiltersReadyMemo = useMemo(() => areAppliedFiltersReady(filtersState), [
            filtersState,
        ]);

        // When areFiltersReady is true and some autoSelect filters are not yet selected (!areAppliedFiltersReadyMemo), apply filters automatically
        useEffect(() => {
            if (areFiltersReady && !areAppliedFiltersReadyMemo) {
                const autoSelectedFilterIds: FilterId[] = autoSelectFilters.map((filter) => filter.id);
                applyFiltersRef(autoSelectedFilterIds);
            }
        }, [areFiltersReady, areAppliedFiltersReadyMemo]);

        return {
            filtersState: usedFilters,
            updateFilterSelectedItems: updateFilterSelectedItemsRef,
            applyFilters: applyFiltersRef,
            resetFilters: resetFiltersRef,
            clearFilters: clearFiltersRef,
            updateFilterError: updateFilterErrorRef,
            setAttributeFilter: setAttributeFilterRef,
            areAppliedFiltersReady: areAppliedFiltersReadyMemo,
        };
    };

    const useVisualizationFilters = (
        usedFilterIds: FilterId[] = allFilterIds,
    ): { visualizationFilters: VisualizationFilter[]; areAppliedFiltersReady: boolean } => {
        const { filtersState, areAppliedFiltersReady } = useFiltersState(usedFilterIds);

        const relevantFilters = useMemo(() => {
            // Only filters with applied selected values are relevant
            return getUsedFiltersState(filtersState, usedFilterIds).filter(
                (filter) => filter.selectedItemsApplied.length > 0,
            );
            // must have constant length, primitives are more stable
        }, [filtersState, usedFilterIds.join(", ")]);

        // generate visualizationFiltersContext from relevantFilters and use it as memoization key
        const visualizationFiltersContext: string[] = useMemo(() => {
            return relevantFilters.map((filter) => getVisualizationFilterContext(filter));
            // must have constant length, cannot use primitives here, but relevantFilters is memoized
        }, [relevantFilters]);

        const visualizationFilters = useMemo(() => {
            return relevantFilters.map((filter, filterIndex) => {
                const visualizationFilterContext = visualizationFiltersContext[filterIndex];
                // Consider also memoizing each filter separately
                return memoizedGetVisualizationFilter(visualizationFilterContext, filter);
            });
            // must have constant length, primitives are more stable
        }, [visualizationFiltersContext.join(", ")]);

        return { visualizationFilters, areAppliedFiltersReady };
    };

    const defaultElementsLimit = 10;

    const useFilterElements: UseFilterElements = (filterId) => {
        // All filters are needed because of possible dependencies
        const { filtersState, updateFilterError } = useFiltersState(allFilterIds);
        const filter = findFilterById(filtersState, filterId);

        // when elements context changes new elements should be loaded
        const filterElementsContext = useMemo<string>(
            () => stringify(getFilterElementsContext(filterId, filtersState)),
            [filterId, filtersState],
        );

        const getFilterElements = useCallback<GetFilterElements>(
            (offset = 0, limit = defaultElementsLimit, search = "") => {
                return getCachedElements(elementsCache, filter.id, filtersState, offset, limit, search).catch(
                    (error) => {
                        updateFilterError(filter.id, error);
                        return Promise.reject(error); // forward the error
                    },
                );
            },
            // update on context change AND error change
            [filterElementsContext, filter.error],
        );

        return { getFilterElements, filterElementsContext };
    };

    return {
        useFiltersState,
        useVisualizationFilters,
        useFilterElements,
        FilterStateProvider,
    };
};

export default createUseFilters;
