// (C) 2019 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import StateWrapper from "../StateWrapper";
import CustomLoading from "../CustomLoading";
import { ErrorComponent } from "@gooddata/react-components";
import NoDataError from "../NoDataError";

describe("StateWrapper", () => {
    it("should render a CustomLoading component when isPending is true", () => {
        const state = { isPending: true, value: null, error: null };
        const wrapper = shallow(
            <StateWrapper {...state}>
                <span />
            </StateWrapper>,
        );
        expect(wrapper.find(CustomLoading)).toExist();
    });
    it("should render an ErrorComponent when isPending is false and an error is not null", () => {
        const state = { isPending: false, value: null, error: new Error("out of order") };
        const wrapper = shallow(
            <StateWrapper {...state}>
                <span />
            </StateWrapper>,
        );
        expect(wrapper.find(ErrorComponent)).toExist();
        expect(wrapper.find(ErrorComponent)).toHaveProp("message", "out of order");
    });
    it("should render a NoDataError when isPending is false, error is null and data is null", () => {
        const state = { isPending: false, value: null, error: null };
        const wrapper = shallow(
            <StateWrapper {...state}>
                <span />
            </StateWrapper>,
        );
        expect(wrapper.find(NoDataError)).toExist();
    });
    it("should render children when isPending is false, error is null and data is NOT null", () => {
        const state = { isPending: false, value: 123, error: null };
        const wrapper = shallow(
            <StateWrapper {...state}>
                <span />
            </StateWrapper>,
        );
        expect(wrapper.find("span")).toExist();
    });
});
