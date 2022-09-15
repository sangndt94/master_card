// (C) 2019-2020 GoodData Corporation
import React, { useMemo } from "react";
import noop from "lodash/noop";
import { SDK } from "@gooddata/gooddata-js";
import { AFM, Execution } from "@gooddata/typings";
import { Visualization, IPivotTableProps, IBaseChartProps } from "@gooddata/react-components";
import { IVisualizationProps } from "@gooddata/react-components/dist/components/uri/Visualization";
import { css } from "emotion";
import cx from "classnames";

import StateWrapper from "../utils/StateWrapper";
import defaultSdk from "../../sdk";
import BlockContent from "../dashboardBlocks/BlockContent";
import CustomLoading from "../utils/CustomLoading";
import SmallError from "../utils/SmallError";
import { IHeadlineProps } from "@gooddata/react-components/dist/components/Headline";
import { IDataSource } from "@gooddata/react-components/dist/interfaces/DataSource";
import useDataSource from "../../hooks/useDataSource";
import { VisType } from "@gooddata/react-components/dist/constants/visualizationTypes";
import CustomError from "../utils/CustomError";
import { IVisualizationWrapperProps } from "./VisualizationWrapper";
import { OnLoadingChanged } from "@gooddata/react-components/dist/interfaces/Events";

export interface ICommonPresentationOverrideProps {
    visType?: VisType;
    executionResponse: Execution.IExecutionResponse;
    executionResult: Execution.IExecutionResult;
}

// DefaultCommonPresentationOverride should only be used during development of a custom visualization component or testing
export const DefaultCommonPresentationOverride: React.FC<ICommonPresentationOverrideProps> = ({
    visType,
    executionResponse,
    executionResult,
}) => {
    return (
        <pre>
            {JSON.stringify(
                {
                    visType,
                    executionResponse,
                    executionResult,
                },
                null,
                2,
            )}
        </pre>
    );
};

export interface ICommonExecutionOverrideProps<V extends {} = {}> {
    resultSpec: AFM.IResultSpec;
    LoadingComponent?: ICustomVisualizationProps<V>["LoadingComponent"];
    ErrorComponent?: ICustomVisualizationProps<V>["ErrorComponent"];
    CommonPresentationOverride: ICustomVisualizationProps<V>["CommonPresentationOverride"];
    visType?: VisType;
    type?: VisType;
    visTypeSpecificProps?: V;
    dataSource?: IDataSource;
    onLoadingChanged?: OnLoadingChanged;
    kpiDefaultTitle?: string;
}

/**
 * Takes care of executing dataSource and rendering a CommonPresentationOverride
 * @param CommonPresentationOverride is rendered when the execution data is ready and is passed executionResponse and executionResult props
 */
export const DefaultCommonExecutionOverride: React.FC<ICommonExecutionOverrideProps> = ({
    resultSpec,
    LoadingComponent = CustomLoading,
    ErrorComponent = SmallError,
    CommonPresentationOverride,
    visTypeSpecificProps = {},
    visType,
    type,
    dataSource,
    onLoadingChanged,
    kpiDefaultTitle = null,
    ...restProps
}) => {
    const visualizationExecutionState = useDataSource(dataSource, resultSpec, onLoadingChanged);

    const { executionResult } = visualizationExecutionState.value || {};

    const normalizedExecutionState = {
        ...visualizationExecutionState,
        value:
            executionResult && executionResult.data && executionResult.data.length > 0
                ? visualizationExecutionState.value
                : null,
    };

    return (
        <StateWrapper
            {...normalizedExecutionState}
            LoadingComponent={LoadingComponent}
            ErrorComponent={ErrorComponent}
            title={kpiDefaultTitle}
        >
            {normalizedExecutionState.value && (
                <CommonPresentationOverride
                    {...normalizedExecutionState.value}
                    visType={type || visType}
                    {...restProps}
                    {...visTypeSpecificProps}
                />
            )}
        </StateWrapper>
    );
};

export interface ICustomVisualizationProps<V extends {} = {}>
    extends IVisualizationWrapperProps,
        React.CSSProperties {
    className?: string;
    visTypeSpecificProps?: V;
    CommonExecutionOverride?: typeof DefaultCommonExecutionOverride;
    CommonPresentationOverride: typeof DefaultCommonPresentationOverride;
    kpiDefaultTitle?: string;
}

export interface ICommonComponentOverrideProps {
    resultSpec: AFM.IResultSpec;
    sdk: SDK;
    dataSource: IDataSource;
}
/**
 * returns an object with override components to be used in Visualization component
 * @param visTypeSpecificProps an object with properties to pass based on visType like `{headline: {...headlineProps}}`
 * @param CommonExecutionOverride executes dataSource, handles the pending and error states and passes the execution to CommonPresentationOverride
 * @param CommonPresentationOverride renders the visualization based on executionResponse and executionResult props
 * @param header React node to render as visualization block header
 * @returns an object with BaseChartComponent, PivotTableComponent, HeadlineComponent, XirrComponent Visualization props
 */
export const getOverrideComponents = (
    visTypeSpecificProps: ICustomVisualizationProps["visTypeSpecificProps"] = {},
    CommonExecutionOverride: ICustomVisualizationProps["CommonExecutionOverride"],
    CommonPresentationOverride: ICustomVisualizationProps["CommonPresentationOverride"],
    header?: ICustomVisualizationProps["header"],
    kpiDefaultTitle?: string,
): Pick<
    IVisualizationProps,
    "BaseChartComponent" | "PivotTableComponent" | "HeadlineComponent" | "XirrComponent"
> => {
    const HeadlineComponent: React.FC<IHeadlineProps & ICommonComponentOverrideProps> = ({
        dataSource,
        ...props
    }) => {
        const visType = "headline";
        const innerProps: ICommonExecutionOverrideProps = {
            ...props,
            ...(visTypeSpecificProps[visType] || {}),
            header,
            visType,
            dataSource,
            CommonPresentationOverride,
            kpiDefaultTitle,
        };
        return <CommonExecutionOverride {...innerProps} />;
    };
    const PivotTableComponent: React.FC<IPivotTableProps & ICommonComponentOverrideProps> = () => {
        return <CustomError message="Overriding PivotTable is not supported" />;
    };
    const XirrComponent: React.FC<ICommonComponentOverrideProps> = () => {
        return <CustomError message="Overriding Xiir is not supported" />;
    };
    const BaseChartComponent: React.FC<IBaseChartProps & ICommonComponentOverrideProps> = ({
        dataSource,
        type,
        ...props
    }) => {
        const innerProps: ICommonExecutionOverrideProps = {
            ...props,
            ...(visTypeSpecificProps[type] || {}),
            visType: type,
            dataSource,
            CommonPresentationOverride,
            kpiDefaultTitle,
        };
        return <CommonExecutionOverride {...innerProps} />;
    };
    return {
        HeadlineComponent,
        PivotTableComponent,
        XirrComponent,
        BaseChartComponent,
    };
};

/**
 * A component that loads a saved visualization based on projectId and identifier, executes it and renders the data using a CommonPresentationOverride component
 * @param CommonExecutionOverride executes dataSource, handles the pending and error states and passes the execution to CommonPresentationOverride
 * @param CommonPresentationOverride renders the visualization based on executionResponse and executionResult props
 */
export const CustomVisualization: React.FC<ICustomVisualizationProps> = ({
    className,
    projectId,
    identifier,
    header = null,
    filters = [],
    sdk = defaultSdk,
    onLoadingChanged = noop,
    ErrorComponent = SmallError,
    LoadingComponent = CustomLoading,
    CommonExecutionOverride = DefaultCommonExecutionOverride,
    CommonPresentationOverride,
    children,
    withPeers = false,
    visTypeSpecificProps,
    alignCenter,
    kpiDefaultTitle = null,
    ...restProps
}) => {
    const rootClass = css({
        ...restProps,
    });

    const commonProps = {
        projectId,
        identifier,
        sdk,
        LoadingComponent,
        ErrorComponent,
        onLoadingChanged,
    };

    const overrideComponents = useMemo(() => {
        return getOverrideComponents(
            visTypeSpecificProps,
            CommonExecutionOverride,
            CommonPresentationOverride,
            header,
            kpiDefaultTitle,
        );
    }, [visTypeSpecificProps]); // Ignore the header, it would cause a too many re-renders

    const visProps: IVisualizationProps = {
        ...commonProps,
        ...overrideComponents,
        filters: filters as IVisualizationProps["filters"], // Minor mismatch in type
        experimentalVisExecution: withPeers,
    };

    return (
        <div
            className={cx(
                rootClass,
                className,
                `s-visualization-${identifier}`,
                `s-visualization-block-${identifier}`,
            )}
        >
            <BlockContent header={header} alignCenter={alignCenter}>
                <Visualization {...visProps} />
            </BlockContent>
        </div>
    );
};

export default CustomVisualization;
