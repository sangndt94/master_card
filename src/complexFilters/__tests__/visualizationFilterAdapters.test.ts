// (C) 2019-2020 GoodData Corporation
import {
    validateFilterType,
    getVisualizationFilterContext,
    getPositiveAttributeFilter,
    getNegativeAttributeFilter,
    getVisualizationFilter,
} from "../visualizationFilterAdapters";
import { initializeFilter } from "../filterUtils";

const sampleFilterDefinition = {
    id: "a",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.customer.cid.name",
    label: "CID",
};

const sampleFilterState = initializeFilter(sampleFilterDefinition);

describe("validateFilterType", () => {
    it("should do nothing if the filter type matches expected type", () => {
        expect(() => validateFilterType(sampleFilterState, "positiveAttributeFilter")).not.toThrow();
    });
    it("should throw an error if the types do not match", () => {
        expect(() => validateFilterType(sampleFilterState, "negativeAttributeFilter")).toThrow();
    });
});

describe("getVisualizationFilterContext", () => {
    it("should return an empty string if there are no selectedElementsApplied", () => {
        const actual = getVisualizationFilterContext(sampleFilterState);
        expect(actual).toBe("");
    });
    it("should return a context string for creating a visualization filter if there are some selectedElementsApplied", () => {
        const actual = getVisualizationFilterContext({ ...sampleFilterState, selectedItemsApplied: ["123"] });
        expect(actual).toBe(
            '{"attributeDisplayFormIdentifier":"label.customer.cid.name","filterType":"positiveAttributeFilter","projectId":"hwmgtf5okuxmaj4dis462nmhc0i18rkg","selectedItemsApplied":["123"]}',
        );
    });
});

describe("getPositiveAttributeFilter", () => {
    it("should return a positiveAttributeFilter", () => {
        const actual = getPositiveAttributeFilter(
            { ...sampleFilterState, selectedItemsApplied: ["123"], filterType: "positiveAttributeFilter" },
            true,
        );
        expect(actual).toEqual({
            positiveAttributeFilter: {
                displayForm: {
                    identifier: "label.customer.cid.name",
                },
                in: ["123"],
                textFilter: true,
            },
        });
    });
    it("should throw an error if the filterType does not match", () => {
        expect(() =>
            getPositiveAttributeFilter(
                {
                    ...sampleFilterState,
                    selectedItemsApplied: ["123"],
                    filterType: "negativeAttributeFilter",
                },
                true,
            ),
        ).toThrow();
    });
});

describe("getNegativeAttributeFilter", () => {
    it("should return a negativeAttributeFilter", () => {
        const actual = getNegativeAttributeFilter(
            { ...sampleFilterState, selectedItemsApplied: ["123"], filterType: "negativeAttributeFilter" },
            true,
        );
        expect(actual).toEqual({
            negativeAttributeFilter: {
                displayForm: {
                    identifier: "label.customer.cid.name",
                },
                notIn: ["123"],
                textFilter: true,
            },
        });
    });
    it("should throw an error if the filterType does not match", () => {
        expect(() =>
            getNegativeAttributeFilter(
                {
                    ...sampleFilterState,
                    selectedItemsApplied: ["123"],
                    filterType: "positiveAttributeFilter",
                },
                true,
            ),
        ).toThrow();
    });
});

describe("getVisualizationFilter", () => {
    it("should return a filter based on filterType", () => {
        const actual = getVisualizationFilter(
            { ...sampleFilterState, selectedItemsApplied: ["123"], filterType: "positiveAttributeFilter" },
            true,
        );
        expect(actual).toEqual({
            positiveAttributeFilter: {
                displayForm: {
                    identifier: "label.customer.cid.name",
                },
                in: ["123"],
                textFilter: true,
            },
        });
    });
    it("should throw an error if the filterType is not supported", () => {
        expect(() =>
            getVisualizationFilter(
                {
                    ...sampleFilterState,
                    selectedItemsApplied: ["123"],
                    filterType: "absoluteDateFilter",
                },
                true,
            ),
        ).toThrow();
    });
});
