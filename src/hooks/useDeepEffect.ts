// (C) 2020 GoodData Corporation
import { useRef, useEffect } from "react";
import isEqual from "lodash/isEqual";

export const useDeepEffect = (effectFunc, deps) => {
    const isFirst = useRef(true);
    const prevDeps = useRef(deps);

    useEffect(() => {
        const isSame = prevDeps.current.every((obj, index) => isEqual(obj, deps[index]));

        if (isFirst.current || !isSame) {
            effectFunc();
        }

        isFirst.current = false;
        prevDeps.current = deps;
    }, deps);
};
