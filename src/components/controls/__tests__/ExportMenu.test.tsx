// (C) 2020 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { MenuItem, TriggerButton, MenuDropdown } from "../ContextMenu";
import ExportMenu from "../ExportMenu";

describe("ExportMenu", () => {
    it("should open a Dropdown on TriggerButton click, close it on item click and fire an onDrill event with item format parameter", () => {
        const onExport = jest.fn();
        const wrapper = mount(<ExportMenu onExport={onExport} />);

        expect(wrapper.find(MenuDropdown).exists()).toBe(false);

        const triggerWrapper = wrapper.find(TriggerButton);
        expect(triggerWrapper.exists()).toBe(true);
        triggerWrapper.simulate("click");

        expect(wrapper.find(MenuDropdown).exists()).toBe(true);

        expect(wrapper.find(MenuItem).at(0).text().indexOf("Export to Excel") !== -1).toBe(true);
        expect(wrapper.find(MenuItem).at(1).text().indexOf("Export to CSV") !== -1).toBe(true);

        wrapper.find(MenuItem).at(0).simulate("click"); // click Export to Excel

        expect(wrapper.find(MenuDropdown).exists()).toBe(false);
        expect(onExport).toHaveBeenLastCalledWith("xlsx");

        triggerWrapper.simulate("click"); // reopen closed dropdown

        wrapper.find(MenuItem).at(1).simulate("click"); // click Export to Csv

        expect(onExport).toHaveBeenLastCalledWith("csv");
    });
});
