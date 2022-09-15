// (C) 2020 GoodData Corporation
import stringify from "json-stable-stringify";
import { IFilterState, IUseFiltersState, isAutoSelectIndex, isAutoSelectValue } from "./filterTypes";
import {
    IElementsPromiseCache,
    IAutoSelectContextCache,
    getFilterElementsWithPagingContext,
    getCachedElements,
    defaultElementsLimit,
} from "./filterElements";

export const getAutoSelectPaging = (
    filter: IFilterState,
    updateFilterError: IUseFiltersState["updateFilterError"],
): { offset: number; limit: number; search?: string } | undefined => {
    // using defaultElementsLimit instead of 1 to leverage caching
    const paging = { offset: 0, limit: defaultElementsLimit, search: undefined };
    if (isAutoSelectIndex(filter.autoSelect)) {
        paging.offset = filter.autoSelect.index;
        // Limit set to default filter page size to leverage caching
        // Beware of filtering element values. Element with a specific index can be filtered out.
        // Limit needs to so large that after filtering out unwanted values, we are left with at least 1 element.
        paging.limit = defaultElementsLimit;
    } else if (isAutoSelectValue(filter.autoSelect)) {
        paging.search = filter.autoSelect.value;
        // Consider setting limit to default filter page size to leverage caching
        // No need to enlarge limit. AutoSelect Value should not be filtered out.
    } else {
        const errorMessage = `Unsupported autoselect type ${stringify(filter.autoSelect)}`;
        updateFilterError(filter.id, new Error(errorMessage));
        return undefined;
    }
    return paging;
};

// Check filtersReadyToAutoSelect and initiate loading elements if it is not already in progress
export const initiateAutoSelect = (
    filtersState: IFilterState[],
    filtersReadyToAutoSelect: IFilterState[],
    updateFilterSelectedItems: IUseFiltersState["updateFilterSelectedItems"],
    updateFilterError: IUseFiltersState["updateFilterError"],
    elementsCache: IElementsPromiseCache,
    autoSelectContextCache: IAutoSelectContextCache,
): void => {
    filtersReadyToAutoSelect.forEach((filter) => {
        const paging = getAutoSelectPaging(filter, updateFilterError);
        if (!paging) {
            return;
        }
        const cachedContext: string | undefined = autoSelectContextCache[filter.id];

        // This is being done again in getCachedElements. Consider memoizing or passing as a parameter
        const initialContext = getFilterElementsWithPagingContext(
            filter.id,
            filtersState,
            paging.offset,
            paging.limit,
            paging.search,
        );

        // If context of the current filter is new or changed, the ongoing auto select promise (if any) must be cancelled
        // and a new promise must be created and saved to cache
        if (cachedContext !== initialContext) {
            // cache current context
            autoSelectContextCache[filter.id] = initialContext;

            const promise = getCachedElements(
                elementsCache,
                filter.id,
                filtersState,
                paging.offset,
                paging.limit,
                paging.search,
            );

            promise
                .then((validElementsResponse) => {
                    // Always use a fresh reference. The same cache may no longer exist by the time the promise is resolved.
                    const cachedContext: string | undefined = autoSelectContextCache[filter.id];
                    const isPromiseValid = cachedContext === initialContext;
                    // cancel promise if initialContext is no longer valid
                    if (isPromiseValid) {
                        const firstItem = validElementsResponse.validElements.items[0];
                        // clear current context from autoSelectContextCache to signal the autoSelect has been finished.
                        // the request cache still exists in elementsCache
                        delete autoSelectContextCache[filter.id];
                        if (firstItem) {
                            updateFilterSelectedItems(filter.id, () => [firstItem.element.title]);
                            return firstItem;
                        } else {
                            throw new Error(`No elements`);
                        }
                    }
                    return undefined;
                })
                .catch((error) => {
                    const cachedContext: string | undefined = autoSelectContextCache[filter.id];
                    const isPromiseValid = cachedContext === initialContext;
                    // cancel promise if initialContext is no longer valid
                    if (isPromiseValid) {
                        // remove cache on error
                        delete autoSelectContextCache[filter.id];
                        // Do NOT forward the error, just catch it. Put it in your pocket.
                        // After a while you can have a nice error necklace :-)
                        updateFilterError(filter.id, error);
                    }
                    return undefined;
                });
        }
    });
};
