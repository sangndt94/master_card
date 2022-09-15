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

const OperationalMetricsFraud: React.FC = () => {
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
                    header={<BlockHeading>Fraud Distribution by Transaction Type</BlockHeading>}
                    size={12}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="aaJHkjczasLf"
                    withPeers
                />
            </Row>
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>Fraud Distribution by Type - Chip</BlockHeading>}
                    size={6}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="aauWojKTaoCf"
                    withPeers
                />
                <VisualizationBlock
                    header={<BlockHeading>Fraud Distribution by Type - Non-Chip</BlockHeading>}
                    size={6}
                    height={tallHeight}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="ackWndITagOj"
                    withPeers
                />
            </Row>
        </Dashboard>
    );
};

export default OperationalMetricsFraud;
