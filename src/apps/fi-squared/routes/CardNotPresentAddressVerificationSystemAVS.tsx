// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import useQuarter from "../hooks/useQuarter";

const CardNotPresentAddressVerificationSystemAVS: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "channel",
        "cardProductType",
        "cardProductGroup",
        "corridor",
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
                        header={`Gross Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaX6v2xPhRs8"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`AVS % Approved Transactions ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abK6CNaTaJQB"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Decline Rates ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abS6udLge3fa"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default CardNotPresentAddressVerificationSystemAVS;
