// (C) 2019 GoodData Corporation
import {
    getVisFilters,
    getAllFilters,
    getSampleVisualizationObjectWithFilters,
} from "../visualizationFilters";
import { INormalizedAttributeFilter } from "../../types";
import noop from "lodash/noop";
import { VisualizationObject } from "@gooddata/typings";

describe("getVisFilters", () => {
    it("should not include textFilter property", () => {
        const input: INormalizedAttributeFilter[] = [
            {
                displayFormIdentifier: "foo-bar",
                id: "foo",
                onChange: noop,
                selectedValues: [{ label: "label", value: "value" }],
                placeholder: "Foo",
            },
        ];
        const expected = [
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "foo-bar" },
                    in: ["value"],
                },
            },
        ];
        const actual = getVisFilters(input);
        expect(actual).toEqual(expected);
    });

    it("should not generate a filter if no values are selected", () => {
        const input: INormalizedAttributeFilter[] = [
            {
                displayFormIdentifier: "foo-bar",
                id: "foo",
                onChange: noop,
                selectedValues: [],
                placeholder: "Foo",
            },
        ];
        const expected = [];
        const actual = getVisFilters(input);
        expect(actual).toEqual(expected);
    });

    it("should not fail on an empty input", () => {
        const expected = [];
        const actual = getVisFilters([]);
        expect(actual).toEqual(expected);
    });
});

const samplePositiveAttributeFilters: VisualizationObject.VisualizationObjectFilter[] = [
    {
        positiveAttributeFilter: {
            displayForm: {
                identifier: "filter1",
            },
            in: ["/gdc/mc/projectId/obj/1"],
        },
    },
    {
        positiveAttributeFilter: {
            displayForm: {
                identifier: "emptyFilter2",
            },
            in: [],
        },
    },
];

const sampleNegativeAttributeFilters: VisualizationObject.VisualizationObjectFilter[] = [
    {
        negativeAttributeFilter: {
            displayForm: {
                identifier: "filter3",
            },
            notIn: ["/gdc/mc/projectId/obj/3"],
        },
    },
    {
        negativeAttributeFilter: {
            displayForm: {
                identifier: "emptyFilter2",
            },
            notIn: [],
        },
    },
];

const sampleDateFilter: VisualizationObject.IVisualizationObjectAbsoluteDateFilter = {
    absoluteDateFilter: {
        dataSet: {
            identifier: "dateIdentifier",
        },
        from: "2019-01-01",
        to: "2019-01-02",
    },
};

describe("getAllFilters", () => {
    it("should collect filters from visualizationObject and filters parameter that have values", () => {
        const actual = getAllFilters(
            getSampleVisualizationObjectWithFilters({ filters: samplePositiveAttributeFilters }),
            [...sampleNegativeAttributeFilters, sampleDateFilter],
        );
        const expected = [
            {
                positiveAttributeFilter: {
                    displayForm: {
                        identifier: "filter1",
                    },
                    in: ["/gdc/mc/projectId/obj/1"],
                },
            },
            {
                negativeAttributeFilter: {
                    displayForm: {
                        identifier: "filter3",
                    },
                    notIn: ["/gdc/mc/projectId/obj/3"],
                },
            },
            {
                absoluteDateFilter: {
                    dataSet: {
                        identifier: "dateIdentifier",
                    },
                    from: "2019-01-01",
                    to: "2019-01-02",
                },
            },
        ];
        expect(actual).toEqual(expected);
    });
});
