// (C) 2019 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import Tooltip from "../Tooltip";

describe("Tooltip", () => {
    it("should render a minimal Tooltip", () => {
        const wrapper = shallow(<Tooltip textData={[["title", "value"]]} />);
        expect(wrapper.find(".s-title").text()).toBe("title");
        expect(wrapper.find(".s-value").text()).toBe("value");
    });
});
