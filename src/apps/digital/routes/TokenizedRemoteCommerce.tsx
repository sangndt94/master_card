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

const TokenizedRemoteCommerce: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
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
                        header="Tokenized Merchant – Approved Transaction Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aauH7Ou7geTj"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Tokenized Merchant – Issuer Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aaNH7BGzbKAz"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Tokenized Merchant – Fraud Volume (USD)"
                        projectId={projectId}
                        identifier="aagH7qTUclDL"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Tokenized Merchant – Average Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="abuH8aHJfgz9"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Tokenized Merchant – Average Fraud Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="abRH7xtCbKOF"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TokenizedRemoteCommerce;
