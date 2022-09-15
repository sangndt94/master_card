// (C) 2007-2020 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import Kpi, { IKpiProps } from "./Kpi";
import { css } from "emotion";
import { ICommonPresentationOverrideProps } from "./CustomVisualization";
import { getKpiPropsFromExecution } from "./KpiGroupVisualization";
import Typography from "../utils/Typography";
import { normalHeight } from "../dashboardBlocks/VisualizationBlockBase";

const classes = {
    NineGroupVisualization: css({
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "repeat(3,1fr)",
        height: normalHeight,
    }),
};

export interface INineGroupProps {
    kpis: IKpiProps[];
    className?: string;
}

export const rowHeaders = ["Txns", "Fraud", "Declines"];
const suffixes = [undefined, "Txns", "Rate"];

const NineGroup = (props: INineGroupProps): JSX.Element => {
    const { kpis, className } = props;
    return (
        <div className={cx(classes.NineGroupVisualization, className)}>
            {kpis.map((kpi, kpiIndex) => {
                // header
                const rowHeader = kpiIndex % 3 == 0 && (
                    <Typography variant="menuGroupTitle" Component="span" key={`header-${kpiIndex / 3}`}>
                        {rowHeaders[kpiIndex / 3]}
                    </Typography>
                );

                // content
                return (
                    <React.Fragment key={kpiIndex}>
                        {rowHeader}
                        <Kpi
                            afterContent={
                                <Typography variant="subtitle" Component="span">
                                    &ensp;{suffixes[kpiIndex % 3]}
                                </Typography>
                            }
                            typographyVariant="productTitle"
                            value={kpi.value}
                            format={kpi.format}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export const NineGroupPresentation: React.FC<ICommonPresentationOverrideProps> = ({
    executionResponse,
    executionResult,
}) => {
    const kpis = useMemo(() => {
        return getKpiPropsFromExecution(executionResponse, executionResult);
    }, [executionResponse, executionResult]);

    return <NineGroup kpis={kpis} />;
};
