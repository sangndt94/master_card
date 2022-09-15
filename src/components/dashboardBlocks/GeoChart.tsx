// (C) 2019 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { BucketExecutor } from "@gooddata/react-components";
import { AFM, VisualizationObject, VisualizationInput, Execution } from "@gooddata/typings";
import { SDK } from "@gooddata/gooddata-js";
import { IBucketExecutorChildrenProps } from "@gooddata/react-components/dist/execution/BucketExecutor";
import { numberFormat } from "@gooddata/numberjs";

import defaultSdk from "../../sdk";
import { CountryCode } from "./mapConstants";
import CustomLoading from "../utils/CustomLoading";
import Map, { IMapProps } from "./Map";
import NoDataError from "../utils/NoDataError";
import useVisualizationObject from "../../hooks/useVisualizationObject";
import StateWrapper from "../utils/StateWrapper";

const ROW_DIMENSION = 0;
const COLUMN_DIMENSION = 1;
const COUNTRY_CODE_ROW_INDEX = 0;
const TOOLTIP_DATA_ROW_INDEX = 1;
const MEASURE_COLUMN_INDEX = 0;

const getDimensions = (
    visualizationObject: VisualizationObject.IVisualizationObject,
): VisualizationInput.AttributeOrMeasure[][] => {
    if (!visualizationObject) {
        return null;
    }
    const dimensions = [[], []];
    const {
        content: { buckets },
    } = visualizationObject;
    buckets.forEach((bucket) => {
        if (bucket.items.length > 0) {
            if (VisualizationObject.isMeasure(bucket.items[0])) {
                dimensions[COLUMN_DIMENSION].push(...bucket.items);
                return;
            }
            if (VisualizationObject.isAttribute(bucket.items[0])) {
                dimensions[ROW_DIMENSION].push(...bucket.items);
                return;
            }
            throw new Error(`unknown bucket type of ${JSON.stringify(bucket, null, 2)}`);
        }
    });
    return dimensions;
};

const getAllFilters = (
    visualizationObject: VisualizationObject.IVisualizationObject,
    filters: VisualizationObject.VisualizationObjectFilter[],
): VisualizationInput.IFilter[] => {
    const allFilters = [...visualizationObject.content.filters, ...filters].filter((filter) => {
        // Measure value filter is not supported
        if (!VisualizationObject.isMeasureValueFilter(filter)) {
            if (VisualizationObject.isAttributeFilter(filter)) {
                if (VisualizationObject.isPositiveAttributeFilter(filter)) {
                    return filter.positiveAttributeFilter.in.length > 0;
                }
                return filter.negativeAttributeFilter.notIn.length > 0;
            }
            return true;
        }
        return false;
    });
    // Without measure filter the types should be compatible
    return allFilters as VisualizationInput.IFilter[];
};

const getTooltipData = (
    result: Execution.IExecutionResult,
    response: Execution.IExecutionResponse,
    countryCodeHeaderItem: Execution.IResultAttributeHeaderItem,
    countryCodeHeaderItemIndex: number,
    measureStringData: string,
    measureFormat: string,
) => {
    // check next attribute for tooltip data
    const measureHeader = result.headerItems[COLUMN_DIMENSION][
        MEASURE_COLUMN_INDEX
    ][0] as Execution.IResultMeasureHeaderItem;
    const measureLabel = measureHeader.measureHeaderItem.name;

    const formattedValue = numberFormat(measureStringData, measureFormat);

    const attributeNameHeader = response.dimensions[ROW_DIMENSION].headers[
        TOOLTIP_DATA_ROW_INDEX
    ] as Execution.IAttributeHeader;
    const countryCodeNameHeader = response.dimensions[ROW_DIMENSION].headers[
        COUNTRY_CODE_ROW_INDEX
    ] as Execution.IAttributeHeader;
    // if no description attribute available default to country code
    const attributeName = attributeNameHeader
        ? attributeNameHeader.attributeHeader.name
        : countryCodeNameHeader.attributeHeader.name;

    const attributeValueHeader =
        (result.headerItems[ROW_DIMENSION][TOOLTIP_DATA_ROW_INDEX] &&
            (result.headerItems[ROW_DIMENSION][TOOLTIP_DATA_ROW_INDEX][
                countryCodeHeaderItemIndex
            ] as Execution.IResultAttributeHeaderItem)) ||
        null;
    // if no description attribute available default to country code
    const attributeValue = attributeValueHeader
        ? attributeValueHeader.attributeHeaderItem.name
        : countryCodeHeaderItem.attributeHeaderItem.name;

    return [
        [attributeName, attributeValue],
        [measureLabel, formattedValue],
    ];
};

const getMapProps = (
    result: Execution.IExecutionResult,
    response: Execution.IExecutionResponse,
): IMapProps => {
    const mapProps: IMapProps = {
        data: {},
        tooltipData: {},
        measureFormat: undefined,
    };

    result.headerItems[ROW_DIMENSION][COUNTRY_CODE_ROW_INDEX].forEach(
        (countryCodeHeaderItem, countryCodeHeaderItemIndex) => {
            if (!Execution.isAttributeHeaderItem(countryCodeHeaderItem)) {
                // tslint:disable-next-line:no-console
                console.warn(`Unknown item in results: ${JSON.stringify(countryCodeHeaderItem)}`);
                return;
            }
            const countryCode = countryCodeHeaderItem.attributeHeaderItem.name as CountryCode;
            // Only assign two letter country codes
            if (!countryCode || countryCode.length !== 2) {
                // tslint:disable-next-line:no-console
                console.warn(`Invalid country code: "${countryCode}"`);
                return;
            }
            const measureStringData = result.data[countryCodeHeaderItemIndex]
                ? result.data[countryCodeHeaderItemIndex][0]
                : null;
            // Only assign non null values
            if (measureStringData === null) {
                return;
            }

            const measureGroupHeader = response.dimensions[COLUMN_DIMENSION]
                .headers[0] as Execution.IMeasureGroupHeader;
            const measureFormat = measureGroupHeader.measureGroupHeader.items[0].measureHeaderItem.format;

            mapProps.measureFormat = measureFormat;
            mapProps.data[countryCode] = measureStringData !== null ? parseFloat(measureStringData) : null;
            mapProps.tooltipData[countryCode] = getTooltipData(
                result,
                response,
                countryCodeHeaderItem,
                countryCodeHeaderItemIndex,
                measureStringData,
                measureFormat,
            );
        },
    );
    return mapProps;
};

const geoChartExecutionRenderProp = ({
    result,
    response,
}: {
    result: Execution.IExecutionResult;
    response: Execution.IExecutionResponse;
}): JSX.Element => {
    if (result.data.length === 0) {
        return <NoDataError />;
    }
    const mapProps: IMapProps = getMapProps(result, response);
    if (Object.keys(mapProps.data).length === 0) {
        return <NoDataError />;
    }
    return <Map {...mapProps} />;
};

interface IGeoChartExecution {
    visualizationObject: VisualizationObject.IVisualizationObject;
    filters: AFM.IPositiveAttributeFilter[];
    projectId: string;
    executionRenderProp?: React.FC<IBucketExecutorChildrenProps>;
}

const MAX_NUMBER_OF_COUNTRIES = 500;
const NUMBER_OF_COLUMNS = 2;
const initialPaging = { limit: [MAX_NUMBER_OF_COUNTRIES, NUMBER_OF_COLUMNS], offset: [0, 0] };

const GeoChartExecution = ({
    visualizationObject,
    filters,
    projectId,
    executionRenderProp = geoChartExecutionRenderProp,
}: IGeoChartExecution) => {
    const [dimensions, allFilters] = useMemo(() => {
        return [getDimensions(visualizationObject), getAllFilters(visualizationObject, filters)];
    }, [JSON.stringify(visualizationObject), JSON.stringify(filters)]);

    return (
        <BucketExecutor
            autoLoadFirstPage
            dimensions={dimensions}
            filters={allFilters}
            sdk={defaultSdk}
            projectId={projectId}
            LoadingComponent={CustomLoading}
            initialPaging={initialPaging}
        >
            {executionRenderProp}
        </BucketExecutor>
    );
};

interface IGeoChartProps {
    className?: string;
    projectId: string;
    identifier: string;
    filters?: AFM.IPositiveAttributeFilter[];
    sdk?: SDK;
}

const GeoChart: React.FC<IGeoChartProps> = ({
    className,
    projectId,
    identifier,
    filters = [],
    sdk = defaultSdk,
}) => {
    const visualizationObjectState = useVisualizationObject(projectId, identifier, sdk);
    const visualizationObject = visualizationObjectState.value;

    return (
        <div className={cx(className, "GeoChart", "s-visualization", `s-visualization-${identifier}`)}>
            {/* language=CSS */}
            <style jsx>
                {`
                    .GeoChart {
                        position: relative;
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: stretch;
                        align-items: stretch;
                        height: 100%;
                    }
                    .GeoChart :global(.Error) {
                        word-break: break-word;
                    }
                `}
            </style>
            <StateWrapper {...visualizationObjectState}>
                <GeoChartExecution
                    visualizationObject={visualizationObject}
                    filters={filters}
                    projectId={projectId}
                />
            </StateWrapper>
        </div>
    );
};

export const testingInterface = {
    getDimensions,
    getAllFilters,
    getMapProps,
    GeoChartExecution,
    geoChartExecutionRenderProp,
    GeoChart,
};

export default GeoChart;
