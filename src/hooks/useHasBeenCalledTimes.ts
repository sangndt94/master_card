// (C) 2019 GoodData Corporation
import { useState } from "react";

export const useHasBeenCalledTimes = (expectedCount = 1): [() => void, boolean, number] => {
    const [calledCount, setCalledCount] = useState(0);
    const incrementCounter = () => {
        setCalledCount((calledCount) => calledCount + 1);
    };
    const isComplete = calledCount >= expectedCount;
    return [incrementCounter, isComplete, calledCount];
};
