// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";
import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";

const AutomaticFuelDispenserIssuerRegion: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "corridor",
        "cardProductType",
        "cardProductGroup",
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
                    <HeadlineVisualizationBlock
                        header="Total Gross Fraud BPS"
                        size={2}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                    />

                    <VisualizationBlock
                        header={`Reported Fraud ISD by Corridors by Issuer Region ${currentQuarter}`}
                        size={5}
                        projectId={projectId}
                        identifier="abWoWi1Se6vD"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Gross Fraud BPS by PAN Entry Mode"
                        size={5}
                        projectId={projectId}
                        identifier="aaDTiClBc5KK"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Gross Fraud BPS by Issuer Region"
                        size={12}
                        projectId={projectId}
                        identifier="afcoWduRe54A"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AutomaticFuelDispenserIssuerRegion;
