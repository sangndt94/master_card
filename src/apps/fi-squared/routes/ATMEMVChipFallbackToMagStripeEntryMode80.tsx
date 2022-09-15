// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";

const ATMEMVChipFallbackToMagStripeEntryMode80: React.FC = () => {
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
                        identifier="acTBJN14hRHS"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaXDhp0Vdz5X"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="ATM EMV Transaction Volume - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aamDmVNCcKGN"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="ATM EMV Transaction Volume - ATM Region"
                        size={6}
                        projectId={projectId}
                        identifier="aczFWnTMdFw9"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Fallback Rate - ATM Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaODlZxgfxYR"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - ATM Region"
                        size={6}
                        projectId={projectId}
                        identifier="aa3DmeA2aJLb"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ATMEMVChipFallbackToMagStripeEntryMode80;
