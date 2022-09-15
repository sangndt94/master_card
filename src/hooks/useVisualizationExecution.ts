// (C) 2019 GoodData Corporation
import { useCallback } from "react";
import defaultSdk from "../sdk";
import usePromise from "./usePromise";
import { Execution, AFM, VisualizationInput } from "@gooddata/typings";
import { SDK } from "@gooddata/gooddata-js";

export const getVisualizationExecution = (
    projectId: string,
    identifier: string,
    sdk: SDK = defaultSdk,
    filters: VisualizationInput.IFilter[],
    resultSpec: AFM.IResultSpec,
) => {
    return sdk.md.getUrisFromIdentifiers(projectId, [identifier]).then((uriResponse) => {
        return sdk.execution._executeVisualization(projectId, {
            visualizationExecution: {
                reference: uriResponse[0].uri,
                filters: filters as AFM.CompatibilityFilter[], // the only difference is in relative date filter "from" is optional
                resultSpec,
            },
        });
    });
};

const useVisualizationExecution = (
    projectId: string,
    identifier: string,
    sdk: SDK = defaultSdk,
    filters: VisualizationInput.IFilter[],
    resultSpec: AFM.IResultSpec,
) => {
    const getCurrentVisualizationObject = useCallback(() => {
        return getVisualizationExecution(projectId, identifier, sdk, filters, resultSpec);
    }, [projectId, identifier, sdk, filters, resultSpec]);

    const results = usePromise<Execution.IExecutionResponses>(getCurrentVisualizationObject);
    return results;
};

export default useVisualizationExecution;
