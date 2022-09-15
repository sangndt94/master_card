// (C) 2019-2020 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import CustomHeadline, { ICustomHeadlineProps } from "../CustomHeadline";
import ResponsiveText from "../../utils/ResponsiveText";

describe("CustomHeadline", () => {
    it("should render the Headline values and labels", () => {
        const props: ICustomHeadlineProps = {
            currentValue: 1000,
            currentValueFormat: "#,##0",
            lastValue: 500,
            rateFormat: "#,##0.00%",
            lastValueLabel: "Last year",
        };
        const wrapper = shallow(<CustomHeadline {...props} />);
        expect(wrapper.find(ResponsiveText).prop("children")).toBe("1,000");
        expect(wrapper.find(".s-rateFormatted").text()).toBe("100.00%");
        expect(wrapper.find(".s-lastMeasure").text()).toBe("Last year");
    });
});
