// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/styles";
import Kpi, { IKpiProps } from "./Kpi";

export interface IKpiGroupProps {
    kpis: IKpiProps[];
    className?: string;
}

const useStyles = makeStyles({
    root: {
        textAlign: "center",
    },
});

const KpiGroup = (props: IKpiGroupProps): JSX.Element => {
    const { kpis, className } = props;
    const classes = useStyles(props);

    return (
        <div className={cx(classes.root, className, "s-KpiGroup")}>
            {kpis.map((kpi, kpiIndex) => {
                return <Kpi {...kpi} key={kpiIndex} />;
            })}
        </div>
    );
};

export default KpiGroup;
