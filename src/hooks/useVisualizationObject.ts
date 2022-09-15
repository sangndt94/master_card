// (C) 2019 GoodData Corporation
import { useCallback } from "react";
import defaultSdk from "../sdk";
import usePromise from "./usePromise";
import { VisualizationObject } from "@gooddata/typings";
import { SDK } from "@gooddata/gooddata-js";

export const getVisualizationObject = (projectId: string, identifier: string, sdk: SDK = defaultSdk) => {
    return sdk.md.getUrisFromIdentifiers(projectId, [identifier]).then((uriResponse) => {
        return sdk.xhr.get(uriResponse[0].uri).then((visualizationObjectResponse) => {
            return visualizationObjectResponse.data.visualizationObject;
        });
    });
};

const useVisualizationObject = (projectId: string, identifier: string, sdk: SDK = defaultSdk) => {
    const getCurrentVisualizationObject = useCallback(() => {
        return getVisualizationObject(projectId, identifier, sdk);
    }, [projectId, identifier, sdk]);

    return usePromise<VisualizationObject.IVisualizationObject>(getCurrentVisualizationObject);
};

export default useVisualizationObject;
