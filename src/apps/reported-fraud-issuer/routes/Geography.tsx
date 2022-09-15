// (C) 2020 GoodData Corporation
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
import GeoChart from "../../../components/dashboardBlocks/GeoChart";
import DateSwitch from "../../../components/dashboardBlocks/DateSwitch";
import { LoadingComponent } from "@gooddata/react-components";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import {
    getClearAndReinitializeFilters,
    useInitializeStatusFilter,
    useIsDateFilterCurrentYear,
    SUCCESS_STATUS,
} from "../hooks/filtersHooks";

const Geography: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
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
        "posEntryMode",
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
                    {isDateFilterCurrentYear ? (
                        useTransactionDate ? (
                            <Grid lg={2}>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="abcJk4h3eYsp"
                                        filters={visFilters}
                                        kpiDefaultTitle="Transaction Count"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aagJldAkfCol"
                                        filters={visFilters}
                                        kpiDefaultTitle="Dollar Amount"
                                    />
                                </VisualizationBlockBase>
                            </Grid>
                        ) : (
                            <Grid lg={2}>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aa8JiSbOdhcW"
                                        filters={visFilters}
                                        kpiDefaultTitle="Transaction Count"
                                    />
                                </VisualizationBlockBase>
                                <VisualizationBlockBase height="auto">
                                    <KpiGroupVisualization
                                        projectId={projectId}
                                        identifier="aadJiMEHbpNq"
                                        filters={visFilters}
                                        kpiDefaultTitle="Dollar Amount"
                                    />
                                </VisualizationBlockBase>
                            </Grid>
                        )
                    ) : (
                        <Grid lg={2}>
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aaUJltaacheK"
                                    filters={visFilters}
                                    kpiDefaultTitle="Transaction Count"
                                />
                            </VisualizationBlockBase>
                            <VisualizationBlockBase height="auto">
                                <KpiGroupVisualization
                                    projectId={projectId}
                                    identifier="aabJiZDZa4Bl"
                                    filters={visFilters}
                                    kpiDefaultTitle="Dollar Amount"
                                />
                            </VisualizationBlockBase>
                        </Grid>
                    )}

                    <Grid lg={2}>
                        <VisualizationBlockBase
                            header={<BlockHeading>Transactions by Issuer Country</BlockHeading>}
                            height={tallHeight}
                        >
                            <GeoChart projectId={projectId} identifier="aamiX1opgSHa" filters={visFilters} />
                        </VisualizationBlockBase>
                        <VisualizationBlockBase
                            header={<BlockHeading>Dollar Amount by Issuer Country</BlockHeading>}
                            height={tallHeight}
                        >
                            <GeoChart projectId={projectId} identifier="aazi146MfuvU" filters={visFilters} />
                        </VisualizationBlockBase>
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlockBase
                            header={<BlockHeading>Transactions by Merchant Country</BlockHeading>}
                            height={tallHeight}
                        >
                            <GeoChart projectId={projectId} identifier="aayiYnYjdNMg" filters={visFilters} />
                        </VisualizationBlockBase>
                        <VisualizationBlockBase
                            header={<BlockHeading>Dollar Amount by Merchant Country</BlockHeading>}
                            height={tallHeight}
                        >
                            <GeoChart projectId={projectId} identifier="aahiZHT9fMnF" filters={visFilters} />
                        </VisualizationBlockBase>
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Geography;
