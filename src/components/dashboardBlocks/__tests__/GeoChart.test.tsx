// (C) 2019 GoodData Corporation
import React from "react";
import { VisualizationObject, Execution } from "@gooddata/typings";
import { shallow, mount } from "enzyme";
import { testingInterface } from "../GeoChart";
import { getSampleVisualizationObjectWithFilters } from "../../../utils/visualizationFilters";
import NoDataError from "../../utils/NoDataError";

const {
    getDimensions,
    getAllFilters,
    getMapProps,
    GeoChartExecution,
    geoChartExecutionRenderProp,
    GeoChart,
} = testingInterface;

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

describe("getDimensions", () => {
    it("should return dimensions with attributes on first and measures on second dimension", () => {
        const actual = getDimensions(getSampleVisualizationObjectWithFilters());
        const expected = [
            [
                {
                    visualizationAttribute: {
                        displayForm: { identifier: "a1Identifier" },
                        localIdentifier: "a1",
                        title: "Attribute 1",
                    },
                },
            ],
            [
                {
                    measure: {
                        definition: { measureDefinition: { item: { identifier: "m1Identifier" } } },
                        localIdentifier: "m1",
                        title: "Measure 1",
                    },
                },
            ],
        ];
        expect(actual).toEqual(expected);
    });
    it("should return null if no visualizationObject is available", () => {
        const actual = getDimensions(null);
        const expected = null;
        expect(actual).toEqual(expected);
    });
});

describe("GeoChartExecution", () => {
    const visualizationObject = getSampleVisualizationObjectWithFilters({
        filters: sampleNegativeAttributeFilters,
    });
    const filters = [];
    const projectId = "projectId";

    const createGeoChartExecution = (customProps = {}) => {
        const props = {
            visualizationObject,
            filters,
            projectId,
            ...customProps,
        };
        return <GeoChartExecution {...props} />;
    };

    it("should render a BucketExecutor autoLoadFirstPage, dimensions and filters props", () => {
        const wrapper = shallow(createGeoChartExecution());
        expect(wrapper.find("BucketExecutor").props()).toMatchObject({
            autoLoadFirstPage: true,
            dimensions: getDimensions(visualizationObject),
            filters: getAllFilters(visualizationObject, filters),
        });
    });
});

describe("geoChartExecutionRenderProp", () => {
    const resultWithNoData: Execution.IExecutionResult = {
        data: [],
        paging: {
            count: [],
            offset: [],
            total: [],
        },
    };
    const resultWithInvalidData: Execution.IExecutionResult = {
        data: [[1, null]],
        headerItems: [
            [
                [
                    {
                        attributeHeaderItem: {
                            name: "INVALID_COUNTRY_CODE",
                            uri: "/gdc/md/projectId/obj/1",
                        },
                    },
                    {
                        attributeHeaderItem: {
                            name: "CZ",
                            uri: "/gdc/md/projectId/obj/2",
                        },
                    },
                ],
            ],
        ],
        paging: {
            count: [],
            offset: [],
            total: [],
        },
    };

    const resultWithValidData: Execution.IExecutionResult = {
        data: [[1]],
        headerItems: [
            [
                [
                    {
                        attributeHeaderItem: {
                            name: "CZ",
                            uri: "/gdc/md/projectId/obj/1",
                        },
                    },
                ],
            ],
            [
                [
                    {
                        measureHeaderItem: {
                            name: "Measure",
                            order: 0,
                        },
                    },
                ],
            ],
        ],
        paging: {
            count: [],
            offset: [],
            total: [],
        },
    };

    const resultWithValidDataAndDescription: Execution.IExecutionResult = {
        data: [[1]],
        headerItems: [
            [
                [
                    {
                        attributeHeaderItem: {
                            name: "CZ",
                            uri: "/gdc/md/projectId/obj/1",
                        },
                    },
                ],
                [
                    {
                        attributeHeaderItem: {
                            name: "Czechia",
                            uri: "/gdc/md/projectId/obj/2",
                        },
                    },
                ],
            ],
            [
                [
                    {
                        measureHeaderItem: {
                            name: "Measure",
                            order: 0,
                        },
                    },
                ],
            ],
        ],
        paging: {
            count: [],
            offset: [],
            total: [],
        },
    };

    const sampleResult: Execution.IExecutionResponse = {
        dimensions: [
            {
                headers: [
                    {
                        attributeHeader: {
                            name: "Country Code",
                            localIdentifier: "countryCode",
                            uri: "/gdc/md/projectId/obj/1237",
                            identifier: "dfIdentifier",
                            formOf: {
                                name: "Country Code",
                                uri: "/gdc/md/projectId/obj/1236",
                                identifier: "attrIdentifier",
                            },
                        },
                    },
                ],
            },
            {
                headers: [
                    {
                        measureGroupHeader: {
                            items: [
                                {
                                    measureHeaderItem: {
                                        name: "Measure",
                                        format: "#,##0.0 %",
                                        localIdentifier: "measureLocalIdentifier",
                                        uri: "/gdc/md/projectId/obj/819",
                                        identifier: "measureIdentifier",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        links: {
            executionResult: "resultLink...",
        },
    };

    const sampleResultWithDescription: Execution.IExecutionResponse = {
        dimensions: [
            {
                headers: [
                    {
                        attributeHeader: {
                            name: "Country Code",
                            localIdentifier: "countryCode",
                            uri: "/gdc/md/projectId/obj/1237",
                            identifier: "dfIdentifier",
                            formOf: {
                                name: "Country Code",
                                uri: "/gdc/md/projectId/obj/1236",
                                identifier: "attrIdentifier",
                            },
                        },
                    },
                    {
                        attributeHeader: {
                            name: "Country",
                            localIdentifier: "country",
                            uri: "/gdc/md/projectId/obj/1239",
                            identifier: "countryDfIdentifier",
                            formOf: {
                                name: "Country",
                                uri: "/gdc/md/projectId/obj/1238",
                                identifier: "countryAttrIdentifier",
                            },
                        },
                    },
                ],
            },
            {
                headers: [
                    {
                        measureGroupHeader: {
                            items: [
                                {
                                    measureHeaderItem: {
                                        name: "Measure",
                                        format: "#,##0.0 %",
                                        localIdentifier: "measureLocalIdentifier",
                                        uri: "/gdc/md/projectId/obj/819",
                                        identifier: "measureIdentifier",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        links: {
            executionResult: "resultLink...",
        },
    };

    it("should render an ErrorComponent when no data is returned in result", () => {
        const wrapper = shallow(
            <div>{geoChartExecutionRenderProp({ result: resultWithNoData, response: sampleResult })}</div>,
        );
        expect(wrapper.find(NoDataError).exists()).toBe(true);
    });
    it("should render an ErrorComponent when data doesn't match any country codes", () => {
        const wrapper = shallow(
            <div>
                {geoChartExecutionRenderProp({
                    result: resultWithInvalidData,
                    response: sampleResult,
                })}
            </div>,
        );
        expect(wrapper.find(NoDataError).exists()).toBe(true);
    });
    it("should render a Map component with countryData", () => {
        const wrapper = shallow(
            <div>{geoChartExecutionRenderProp({ result: resultWithValidData, response: sampleResult })}</div>,
        );
        expect(wrapper.find("Map").exists()).toBe(true);
        expect(wrapper.find("Map").props()).toEqual({
            data: { CZ: 1 },
            tooltipData: {
                CZ: [
                    ["Country Code", "CZ"],
                    ["Measure", "100.0 %"],
                ],
            },
            measureFormat: "#,##0.0 %",
        });
    });

    describe("getMapProps", () => {
        it("should return data and tooltipData if extra description attribute is NOT available", () => {
            const actual = getMapProps(resultWithValidData, sampleResult);
            const expected = {
                data: { CZ: 1 },
                tooltipData: {
                    CZ: [
                        ["Country Code", "CZ"],
                        ["Measure", "100.0 %"],
                    ],
                },
                measureFormat: "#,##0.0 %",
            };
            expect(actual).toEqual(expected);
        });
        it("should return data and tooltipData if extra description attribute IS available", () => {
            const actual = getMapProps(resultWithValidDataAndDescription, sampleResultWithDescription);
            const expected = {
                data: { CZ: 1 },
                tooltipData: {
                    CZ: [
                        ["Country", "Czechia"],
                        ["Measure", "100.0 %"],
                    ],
                },
                measureFormat: "#,##0.0 %",
            };
            expect(actual).toEqual(expected);
        });
        it("should skip invalid data", () => {
            const actual = getMapProps(resultWithInvalidData, sampleResult);
            const expected = {
                data: {},
                tooltipData: {},
            };
            expect(actual).toEqual(expected);
        });
    });
});

const delay = (delayTime = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delayTime);
    });
};

describe("GeoChart", () => {
    const createGeoChart = (customProps = {}) => {
        const props = {
            projectId: "projectId",
            identifier: "savedVisualizationIdentifier",
            ...customProps,
        };
        return <GeoChart {...props} />;
    };

    it("should load a visualizationObject and render a GeoChartExecution", async () => {
        const sampleVisualizationObject = getSampleVisualizationObjectWithFilters();
        const mockXhrGet = jest.fn(() => {
            return Promise.resolve({
                data: {
                    visualizationObject: sampleVisualizationObject,
                },
            });
        });
        const mockGetUrisFromIdentifiers = jest.fn(() => {
            return Promise.resolve([{ uri: "/gdc/md/projectId/obj/1" }]);
        });
        const mockSDK = {
            xhr: {
                get: mockXhrGet,
            },
            md: {
                getUrisFromIdentifiers: mockGetUrisFromIdentifiers,
            },
        };
        const wrapper = mount(createGeoChart({ sdk: mockSDK }));
        expect(wrapper.find(".s-visualization").exists()).toBe(true);
        expect(wrapper.find("CustomLoading").exists()).toBe(true);
        expect(mockGetUrisFromIdentifiers).toBeCalledWith("projectId", ["savedVisualizationIdentifier"]);
        await delay(0); // This simply has to be here, otherwise mockXhrGet is not called yet. wrapper.update() does not help.
        expect(mockXhrGet).toBeCalledWith("/gdc/md/projectId/obj/1");
        wrapper.update(); // This is also required, otherwise GeoChartExecution is not rendered
        expect(wrapper.find("GeoChartExecution").exists()).toBe(true);
        expect(wrapper.find("GeoChartExecution").props()).toMatchObject({
            visualizationObject: sampleVisualizationObject,
            filters: [],
            projectId: "projectId",
        });
    });
    it("should render a Tooltip when hover over a country with data", async () => {
        const sampleVisualizationObject = getSampleVisualizationObjectWithFilters();
        const mockXhrGet = () => {
            return Promise.resolve({
                data: {
                    visualizationObject: sampleVisualizationObject,
                },
            });
        };
        const mockGetUrisFromIdentifiers = () => {
            return Promise.resolve([{ uri: "/gdc/md/projectId/obj/1" }]);
        };
        const mockSDK = {
            xhr: {
                get: mockXhrGet,
            },
            md: {
                getUrisFromIdentifiers: mockGetUrisFromIdentifiers,
            },
        };
        const wrapper = mount(createGeoChart({ sdk: mockSDK }));
        await delay(0); // This simply has to be here, otherwise mockXhrGet is not called yet. wrapper.update() does not help.
        wrapper.update(); // This is also required, otherwise GeoChartExecution is not rendered
        expect(wrapper.find("GeoChartExecution").exists()).toBe(true);
        wrapper.find(".s-CZ");
    });
});
