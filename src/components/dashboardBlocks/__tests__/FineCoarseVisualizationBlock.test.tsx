// (C) 2019 GoodData Corporation
import React from "react";
import { shallow, mount } from "enzyme";
import FineCoarseVisualizationBlock from "../FineCoarseVisualizationBlock";
import GranularitySwitch from "../GranularitySwitch";
import ButtonLink from "../../utils/ButtonLink";
import VisualizationWrapper from "../../visualization/VisualizationWrapper";

describe("FineCoarseVisualizationBlock", () => {
    it("should show fine visualization by default", () => {
        const mounted = shallow(
            <FineCoarseVisualizationBlock
                coarseGranularityVisualization="coarse"
                fineGranularityVisualization="fine"
                header="Header"
                projectId="foo"
            />,
        );

        expect(mounted.children(VisualizationWrapper).first().prop("identifier")).toEqual("fine");
    });

    it("should switch to coarse visualization when the switch is clicked", () => {
        const mounted = mount(
            <FineCoarseVisualizationBlock
                coarseGranularityVisualization="coarse"
                fineGranularityVisualization="fine"
                header="Header"
                projectId="foo"
            />,
        );

        mounted.find(GranularitySwitch).first().find(ButtonLink).last().simulate("click");

        expect(mounted.find(VisualizationWrapper).first().prop("identifier")).toEqual("coarse");
    });
});
