// (C) 2019 GoodData Corporation
import useVisualizationsAreLoading from "../useVisualizationsAreLoading";
import React from "react";
import { mount } from "enzyme";

describe("useVisualizationsAreLoading", () => {
    const TestComponent = ({ count = 2 } = {}) => {
        const [onLoadingChanged, isLoading] = useVisualizationsAreLoading(count);
        return (
            <>
                <button onClick={() => onLoadingChanged({ isLoading: false })} className="trigger">
                    trigger
                </button>
                <button onClick={() => onLoadingChanged({ isLoading: true })} className="notTrigger">
                    not trigger
                </button>
                <span className="isLoading">{String(isLoading)}</span>
            </>
        );
    };
    it("should should return a function onLoadingChanged and isLoading. isLoading should be false. When onLoadingChanged has been called with {isLoading: false} at least [count] times, then it should be true.", () => {
        const wrapper = mount(<TestComponent count={2} />);
        const triggerClassName = ".trigger";
        const notTriggerClassName = ".notTrigger";
        const isLoadingClassName = ".isLoading";
        expect(wrapper.find(isLoadingClassName)).toHaveText("true");
        wrapper.find(notTriggerClassName).simulate("click");
        wrapper.find(notTriggerClassName).simulate("click");
        expect(wrapper.find(isLoadingClassName)).toHaveText("true");
        wrapper.find(triggerClassName).simulate("click");
        wrapper.find(triggerClassName).simulate("click");
        expect(wrapper.find(isLoadingClassName)).toHaveText("false");
    });
    it("should always return isLoading = false if count is 0", () => {
        const wrapper = mount(<TestComponent count={0} />);
        const triggerClassName = ".trigger";
        const isLoadingClassName = ".isLoading";
        expect(wrapper.find(isLoadingClassName)).toHaveText("false");
        wrapper.find(triggerClassName).simulate("click");
        expect(wrapper.find(isLoadingClassName)).toHaveText("false");
    });
});
