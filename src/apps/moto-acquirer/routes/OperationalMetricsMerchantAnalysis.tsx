// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import Grid from "../../../components/utils/Grid";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";

const OperationalMetricsMerchantAnalysis: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIca_parent",
        "cidAndIca_child",
        "country",
    );
    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndIca_parent"])}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <DateNotice projectId={projectId} laggedMonthOnly />
            <DashboardBlock>
                <BlockHeading textAlign="center">Top merchants by fraud amount</BlockHeading>
                <Grid lg={2}>
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">MO/TO</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abR9DFmidevj"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">Other CNP</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acf9Pv09bDPO"
                    />
                </Grid>
            </DashboardBlock>
            <DashboardBlock>
                <BlockHeading textAlign="center">Top merchants by fraud chargeback amount</BlockHeading>
                <Grid lg={2}>
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">MO/TO</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aazEECAIb9Ib"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">Other CNP</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aboVdI4PhqOG"
                    />
                </Grid>
            </DashboardBlock>
            <DashboardBlock>
                <BlockHeading textAlign="center">Top merchants by all chargeback amount</BlockHeading>
                <Grid lg={2}>
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">MO/TO</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aabVAlXybozR"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading textAlign="center">Other CNP</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaiWlUC8gr7Z"
                    />
                </Grid>
            </DashboardBlock>
        </Dashboard>
    );
};

export default OperationalMetricsMerchantAnalysis;
