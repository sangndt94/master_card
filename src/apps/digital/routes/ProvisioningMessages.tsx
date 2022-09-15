// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const ProvisioningMessages: React.FC = () => {
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
                        header="Volume of Provisioning Requests by Message Type"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aar5AHcuasEM"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Success Rate of Provisioning Requests"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aaM89Jo6fKvq"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Top 5 Wallets by Volume & Fraud"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="abr88VVKe9oh"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Volume of Successful Provisioning Requests with Subsequent Transaction Fraud"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aac9hkzwhZ9i"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ProvisioningMessages;
