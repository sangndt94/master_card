// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import Kpi, { IKpiProps } from "../Kpi";
import ResponsiveText from "../../utils/ResponsiveText";

describe("Kpi", () => {
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
    it("should render a Component, beforeContent, formattedValue and afterContent", () => {
        const wrapper = mount(<Kpi {...sampleKpiProps} />);
        const rootElement = wrapper.find(`${sampleKpiProps.Component}.wrapper`);
        expect(rootElement).toExist();
        expect(rootElement.text()).toBe("before123.46%after");
    });
    it("should render a ResponsiveText component if responsive: true", () => {
        const kpiProps: IKpiProps = {
            ...sampleKpiProps,
            responsive: true,
        };
        const wrapper = mount(<Kpi {...kpiProps} />);
        expect(wrapper.find(ResponsiveText)).toExist();
        expect(wrapper.find(ResponsiveText).props()).toMatchObject({
            max: 16,
            children: "123.46%",
        });
    });
    it("should render a No data error if value is null", () => {
        const kpiProps: IKpiProps = {
            ...sampleKpiProps,
            value: null,
        };
        const wrapper = mount(<Kpi {...kpiProps} />);
        expect(wrapper.text()).toBe("beforeNO DATAafter");
    });
});
