// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import useQuarter from "../hooks/useQuarter";

const POSEntryModeDeepDive: React.FC = () => {
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
                        header="Gross Fraud BPS Change by POS Entry Mode"
                        size={6}
                        projectId={projectId}
                        identifier="aad4px9OcnKl"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Top Corridors by POS Entry Mode ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abu4lZ3JdxXa"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Approval Rates Change by POS Entry Mode"
                        size={6}
                        projectId={projectId}
                        identifier="aax4pmqFcgpH"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Top Reported Fraud Types by POS Entry Mode ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abe39LHle8wH"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default POSEntryModeDeepDive;
