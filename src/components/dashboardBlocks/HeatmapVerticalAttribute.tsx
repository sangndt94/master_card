// (C) 2020 GoodData Corporation
import React, { useEffect, useState } from "react";
import { Execute, isEmptyResult } from "@gooddata/react-components";
import { AFM, Execution } from "@gooddata/typings";
import { HeatmapTable } from "./HeatmapTable";
import {
    ErrorComponent as RCErrorComponent,
    IErrorProps,
} from "@gooddata/react-components/dist/components/simple/ErrorComponent";
import CustomLoading from "../utils/CustomLoading";
import NoDataError from "../utils/NoDataError";
import { IVisualizationWrapperProps } from "../visualization/VisualizationWrapper";
import { generateFilterArray, getFilterIdentifier } from "../filters/utils";
import { INormalizedAttributeFilter } from "../../types";

export interface IHeatmapVerticalAttributeProps extends Omit<IVisualizationWrapperProps, "identifier"> {
    attribute: string;
    metrics: string[];
    bucketColors?: string[];
    ErrorComponent?: React.ComponentType<IErrorProps>;
    LoadingComponent?: React.ComponentType;
    normalizedFilters?: INormalizedAttributeFilter[];
    applyFilters?: () => void;
}

export const HeatmapVerticalAttribute: React.FC<IHeatmapVerticalAttributeProps> = ({
    className = "",
    projectId,
    attribute,
    metrics,
    filters,
    ErrorComponent = RCErrorComponent,
    LoadingComponent = CustomLoading,
    normalizedFilters,
    applyFilters,
}) => {
    const filteredFilters = filters
        ? filters.filter((filter) => getFilterIdentifier(filter) !== attribute)
        : [];
    const afm: AFM.IAfm = {
        attributes: [
            {
                localIdentifier: "attribute",
                displayForm: {
                    identifier: attribute,
                },
            },
        ],
        measures: metrics.map((metric) => ({
            localIdentifier: metric,
            definition: {
                measure: {
                    item: { identifier: metric },
                },
            },
        })),
        filters: filteredFilters,
    };

    const [filtered, setFiltered] = useState<boolean[]>();
    const [resultState, setResultState] = useState<Execution.IExecutionResponses>();

    const refreshFilters = (result: Execution.IExecutionResponses): boolean[] => {
        if (result && filters && filters.length !== filteredFilters.length) {
            return generateFilterArray(resultState.executionResult.headerItems[0][0], filters);
        }

        return null;
    };

    useEffect(() => setFiltered(refreshFilters(resultState)), [filters, resultState]);

    return (
        <Execute afm={afm} projectId={projectId}>
            {(execution) => {
                const { isLoading, error, result } = execution;
                if (isLoading) {
                    return <LoadingComponent />;
                }
                if (error) {
                    return <ErrorComponent message={error.message} />;
                }

                const filterHandler = (xIndex: number, _: number) => {
                    if (normalizedFilters && applyFilters) {
                        if (xIndex >= 0) {
                            const headerItems = resultState.executionResult.headerItems[0][0];
                            const selected = (headerItems[xIndex] as Execution.IResultAttributeHeaderItem)
                                .attributeHeaderItem;
                            normalizedFilters
                                .filter((filter) => filter.displayFormIdentifier === attribute)
                                .forEach((filter) => {
                                    const valuePresent = filter.selectedValues
                                        .map((value) => value.value)
                                        .includes(selected.uri);
                                    if (valuePresent) {
                                        filter.onChange(
                                            filter.selectedValues.filter(
                                                (value) => value.value !== selected.uri,
                                            ),
                                            false,
                                        );
                                    } else {
                                        if (filter.selectedValues.length + 1 === headerItems.length) {
                                            // everything is selected -> clear filter
                                            filter.onChange([], false);
                                        } else {
                                            filter.onChange(
                                                [
                                                    ...filter.selectedValues,
                                                    {
                                                        label: selected.name,
                                                        value: selected.uri,
                                                    },
                                                ],
                                                false,
                                            );
                                        }
                                    }

                                    applyFilters();
                                });
                        }

                        setFiltered(refreshFilters(result));
                    }
                };

                if (isEmptyResult(result)) {
                    return <NoDataError Component={ErrorComponent} />;
                }

                setResultState(result);

                return (
                    <HeatmapTable
                        data={result.executionResult.data as number[][]}
                        maxMinType="column"
                        yHeader={
                            (result.executionResponse.dimensions[0].headers[0] as Execution.IAttributeHeader)
                                .attributeHeader.name
                        }
                        xLabels={result.executionResult.headerItems[1][0].map((item) =>
                            Execution.isMeasureHeaderItem(item) && item.measureHeaderItem
                                ? item.measureHeaderItem.name
                                : "",
                        )}
                        yLabels={result.executionResult.headerItems[0][0].map((item) =>
                            Execution.isAttributeHeaderItem(item) && item.attributeHeaderItem
                                ? item.attributeHeaderItem.name
                                : "",
                        )}
                        className={className}
                        onClick={filterHandler}
                        filtered={filtered}
                    />
                );
            }}
        </Execute>
    );
};
