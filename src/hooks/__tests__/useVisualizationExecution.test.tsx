// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { delay } from "../../utils/helpers";
import StateWrapper from "../../components/utils/StateWrapper";
import { Execution } from "@gooddata/typings";
import useVisualizationExecution, { getVisualizationExecution } from "../useVisualizationExecution";
import { Model } from "@gooddata/react-components";

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

const createMockSdk = ({ visualizationObject = {}, uri = "/gdc/md/projectId/obj/1" } = {}) => {
    const mockXhrGet = jest.fn(() => {
        return Promise.resolve({
            data: {
                visualizationObject,
            },
        });
    });
    const mockGetUrisFromIdentifiers = jest.fn(() => {
        return Promise.resolve([{ uri }]);
    });
    const mockExecuteVisualization = jest.fn(() => {
        return Promise.resolve(mockResponses);
    });
    const mockSDK = {
        xhr: {
            get: mockXhrGet,
        },
        md: {
            getUrisFromIdentifiers: mockGetUrisFromIdentifiers,
        },
        execution: {
            _executeVisualization: mockExecuteVisualization,
        },
    };
    return mockSDK;
};

describe("getVisualizationExecution", () => {
    it("should resolve identifier to uri, then get the visualization execution and return it", async () => {
        const sampleProjectId = "sampleProjectId";
        const uri = `/gdc/md/${sampleProjectId}/obj/123`;
        const mockSdk = createMockSdk({ uri });
        const filters = [Model.attributeFilter("sampleAttributeDisplayFormIdentifier").in("sampleValue")];
        const resultSpec = { dimensions: [{ itemIdentifiers: ["measureGroup"] }] };
        const identifier = "sampleIdentifier";
        await getVisualizationExecution(sampleProjectId, identifier, mockSdk as any, filters, resultSpec);
        expect(mockSdk.md.getUrisFromIdentifiers).toHaveBeenCalledWith(sampleProjectId, [identifier]);
        expect(mockSdk.execution._executeVisualization).toHaveBeenCalledWith(sampleProjectId, {
            visualizationExecution: {
                filters,
                reference: "/gdc/md/sampleProjectId/obj/123",
                resultSpec,
            },
        });
    });
});

describe("useVisualizationObject", () => {
    const sampleProjectId = "sampleProjectId";
    const uri = `/gdc/md/${sampleProjectId}/obj/123`;
    const sampleVisualizationObject = {};
    const mockSdk = createMockSdk({ uri, visualizationObject: sampleVisualizationObject });
    const sampleIdentifier = "sampleIdentifier";
    const filters = [Model.attributeFilter("sampleAttributeDisplayFormIdentifier").in("sampleValue")];
    const resultSpec = { dimensions: [{ itemIdentifiers: ["measureGroup"] }] };

    const TestComponent = ({
        projectId = sampleProjectId,
        identifier = sampleIdentifier,
        sdk = mockSdk,
        children = <span />,
    } = {}) => {
        const state = useVisualizationExecution(projectId, identifier, sdk as any, filters, resultSpec);
        return <StateWrapper {...state}>{children}</StateWrapper>;
    };
    it("should resolve getVisualizationExecution, return isPending state and then the resolved value", async () => {
        const mockChild = <span />;
        const wrapper = mount(<TestComponent>{mockChild}</TestComponent>);
        expect(wrapper.find(StateWrapper).props()).toEqual({
            isPending: true,
            error: null,
            value: null,
            children: mockChild,
        });
        await delay(0);
        wrapper.update();
        expect(wrapper.find(StateWrapper).props()).toEqual({
            isPending: false,
            error: null,
            value: mockResponses,
            children: mockChild,
        });
    });
});
