// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import { Row } from "react-grid-system";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";

const OperationalMetricsOverview: React.FC = () => {
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
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>Approval Rate Trend</BlockHeading>}
                    size={12}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="aamHcZnPaiZA"
                    withPeers
                />
            </Row>
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>Top 5 Decline Reasons by % of declined transactions</BlockHeading>}
                    size={12}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="abJdFC6paW6c"
                />
            </Row>
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>Fraud Rate Trend (BPS)</BlockHeading>}
                    size={12}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="abAG5SDxaCHx"
                    withPeers
                />
            </Row>
        </Dashboard>
    );
};

export default OperationalMetricsOverview;
