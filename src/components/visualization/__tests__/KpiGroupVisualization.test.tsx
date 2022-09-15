// (C) 2019 GoodData Corporation
import React from "react";
import { mount, shallow } from "enzyme";
import CustomVisualization, { ICommonPresentationOverrideProps } from "../CustomVisualization";
import { Execution } from "@gooddata/typings";
import KpiGroupVisualization, {
    KpiGroupPresentation,
    getKpiPropsFromExecution,
    IKpiGroupVisualizationProps,
} from "../KpiGroupVisualization";
import KpiGroup from "../KpiGroup";
import Typography from "../../utils/Typography";

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

describe("getKpiPropsFromExecution", () => {
    it("should render a list of Kpi components", () => {
        const actual = getKpiPropsFromExecution(
            mockResponses.executionResponse,
            mockResponses.executionResult,
        );
        const firstKpi = actual[0];
        const beforeContentWrapper = mount(<span>{firstKpi.beforeContent}</span>);
        expect(beforeContentWrapper.find(Typography)).toExist();
        expect(beforeContentWrapper.text()).toBe("Average Ticket Value (MO/TO) (latest) - BENCHMARK");
        expect(firstKpi).toMatchObject({
            format: "$#,##0.00",
            responsive: true,
            value: 2,
        });

        const otherKpi = actual[1];
        const afterContentWrapper = mount(<span>{otherKpi.afterContent}</span>);
        expect(afterContentWrapper.find(Typography)).toExist();
        expect(afterContentWrapper.text()).toBe(" Y-o-Y");
        expect(otherKpi).toMatchObject({
            format: "$#,##0.00",
            value: 1,
        });
    });
});

const redactKpis = (kpis) => {
    return kpis.map((kpi) => {
        const redactedKpi = {
            ...kpi,
        };
        delete redactedKpi.afterContent;
        delete redactedKpi.beforeContent;
        return redactedKpi;
    });
};

describe("KpiGroupPresentation", () => {
    const sampleKpiGroupPresentationProps: ICommonPresentationOverrideProps = {
        ...mockResponses,
    };
    it("should render a list of Kpi components", () => {
        const wrapper = mount(<KpiGroupPresentation {...sampleKpiGroupPresentationProps} />);
        const kpiGroupElement = wrapper.find(KpiGroup);
        expect(redactKpis(kpiGroupElement.prop("kpis"))).toEqual(
            redactKpis(
                getKpiPropsFromExecution(mockResponses.executionResponse, mockResponses.executionResult),
            ),
        );
    });
});

describe("KpiGroupVisualization", () => {
    const sampleKpiGroupPresentationProps: IKpiGroupVisualizationProps = {
        height: 100,
        projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
        filters: [
            {
                positiveAttributeFilter: {
                    displayForm: { identifier: "label.ica.cid.name" },
                    in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/552/elements?id=5"],
                },
            },
        ],
        identifier: "acbQzIknf6X7",
        withPeers: true,
    };
    it("should render a list of Kpi components", () => {
        const wrapper = shallow(<KpiGroupVisualization {...sampleKpiGroupPresentationProps} />);
        const customVisualizationElement = wrapper.find(CustomVisualization);
        expect(customVisualizationElement).toExist();
        expect(customVisualizationElement.props()).toEqual({
            projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
            filters: [
                {
                    positiveAttributeFilter: {
                        displayForm: { identifier: "label.ica.cid.name" },
                        in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/552/elements?id=5"],
                    },
                },
            ],
            identifier: "acbQzIknf6X7",
            withPeers: true,
            CommonPresentationOverride: KpiGroupPresentation,
        });
    });
});
