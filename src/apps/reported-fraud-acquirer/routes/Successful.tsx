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
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import { LoadingComponent } from "@gooddata/react-components";
import Button from "../../../components/controls/Button";
import { IconList } from "../../../components/icon";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import VisualizationPopIn from "../../../components/dashboardBlocks/VisualizationPopIn";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import styleGuide from "../../../components/styleGuide/styleGuide";
import {
    getClearAndReinitializeFilters,
    useInitializeStatusFilter,
    SUCCESS_STATUS,
    useIsDateFilterCurrentYear,
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

const Successful: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
    const [displayPopIn, setDisplayPopIn] = useState(false);
    const dateFilter = getDateFilter(useTransactionDate);
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        `${dateFilter}_parent`,
        `${dateFilter}_child`,
        "fraudType",
        "merchantName",
        "acquirer",
        "issuer",
        "mcc",
        "usTransAmountBucket",
        "cardProduct",
        "securityCode",
        "cardholderPresence",
        "statusAndCardPresence_parent",
        "statusAndCardPresence_child",
    );

    const [isStatusLoading, setIsStatusLoading] = useState(true);
    const [isDateFilterCurrentYear, setIsDateFilterCurrentYear] = useState(true);

    useInitializeStatusFilter(projectId, [SUCCESS_STATUS], filters, setIsStatusLoading);
    useIsDateFilterCurrentYear(projectId, dateFilter, visFilters, setIsDateFilterCurrentYear);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [SUCCESS_STATUS],
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
                    <Grid lg={4}>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="abYIRExzhLzo"
                                filters={visFilters}
                                kpiDefaultTitle="Total Transactions"
                            />
                        </VisualizationBlockBase>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="abJIRa3LbJwm"
                                filters={visFilters}
                                kpiDefaultTitle="AVG Time to Report"
                            />
                        </VisualizationBlockBase>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="acOIQjUwauSX"
                                filters={visFilters}
                                kpiDefaultTitle="Fraud GDV"
                            />
                        </VisualizationBlockBase>
                        <VisualizationBlockBase height="auto">
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="abEIRbGUbH5w"
                                filters={visFilters}
                                kpiDefaultTitle="AVG Fraud Loss"
                            />
                        </VisualizationBlockBase>
                    </Grid>

                    {useTransactionDate ? (
                        <>
                            <Grid lg={2}>
                                <VisualizationBlock
                                    header={<BlockHeading>Transactions by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aaYqgBrAgKql"
                                />
                                <VisualizationBlock
                                    header={<BlockHeading>Avg Time to Report by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aayTuPFNdZr1"
                                />
                            </Grid>
                            <Grid lg={2}>
                                <VisualizationBlock
                                    header={<BlockHeading>Fraud GDV by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="acNsqGRban4v"
                                />
                                <VisualizationBlock
                                    header={<BlockHeading>Avg Fraud Loss by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="abPsy6ZgdTwt"
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid lg={2}>
                                <VisualizationBlock
                                    header={<BlockHeading>Transactions by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aa5qhgorgPQV"
                                />
                                <VisualizationBlock
                                    header={<BlockHeading>Avg Time to Report by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="abKTo5ynaupm"
                                />
                            </Grid>
                            <Grid lg={2}>
                                <VisualizationBlock
                                    header={<BlockHeading>Fraud GDV by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aavsBDcOiqkP"
                                />
                                <VisualizationBlock
                                    header={<BlockHeading>Avg Fraud Loss by Month</BlockHeading>}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aa4sDdMhhA2x"
                                />
                            </Grid>
                        </>
                    )}

                    {isDateFilterCurrentYear ? (
                        useTransactionDate ? (
                            <Grid lg={3}>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aaQFVW0af7ZG"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Merchants"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aa5FVR9WcSTC"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Issuers"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aaUFVQBTbu6j"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Acquirers"
                                    />
                                </VisualizationBlockBase>
                            </Grid>
                        ) : (
                            <Grid lg={3}>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aa1FVRv6f1nU"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Merchants"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aaMFSBQ3gNst"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Issuers"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aaGFVW0afqlD"
                                        filters={visFilters}
                                        kpiDefaultTitle="Total Acquirers"
                                    />
                                </VisualizationBlockBase>
                            </Grid>
                        )
                    ) : (
                        <Grid lg={3}>
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aaQFSURqdG9k"
                                    filters={visFilters}
                                    kpiDefaultTitle="Total Merchants"
                                />
                            </VisualizationBlockBase>
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aaOFVYlbfI1s"
                                    filters={visFilters}
                                    kpiDefaultTitle="Total Issuers"
                                />
                            </VisualizationBlockBase>
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aawFSEg5hjvZ"
                                    filters={visFilters}
                                    kpiDefaultTitle="Total Acquirers"
                                />
                            </VisualizationBlockBase>
                        </Grid>
                    )}

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Fraud Type</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaNqkBBAbPwf"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Card Product</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaQqkK0ebpLs"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Secure Code</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa9qgz8ccbZn"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Card Presence</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa7qhZlQa5s7"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Cardholder Presence</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aboqgIp1ixK5"
                        />
                        <VisualizationBlock
                            header={
                                <BlockHeading className={classes.headingWithLink}>
                                    Transactions by MCC - Top 15
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
                            identifier="abeqk4ZrfRuy"
                        />
                    </Grid>

                    {displayPopIn && (
                        <VisualizationPopIn setDisplayPopIn={setDisplayPopIn}>
                            <VisualizationWrapper
                                header={<BlockHeading>Transactions by MCC - Full list</BlockHeading>}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abnrNQZxel3p"
                                height={tallHeight}
                                enableExports={true}
                                isPopIn={true}
                                exportTitle="Transactions by MCC - Successful Transactions"
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
                                identifier="aadO1Dngix8V"
                                height={tallHeight}
                                enableExports={true}
                                exportTitle="Transaction Details - Successful Transactions"
                            />
                        </DashboardBlock>
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Successful;
