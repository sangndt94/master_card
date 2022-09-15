// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";

const OperationalMetricsChargeback: React.FC = () => {
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
            <DateNotice projectId={projectId} />

            <VisualizationBlockBase height="auto">
                <Grid lg={2}>
                    <BlockHeading>Fraud Chargeback (BPS) and Representment Rate</BlockHeading>
                    <VisualizationWrapper
                        header={<BlockHeading>Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acAHkGaZcXIQ"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading>Non-Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aa6Hsk4acbGn"
                    />
                    <BlockHeading>Fraud Chargeback Distribution by Transaction Type</BlockHeading>
                    <VisualizationWrapper
                        header={<BlockHeading>Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abDW7tWvg0aV"
                        withPeers
                    />
                    <VisualizationWrapper
                        header={<BlockHeading>Non-Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abfW7UrvcbxD"
                        withPeers
                    />
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <Grid lg={2}>
                    <BlockHeading>All Chargeback (BPS) and Representment Rate</BlockHeading>
                    <VisualizationWrapper
                        header={<BlockHeading>Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aa4WQvONcwPL"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading>Non-Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aavWGkTLdwz1"
                    />
                    <BlockHeading>All Chargeback Distribution by Transaction Type</BlockHeading>
                    <VisualizationWrapper
                        header={<BlockHeading>Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="afbW6spohLT8"
                        withPeers
                    />
                    <VisualizationWrapper
                        header={<BlockHeading>Non-Chip</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="adPW9X5taC2Q"
                        withPeers
                    />
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default OperationalMetricsChargeback;
