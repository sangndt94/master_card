// (C) 2019-2020 GoodData Corporation
import React, { useMemo } from "react";
import { OnLoadingChanged } from "@gooddata/react-components/dist/interfaces/Events";
import CustomVisualization, {
    ICommonPresentationOverrideProps,
    ICustomVisualizationProps,
} from "./CustomVisualization";
import get from "lodash/get";
import CustomHeadline, { ICustomHeadlineProps } from "./CustomHeadline";
import { IVisualizationWrapperProps } from "./VisualizationWrapper";
import { Execution } from "@gooddata/typings";
import stringify from "json-stable-stringify";

export const getCustomHeadlineProps = (
    result: Execution.IExecutionResult,
    response: Execution.IExecutionResponse,
): ICustomHeadlineProps => {
    const lastValueHeaderIndex = 1;
    const currentValue = parseFloat(result.data[0] as string);
    const lastValue = parseFloat(result.data[1] as string);
    const [currentValueHeaderItem] = (response.dimensions[0]
        .headers[0] as Execution.IMeasureGroupHeader).measureGroupHeader.items;
    const currentValueFormat = currentValueHeaderItem.measureHeaderItem.format;
    const lastValueLabel = get(
        result,
        ["headerItems", 0, 0, lastValueHeaderIndex, "measureHeaderItem", "name"],
        null,
    );

    return {
        currentValue: isNaN(currentValue) ? null : currentValue,
        lastValue: isNaN(lastValue) ? null : lastValue,
        currentValueFormat,
        lastValueLabel,
    };
};

export interface ICustomHeadlinePresentationProps extends ICommonPresentationOverrideProps {
    rateFormat?: ICustomHeadlineProps["rateFormat"];
}

export const CustomHeadlinePresentation: React.FC<ICustomHeadlinePresentationProps> = ({
    executionResponse,
    executionResult,
    rateFormat,
}) => {
    const headlineProps = getCustomHeadlineProps(executionResult, executionResponse);
    return <CustomHeadline rateFormat={rateFormat} {...headlineProps} />;
};

export interface IHeadlineVisualizationProps
    extends IVisualizationWrapperProps,
        Omit<ICustomVisualizationProps, "CommonPresentationOverride"> {
    className?: string;
    rateFormat?: ICustomHeadlineProps["rateFormat"];
    onLoadingChanged?: OnLoadingChanged;
    withPeers?: boolean;
    alignCenter?: boolean;
}
const defaultVisTypeSpecificProps: IHeadlineVisualizationProps["visTypeSpecificProps"] = { headline: {} };

const HeadlineVisualization: React.FC<IHeadlineVisualizationProps> = ({
    CommonPresentationOverride = CustomHeadlinePresentation,
    rateFormat,
    visTypeSpecificProps = defaultVisTypeSpecificProps,
    alignCenter = true,
    ...restProps
}) => {
    const visTypeSpecificPropsMemoised = useMemo(() => {
        return {
            ...visTypeSpecificProps,
            headline: {
                ...((visTypeSpecificProps as any).headline || {}),
                ...((rateFormat && { rateFormat }) || {}),
            },
        };
    }, [stringify(visTypeSpecificProps)]);
    return (
        <CustomVisualization
            CommonPresentationOverride={CommonPresentationOverride}
            visTypeSpecificProps={visTypeSpecificPropsMemoised}
            alignCenter={alignCenter}
            {...restProps}
        />
    );
};

export default HeadlineVisualization;
