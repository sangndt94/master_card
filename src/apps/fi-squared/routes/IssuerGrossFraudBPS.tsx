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

const IssuerGrossFraudBPS: React.FC = () => {
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
                        header="Gross fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />
                    <VisualizationBlock
                        header="Gross fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="abesOpXvaF2z"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Indexed Approved Amount (USD)"
                        size={5}
                        projectId={projectId}
                        identifier="aansREeXivDu"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Fraud BPS change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaEVp6ZkakP4"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Fraud Distribution ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaWVoMF1hIdQ"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Approved Amount Distribution ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaDVqypTc8Kf"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default IssuerGrossFraudBPS;
