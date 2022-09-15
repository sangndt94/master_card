// (C) 2019 GoodData Corporation
import usePromise, { IState } from "../usePromise";
import React, { useCallback } from "react";
import { mount } from "enzyme";
import { delay } from "../../utils/helpers";

const renderState = (state: IState<any>) => {
    if (state.isPending) {
        return <span>pending</span>;
    }
    if (state.error) {
        return <span>error {state.error}</span>;
    }
    if (state.value) {
        return <span>value {state.value}</span>;
    }
    return <span>no value</span>;
};

describe("usePromise", () => {
    const getSampleTask = ({
        shouldSucceed = true,
        delay = 100,
        value = 123,
    }: {
        shouldSucceed?: boolean;
        delay?: number;
        value?: any;
    } = {}) => () => {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (shouldSucceed) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }, delay);
        });
    };
    const sampleTask = getSampleTask({ value: "success" });
    it("should execute task and return isPending state and the resolved value", async (done) => {
        const TestComponent = () => {
            const task = useCallback(sampleTask, []);
            const state = usePromise(task);
            return renderState(state);
        };

        const wrapper = mount(<TestComponent />);
        expect(wrapper.text()).toBe("pending");
        await delay(110);
        expect(wrapper.text()).toBe("value success");
        done();
    });
    it("should execute task, reject, then re-execute task when dependency changes and return the resolved value", async (done) => {
        const taskCheck = jest.fn();
        const TestComponent = ({ shouldSucceed }) => {
            const task = useCallback(() => {
                taskCheck();
                return getSampleTask({ value: shouldSucceed ? "success" : "error value", shouldSucceed })();
            }, [shouldSucceed]);
            const state = usePromise<any>(task);
            return renderState(state);
        };

        const wrapper = mount(<TestComponent shouldSucceed={false} />);
        await delay(110);
        expect(taskCheck).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toBe("error error value");
        wrapper.setProps({ shouldSucceed: true });
        await delay(10);
        expect(wrapper.text()).toBe("pending");
        await delay(110);
        expect(taskCheck).toHaveBeenCalledTimes(2);
        expect(wrapper.text()).toBe("value success");
        done();
    });
});
