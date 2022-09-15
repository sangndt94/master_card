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

export interface IHeatmapProps extends Omit<IVisualizationWrapperProps, "identifier"> {
    attributes: string[];
    metric: string;
    bucketColors?: string[];
    ErrorComponent?: React.ComponentType<IErrorProps>;
    LoadingComponent?: React.ComponentType;
    normalizedFilters?: INormalizedAttributeFilter[];
    applyFilters?: () => void;
}

export const HeatmapAttributes: React.FC<IHeatmapProps> = ({
    className = "",
    projectId,
    attributes,
    metric,
    filters,
    ErrorComponent = RCErrorComponent,
    LoadingComponent = CustomLoading,
    normalizedFilters,
    applyFilters,
}) => {
    const filteredFilters = filters
        ? filters.filter(
              (filter) =>
                  getFilterIdentifier(filter) !== attributes[0] &&
                  getFilterIdentifier(filter) !== attributes[1],
          )
        : [];
    const afm: AFM.IAfm = {
        attributes: attributes.slice(0, 2).map((attribute) => ({
            localIdentifier: attribute,
            displayForm: {
                identifier: attribute,
            },
        })),
        measures: [
            {
                localIdentifier: metric,
                definition: {
                    measure: {
                        item: { identifier: metric },
                    },
                },
            },
        ],
        filters: filteredFilters,
    };

    const resultSpec: AFM.IResultSpec = {
        dimensions: [
            { itemIdentifiers: [attributes[0]] },
            { itemIdentifiers: [attributes[1], "measureGroup"] },
        ],
    };

    const [filtered, setFiltered] = useState<boolean[][]>();
    const [resultState, setResultState] = useState<Execution.IExecutionResponses>();

    const refreshFilters = (result: Execution.IExecutionResponses): boolean[][] => {
        if (result && filters && filters.length !== filteredFilters.length) {
            const xFiltered = generateFilterArray(resultState.executionResult.headerItems[0][0], filters);
            const yFiltered = generateFilterArray(resultState.executionResult.headerItems[1][0], filters);

            return xFiltered.map((row) => yFiltered.map((column) => row && column));
        }

        return null;
    };

    useEffect(() => setFiltered(refreshFilters(resultState)), [filters, resultState]);

    return (
        <Execute afm={afm} resultSpec={resultSpec} projectId={projectId}>
            {(execution) => {
                const { isLoading, error, result } = execution;
                if (isLoading) {
                    return <LoadingComponent />;
                }
                if (error) {
                    return <ErrorComponent message={error.message} />;
                }

                const filterHandler = (xIndex: number, yIndex: number) => {
                    if (normalizedFilters && applyFilters) {
                        if (xIndex >= 0) {
                            const xHeaderItems = resultState.executionResult.headerItems[0][0];
                            const yHeaderItems = resultState.executionResult.headerItems[1][0];
                            const xSelected = (xHeaderItems[xIndex] as Execution.IResultAttributeHeaderItem)
                                .attributeHeaderItem;
                            const ySelected = (yHeaderItems[yIndex] as Execution.IResultAttributeHeaderItem)
                                .attributeHeaderItem;
                            let apply = false;
                            normalizedFilters
                                .filter((filter) => filter.displayFormIdentifier === attributes[0])
                                .forEach((filter) => {
                                    const valuePresent = filter.selectedValues
                                        .map((value) => value.value)
                                        .includes(ySelected.uri);
                                    if (valuePresent) {
                                        filter.onChange(
                                            filter.selectedValues.filter(
                                                (value) => value.value !== ySelected.uri,
                                            ),
                                            false,
                                        );
                                    } else {
                                        if (filter.selectedValues.length + 1 === yHeaderItems.length) {
                                            // everything is selected -> clear filter
                                            filter.onChange([], false);
                                        } else {
                                            filter.onChange(
                                                [
                                                    ...filter.selectedValues,
                                                    {
                                                        label: ySelected.name,
                                                        value: ySelected.uri,
                                                    },
                                                ],
                                                false,
                                            );
                                        }
                                    }

                                    apply = true;
                                });
                            normalizedFilters
                                .filter((filter) => filter.displayFormIdentifier === attributes[1])
                                .forEach((filter) => {
                                    const valuePresent = filter.selectedValues
                                        .map((value) => value.value)
                                        .includes(xSelected.uri);
                                    if (valuePresent) {
                                        filter.onChange(
                                            filter.selectedValues.filter(
                                                (value) => value.value !== xSelected.uri,
                                            ),
                                            false,
                                        );
                                    } else {
                                        if (filter.selectedValues.length + 1 === xHeaderItems.length) {
                                            // everything is selected -> clear filter
                                            filter.onChange([], false);
                                        } else {
                                            filter.onChange(
                                                [
                                                    ...filter.selectedValues,
                                                    {
                                                        label: xSelected.name,
                                                        value: xSelected.uri,
                                                    },
                                                ],
                                                false,
                                            );
                                        }
                                    }

                                    apply = true;
                                });

                            if (apply) {
                                applyFilters();
                            }
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
                        data={result.executionResult.data}
                        maxMinType="global"
                        xHeader={result.executionResponse.dimensions[1].headers[0].attributeHeader.name}
                        yHeader={result.executionResponse.dimensions[0].headers[0].attributeHeader.name}
                        xLabels={result.executionResult.headerItems[1][0].map((item) =>
                            item.attributeHeaderItem ? item.attributeHeaderItem.name : "",
                        )}
                        yLabels={result.executionResult.headerItems[0][0].map((item) =>
                            item.attributeHeaderItem ? item.attributeHeaderItem.name : "",
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
