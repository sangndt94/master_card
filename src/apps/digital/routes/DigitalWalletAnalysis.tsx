// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const DigitalWalletAnalysis: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "wallet",
        "tokenRequestor",
        "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child",
        "merchantRegionAndName_parent",
        "merchantRegionAndName_child",
        "month",
        "valueBand",
        "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child",
        "productType",
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
                        header="Digital Wallets – Approved Transaction Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="abSSB33YcCBi"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Digital Wallets – Issuer Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aavIaGzlalHj"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Digital Wallets – Fraud Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="abkSMfcGhuh7"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Digital Wallets – Fraud Basis Points"
                        size={6}
                        projectId={projectId}
                        identifier="ac7sd4M5eBbl"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Digital Wallets – Average Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aasSPmCIdhWD"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Digital Wallets – Average Fraud Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="adlSJELtcr9l"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default DigitalWalletAnalysis;
