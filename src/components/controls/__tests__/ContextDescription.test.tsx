// (C) 2020 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { MenuItem, TriggerButton, MenuDropdown } from "../ContextMenu";
import ContextDescription from "../ContextDescription";

describe("ContextDescription", () => {
    it("should toggle a Dropdown with text content on TriggerButton click", () => {
        const wrapper = mount(<ContextDescription>ABC</ContextDescription>);

        expect(wrapper.find(MenuDropdown).exists()).toBe(false);

        const triggerWrapper = wrapper.find(TriggerButton);
        expect(triggerWrapper.exists()).toBe(true);
        triggerWrapper.simulate("click");

        expect(wrapper.find(MenuDropdown).exists()).toBe(true);

        expect(wrapper.find(MenuItem).text()).toBe("ABC");

        wrapper.find(MenuItem).at(0).simulate("click");

        triggerWrapper.simulate("click"); // close dropdown
    });
    it("should close dropdown on outside click", () => {
        const wrapper = mount(
            <div>
                <span className="outside">outside</span>
                <ContextDescription>ABC</ContextDescription>
            </div>,
        );

        expect(wrapper.find(MenuDropdown).exists()).toBe(false);

        const triggerWrapper = wrapper.find(TriggerButton);
        expect(triggerWrapper.exists()).toBe(true);
        triggerWrapper.simulate("click");

        expect(wrapper.find(MenuDropdown).exists()).toBe(true);
        wrapper.find(".outside").simulate("click");

        expect(wrapper.find(MenuDropdown).exists()).toBe(true);
    });
});
