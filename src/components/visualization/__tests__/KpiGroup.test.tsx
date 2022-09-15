// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import KpiGroup, { IKpiGroupProps } from "../KpiGroup";
import Kpi, { IKpiProps } from "../Kpi";

describe("KpiGroup", () => {
    const sampleKpiProps: IKpiProps = {
        Component: "span",
        value: 1.234567,
        format: "0.00%",
        className: "wrapper",
        typographyVariant: "caption",
        kpiClassName: "kpi",
        responsive: false,
        beforeContent: "before",
        afterContent: "after",
    };
    const sampleKpiGroupProps: IKpiGroupProps = {
        kpis: [
            sampleKpiProps,
            {
                ...sampleKpiProps,
                value: 2.345678,
            },
        ],
    };
    it("should render a list of Kpi components", () => {
        const wrapper = mount(<KpiGroup {...sampleKpiGroupProps} />);
        const kpiElements = wrapper.find(Kpi);
        expect(kpiElements.length).toBe(2);
        expect(kpiElements.at(0).props()).toEqual(sampleKpiGroupProps.kpis[0]);
        expect(kpiElements.at(1).props()).toEqual(sampleKpiGroupProps.kpis[1]);
    });
});
