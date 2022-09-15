// (C) 2019-2020 GoodData Corporation
import {
    initializeFilter,
    setDispatch,
    findFilterById,
    isFilterPendingSelectedItems,
    isFilterPendingDependency,
    areAppliedFiltersReady,
    areFiltersPending,
    updateFilterPendingStates,
    getDependencyTreeFilterIds,
    checkCircularDependency,
    checkMissingDependency,
    applyFilters,
    resetFilters,
    clearFilters,
    updateFilter,
    updateFilterSelectedItems,
    getFiltersState,
    getUsedFiltersState,
    getRestrictingFilters,
} from "../filterUtils";
import { IFilterState, SetSelectedItems } from "../filterTypes";
import { SetStateAction } from "react";

const sampleFilterDefinition = {
    id: "cid",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.customer.cid.name",
    label: "CID",
};

describe("initializeFilter", () => {
    it("should convert minimal filterDeclaration to filterState with default values", () => {
        const actual = initializeFilter(sampleFilterDefinition);
        expect(actual).toEqual({
            attributeDisplayFormIdentifier: "label.customer.cid.name",
            defaultFilterType: "positiveAttributeFilter",
            filterType: "positiveAttributeFilter",
            id: "cid",
            isMultiSelect: false,
            isPendingDependency: false,
            isPendingSelectedElements: false,
            label: "CID",
            placeholder: "All",
            projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
            restrictedByFilterIds: [],
            restrictedByMeasureIdentifiers: [],
            selectedItems: [],
            selectedItemsApplied: [],
            error: undefined,
        });
    });
});

describe("setDispatch", () => {
    it("should call a dispatch if it is a function and pass it the previous value and return a new value", () => {
        const actual = setDispatch<number>((prev) => prev + 1, 1);
        expect(actual).toBe(2);
    });
    it("should just return the dispatch as a new value if dispatch is not a function", () => {
        const actual = setDispatch<number>(3, 1);
        expect(actual).toBe(3);
    });
});

const sampleFilterState = initializeFilter(sampleFilterDefinition);

describe("findFilterById", () => {
    it("should return a filterState matched by id in filtersState", () => {
        const actual = findFilterById([sampleFilterState], "cid");
        expect(actual).toBe(sampleFilterState);
    });
    it("should throw an error if the filter is not found", () => {
        expect(() => findFilterById([sampleFilterState], "invalid")).toThrow();
    });
});

describe("isFilterPendingSelectedItems", () => {
    it("should return true if the filter is auto select and does not have any selected items applied", () => {
        const actual = isFilterPendingSelectedItems({ ...sampleFilterState, autoSelect: { index: 0 } });
        expect(actual).toBe(true);
    });
    it("should return false if the filter is not autoselect", () => {
        const actual = isFilterPendingSelectedItems(sampleFilterState);
        expect(actual).toBe(false);
    });
    it("should return false if the filter does have selected items", () => {
        const actual = isFilterPendingSelectedItems({ ...sampleFilterState, selectedItems: ["123"] });
        expect(actual).toBe(false);
    });
    it("should return false if the filter is auto select and does have some selected items", () => {
        const actual = isFilterPendingSelectedItems({
            ...sampleFilterState,
            autoSelect: { index: 0 },
            selectedItems: ["123"],
        });
        expect(actual).toBe(false);
    });
});

const sampleDependentFilterState = initializeFilter({
    id: "ica",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.issuerbenchmarking.issuerica.icaname",
    restrictedByFilterIds: ["cid"],
    label: "ICA",
});

describe("isFilterPendingDependency", () => {
    it("should return true if the filter is auto select and does not have any selected items", () => {
        const actual = isFilterPendingDependency(sampleDependentFilterState, [
            { ...sampleFilterState, autoSelect: { index: 0 } },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(true);
    });
    it("should return false if the filter is not dependent on any filters with pending selected items", () => {
        const actual = isFilterPendingDependency(sampleDependentFilterState, [
            { ...sampleFilterState },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(false);
    });
    it("should return false if the filter does not depend on any other filter", () => {
        const actual = isFilterPendingDependency(sampleFilterState, [sampleFilterState]);
        expect(actual).toBe(false);
    });
    it("should return false if the filter is auto select and does have some selected items", () => {
        const filter = { ...sampleFilterState, autoSelect: { index: 0 }, selectedItems: ["123"] };
        const actual = isFilterPendingDependency(filter, [filter, sampleDependentFilterState]);
        expect(actual).toBe(false);
    });
});

describe("areAppliedFiltersReady", () => {
    it("should return true if no filters are pending applied selected elements", () => {
        const actual = areAppliedFiltersReady([
            { ...sampleFilterState, autoSelect: { index: 0 }, selectedItemsApplied: ["123"] },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(true);
    });
    it("should return false if some filter is pending applied selected items", () => {
        const actual = areAppliedFiltersReady([
            { ...sampleFilterState, autoSelect: { index: 0 } },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(false);
    });
});

describe("areFiltersPending", () => {
    it("should return true if any filter is pending selected items", () => {
        const actual = areFiltersPending([
            { ...sampleFilterState, autoSelect: { index: 0 }, selectedItems: [] },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(true);
    });
    it("should return false if all filters are not pending selected items", () => {
        const actual = areFiltersPending([
            { ...sampleFilterState, autoSelect: { index: 0 }, selectedItems: ["123"] },
            sampleDependentFilterState,
        ]);
        expect(actual).toBe(false);
    });
});

describe("updateFilterPendingStates", () => {
    it("should return new filtersState with recalculated isPendingSelectedItems and isPendingDependency properties", () => {
        const actual = updateFilterPendingStates([
            { ...sampleFilterState, autoSelect: { index: 0 }, selectedItems: [] },
            sampleDependentFilterState,
        ]);
        expect(actual[0].isPendingSelectedElements).toBe(true);
        expect(actual[0].isPendingDependency).toBe(false);
        expect(actual[1].isPendingSelectedElements).toBe(false);
        expect(actual[1].isPendingDependency).toBe(true);
    });
    it("should not create a new reference if no update is needed", () => {
        const initial = [
            {
                ...sampleFilterState,
                autoSelect: { index: 0 },
                selectedItems: [],
                isPendingSelectedElements: true,
                isPendingDependency: false,
            },
            { ...sampleDependentFilterState, isPendingSelectedElements: false, isPendingDependency: true },
        ];
        const actual = updateFilterPendingStates(initial);
        expect(actual).toBe(initial);
    });
});

const sampleChainDependentFilterState = initializeFilter({
    id: "country",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.issuerbenchmarking.country",
    restrictedByFilterIds: ["ica"],
    label: "Country",
});

describe("getDependencyTreeFilterIds", () => {
    it("should return an array of filter ids that are recursively dependent on specific filter ids", () => {
        const actual = getDependencyTreeFilterIds(
            ["cid"],
            [sampleFilterState, sampleDependentFilterState, sampleChainDependentFilterState],
        );
        expect(actual).toEqual(["ica", "country"]);
    });
    it("should return an empty array if no filters are dependent on specific filter ids", () => {
        const actual = getDependencyTreeFilterIds(
            ["country"],
            [sampleFilterState, sampleDependentFilterState, sampleChainDependentFilterState],
        );
        expect(actual).toEqual([]);
    });
});

describe("checkCircularDependency", () => {
    it("should throw an error if filters have a circular dependency on each other", () => {
        expect(() =>
            checkCircularDependency([
                { ...sampleFilterState, restrictedByFilterIds: ["country"] },
                sampleDependentFilterState,
                sampleChainDependentFilterState,
            ]),
        ).toThrow();
    });
    it("should not throw an error if filters have only hierarchal dependencies", () => {
        expect(() =>
            checkCircularDependency([
                sampleFilterState,
                sampleDependentFilterState,
                sampleChainDependentFilterState,
            ]),
        ).not.toThrow();
    });
});

describe("checkMissingDependency", () => {
    it("should throw an error used filter id is not found in the filter declaration map", () => {
        expect(() =>
            checkMissingDependency(
                {
                    a: { ...sampleFilterDefinition, id: "a" },
                },
                ["b"],
            ),
        ).toThrow();
    });
    it("should throw an error if a used filter is dependent on a filter that is NOT used", () => {
        expect(() =>
            checkMissingDependency(
                {
                    a: { ...sampleFilterDefinition, id: "a" },
                    b: { ...sampleFilterDefinition, id: "b", restrictedByFilterIds: ["a"] },
                },
                ["b"],
            ),
        ).toThrow();
    });
    it("should not throw an error if filters only depend on other used filters", () => {
        expect(() =>
            checkMissingDependency(
                {
                    a: { ...sampleFilterDefinition, id: "a" },
                    b: { ...sampleFilterDefinition, id: "b", restrictedByFilterIds: ["a"] },
                },
                ["b", "a"],
            ),
        ).not.toThrow();
    });
});

describe("resetFilters", () => {
    it("should call setFiltersState with updated selectedElements with a value of selectedElementsApplied for selected filter ids", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toEqual([
                { ...sampleFilterState, id: "a", selectedItems: ["456"], selectedItemsApplied: ["456"] },
                { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            ]);
        });
        resetFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
    it("should not update the reference if no update is required", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["123"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toBe(previousFiltersState);
        });
        resetFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
});

describe("applyFilters", () => {
    it("should call setFiltersState with updated selectedElementsApplied with a value of selectedElements for selected filter ids", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toEqual([
                { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["123"] },
                { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            ]);
        });
        applyFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
    it("should not update the reference if no update is required", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["123"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toBe(previousFiltersState);
        });
        resetFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
});

describe("resetFilters", () => {
    it("should call setFiltersState with updated selectedElements with a value of selectedElementsApplied for selected filter ids", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toEqual([
                { ...sampleFilterState, id: "a", selectedItems: ["456"], selectedItemsApplied: ["456"] },
                { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
            ]);
        });
        resetFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
    it("should not update the reference if no update is required", () => {
        const previousFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: ["123"], selectedItemsApplied: ["123"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            const expected = setFiltersState(previousFiltersState);
            expect(expected).toBe(previousFiltersState);
        });
        resetFilters(["a"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
    });
});

describe("clearFilters", () => {
    it("should finally call setFiltersState with cleared selectedElements and selectedElementsApplied selected filter ids and update isPendingDependency and isPendingSelectedElements", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
                autoSelect: { index: 0 },
                selectedItems: ["123"],
                selectedItemsApplied: ["456"],
            },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        clearFilters(["a", "b"], mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toEqual([
            {
                ...sampleFilterState,
                id: "a",
                autoSelect: { index: 0 },
                selectedItems: [],
                selectedItemsApplied: [],
                isPendingDependency: false,
                isPendingSelectedElements: true,
            },
            {
                ...sampleFilterState,
                id: "b",
                selectedItems: [],
                selectedItemsApplied: [],
                isPendingDependency: false,
                isPendingSelectedElements: false,
            },
        ]);
    });
    it("should ignore auto select filters if ignoreAutoSelectFilters is true", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
                autoSelect: { index: 0 },
                selectedItems: ["123"],
                selectedItemsApplied: ["456"],
            },
            { ...sampleFilterState, id: "b", selectedItems: ["123"], selectedItemsApplied: ["456"] },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        clearFilters(["a", "b"], mockSetFiltersState, true);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toEqual([
            {
                ...sampleFilterState,
                id: "a",
                autoSelect: { index: 0 },
                selectedItems: ["123"],
                selectedItemsApplied: ["456"],
                isPendingDependency: false,
                isPendingSelectedElements: false,
            },
            {
                ...sampleFilterState,
                id: "b",
                selectedItems: [],
                selectedItemsApplied: [],
                isPendingDependency: false,
                isPendingSelectedElements: false,
            },
        ]);
    });
    it("should not update the reference if no update is required", () => {
        const initialFiltersState: IFilterState[] = [
            { ...sampleFilterState, id: "a", selectedItems: [], selectedItemsApplied: [] },
            { ...sampleFilterState, id: "b", selectedItems: [], selectedItemsApplied: ["123"] },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        clearFilters(["a"], mockSetFiltersState);
        expect(filtersState).toBe(initialFiltersState);
    });
});

describe("updateFilter", () => {
    it("should call setFiltersState with updatedFilters state resolving a setFilterDispatch for the selected filterId ", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
            },
            { ...sampleFilterState, id: "b" },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        const mockSetFilterDispatch: SetStateAction<IFilterState> = jest.fn((filter: IFilterState) => {
            return {
                ...filter,
                filterType: "negativeAttributeFilter",
            };
        });
        updateFilter("a", mockSetFilterDispatch, mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toEqual([
            {
                ...sampleFilterState,
                id: "a",
                filterType: "negativeAttributeFilter",
            },
            {
                ...sampleFilterState,
                id: "b",
            },
        ]);
    });
    it("should not update the reference if no update is required", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
            },
            { ...sampleFilterState, id: "b" },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        const mockSetFilterDispatch: SetStateAction<IFilterState> = jest.fn((filter: IFilterState) => {
            return filter;
        });
        updateFilter("a", mockSetFilterDispatch, mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toBe(initialFiltersState);
    });
});

describe("updateFilterSelectedItems", () => {
    it("should call setFiltersState with a filter with updated selected items resolving a selectedItemsDispatch and it's pending states for the selected filterId", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
                selectedItems: ["123"],
            },
            { ...sampleFilterState, id: "b" },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        const mockSelectedItemsDispatch: SetSelectedItems = jest.fn((prevSelectedItems) => {
            return [...prevSelectedItems, "456"];
        });
        updateFilterSelectedItems("a", mockSelectedItemsDispatch, mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toEqual([
            {
                ...sampleFilterState,
                id: "a",
                selectedItems: ["123", "456"],
                isPendingDependency: false,
            },
            {
                ...sampleFilterState,
                id: "b",
                isPendingDependency: false,
            },
        ]);
    });
    it("should not update the reference if no update is required", () => {
        const initialFiltersState: IFilterState[] = [
            {
                ...sampleFilterState,
                id: "a",
                isPendingDependency: false,
            },
            { ...sampleFilterState, id: "b", isPendingDependency: false },
        ];
        let filtersState = initialFiltersState;
        const mockSetFiltersState = jest.fn((setFiltersState) => {
            filtersState = setFiltersState(filtersState);
        });
        const mockSelectedItemsDispatch: SetSelectedItems = jest.fn((prevSelectedItems) => {
            return prevSelectedItems;
        });
        updateFilterSelectedItems("a", mockSelectedItemsDispatch, mockSetFiltersState);
        expect(mockSetFiltersState).toHaveBeenCalled();
        expect(filtersState).toBe(initialFiltersState);
    });
});

describe("getFiltersState", () => {
    it("should create FiltersState from FiltersDeclaration with listed usedFilterIds", () => {
        const actual = getFiltersState(
            {
                a: { ...sampleFilterDefinition, id: "a" },
                b: { ...sampleFilterDefinition, id: "b" },
            },
            ["a"],
        );
        expect(actual).toEqual([
            {
                attributeDisplayFormIdentifier: "label.customer.cid.name",
                defaultFilterType: "positiveAttributeFilter",
                error: undefined,
                filterType: "positiveAttributeFilter",
                id: "a",
                isMultiSelect: false,
                isPendingDependency: false,
                isPendingSelectedElements: false,
                label: "CID",
                placeholder: "All",
                projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                restrictedByFilterIds: [],
                restrictedByMeasureIdentifiers: [],
                selectedItems: [],
                selectedItemsApplied: [],
            },
        ]);
    });
});

describe("getUsedFiltersState", () => {
    it("should create FiltersState from FiltersDeclaration with listed usedFilterIds and update the dependencies", () => {
        const actual = getUsedFiltersState(
            [sampleFilterState, { ...sampleFilterState, id: "b" }],
            [sampleFilterState.id],
        );
        expect(actual).toEqual([{ ...sampleFilterState, isPendingDependency: false }]);
    });
});

describe("getRestrictingFilters", () => {
    it("should create FiltersState from FiltersDeclaration with listed usedFilterIds and update the dependencies", () => {
        const filtersState: IFilterState[] = [
            { ...sampleFilterState, id: "a" },
            { ...sampleFilterState, id: "b", restrictedByFilterIds: ["a"] },
        ];
        const actual = getRestrictingFilters(filtersState[1], filtersState);
        expect(actual).toEqual([filtersState[0]]);
    });
});
