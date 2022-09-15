// (C) 2019-2020 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import { testingInterface } from "../../visualization/VisualizationWrapper";
import { BaseChart } from "@gooddata/react-components/dist/components/core/base/BaseChart";
import noop from "lodash/noop";
import { VisualizationObject } from "@gooddata/typings";

const { getPatchedBaseChartComponent, getPatchedSorts } = testingInterface;

const mdObjectWithOneMeasure: VisualizationObject.IVisualizationObjectContent = {
    buckets: [
        {
            localIdentifier: "measures",
            items: [
                {
                    measure: {
                        localIdentifier: "localIdentifier_m1",
                        definition: {
                            measureDefinition: {
                                item: {
                                    identifier: "m1",
                                },
                            },
                        },
                    },
                },
            ],
        },
    ],
    visualizationClass: { uri: "/VC" },
};

const mdObjectWithTwoMeasuresAndTwoAttributes: VisualizationObject.IVisualizationObjectContent = {
    buckets: [
        {
            localIdentifier: "attribute",
            items: [
                {
                    visualizationAttribute: {
                        localIdentifier: "localIdentifier_a1",
                        displayForm: {
                            identifier: "m1",
                        },
                    },
                },
            ],
        },
        {
            localIdentifier: "x",
            items: [
                {
                    measure: {
                        localIdentifier: "localIdentifier_m1",
                        definition: {
                            measureDefinition: {
                                item: {
                                    identifier: "m1",
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            localIdentifier: "y",
            items: [
                {
                    measure: {
                        localIdentifier: "localIdentifier_m2",
                        definition: {
                            measureDefinition: {
                                item: {
                                    identifier: "m1",
                                },
                            },
                        },
                    },
                },
            ],
        },
    ],
    visualizationClass: { uri: "/VC" },
};

describe("getPatchedBaseChartComponent", () => {
    it("should return a regular BaseChart component if no sortOverride is set", () => {
        const actual = getPatchedBaseChartComponent([]);
        expect(actual).toEqual(BaseChart);
    });
    it("should return a BaseChart with patched resultSpec", () => {
        const PatchedBaseChart = getPatchedBaseChartComponent([
            {
                sortByMeasureIndex: 0,
                direction: "desc",
            },
        ]);
        const wrapper = shallow(
            <PatchedBaseChart
                resultSpec={{ dimensions: [] }}
                config={{
                    // tslint:disable-next-line:no-object-literal-type-assertion
                    mdObject: mdObjectWithOneMeasure,
                }}
                type="column"
                updateTotals={noop}
                visualizationComponent={(() => null) as any}
                dataSource={{} as any}
            />,
        );
        const sorts = (wrapper.find("LoadingHOC").prop("resultSpec") as any).sorts;
        expect(sorts.length).toEqual(1);
        expect(sorts[0].measureSortItem.direction).toBe("desc");
        expect(sorts[0].measureSortItem.locators[0].measureLocatorItem.measureIdentifier).toBe(
            "localIdentifier_m1",
        );
    });
});

describe("getPatchedSorts", () => {
    it("should return measureSortItems for measures at specified indexes", () => {
        const actual = getPatchedSorts(mdObjectWithTwoMeasuresAndTwoAttributes, [
            { sortByMeasureIndex: 0, direction: "desc" },
            { sortByMeasureIndex: 1, direction: "asc" },
        ]);
        expect(actual[0]).toMatchObject({
            measureSortItem: {
                direction: "desc",
                locators: [
                    {
                        measureLocatorItem: {
                            measureIdentifier: "localIdentifier_m1",
                        },
                    },
                ],
            },
        });
        expect(actual[1]).toMatchObject({
            measureSortItem: {
                direction: "asc",
                locators: [
                    {
                        measureLocatorItem: {
                            measureIdentifier: "localIdentifier_m2",
                        },
                    },
                ],
            },
        });
    });
    it("should skip measures at indexes that are not available", () => {
        const actual = getPatchedSorts(mdObjectWithTwoMeasuresAndTwoAttributes, [
            { sortByMeasureIndex: 3, direction: "desc" },
        ]);
        expect(actual).toEqual([]);
    });
});
