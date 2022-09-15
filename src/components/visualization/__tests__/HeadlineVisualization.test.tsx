// (C) 2019 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import HeadlineVisualization, {
    IHeadlineVisualizationProps,
    getCustomHeadlineProps,
    CustomHeadlinePresentation,
    ICustomHeadlinePresentationProps,
} from "../HeadlineVisualization";
import { Execution } from "@gooddata/typings";
import CustomVisualization from "../CustomVisualization";
import CustomHeadline, { ICustomHeadlineProps } from "../CustomHeadline";

const mockResponses: Execution.IExecutionResponses = {
    executionResponse: {
        dimensions: [
            {
                headers: [
                    {
                        measureGroupHeader: {
                            items: [
                                {
                                    measureHeaderItem: {
                                        name: "Average Ticket Value (MO/TO) (latest) - BENCHMARK",
                                        format: "$#,##0.00",
                                        localIdentifier: "7815e5a505974bf39b51e030020ef475",
                                        uri: "/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/1458",
                                        identifier: "aajewyDkhPNu",
                                    },
                                },
                                {
                                    measureHeaderItem: {
                                        name: "Y-o-Y",
                                        format: "$#,##0.00",
                                        localIdentifier: "5d38c58514cd4c33996c5ee1cbf2aac8",
                                        uri: "/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/3217",
                                        identifier: "ae3NyMaUfAct",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        links: {
            executionResult:
                "/gdc/app/projects/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/executionResults/340732361787768768?c=66682d287672c7e0997563dfb83b731e&q=eAGlUF1PwjAU%2FSvNHQ%2BQbHSbIoY3NEaNARKCJsTw0G4XNmh3SdcCg%2By%2FW9Q%2FYHy75%2BZ85VzA4J6M%0AnQqNMIL3ypZWYQ4hZKScrmoYfa5C0GhNmV3BBdZktLCe3AnCIIj7cezZtdNamMZ%2FPfj28Of4gEZs%0AkC3KbIeWfQjlkHUns8Wsx7pKWKxtj0Xs4Wn6%2BDIZz9%2B89CfoNfdqvskzrnOuioGTFcrmdEypESo9%0AF2dZrE%2FJHanqMJSc5JYnt4N7aMO%2FtFtGFC3%2FEXmTJkNo%2FTiGjtdlfrs%2FG3J7WLVfmeVu7Q%3D%3D%0A&offset=0%2C0&limit=1000%2C1000&dimensions=1&totals=0",
        },
    },
    executionResult: {
        data: ["203.078314136126", "189.687993551359"],
        paging: {
            count: [2],
            offset: [0],
            total: [2],
        },
        headerItems: [
            [
                [
                    {
                        measureHeaderItem: {
                            name: "Average Ticket Value (MO/TO) (latest) - BENCHMARK",
                            order: 0,
                        },
                    },
                    {
                        measureHeaderItem: {
                            name: "Y-o-Y",
                            order: 1,
                        },
                    },
                ],
            ],
        ],
    },
};

describe("getCustomHeadlineProps", () => {
    it("should return headline props", () => {
        const result: Execution.IExecutionResult = {
            data: ["11.050536174533", "11.5454763732045"],
            paging: {
                count: [2],
                offset: [0],
                total: [2],
            },
            headerItems: [
                [
                    [
                        {
                            measureHeaderItem: {
                                name: "Gross Fraud BPS (CQ)",
                                order: 0,
                            },
                        },
                        {
                            measureHeaderItem: {
                                name: "QONQ",
                                order: 1,
                            },
                        },
                    ],
                ],
            ],
        };
        const response: Execution.IExecutionResponse = {
            dimensions: [
                {
                    headers: [
                        {
                            measureGroupHeader: {
                                items: [
                                    {
                                        measureHeaderItem: {
                                            name: "Gross Fraud BPS (CQ)",
                                            format: "#,##0.0",
                                            localIdentifier: "4257e7c7e3b647bba59543c96cd45a43",
                                            uri: "/gdc/md/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/obj/573",
                                            identifier: "ac3wFqWqcFGR",
                                        },
                                    },
                                    {
                                        measureHeaderItem: {
                                            name: "QONQ",
                                            format: "#,##0.0",
                                            localIdentifier: "95cd5f7947b1495ba7e518f503168b11",
                                            uri: "/gdc/md/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/obj/572",
                                            identifier: "abvoDRiaixaO",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
            links: {
                executionResult:
                    "/gdc/app/projects/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/executionResults/8230790349158579200?c=93eeb5719e02ee68725b387de392cf90&q=eAGlj8kOgkAQRH%2BFNBdNiIMLEDhqovGiEuPJcEAGDcsw2DPjEsO%2F2y4fYOKtq%2FulqusBmLcS9SoV%0AOUSwa3Sh65yDA5msjWgURPvEAZFrLLKXeMBRokg1wbZj2%2B7AJVYZIVK8047E24HGBUqlrDmmhlvT%0AzdbqzeI%2BnT9WS04EO%2FGMCc4qz0PlX%2FSo9NugvhcT11zEOTR1OwyD6tYweSiZF4yhc36Pj9er%2BK%2B4%0AEXTUHOX1Vfv7NnUyLSTdE%2FQbYrE%3D%0A&offset=0%2C0&limit=1000%2C1000&dimensions=1&totals=0",
            },
        };
        const actual = getCustomHeadlineProps(result, response);
        expect(actual).toEqual({
            currentValue: 11.050536174533,
            currentValueFormat: "#,##0.0",
            lastValue: 11.5454763732045,
            lastValueLabel: "QONQ",
        });
    });
    it("should handle a result with no data", () => {
        const result: Execution.IExecutionResult = {
            data: [],
            paging: {
                count: [0],
                offset: [0],
                total: [0],
            },
        };
        const response: Execution.IExecutionResponse = {
            dimensions: [
                {
                    headers: [
                        {
                            measureGroupHeader: {
                                items: [
                                    {
                                        measureHeaderItem: {
                                            name: "Gross Fraud BPS (CQ)",
                                            format: "#,##0.0",
                                            localIdentifier: "4257e7c7e3b647bba59543c96cd45a43",
                                            uri: "/gdc/md/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/obj/573",
                                            identifier: "ac3wFqWqcFGR",
                                        },
                                    },
                                    {
                                        measureHeaderItem: {
                                            name: "QONQ",
                                            format: "#,##0.0",
                                            localIdentifier: "95cd5f7947b1495ba7e518f503168b11",
                                            uri: "/gdc/md/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/obj/572",
                                            identifier: "abvoDRiaixaO",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
            links: {
                executionResult:
                    "/gdc/app/projects/k55rs6vt2j6p7lyi40uvmq9ulp197kxn/executionResults/8230790349158579200?c=93eeb5719e02ee68725b387de392cf90&q=eAGlj8kOgkAQRH%2BFNBdNiIMLEDhqovGiEuPJcEAGDcsw2DPjEsO%2F2y4fYOKtq%2FulqusBmLcS9SoV%0AOUSwa3Sh65yDA5msjWgURPvEAZFrLLKXeMBRokg1wbZj2%2B7AJVYZIVK8047E24HGBUqlrDmmhlvT%0AzdbqzeI%2BnT9WS04EO%2FGMCc4qz0PlX%2FSo9NugvhcT11zEOTR1OwyD6tYweSiZF4yhc36Pj9er%2BK%2B4%0AEXTUHOX1Vfv7NnUyLSTdE%2FQbYrE%3D%0A&offset=0%2C0&limit=1000%2C1000&dimensions=1&totals=0",
            },
        };
        const actual = getCustomHeadlineProps(result, response);
        expect(actual).toEqual({
            currentValue: null,
            currentValueFormat: "#,##0.0",
            lastValue: null,
            lastValueLabel: null,
        });
    });
});

describe("CustomHeadlinePresentation", () => {
    const sampleCustomHeadlinePresentationProps: ICustomHeadlinePresentationProps = {
        ...mockResponses,
        rateFormat: "0.00%",
    };
    it("should render CustomHeadline and pass it CustomHeadline props", () => {
        const wrapper = shallow(<CustomHeadlinePresentation {...sampleCustomHeadlinePresentationProps} />);
        const customHeadline = wrapper.find(CustomHeadline);
        expect(customHeadline).toExist();
        const expectedProps: ICustomHeadlineProps = {
            rateFormat: sampleCustomHeadlinePresentationProps.rateFormat,
            ...getCustomHeadlineProps(mockResponses.executionResult, mockResponses.executionResponse),
        };
        expect(customHeadline.props()).toMatchObject(expectedProps);
    });
});

describe("HeadlineVisualization", () => {
    const sampleHeadlineVisualizationProps: IHeadlineVisualizationProps = {
        header: "With proxy",
        textAlign: "center",
        rateFormat: "0.00%",
        projectId: "lh5ubnebyxw2oyal2zhzbhfx16olnv7b",
        identifier: "aaPjAL8jc0x4",
        withPeers: true,
        filters: [
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "label.ica.cid.name" },
                    in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/552/elements?id=5"],
                },
            },
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "label.ica.childicaid.icaname" },
                    in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/549/elements?id=10"],
                },
            },
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "label.country.country.name" },
                    in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/1439/elements?id=6"],
                },
            },
        ],
    };
    it(`should render CustomVisualization and pass it CustomHeadlinePresentation as a default for CommonPresentationOverride,
    pass rate format to visTypeSpecificProps.headline`, () => {
        const wrapper = shallow(
            <HeadlineVisualization {...sampleHeadlineVisualizationProps} rateFormat="0.0%" />,
        );
        const customVis = wrapper.find(CustomVisualization);
        expect(customVis).toExist();
        const expectedProps: IHeadlineVisualizationProps = {
            CommonPresentationOverride: CustomHeadlinePresentation,
            ...sampleHeadlineVisualizationProps,
            visTypeSpecificProps: {
                headline: {
                    rateFormat: "0.0%",
                },
            },
        };
        delete expectedProps.rateFormat;
        expect(customVis.props()).toMatchObject(expectedProps);
    });
});
