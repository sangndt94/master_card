// (C) 2019 GoodData Corporation
import { useCallback, useEffect } from "react";
import usePromise from "./usePromise";
import { Execution, AFM } from "@gooddata/typings";
import { IDataSource } from "@gooddata/react-components/dist/interfaces/DataSource";
import noop from "lodash/noop";
import { OnLoadingChanged } from "@gooddata/react-components/dist/interfaces/Events";

const useDataSource = (
    dataSource: IDataSource,
    resultSpec: AFM.IResultSpec,
    onLoadingChanged: OnLoadingChanged = noop,
) => {
    const getDataSourceData = useCallback(() => {
        if (dataSource) {
            return dataSource.getData(resultSpec);
        }
        return null;
    }, [resultSpec]);

    const results = usePromise<Execution.IExecutionResponses>(getDataSourceData);

    useEffect(() => {
        onLoadingChanged({ isLoading: results.isPending });
    }, [results.isPending]);

    return results;
};

export default useDataSource;
