// (C) 2019-2020 GoodData Corporation
import React, { useEffect } from "react";
import createUseFilters from "../createUseFilters";
import { mount } from "enzyme";
import { IValidElementsResponse } from "@gooddata/gooddata-js";

// tslint:disable-next-line: no-var-requires
const filterElements = require("../filterElements");

jest.mock("../filterElements", () => {
    const actualFilterElements = jest.requireActual("../filterElements");
    const originalImplementation = actualFilterElements;
    return {
        ...actualFilterElements,
        getCachedElements: jest.fn().mockImplementation(originalImplementation.getCachedElements),
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

const sampleFilterDefinition = {
    id: "cid",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.customer.cid.name",
    label: "CID",
};

describe("createUseFilters", () => {
    describe("useFiltersState", () => {
        it("should return a filtersState of selected filter ids", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: sampleFilterDefinition,
            });
            const MockComponent = () => {
                const { filtersState } = useFiltersState(["cid"]);
                expect(filtersState).toEqual([
                    {
                        attributeDisplayFormIdentifier: "label.customer.cid.name",
                        defaultFilterType: "positiveAttributeFilter",
                        error: undefined,
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
                    },
                ]);
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
        it("should return allFiltersReady: true if no filters are pending selected items or dependencies", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: sampleFilterDefinition,
            });
            const MockComponent = () => {
                const { areAppliedFiltersReady } = useFiltersState(["cid"]);
                expect(areAppliedFiltersReady).toBe(true);
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
        it("should return allFiltersReady: false if some filters are pending selected items or dependencies", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, autoSelect: { index: 0 } },
            });
            const MockComponent = () => {
                const { areAppliedFiltersReady } = useFiltersState(["cid"]);
                expect(areAppliedFiltersReady).toBe(false);
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
        it("should return clearFilters that clears selectedItemsApplied when called", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, selectedItems: ["123"], selectedItemsApplied: ["123"] },
            });
            const filtersStateSpy = jest.fn();
            const MockComponent = () => {
                const { filtersState, clearFilters } = useFiltersState(["cid"]);

                filtersStateSpy(filtersState);
                return <button onClick={() => clearFilters()} />;
            };
            const wrapper = mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                    selectedItems: ["123"],
                    selectedItemsApplied: ["123"],
                },
            ]);
            wrapper.find("button").simulate("click");
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                },
            ]);
        });
        it("should return applyFilters that applies selectedItems to selectedItemsApplied when called", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, selectedItems: ["123"] },
            });
            const filtersStateSpy = jest.fn();
            const MockComponent = () => {
                const { filtersState, applyFilters } = useFiltersState(["cid"]);

                filtersStateSpy(filtersState);
                return <button onClick={() => applyFilters()} />;
            };
            const wrapper = mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                    selectedItems: ["123"],
                    selectedItemsApplied: [],
                },
            ]);
            wrapper.find("button").simulate("click");
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                    selectedItems: ["123"],
                    selectedItemsApplied: ["123"],
                },
            ]);
        });
        it("should return resetFilters that resets selectedItemsApplied to selectedItems when called", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, selectedItems: ["123"], selectedItemsApplied: ["456"] },
            });
            const filtersStateSpy = jest.fn();
            const MockComponent = () => {
                const { filtersState, resetFilters } = useFiltersState(["cid"]);

                filtersStateSpy(filtersState);
                return <button onClick={() => resetFilters()} />;
            };
            const wrapper = mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                    selectedItems: ["123"],
                    selectedItemsApplied: ["456"],
                },
            ]);
            wrapper.find("button").simulate("click");
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                    selectedItems: ["456"],
                    selectedItemsApplied: ["456"],
                },
            ]);
        });
        it("should return updateFilterError that updates filter error when called", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: sampleFilterDefinition,
            });
            const filtersStateSpy = jest.fn();
            const simulatedError = new Error("simulated error");
            const MockComponent = () => {
                const { filtersState, updateFilterError } = useFiltersState(["cid"]);

                filtersStateSpy(filtersState);
                return <button onClick={() => updateFilterError("cid", simulatedError)} />;
            };
            const wrapper = mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
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
                },
            ]);
            wrapper.find("button").simulate("click");
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    defaultFilterType: "positiveAttributeFilter",
                    error: simulatedError,
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
                },
            ]);
        });
        it("should return updateFilterSelectedItems that updates selectedItems and updates pending states when called", () => {
            const { useFiltersState, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, autoSelect: { index: 0 } },
            });
            const filtersStateSpy = jest.fn();
            const MockComponent = () => {
                const { filtersState, updateFilterSelectedItems } = useFiltersState(["cid"]);

                filtersStateSpy(filtersState);
                return <button onClick={() => updateFilterSelectedItems("cid", () => ["123"])} />;
            };
            const wrapper = mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    autoSelect: { index: 0 },
                    defaultFilterType: "positiveAttributeFilter",
                    error: undefined,
                    filterType: "positiveAttributeFilter",
                    id: "cid",
                    isMultiSelect: false,
                    isPendingDependency: false,
                    isPendingSelectedElements: true,
                    label: "CID",
                    placeholder: "All",
                    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                    restrictedByFilterIds: [],
                    restrictedByMeasureIdentifiers: [],
                    selectedItems: [],
                    selectedItemsApplied: [],
                },
            ]);
            wrapper.find("button").simulate("click");
            expect(filtersStateSpy).toHaveBeenLastCalledWith([
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    autoSelect: { index: 0 },
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
                    selectedItems: ["123"],
                    selectedItemsApplied: ["123"],
                },
            ]);
        });
    });
    describe("useFilterElements", () => {
        it("should return a getFilterElements function that calls getCachedElements when called and returns a promise with validElementsResponse", (done) => {
            const mockValidElements: IValidElementsResponse = {
                validElements: {
                    items: [{ element: { title: "test", uri: "/test" } }],
                    paging: { count: 1, offset: "0", total: "1" },
                    elementsMeta: {
                        attribute: "test",
                        attributeDisplayForm: "test",
                        filter: "",
                        order: "asc",
                    },
                },
            };
            const mockElementsPromise = Promise.resolve(mockValidElements);
            filterElements.getCachedElements.mockReturnValueOnce(mockElementsPromise);
            const { useFilterElements, FilterStateProvider } = createUseFilters({
                cid: sampleFilterDefinition,
            });
            const MockComponent = () => {
                const { getFilterElements } = useFilterElements("cid");
                useEffect(() => {
                    getFilterElements(0, 1, undefined).then((data) => {
                        expect(data).toBe(mockValidElements);
                        done();
                    });
                }, []);
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
        it("should return the filterElements context", (done) => {
            const { useFilterElements, FilterStateProvider } = createUseFilters({
                cid: sampleFilterDefinition,
            });
            const MockComponent = () => {
                const { filterElementsContext } = useFilterElements("cid");
                expect(filterElementsContext).toEqual(
                    '{"filter":{"attributeDisplayFormIdentifier":"label.customer.cid.name","projectId":"hwmgtf5okuxmaj4dis462nmhc0i18rkg","restrictedByMeasureIdentifiers":[]}}',
                );
                done();
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
    });
    describe("useVisualizationFilters", () => {
        it("should return visualization filters for selected filter ids and areAppliedFiltersReady", () => {
            const { useVisualizationFilters, FilterStateProvider } = createUseFilters({
                cid: { ...sampleFilterDefinition, selectedItems: ["123"], selectedItemsApplied: ["123"] },
            });
            const MockComponent = () => {
                const { areAppliedFiltersReady, visualizationFilters } = useVisualizationFilters(["cid"]);
                expect(areAppliedFiltersReady).toBe(true);
                expect(visualizationFilters).toEqual([
                    {
                        positiveAttributeFilter: {
                            displayForm: {
                                identifier: "label.customer.cid.name",
                            },
                            in: ["123"],
                            textFilter: true,
                        },
                    },
                ]);
                return <div />;
            };
            mount(
                <FilterStateProvider>
                    <MockComponent />
                </FilterStateProvider>,
            );
        });
    });
});
