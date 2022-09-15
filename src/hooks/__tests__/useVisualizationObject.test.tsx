// (C) 2019 GoodData Corporation
import useVisualizationObject, { getVisualizationObject } from "../useVisualizationObject";
import React from "react";
import { mount } from "enzyme";
import { delay } from "../../utils/helpers";
import StateWrapper from "../../components/utils/StateWrapper";

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
    const mockSDK = {
        xhr: {
            get: mockXhrGet,
        },
        md: {
            getUrisFromIdentifiers: mockGetUrisFromIdentifiers,
        },
    };
    return mockSDK;
};

describe("getVisualizatzationObject", () => {
    it("should resolve identifier to uri, then get the visualization object", async () => {
        const sampleProjectId = "sampleProjectId";
        const uri = `/gdc/md/${sampleProjectId}/obj/123`;
        const mockSdk = createMockSdk({ uri });
        const identifier = "sampleIdentifier";
        await getVisualizationObject(sampleProjectId, identifier, mockSdk as any);
        expect(mockSdk.md.getUrisFromIdentifiers).toHaveBeenCalledWith(sampleProjectId, [identifier]);
        expect(mockSdk.xhr.get).toHaveBeenCalledWith(uri);
    });
});

describe("useVisualizationObject", () => {
    const sampleProjectId = "sampleProjectId";
    const uri = `/gdc/md/${sampleProjectId}/obj/123`;
    const sampleVisualizationObject = {};
    const mockSdk = createMockSdk({ uri, visualizationObject: sampleVisualizationObject });
    const sampleIdentifier = "sampleIdentifier";

    const TestComponent = ({
        projectId = sampleProjectId,
        identifier = sampleIdentifier,
        sdk = mockSdk,
        children = <span />,
    } = {}) => {
        const state = useVisualizationObject(projectId, identifier, sdk as any);
        return <StateWrapper {...state}>{children}</StateWrapper>;
    };
    it("should resolve get visualization object and return isPending state and then the resolved value", async () => {
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
            value: sampleVisualizationObject,
            children: mockChild,
        });
    });
});
