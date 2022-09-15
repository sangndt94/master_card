// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import useQuarter from "../hooks/useQuarter";

const AcquirerRegionFraudDeepDive: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    );
    const projectId = useProjectId();
    const { currentQuarter } = useQuarter();

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
                        header="Gross Fraud BPS - Acquiring Region"
                        size={6}
                        projectId={projectId}
                        identifier="abpQM6EIdfgA"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Net Fraud BPS - Acquiring Region"
                        size={6}
                        projectId={projectId}
                        identifier="abr4jaI5bTH6"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Approval Rates - Acquiring Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaWQNRRjhw2j"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Corridor Split by Reported Fraud USD ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaTQNVA2itSL"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Top Channel in Acquiring Region by Reported Fraud USD ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="adQQIHfzaCFZ"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Top PAN Entry Modes by Reported Fraud USD ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abXQMCEgiCQI"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerRegionFraudDeepDive;
