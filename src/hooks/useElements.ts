// (C) 2019-2020 GoodData Corporation
import { useCallback } from "react";
import getElements from "../utils/getElements";
import usePromise, { IState } from "../hooks/usePromise";
import { AFM } from "@gooddata/typings";
import { IValidElementsResponse } from "@gooddata/gooddata-js";

export type IUseElementsState = IState<IValidElementsResponse["validElements"]>;

const useElements = (projectId: string, attributeDFIdentifier: string, afm?: AFM.IAfm): IUseElementsState => {
    const task = useCallback(() => {
        const options = afm ? { afm } : undefined;
        if (projectId && attributeDFIdentifier) {
            return getElements(projectId, attributeDFIdentifier, options);
        }
        return null;
    }, [projectId, attributeDFIdentifier]);
    const { value, error, isPending } = usePromise(task);

    const data = value ? value.validElements : null;

    return { value: data, error, isPending };
};

export default useElements;
