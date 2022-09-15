// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import useQuarter from "../hooks/useQuarter";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import GeoChart from "../../../components/dashboardBlocks/GeoChart";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const POSEMVChip: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "corridor",
        "cardProductType",
        "cardProductGroup",
        "issuerMultiRegion",
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
                    <VisualizationBlockBase
                        header="PIN Usage Rate by Issuer Country"
                        height={tallHeight}
                        size={6}
                    >
                        <GeoChart projectId={projectId} identifier="aabYPVrfc0UX" filters={visFilters} />
                    </VisualizationBlockBase>

                    <HeadlineVisualizationBlock
                        header={`Total Gross fraud BPS ${currentQuarter}`}
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header={`Pin Usage vs. Gross Fraud BPS - Issuer Region ${currentQuarter}`}
                        size={4}
                        projectId={projectId}
                        identifier="aaW69azrhq2c"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header={`CVM Processed Volume Split and Gross Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaE7aV3We2YP"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default POSEMVChip;
