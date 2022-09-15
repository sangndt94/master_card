// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";

const POSEMVChipFallbackToVoiceEntryMode79: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "corridor",
        "cardProductType",
        "cardProductGroup",
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
                    <VisualizationBlock
                        header="Fallback Rate - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaEum8CrfQ6h"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="abyungC0gBXd"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Chip Fallback to Voice Fraud % of POS - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aeuoWP3Velej"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Chip Fallback to Voice Fraud % of POS - Merchant Region"
                        size={6}
                        projectId={projectId}
                        identifier="abAAqvzYcuV8"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Fallback Rate - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="aa4uv6k6h4PG"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaSArLZohK6z"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default POSEMVChipFallbackToVoiceEntryMode79;
