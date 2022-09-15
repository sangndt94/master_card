// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const AutomaticFuelDispenserAcquirerRegion: React.FC = () => {
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
                    <HeadlineVisualizationBlock
                        header="Total Gross fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header="AFD as a % of Fuel - Acquirer Region"
                        size={10}
                        projectId={projectId}
                        identifier="aaWvkHcwevnW"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="AFD Approval Rate - Acquirer Region"
                        size={12}
                        projectId={projectId}
                        identifier="acsvh35yezOX"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="EMV as % of AFD"
                        size={12}
                        projectId={projectId}
                        identifier="aaIvooUbhlc4"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Gross Fraud BPS - Acquirer Region"
                        size={6}
                        projectId={projectId}
                        identifier="ae2oWYeyhhBt"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Net Fraud BPS - Acquirer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaKo4SXlfaEK"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AutomaticFuelDispenserAcquirerRegion;
