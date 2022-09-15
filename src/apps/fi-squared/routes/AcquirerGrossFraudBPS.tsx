// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const AcquirerGrossFraudBPS: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "corridor",
        "creditOrDebit",
        "PANEntryMode",
    );
    const projectId = useProjectId();

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    projectId={projectId}
                    filters={filters}
                    clearFilters={clearFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <Container fluid className="s-dashboard-content">
                <Row>
                    <HeadlineVisualizationBlock
                        header="Gross Fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="abE2019Hguyx"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Approved Amount (USD)"
                        size={5}
                        projectId={projectId}
                        identifier="abN6dSstcStU"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Fraud BPS Change"
                        size={6}
                        projectId={projectId}
                        identifier="acq20NhPcKV9"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud Distribution"
                        size={6}
                        projectId={projectId}
                        identifier="acA20HvGcZ5A"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Approved Amount Distribution"
                        size={6}
                        projectId={projectId}
                        identifier="aay25w5tevsC"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerGrossFraudBPS;
