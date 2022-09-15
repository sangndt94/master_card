// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const IssuerNetFraudBPS: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    );
    const projectId = useProjectId();
    const { currentQuarter, currentVsPreviousQuarter } = useQuarter();

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
                        header="Net Fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="ad6sm6VWfdSO"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header="Net Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="aaYVzz29hod0"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud Absorbed by Issuer"
                        size={5}
                        projectId={projectId}
                        identifier="abbVyXnxh19K"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Net Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acxVwN5Tb8P5"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Net Fraud Distribution ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acPVw22lcnMA"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Net Chargeback Distribution ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abwVxMjKhogX"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default IssuerNetFraudBPS;
