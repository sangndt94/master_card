// (C) 2020 GoodData Corporation
import React, { useMemo, useState, useEffect, useContext } from "react";
import cx from "classnames";
import stringify from "json-stable-stringify";
import { css } from "emotion";
import { CSSProperties } from "@material-ui/styles";
import { Visualization, Model } from "@gooddata/react-components";
import { VisualizationObject, AFM } from "@gooddata/typings";
import { BaseChart, IBaseChartProps } from "@gooddata/react-components/dist/components/core/base/BaseChart";

import defaultSdk from "../../sdk";
import CustomLoading from "../utils/CustomLoading";
import BlockContent from "../dashboardBlocks/BlockContent";
import { IVisualizationBlockBaseProps } from "../dashboardBlocks/VisualizationBlockBase";
import ExportMenu from "../controls/ExportMenu";
import { OnExportReady, IExportFunction } from "@gooddata/react-components/dist/interfaces/Events";
import { IVisualizationProps } from "@gooddata/react-components/dist/components/uri/Visualization";
import Feature from "../../featureFlags/Feature";
import { IMessage, MessagesContext } from "../../contexts/MessagesContext";

interface ISortingMeasureOverride {
    sortByMeasureIndex: number;
    direction: "desc" | "asc";
}

export interface IVisualizationWrapperProps {
    className?: string;
    sdk?: typeof defaultSdk;
    header?: IVisualizationBlockBaseProps["header"];
    footer?: React.ReactNode;
    switchTab?: React.ReactNode;
    description?: IVisualizationBlockBaseProps["description"];
    subtitle?: string | React.ReactNode;
    height?: CSSProperties["height"];
    projectId: string;
    filters?: IVisualizationProps["filters"];
    identifier: string;
    withPeers?: boolean;
    sortingOverride?: ISortingMeasureOverride[];
    enableExports?: boolean;
    exportTitle?: string;
    isPopIn?: boolean;
    [key: string]: any; // IVisualizationProps are not properly exported from react-components
    kpiDefaultTitle?: string;
}

const getPatchedSorts = (
    mdObject: VisualizationObject.IVisualizationObjectContent,
    sortingOverride: ISortingMeasureOverride[],
): AFM.SortItem[] => {
    const measures: VisualizationObject.IMeasure[] = [];
    const buckets: VisualizationObject.IBucket[] = mdObject.buckets;
    buckets.forEach((bucket) => {
        bucket.items.forEach((bucketItem) => {
            if (VisualizationObject.isMeasure(bucketItem)) {
                measures.push(bucketItem);
            }
        });
    });

    const sorts: AFM.SortItem[] = [];

    sortingOverride.forEach(({ sortByMeasureIndex, direction }) => {
        const measureAtIndex = measures[sortByMeasureIndex];
        if (measureAtIndex) {
            const measureLocalIdentifier = measureAtIndex.measure.localIdentifier;
            sorts.push(Model.measureSortItem(measureLocalIdentifier, direction));
        } else {
            // tslint:disable-next-line:no-console
            console.warn(
                `There is no measure of index ${sortByMeasureIndex}. There are only ${measures.length} measures found.`,
            );
        }
    });

    return sorts;
};

const getPatchedBaseChartComponent = (sortingOverride: ISortingMeasureOverride[]) => {
    if (sortingOverride.length === 0) {
        return BaseChart;
    }
    return (props: IBaseChartProps) => {
        const patchedResultSpec = {
            ...props.resultSpec,
            sorts: getPatchedSorts(props.config.mdObject, sortingOverride),
        };
        return <BaseChart {...props} resultSpec={patchedResultSpec} />;
    };
};

const classes = {
    VisualizationWrapper: css({
        position: "relative",
    }),
};

const getExportProgressMessage = (isPopIn: boolean = false): IMessage => ({
    id: "exportProgressMessage",
    type: "progress",
    text: "Export in progress...",
    isPopIn,
});

const getExportSuccessfulMessage = (isPopIn: boolean = false): IMessage => ({
    id: "exportSuccessfulMessage",
    type: "success",
    text: "Export successfully done!",
    isPopIn,
});

const getExportFailedMessage = (isPopIn: boolean = false): IMessage => ({
    id: "exportFailedMessage",
    type: "error",
    text: "Export failed",
    isPopIn,
});

const messageTimeout = 10000;

const VisualizationWrapper: React.FC<IVisualizationWrapperProps & React.CSSProperties> = ({
    height,
    header,
    footer,
    switchTab,
    description,
    subtitle,
    className = "",
    projectId,
    identifier,
    filters = [],
    sortingOverride = [],
    withPeers = false,
    drillableItems,
    locale,
    fetchVisObject,
    fetchVisualizationClass,
    BaseChartComponent,
    LoadingComponent = CustomLoading,
    ErrorComponent,
    onLegendReady,
    onError,
    onLoadingChanged,
    onLoadingFinish,
    afterRender,
    pushData,
    config,
    enableExports,
    exportTitle,
    isPopIn = false,
    sdk = defaultSdk,
    ...restProps
}) => {
    const visualizationProps = {
        sdk,
        projectId,
        filters,
        drillableItems,
        identifier,
        locale,
        fetchVisObject,
        fetchVisualizationClass,
        BaseChartComponent,
        LoadingComponent,
        ErrorComponent,
        onLegendReady,
        onError: () => setInitiateExport(undefined),
        onLoadingChanged,
        onLoadingFinish,
        afterRender,
        pushData,
        config,
    };
    const patchedBaseChartComponent = useMemo(() => {
        return getPatchedBaseChartComponent(sortingOverride);
    }, [stringify(sortingOverride)]);

    const [initiateExport, setInitiateExport] = useState<IExportFunction | undefined>(undefined);
    const { addMessage, removeMessage } = useContext(MessagesContext);

    useEffect(() => {
        setInitiateExport(undefined);
    }, [filters, projectId, identifier, withPeers]);

    const heightClass = height
        ? css({
              height,
              position: "relative",
          })
        : null;

    const exportMenu =
        enableExports && initiateExport ? (
            <Feature flag="enableExportFeature" value={true}>
                <ExportMenu
                    onExport={(format) => {
                        addMessage(getExportProgressMessage(isPopIn));
                        initiateExport({
                            title:
                                exportTitle ||
                                (header && typeof header === "string" && header.toString()) ||
                                undefined,
                            format,
                            mergeHeaders: true,
                            includeFilterContext: true,
                            showFilters: true,
                        })
                            .then((exportResponse) => {
                                if (typeof window !== "undefined") {
                                    window.open(exportResponse.uri);
                                }
                                removeMessage(getExportProgressMessage().id);
                                addMessage(getExportSuccessfulMessage(isPopIn), messageTimeout);
                            })
                            .catch(() => {
                                addMessage(getExportFailedMessage(isPopIn), messageTimeout);
                            });
                    }}
                />
            </Feature>
        ) : null;

    const onExportReady: OnExportReady = (exportFunction) => {
        setInitiateExport(() => exportFunction);
    };

    return (
        <div
            className={cx(
                classes.VisualizationWrapper,
                className,
                css({
                    ...restProps,
                }),
                `s-visualization-${identifier}`,
            )}
        >
            <BlockContent
                header={header}
                footer={footer}
                switchTab={switchTab}
                description={description}
                subtitle={subtitle}
                controls={exportMenu}
            >
                <div className={heightClass}>
                    <Visualization
                        BaseChartComponent={patchedBaseChartComponent}
                        sdk={sdk}
                        experimentalVisExecution={withPeers}
                        onExportReady={enableExports ? onExportReady : undefined}
                        {...visualizationProps}
                    />
                </div>
            </BlockContent>
        </div>
    );
};

export const testingInterface = {
    getPatchedBaseChartComponent,
    getPatchedSorts,
};

export default VisualizationWrapper;
