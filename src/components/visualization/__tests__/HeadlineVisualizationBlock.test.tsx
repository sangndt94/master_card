// (C) 2019 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import defaultSdk from "../../../sdk";
import HeadlineVisualizationBlock, { IHeadlineVisualizationBlockProps } from "../HeadlineVisualizationBlock";
import { Model } from "@gooddata/react-components";
import VisualizationBlockBase from "../../dashboardBlocks/VisualizationBlockBase";
import HeadlineVisualization from "../HeadlineVisualization";

describe("HeadlineVisualizationBlock", () => {
    it("should render VisualizationBlockBase and HeadlineVisualization", () => {
        const size = 2;
        const projectId = "sampleProjectId";
        const identifier = "sampleIdentifier";
        const sdk = defaultSdk;
        const header = "header";
        const filters = [Model.attributeFilter("sampleAttributeDisplayFormIdentifier").in("sampleValue")];
        const onLoadingChanged = jest.fn();
        const props: IHeadlineVisualizationBlockProps = {
            size,
            projectId,
            identifier,
            sdk,
            header,
            filters,
            onLoadingChanged,
        };
        const wrapper = shallow(<HeadlineVisualizationBlock {...props} />);
        expect(wrapper.find(VisualizationBlockBase)).toExist();
        expect(wrapper.find(VisualizationBlockBase).props()).toMatchObject({
            size,
            header,
        });
        expect(wrapper.find(HeadlineVisualization)).toExist();
        expect(wrapper.find(HeadlineVisualization).props()).toEqual({
            identifier,
            projectId,
            filters,
            sdk,
            onLoadingChanged,
        });
    });
});
