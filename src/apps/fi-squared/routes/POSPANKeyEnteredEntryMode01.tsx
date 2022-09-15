// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";

const POSPANKeyEnteredEntryMode01: React.FC = () => {
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
                        header="PKE Fallback Rate - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aa1GAyHteYS9"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="acgAvYBOc09y"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="PKE Transaction Volume - Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aa0AB6ifeSlx"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="PKE Transaction Volume - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="acmAx7WhbBcS"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="PKE Fallback Rate - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="abzAxvHsb32L"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS - POS Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaxACPgohALO"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default POSPANKeyEnteredEntryMode01;
