// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { tallHeight, tinyHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const legendDisabledConfig = {
    legend: {
        enabled: false,
    },
};

const YellowPathAccountDeviceScore: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "wallet",
        "tokenRequestor", // TODO different name than in other dashboards, same data
        "month",
        "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child",
        "productType", // TODO different name than in other dashboards, same data
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
                <DateNotice
                    projectId={projectId}
                    dateAttributeDFIdentifier={projectMeta.dateAttributeDFIdentifier}
                    lastMonthMeasureIdentifier={projectMeta.lastMonthMeasureIdentifier}
                    laggedMonthMeasureIdentifier={projectMeta.laggedMonthMeasureIdentifier}
                    isDateRange={projectMeta.isDateRange}
                    displayProvisioningTransaction
                />
                <Row>
                    <VisualizationBlock
                        header="Device Score for Yellow Path Recommendations"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aaJ9rMMHdXPW"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Device Score for Yellow Path Recommendations with Subsequent Fraud"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aaX9o0WKfPun"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Device Score for Yellow Path Recommendations – Total Volume"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aar9n9mNcBWK"
                        filters={visFilters}
                        config={legendDisabledConfig}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Device Score for Yellow Path Recommendations – Fraud Rate"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaM9oTEEbv1O"
                        filters={visFilters}
                        config={legendDisabledConfig}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Account Score for Yellow Path Recommendations"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aby9oYtXcBCV"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Account Score for Yellow Path Recommendations with Subsequent Fraud"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="abi9pvVdgrIr"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Account Score for Yellow Path Recommendations – Total Volume"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aby9jj4Ah5k1"
                        filters={visFilters}
                        config={legendDisabledConfig}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Account Score for Yellow Path Recommendations – Fraud Rate"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaZ9oiQycFnF"
                        filters={visFilters}
                        config={legendDisabledConfig}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default YellowPathAccountDeviceScore;
