// (C) 2019 GoodData Corporation
import {
    getClearFilters,
    getUpdateFilter,
    getChildFilterQueryOptions,
    getResetFilters,
    getApplyFilters,
} from "../createUseFilters";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../constants";
import { IBasicAttributeFilter, IParentChildAttributeFilter, IFilterCollection } from "../../types";

const getSetStateMock = (previousState, mockCallback = jest.fn()) => {
    const setState = (valueOrCallback) => {
        if (typeof valueOrCallback === "function") {
            mockCallback(valueOrCallback(previousState));
        }
        mockCallback(valueOrCallback);
    };
    return [setState, mockCallback];
};

describe("createUseFilters", () => {
    const basicFilterWithNoValues: IBasicAttributeFilter = {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        selectedValuesUnsaved: null,
        placeholder: "Basic",
        displayFormIdentifier: "label.basic",
    };

    const basicFilterWithValues: IBasicAttributeFilter = {
        ...basicFilterWithNoValues,
        selectedValues: [{ label: "label", value: "value" }],
    };

    const basicFilterWithValuesUnsaved: IBasicAttributeFilter = {
        ...basicFilterWithNoValues,
        selectedValuesUnsaved: [{ label: "labelUnsaved", value: "valueUnsaved" }],
    };

    const basicFilterWithValuesSavedAndUnsaved: IBasicAttributeFilter = {
        ...basicFilterWithNoValues,
        selectedValues: [{ label: "label", value: "value" }],
        selectedValuesUnsaved: [{ label: "labelUnsaved", value: "valueUnsaved" }],
    };

    const parentChildFilterWithNoValues: IParentChildAttributeFilter = {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentValuesUnsaved: null,
        parentAttributeIdentifier: "attr.parent",
        parentAttributeDisplayFormIdentifier: "label.parent",
        parentPlaceholder: "Region",
        childValues: [],
        childValuesUnsaved: null,
        childAttributeIdentifier: "attr.child",
        childAttributeDisplayFormIdentifier: "label.child",
        childPlaceholder: "Country",
        commonAncestorAttributeIdentifier: "attr.ancestor",
    };

    const parentChildFilterWithOnlyParentValues: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        parentValues: [{ label: "parentLabel", value: "parentValue" }],
    };

    const parentChildFilterWithOnlyChildValues: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        childValues: [{ label: "childLabel", value: "childValue" }],
    };

    const parentChildFilterWithBothValues: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        childValues: [{ label: "childLabel", value: "childValue" }],
        parentValues: [{ label: "parentLabel", value: "parentValue" }],
    };

    const parentChildFilterWithValuesUnsaved: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        childValuesUnsaved: [{ label: "childLabelUnsaved", value: "childValueUnsaved" }],
        parentValuesUnsaved: [{ label: "parentLabelUnsaved", value: "parentValueUnsaved" }],
    };

    const parentChildFilterWithBothValuesUnsaved: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        childValuesUnsaved: [{ label: "childLabelUnsaved", value: "childValueUnsaved" }],
        parentValuesUnsaved: [{ label: "parentLabelUnsaved", value: "parentValueUnsaved" }],
    };

    const parentChildFilterWithBothValuesSavedAndUnsaved: IParentChildAttributeFilter = {
        ...parentChildFilterWithNoValues,
        childValues: [{ label: "childLabel", value: "childValue" }],
        parentValues: [{ label: "parentLabel", value: "parentValue" }],
        childValuesUnsaved: [{ label: "childLabelUnsaved", value: "childValueUnsaved" }],
        parentValuesUnsaved: [{ label: "parentLabelUnsaved", value: "parentValueUnsaved" }],
    };

    const filterStateWithAllValues: IFilterCollection = {
        cardType: basicFilterWithValues,
        regionAndCountry: parentChildFilterWithBothValues,
    };

    const filterStateWithAllValuesAndUnsavedValues: IFilterCollection = {
        cardType: {
            ...basicFilterWithValues,
            selectedValuesUnsaved: [{ label: "different label", value: "different value" }],
        },
        regionAndCountry: {
            ...parentChildFilterWithBothValues,
            childValuesUnsaved: [{ label: "childLabel2", value: "childValue2" }],
            parentValuesUnsaved: [{ label: "parentLabel2", value: "parentValue2" }],
        },
    };

    const filterStateWithNoValues: IFilterCollection = {
        cardType: basicFilterWithNoValues,
        regionAndCountry: parentChildFilterWithNoValues,
    };

    const filterStateWithValuesUnsaved: IFilterCollection = {
        cardType: basicFilterWithValuesUnsaved,
        regionAndCountry: parentChildFilterWithBothValuesUnsaved,
    };

    describe("getClearFilters", () => {
        it("should clear all the filters including unsaved values", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithAllValuesAndUnsavedValues);

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry: parentChildFilterWithNoValues,
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters([]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should ignore unknown filters in ignoredFilterIds", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithAllValues);

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry: parentChildFilterWithNoValues,
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters(["some unknown item"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should respect ignoredFilterIds for a basic filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithAllValues);

            const expected = {
                cardType: basicFilterWithValues,
                regionAndCountry: parentChildFilterWithNoValues,
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters(["cardType"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should respect ignoredFilterIds for a parent filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithAllValues);

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry: parentChildFilterWithOnlyParentValues,
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters(["regionAndCountry_parent"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should respect ignoredFilterIds for a child filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithAllValues);

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry: parentChildFilterWithOnlyChildValues,
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters(["regionAndCountry_child"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should ignore filters with autoSelectIndex", () => {
            const filters = {
                cardType: {
                    ...basicFilterWithValues,
                    autoSelectIndex: 0,
                },
                regionAndCountry: {
                    ...parentChildFilterWithBothValues,
                    parentAutoSelectIndex: 0,
                },
                regionAndCountry2: {
                    ...parentChildFilterWithBothValues,
                    childAutoSelectIndex: 0,
                },
            };

            const [setFilterState, mockCallback] = getSetStateMock(filters);

            const expected = {
                cardType: {
                    ...basicFilterWithValues,
                    autoSelectIndex: 0,
                },
                regionAndCountry: {
                    ...parentChildFilterWithBothValues,
                    parentAutoSelectIndex: 0,
                    childValues: [],
                },
                regionAndCountry2: {
                    ...parentChildFilterWithBothValues,
                    childAutoSelectIndex: 0,
                    parentValues: [],
                },
            };

            const clearFilters = getClearFilters(setFilterState);
            clearFilters();

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });
    });

    describe("getResetFilters", () => {
        it("should remove all unsaved values", () => {
            const initialState = {
                basicFilterWithNoValues,
                basicFilterWithValuesUnsaved,
                basicFilterWithValues,
                basicFilterWithValuesSavedAndUnsaved,

                parentChildFilterWithNoValues,
                parentChildFilterWithValuesUnsaved,
                parentChildFilterWithBothValues,
                parentChildFilterWithBothValuesSavedAndUnsaved,
            };
            const expected = {
                basicFilterWithNoValues,
                basicFilterWithValuesUnsaved: basicFilterWithNoValues,
                basicFilterWithValues,
                basicFilterWithValuesSavedAndUnsaved: basicFilterWithValues,

                parentChildFilterWithNoValues,
                parentChildFilterWithValuesUnsaved: parentChildFilterWithNoValues,
                parentChildFilterWithBothValues,
                parentChildFilterWithBothValuesSavedAndUnsaved: parentChildFilterWithBothValues,
            };

            const [setFilterState, mockCallback] = getSetStateMock(initialState);

            const resetFilters = getResetFilters(setFilterState);
            resetFilters();

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should reset listed unsaved filters", () => {
            const initialState = {
                removeBasic: basicFilterWithValuesSavedAndUnsaved,
                leaveBasic: basicFilterWithValuesSavedAndUnsaved,
                removeParent: parentChildFilterWithBothValuesSavedAndUnsaved,
                removeChild: parentChildFilterWithBothValuesSavedAndUnsaved,
                leaveParentChild: parentChildFilterWithBothValuesSavedAndUnsaved,
            };

            const [setFilterState, mockCallback] = getSetStateMock(initialState);

            const expected = {
                removeBasic: basicFilterWithValues,
                leaveBasic: basicFilterWithValuesSavedAndUnsaved,
                removeParent: {
                    ...parentChildFilterWithBothValuesSavedAndUnsaved,
                    parentValuesUnsaved: null,
                },
                removeChild: {
                    ...parentChildFilterWithBothValuesSavedAndUnsaved,
                    childValuesUnsaved: null,
                },
                leaveParentChild: parentChildFilterWithBothValuesSavedAndUnsaved,
            };

            const resetFilters = getResetFilters(setFilterState);
            resetFilters(["removeBasic", "removeParent_parent", "removeChild_child"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should CLEAR child filters if parent filter is RESET and has clearChildOnParentChange", () => {
            const initialState = {
                parentChildFilterWithBothValuesSavedAndUnsaved: {
                    ...parentChildFilterWithBothValuesSavedAndUnsaved,
                    clearChildOnParentChange: true,
                },
            };
            const [setFilterState, mockCallback] = getSetStateMock(initialState);
            const expected = {
                parentChildFilterWithBothValuesSavedAndUnsaved: {
                    ...parentChildFilterWithBothValues,
                    childValuesUnsaved: [],
                    clearChildOnParentChange: true,
                },
            };

            const resetFilters = getResetFilters(setFilterState);
            resetFilters(["parentChildFilterWithBothValuesSavedAndUnsaved_parent"]);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });
    });

    describe("getApplyFilters", () => {
        it("should save all unsaved values", () => {
            const initialState = {
                basicFilterWithNoValues,
                basicFilterWithValuesUnsaved,
                basicFilterWithValues,
                basicFilterWithValuesSavedAndUnsaved,

                parentChildFilterWithNoValues,
                parentChildFilterWithValuesUnsaved,
                parentChildFilterWithBothValues,
                parentChildFilterWithBothValuesSavedAndUnsaved,
            };

            const [setFilterState, mockCallback] = getSetStateMock(initialState);

            const expected = {
                basicFilterWithNoValues,
                basicFilterWithValuesUnsaved: {
                    ...basicFilterWithNoValues,
                    selectedValues: basicFilterWithValuesUnsaved.selectedValuesUnsaved,
                },
                basicFilterWithValues,
                basicFilterWithValuesSavedAndUnsaved: {
                    ...basicFilterWithNoValues,
                    selectedValues: basicFilterWithValuesUnsaved.selectedValuesUnsaved,
                },

                parentChildFilterWithNoValues,
                parentChildFilterWithValuesUnsaved: {
                    ...parentChildFilterWithNoValues,
                    parentValues: parentChildFilterWithValuesUnsaved.parentValuesUnsaved,
                    childValues: parentChildFilterWithValuesUnsaved.childValuesUnsaved,
                },
                parentChildFilterWithBothValues,
                parentChildFilterWithBothValuesSavedAndUnsaved: {
                    ...parentChildFilterWithNoValues,
                    parentValues: parentChildFilterWithValuesUnsaved.parentValuesUnsaved,
                    childValues: parentChildFilterWithValuesUnsaved.childValuesUnsaved,
                },
            };

            const applyFilters = getApplyFilters(setFilterState);
            applyFilters();

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });
    });

    describe("getUpdateFilters", () => {
        it("should update a basic filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithNoValues);
            const cardType = { ...basicFilterWithValues };
            delete cardType.selectedValuesUnsaved;
            const expected = {
                cardType,
                regionAndCountry: parentChildFilterWithNoValues,
            };

            const newValues = [{ label: "label", value: "value" }];
            const updateFilter = getUpdateFilter(setFilterState);
            updateFilter("cardType", newValues);

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should update a parent filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithNoValues);

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry: parentChildFilterWithOnlyParentValues,
            };

            const newValues = [{ label: "parentLabel", value: "parentValue" }];
            const updateFilter = getUpdateFilter(setFilterState);
            updateFilter("regionAndCountry", { parentValues: newValues });

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        it("should update a child filter", () => {
            const [setFilterState, mockCallback] = getSetStateMock(filterStateWithNoValues);

            const regionAndCountry = {
                ...parentChildFilterWithOnlyChildValues,
            };
            delete regionAndCountry.childValuesUnsaved;

            const expected = {
                cardType: basicFilterWithNoValues,
                regionAndCountry,
            };

            const newValues = [{ label: "childLabel", value: "childValue" }];
            const updateFilter = getUpdateFilter(setFilterState);
            updateFilter("regionAndCountry", { childValues: newValues });

            expect(mockCallback).toHaveBeenCalledWith(expected);
        });

        describe("unsaved", () => {
            const isUnsaved = true;
            it("should update an empty basic filter", () => {
                const [setFilterState, mockCallback] = getSetStateMock(filterStateWithNoValues);

                const expected = {
                    cardType: basicFilterWithValuesUnsaved,
                    regionAndCountry: parentChildFilterWithNoValues,
                };

                const newValues = [{ label: "labelUnsaved", value: "valueUnsaved" }];
                const updateFilter = getUpdateFilter(setFilterState);
                updateFilter("cardType", newValues, isUnsaved);

                expect(mockCallback).toHaveBeenCalledWith(expected);
            });

            it("should update an unsaved basic filter", () => {
                const [setFilterState, mockCallback] = getSetStateMock(filterStateWithValuesUnsaved);

                const expected = {
                    cardType: {
                        ...basicFilterWithValuesUnsaved,
                        selectedValuesUnsaved: [{ label: "newLabel", value: "newValue" }],
                    },
                    regionAndCountry: parentChildFilterWithBothValuesUnsaved,
                };

                const newValues = [{ label: "newLabel", value: "newValue" }];
                const updateFilter = getUpdateFilter(setFilterState);
                updateFilter("cardType", newValues, isUnsaved);

                expect(mockCallback).toHaveBeenCalledWith(expected);
            });

            it("should update an unsaved parent filter", () => {
                const [setFilterState, mockCallback] = getSetStateMock(filterStateWithValuesUnsaved);

                const expected = {
                    cardType: basicFilterWithValuesUnsaved,
                    regionAndCountry: {
                        ...parentChildFilterWithBothValuesUnsaved,
                        parentValuesUnsaved: [{ label: "newParentLabel", value: "newParentValue" }],
                    },
                };

                const newValues = [{ label: "newParentLabel", value: "newParentValue" }];
                const updateFilter = getUpdateFilter(setFilterState);
                updateFilter("regionAndCountry", { parentValues: newValues }, isUnsaved);

                expect(mockCallback).toHaveBeenCalledWith(expected);
            });

            it("should update an unsaved child filter", () => {
                const [setFilterState, mockCallback] = getSetStateMock(filterStateWithValuesUnsaved);

                const expected = {
                    cardType: basicFilterWithValuesUnsaved,
                    regionAndCountry: {
                        ...parentChildFilterWithBothValuesUnsaved,
                        childValuesUnsaved: [{ label: "newChildLabel", value: "newChildValue" }],
                    },
                };

                const newValues = [{ label: "newChildLabel", value: "newChildValue" }];
                const updateFilter = getUpdateFilter(setFilterState);
                updateFilter("regionAndCountry", { childValues: newValues }, isUnsaved);

                expect(mockCallback).toHaveBeenCalledWith(expected);
            });
        });
    });

    describe("getChildFilterQueryOptions", () => {
        it("should return query options without AFM for no selected parent values", () => {
            const filter = parentChildFilterWithNoValues;

            const expected = {
                limit: 50,
                offset: 0,
                filter: "",
            };

            const actual = getChildFilterQueryOptions(filter);

            expect(actual).toEqual(expected);
        });

        it("should return query options with the proper AFM for the selected parent values", () => {
            const filter = parentChildFilterWithOnlyParentValues;

            const expected = {
                limit: 50,
                offset: 0,
                filter: "",
                afm: {
                    attributes: [
                        { displayForm: { identifier: "label.child" }, localIdentifier: "childAttribute" },
                    ],
                    filters: [
                        {
                            expression: {
                                value:
                                    "({attr.parent} IN ([parentValue])) OVER {attr.ancestor} TO {attr.child}",
                            },
                        },
                    ],
                },
            };

            const actual = getChildFilterQueryOptions(filter);

            expect(actual).toEqual(expected);
        });
    });
});
