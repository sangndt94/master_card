// (C) 2020 GoodData Corporation
import React from "react";
import { css } from "emotion";
import { Container } from "react-grid-system";

import { useFilters, filterList } from "../contexts/FilterStateContext";
import styleGuide from "../../../components/styleGuide/styleGuide";
import useProjectId from "../hooks/useProjectId";
import DashboardContent from "../../../components/dashboardBlocks/DashboardContent";
import MainFilterSelect from "../../../components/controls/MainFilterSelect";
import CustomLoading from "../../../components/utils/CustomLoading";
import { isFilterFinished, getFirstPendingFilter } from "../../../components/filters/utils";
import Glossary from "../../../components/glossary/Glossary";
import HeaderLinks from "../../../components/utils/HeaderLinks";

const classes = {
    header: css({
        position: "relative",
        boxSizing: "border-box",
        flex: "0 0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: styleGuide.spacing(1, 2),
        backgroundColor: styleGuide.color.mainBackground,
        margin: 0,
        zIndex: 30,
        boxShadow: styleGuide.shadow.low,
    }),
    attributeFilterWrapper: css({
        zIndex: 30,
        flex: "0 1 auto",
        maxWidth: "calc(100% - 112px)", // this is the container width minus all horizontal margins inside the container
    }),
};

const Dashboard: React.FC<{ filterBar?: React.ReactNode }> = ({ children, filterBar }) => {
    const { filters } = useFilters(...filterList);
    const projectId = useProjectId();

    const cidFilter = filters[0];
    const isCidReady = isFilterFinished(cidFilter);
    const pendingFilter = getFirstPendingFilter(filters);
    const allFiltersReady = !pendingFilter;
    return (
        <>
            <div className={classes.header}>
                <div className={classes.attributeFilterWrapper}>
                    <MainFilterSelect
                        filter={cidFilter}
                        projectId={projectId}
                        updateFilter={(values) => cidFilter.onChange(values)}
                    />
                </div>
                <HeaderLinks />
            </div>
            {isCidReady ? filterBar : null}
            <DashboardContent>
                {allFiltersReady ? (
                    <Container fluid className="s-dashboard-content">
                        {children}
                    </Container>
                ) : (
                    <CustomLoading
                        height="100%"
                        className="s-dashboard-loading"
                        label={`Loading ${pendingFilter.placeholder}`}
                    />
                )}
            </DashboardContent>
            <Glossary />
        </>
    );
};

export default Dashboard;
