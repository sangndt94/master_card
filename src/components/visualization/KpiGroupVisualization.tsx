// (C) 2007-2020 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import CustomVisualization, { ICommonPresentationOverrideProps } from "./CustomVisualization";
import { IVisualizationWrapperProps } from "./VisualizationWrapper";
import { IKpiProps } from "./Kpi";
import { Execution } from "@gooddata/typings";
import KpiGroup from "./KpiGroup";
import { css } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import Typography from "../utils/Typography";
import { defaultNumberFormat } from "./CustomHeadline";
import { parseData } from "../../utils/format";

export interface IKpiGroupVisualizationProps
    extends Pick<
        IVisualizationWrapperProps,
        "identifier" | "projectId" | "className" | "withPeers" | "filters" | "height" | "kpiDefaultTitle"
    > {}

const classes = {
    kpiGroupMainKpi: css({
        display: "block",
        padding: styleGuide.spacing(0.5, 1),
        margin: "0 auto",
    }),
    kpiGroupSmallKpi: css({
        display: "inline-block",
        padding: styleGuide.spacing(0.5, 1),
    }),
    kpiGroupSmallLabel: css({
        color: styleGuide.typography.color.secondary,
    }),
    KpiGroupVisualization: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: styleGuide.spacing(-0.5, -1),
    }),
};

export const getKpiPropsFromExecution = (
    executionResponse: Execution.IExecutionResponse,
    executionResult: Execution.IExecutionResult,
): IKpiProps[] => {
    const rows = executionResult.data as Execution.DataValue[][];
    const rowDimensionIndex = 0;
    const itemIndex = 0;
    return rows.map((row, rowIndex) => {
        const isFirst = rowIndex === 0;
        const unparsedValue = row[0];
        const value = parseData(unparsedValue);
        const measureGroupHeader = executionResponse?.dimensions[rowDimensionIndex]?.headers[
            itemIndex
        ] as any;
        const format =
            measureGroupHeader?.measureGroupHeader?.items[rowIndex]?.measureHeaderItem?.format ||
            defaultNumberFormat;
        const measureHeader = executionResult.headerItems[rowDimensionIndex][itemIndex][rowIndex] as any;
        const measureTitle: string | null =
            measureHeader && measureHeader.measureHeaderItem ? measureHeader.measureHeaderItem.name : null;
        const kpi: IKpiProps = isFirst
            ? {
                  beforeContent: measureTitle ? (
                      <Typography variant="kpiCaption" Component="div">
                          {measureTitle}
                      </Typography>
                  ) : null,
                  value,
                  format,
                  responsive: true,
                  className: classes.kpiGroupMainKpi,
              }
            : {
                  afterContent: (
                      <Typography
                          variant="kpiCaption"
                          Component="span"
                          className={classes.kpiGroupSmallLabel}
                      >
                          &ensp;{measureTitle}
                      </Typography>
                  ),
                  value,
                  format,
                  typographyVariant: "kpiCaption",
                  className: classes.kpiGroupSmallKpi,
              };
        return kpi;
    });
};

export const KpiGroupPresentation: React.FC<ICommonPresentationOverrideProps> = ({
    executionResponse,
    executionResult,
}) => {
    const kpis = useMemo(() => {
        return getKpiPropsFromExecution(executionResponse, executionResult);
    }, [executionResponse, executionResult]);

    return <KpiGroup kpis={kpis} />;
};

const KpiGroupVisualization: React.FC<IKpiGroupVisualizationProps> = (props) => {
    const { identifier, height, projectId, withPeers, className, filters = [], kpiDefaultTitle } = props;
    const passedProps = {
        identifier,
        projectId,
        withPeers,
        filters,
        kpiDefaultTitle,
    };

    const heightClassName = height ? css({ height }) : null;

    return (
        <div
            className={cx(
                classes.KpiGroupVisualization,
                className,
                heightClassName,
                "s-KpiGroupVisualization",
            )}
        >
            <CustomVisualization {...passedProps} CommonPresentationOverride={KpiGroupPresentation} />
        </div>
    );
};

export default KpiGroupVisualization;
