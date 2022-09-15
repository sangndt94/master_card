// (C) 2019 GoodData Corporation
import React from "react";
import { shallow, mount } from "enzyme";
import { Execution } from "@gooddata/typings";
import CustomVisualization, {
    ICommonExecutionOverrideProps,
    DefaultCommonPresentationOverride,
    DefaultCommonExecutionOverride,
    ICommonPresentationOverrideProps,
    ICustomVisualizationProps,
    getOverrideComponents,
} from "../CustomVisualization";
import defaultSdk from "../../../sdk";
import StateWrapper from "../../utils/StateWrapper";
import CustomError from "../../utils/CustomError";
import BlockContent from "../../dashboardBlocks/BlockContent";
import { Visualization } from "@gooddata/react-components";
import SmallError from "../../utils/SmallError";
import CustomLoading from "../../utils/CustomLoading";

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

const getMockDataSource = (mockGetDataResponse: Execution.IExecutionResponses = mockResponses) => {
    return ({
        getData: jest.fn(() => {
            const dataPromise = new Promise((resolve) => {
                resolve(mockGetDataResponse);
            });
            return dataPromise;
        }),
    } as unknown) as any;
};

describe("DefaultCommonExecutionOverride", () => {
    const sampleCommonExecutionOverrideProps: ICommonExecutionOverrideProps = {
        resultSpec: { dimensions: [] },
        CommonPresentationOverride: DefaultCommonPresentationOverride,
        visType: "headline",
    };
    it("should call a dataSource.getData, render a StateWrapper with a CommonPresentationOverride and pass it execution data", (done) => {
        let getDataPromise: Promise<any>;
        const props: ICommonExecutionOverrideProps = {
            ...sampleCommonExecutionOverrideProps,
            dataSource: ({
                getData: jest.fn(() => {
                    const dataPromise = new Promise((resolve) => {
                        resolve(mockResponses);
                    });
                    getDataPromise = dataPromise;
                    return dataPromise;
                }),
            } as unknown) as any,
        };
        const wrapper = mount(<DefaultCommonExecutionOverride {...props} />);

        getDataPromise.then(() => {
            wrapper.update();
            expect(props.dataSource.getData).toHaveBeenLastCalledWith(props.resultSpec);

            const stateWrapper = wrapper.find(StateWrapper);
            expect(stateWrapper).toExist();
            expect(stateWrapper.prop("value")).toMatchObject({
                ...mockResponses,
            });

            const presentationOverride = wrapper.find(DefaultCommonPresentationOverride);
            expect(presentationOverride).toExist();
            const expectedProps: ICommonPresentationOverrideProps = {
                ...mockResponses,
                visType: "headline",
            };
            expect(presentationOverride.props()).toMatchObject(expectedProps);
            done();
        });
    });
});

describe("getOverrideComponents", () => {
    const visTypeSpecificProps: ICustomVisualizationProps["visTypeSpecificProps"] = {
        headline: { visTypeSpecificProp: "headline" },
        column: { visTypeSpecificProp: "column" },
    };
    const CommonExecutionOverride = DefaultCommonExecutionOverride;
    const CommonPresentationOverride = DefaultCommonPresentationOverride;
    const header = "header";
    const actual = getOverrideComponents(
        visTypeSpecificProps,
        CommonExecutionOverride,
        CommonPresentationOverride,
        header,
    );
    const { HeadlineComponent, PivotTableComponent, XirrComponent, BaseChartComponent } = actual;

    it("should return HeadlineComponent based on CommonExecutionOverride and pass it props", () => {
        const dataSource = getMockDataSource();
        const componentWrapper = shallow(<HeadlineComponent dataSource={dataSource} />);
        expect(componentWrapper.find(CommonExecutionOverride)).toExist();
        expect(componentWrapper.find(CommonExecutionOverride).props()).toMatchObject({
            dataSource,
            visType: "headline",
            CommonPresentationOverride,
            visTypeSpecificProp: "headline",
        });
    });
    it("should return PivotTableComponent that renders a CustomError", () => {
        const componentWrapper = shallow(<PivotTableComponent />);
        expect(componentWrapper.find(CustomError)).toExist();
    });
    it("should return XirrComponent that renders a CustomError", () => {
        const componentWrapper = shallow(<XirrComponent />);
        expect(componentWrapper.find(CustomError)).toExist();
    });
    it("should return BaseChartComponent based on CommonExecutionOverride and pass it props", () => {
        const dataSource = getMockDataSource();
        const componentWrapper = shallow(<BaseChartComponent type="column" dataSource={dataSource} />);
        expect(componentWrapper.find(CommonExecutionOverride)).toExist();
        expect(componentWrapper.find(CommonExecutionOverride).props()).toMatchObject({
            dataSource,
            visType: "column",
            CommonPresentationOverride,
            visTypeSpecificProp: "column",
        });
    });
});

describe("CustomVisualization", () => {
    const sampleCustomVisualizationProps: ICustomVisualizationProps = {
        className: "wrapper",
        header: "header",
        projectId: "lh5ubnebyxw2oyal2zhzbhfx16olnv7b",
        identifier: "aaPjAL8jc0x4",
        sdk: defaultSdk,
        filters: [
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "label.ica.cid.name" },
                    in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/552/elements?id=5"],
                },
            },
        ],
        ErrorComponent: SmallError,
        LoadingComponent: CustomLoading,
        CommonPresentationOverride: DefaultCommonPresentationOverride,
        withPeers: true,
        visTypeSpecificProps: { headline: { visTypeSpecifiProp: "headline" } },
    };
    it("should render a wrapper, a BlockContent and a Visualization with correct props", () => {
        const wrapper = shallow(<CustomVisualization {...sampleCustomVisualizationProps} />);
        expect(wrapper.find("div.wrapper")).toExist();
        expect(wrapper.find(BlockContent)).toExist();
        expect(wrapper.find(BlockContent).prop("header")).toBe("header");
        const vis = wrapper.find(Visualization);
        expect(vis).toExist();
        expect(vis.props()).toMatchObject({
            projectId: "lh5ubnebyxw2oyal2zhzbhfx16olnv7b",
            identifier: "aaPjAL8jc0x4",
            sdk: defaultSdk,
            ErrorComponent: SmallError,
            LoadingComponent: CustomLoading,
            filters: sampleCustomVisualizationProps.filters,
            experimentalVisExecution: sampleCustomVisualizationProps.withPeers,
        });
        expect(vis.prop("BaseChartComponent")).toBeDefined();
        expect(vis.prop("HeadlineComponent")).toBeDefined();
        expect(vis.prop("PivotTableComponent")).toBeDefined();
        expect(vis.prop("XirrComponent")).toBeDefined();
    });
});
