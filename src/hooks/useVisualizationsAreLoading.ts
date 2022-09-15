// (C) 2019 GoodData Corporation
import { useCallback } from "react";
import { useHasBeenCalledTimes } from "./useHasBeenCalledTimes";
import { OnLoadingChanged } from "@gooddata/react-components/dist/interfaces/Events";

export const useVisualizationsAreLoading = (expectedCount: number = 1): [OnLoadingChanged, boolean] => {
    const [incrementCounter, isComplete] = useHasBeenCalledTimes(expectedCount);

    const onLoadingChanged = useCallback(
        ({ isLoading }) => {
            if (isLoading === false) {
                incrementCounter();
            }
        },
        [incrementCounter],
    );

    const isLoading = !isComplete;

    return [onLoadingChanged, isLoading];
};

export default useVisualizationsAreLoading;
