// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";

const POSEMVChipFallbackToMagStripeEntryMode80: React.FC = () => {
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
                        identifier="abLF4hp9gyjq"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="abJF4bYDbS4a"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="POS EMV Transaction Volume - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaoGbOvJhi19"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="POS EMV Transaction Volume - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="abgGbDnTdCqc"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Fallback Rate - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="aciF8OhidEEH"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="aalGeitUdHc7"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default POSEMVChipFallbackToMagStripeEntryMode80;
