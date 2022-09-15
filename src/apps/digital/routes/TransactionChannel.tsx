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

const TransactionChannel: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "wallet",
        "tokenRequestor",
        "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child",
        "valueBand",
        "month",
        "merchantRegionAndName_parent",
        "merchantRegionAndName_child",
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
                        header="Transaction Channel – Approved Transaction Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aalUxNcXgEN8"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Channel – Issuer Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="abrIDA3vc30b"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Channel – Fraud Transaction Count"
                        size={6}
                        projectId={projectId}
                        identifier="acaIBDL1aUpA"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Channel – Fraud Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aaUX7xdDb08u"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Channel – Average Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aaeX988vaWcR"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Channel – Average Fraud Transaction Value (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="aaiX9Tv3e8qb"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TransactionChannel;
