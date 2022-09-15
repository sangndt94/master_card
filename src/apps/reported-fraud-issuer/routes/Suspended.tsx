// (C) 2020 GoodData Corporation
import { css } from "emotion";
import React, { useState, useContext } from "react";
import useProjectId from "../hooks/useProjectId";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateSwitch from "../../../components/dashboardBlocks/DateSwitch";
import { LoadingComponent } from "@gooddata/react-components";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import styleGuide from "../../../components/styleGuide/styleGuide";
import {
    getClearAndReinitializeFilters,
    useInitializeStatusFilter,
    SUSPENDED_STATUS,
} from "../hooks/filtersHooks";

const classes = {
    transactionsTotal: css({
        display: "inline-block",
        minWidth: "2em",
        minHeight: "1em",
        // override all internal headline fontSize and height styles to display as inline text
        div: {
            fontSize: `${styleGuide.typography.fontSize.subtitle}px !important`,
            maxHeight: "1em",
            padding: 0,
        },
        "*": {
            margin: "0 !important",
            padding: "0 !important",
        },
    }),
};

const Suspended: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
    const dateFilter = getDateFilter(useTransactionDate);
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        `${dateFilter}_parent`,
        `${dateFilter}_child`,
        "suspendReason",
        "cardProduct",
        "securityCode",
        "cardholderPresence",
        "statusAndCardPresence_parent",
        "statusAndCardPresence_child",
    );

    const [isStatusLoading, setIsStatusLoading] = useState(true);

    useInitializeStatusFilter(projectId, [SUSPENDED_STATUS], filters, setIsStatusLoading);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [SUSPENDED_STATUS],
        filters,
        setIsStatusLoading,
    );

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters}
                    projectId={projectId}
                    clearFilters={clearAndReinitializeFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    filterSwitch={
                        <DateSwitch
                            useTransactionDate={useTransactionDate}
                            setUseTransactionDate={setUseTransactionDate}
                        />
                    }
                />
            }
        >
            {isStatusLoading ? (
                <LoadingComponent />
            ) : (
                <Container fluid className="s-dashboard-content">
                    <Grid lg={2}>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="aaqGm6qHe1jd"
                                filters={visFilters}
                                kpiDefaultTitle="Total Transactions"
                            />
                        </VisualizationBlockBase>
                        {useTransactionDate ? (
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aaOGBYCze6sW"
                                    filters={visFilters}
                                    kpiDefaultTitle="Longest Outstanding Transaction"
                                />
                            </VisualizationBlockBase>
                        ) : (
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aa6Gytdhh3sW"
                                    filters={visFilters}
                                    kpiDefaultTitle="Longest Outstanding Transaction"
                                />
                            </VisualizationBlockBase>
                        )}
                    </Grid>

                    {useTransactionDate ? (
                        <Grid lg={2}>
                            <VisualizationBlockBase height="auto" alignContent={true}>
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="ac76UMnTdv6e"
                                    filters={visFilters}
                                    kpiDefaultTitle="Average Correction Time"
                                />
                            </VisualizationBlockBase>
                            <VisualizationBlock
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaAGM4Uehdc9"
                            />
                        </Grid>
                    ) : (
                        <Grid lg={2}>
                            <VisualizationBlockBase height="auto" alignContent={true}>
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="abv6YJWzbXqc"
                                    filters={visFilters}
                                    kpiDefaultTitle="Average Correction Time"
                                />
                            </VisualizationBlockBase>
                            <VisualizationBlock
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aacGSwlpbrvX"
                            />
                        </Grid>
                    )}

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Suspend Reason</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aevgOJxKg87K"
                        />
                        {useTransactionDate ? (
                            <VisualizationBlock
                                header={<BlockHeading>Outstanding Suspends</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abqGp4LyeNX6"
                            />
                        ) : (
                            <VisualizationBlock
                                header={<BlockHeading>Outstanding Suspends</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaw7EMVxeQFj"
                            />
                        )}
                    </Grid>

                    <Grid lg={1}>
                        <DashboardBlock>
                            <VisualizationWrapper
                                header={<BlockHeading>Transaction Details</BlockHeading>}
                                subtitle={
                                    <BlockHeading variant="subtitle">
                                        Total of&nbsp;
                                        <HeadlineVisualization
                                            projectId={projectId}
                                            filters={visFilters}
                                            errorComponent={SmallError}
                                            identifier="aaqGm6qHe1jd"
                                            className={classes.transactionsTotal}
                                        />
                                        &nbsp;transactions. Up to 10,000 transactions are listed.
                                    </BlockHeading>
                                }
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aapO7E2DiCle"
                                height={tallHeight}
                                enableExports={true}
                                exportTitle="Transaction Details - Suspended Transactions"
                            />
                        </DashboardBlock>
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Suspended;
