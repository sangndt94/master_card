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

const IssuerCorridors: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    );
    const projectId = useProjectId();
    const { currentVsPreviousQuarter } = useQuarter();

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
                        header="Domestic Gross Fraud BPS"
                        size={10}
                        projectId={projectId}
                        identifier="acRVxgGLcijU"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Cross Border Intra-regional Gross Fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="aaeVFxCXfHQx"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Cross Border Inter-regional Gross Fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="aaxVFuLwfxpz"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Domestic Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaeVKfZsgrJl"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="aeaVFms4f7qJ"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Intra-regional Gross Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaeVK46igHAe"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="acrVHgr8fUZf"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Inter-regional Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aalVK37BbYyQ"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="abaVLwavcmff"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default IssuerCorridors;
