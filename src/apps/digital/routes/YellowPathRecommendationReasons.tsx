// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { extraTallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const YellowPathRecommendationReasons: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "wallet",
        "reasonType",
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
                        header="Reasons for Yellow Path Recommendation"
                        projectId={projectId}
                        identifier="aa89oZ6wcYPR"
                        filters={visFilters}
                        height={extraTallHeight}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Reasons for Yellow Path Recommendation for Successful Provisioning Requests with Subsequent Transaction Fraud"
                        projectId={projectId}
                        identifier="aaQ9rXoCd8ET"
                        filters={visFilters}
                        height={extraTallHeight}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Fraud Rates on Yellow Path Recommendation Reasons"
                        projectId={projectId}
                        identifier="aaLn6u3mbwu2"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default YellowPathRecommendationReasons;
