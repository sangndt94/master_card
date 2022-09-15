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
import Button from "../../../components/controls/Button";
import { IconList } from "../../../components/icon";
import VisualizationPopIn from "../../../components/dashboardBlocks/VisualizationPopIn";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import { LoadingComponent } from "@gooddata/react-components";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import styleGuide from "../../../components/styleGuide/styleGuide";
import {
    getClearAndReinitializeFilters,
    REJECTED_STATUS,
    useInitializeStatusFilter,
} from "../hooks/filtersHooks";

const classes = {
    headingWithLink: css({
        display: "flex",
        justifyContent: "space-between",
    }),
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

const Rejected: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
    const [displayPopIn, setDisplayPopIn] = useState(false);
    const dateFilter = getDateFilter(useTransactionDate);
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        `${dateFilter}_parent`,
        `${dateFilter}_child`,
        "errorCode",
        "submissionType",
        "cardProduct",
        "securityCode",
        "cardholderPresence",
        "statusAndCardPresence_parent",
        "statusAndCardPresence_child",
    );

    const [isStatusLoading, setIsStatusLoading] = useState(true);

    useInitializeStatusFilter(projectId, [REJECTED_STATUS], filters, setIsStatusLoading);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [REJECTED_STATUS],
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
                    <Grid lg={3}>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="aaqGm6qHe1jd"
                                filters={visFilters}
                                kpiDefaultTitle="Total Transactions"
                            />
                        </VisualizationBlockBase>
                        {useTransactionDate ? (
                            <>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aaOGBYCze6sW"
                                        filters={visFilters}
                                        kpiDefaultTitle="Longest Outstanding Transaction"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="ac76UMnTdv6e"
                                        filters={visFilters}
                                        kpiDefaultTitle="Average Correction Time"
                                    />
                                </VisualizationBlockBase>
                            </>
                        ) : (
                            <>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aa6Gytdhh3sW"
                                        filters={visFilters}
                                        kpiDefaultTitle="Longest Outstanding Transaction"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="abv6YJWzbXqc"
                                        filters={visFilters}
                                        kpiDefaultTitle="Average Correction Time"
                                    />
                                </VisualizationBlockBase>
                            </>
                        )}
                    </Grid>

                    <Grid lg={2} sm={2}>
                        {useTransactionDate ? (
                            <VisualizationBlock
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaAGM4Uehdc9"
                            />
                        ) : (
                            <VisualizationBlock
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aacGSwlpbrvX"
                            />
                        )}
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Submission Type</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa5GFdfQhhgC"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={
                                <BlockHeading className={classes.headingWithLink}>
                                    Transactions by Error Code - Top 15
                                    <Button
                                        onClick={() => setDisplayPopIn(true)}
                                        variant="text"
                                        color="textMain"
                                        endIcon={<IconList height="1em" width="1.143em" />}
                                    >
                                        See Full List
                                    </Button>
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa0ZaZG0dS11"
                        />
                        {useTransactionDate ? (
                            <VisualizationBlock
                                header={<BlockHeading>Outstanding Rejects</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abqGp4LyeNX6"
                            />
                        ) : (
                            <VisualizationBlock
                                header={<BlockHeading>Outstanding Rejects</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaw7EMVxeQFj"
                            />
                        )}
                    </Grid>

                    {displayPopIn && (
                        <VisualizationPopIn setDisplayPopIn={setDisplayPopIn}>
                            <VisualizationWrapper
                                header={<BlockHeading>Transactions by Error Code - Full List</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaoGnIR3hShi"
                                height={tallHeight}
                                enableExports={true}
                                isPopIn={true}
                                exportTitle="Transactions by Error Code - Rejected Transactions"
                            />
                        </VisualizationPopIn>
                    )}

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
                                exportTitle="Transaction Details - Rejected Transactions"
                            />
                        </DashboardBlock>
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Rejected;
