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

const WalletProviderRecommendationsIssuerDecision: React.FC = () => {
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
                        header="Wallet Provider Recommended Path for Provisioning Request"
                        size={6}
                        height={extraTallHeight}
                        projectId={projectId}
                        identifier="abn9h0I0ddsN"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Issuer Decision Path for Provisioning Request"
                        size={6}
                        height={extraTallHeight}
                        projectId={projectId}
                        identifier="aaW9jP3ebX15"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Issuer Decision Path Following Wallet Provider Recommended Path (%)"
                        size={6}
                        projectId={projectId}
                        identifier="aag9jsqMfl9A"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Issuer Decision Path Following Wallet Provider Recommended Path for Successful Provisioning Requests with Subsequent Transaction Fraud (%)"
                        size={6}
                        projectId={projectId}
                        identifier="abJ9hTqLdvVS"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default WalletProviderRecommendationsIssuerDecision;
