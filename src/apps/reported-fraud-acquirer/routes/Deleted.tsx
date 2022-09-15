// (C) 2020 GoodData Corporation
import { css } from "emotion";
import React, { useState, useContext } from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import DateSwitch from "../../../components/dashboardBlocks/DateSwitch";
import { LoadingComponent } from "@gooddata/react-components";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import styleGuide from "../../../components/styleGuide/styleGuide";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import {
    getClearAndReinitializeFilters,
    useInitializeStatusFilter,
    DELETED_STATUS,
} from "../hooks/filtersHooks";

const classes = {
    headingWithLink: css({
        display: "flex",
        justifyContent: "space-between",
    }),
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
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

const Deleted: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
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

    useInitializeStatusFilter(projectId, [DELETED_STATUS], filters, setIsStatusLoading);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [DELETED_STATUS],
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
                        <VisualizationBlockBase height="auto" alignContent={true}>
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="aaUJltaacheK"
                                filters={visFilters}
                                kpiDefaultTitle="Transaction Count"
                            />
                        </VisualizationBlockBase>
                        {useTransactionDate ? (
                            <VisualizationBlockBase height="auto">
                                <VisualizationWrapper
                                    header={<BlockHeading>Transactions by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aaAGM4Uehdc9"
                                    height={tallHeight}
                                />
                            </VisualizationBlockBase>
                        ) : (
                            <VisualizationBlockBase height="auto">
                                <VisualizationWrapper
                                    header={<BlockHeading>Transactions by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aacGSwlpbrvX"
                                    height={tallHeight}
                                />
                            </VisualizationBlockBase>
                        )}
                    </Grid>

                    <Grid lg={1}>
                        <VisualizationBlockBase height="auto">
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
                                exportTitle="Transaction Details - Deleted Transactions"
                            />
                        </VisualizationBlockBase>
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Deleted;
