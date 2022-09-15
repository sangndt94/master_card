// (C) 2019 GoodData Corporation
import { useState, useEffect } from "react";

export interface IState<V> {
    value: V;
    error: Error;
    isPending: boolean;
}

export function usePromise<V>(
    task: () => Promise<V>,
    initialValue: V = null,
    extraDependencies = [],
): IState<V> {
    const initialState: IState<V> = { value: initialValue, error: null, isPending: true };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        let isSubscribed = true;
        const promise = task();
        if (promise) {
            setState({ value: initialValue, error: null, isPending: true });
            promise
                .then((value) => (isSubscribed ? setState({ value, error: null, isPending: false }) : null))
                .catch((error) => {
                    // tslint:disable-next-line:no-console
                    console.log("error", error);
                    return isSubscribed ? setState({ value: initialValue, error, isPending: false }) : null;
                });
        }

        return () => {
            isSubscribed = false;
        };
    }, [task, initialValue, ...extraDependencies]);

    return state;
}

export default usePromise;
