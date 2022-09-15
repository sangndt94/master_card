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

const TransactionValue: React.FC = () => {
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
                        header="Transaction Value – Approved Transaction Volume (%) & Fraud Volume (%)"
                        size={6}
                        projectId={projectId}
                        identifier="aaQX9GFBha2V"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Value – Fraud Basis Points & Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="abXX6BcGgbYO"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Value – Fraud Basis Points"
                        projectId={projectId}
                        identifier="abYYmDvpfAmC"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Value – Approved Transaction Count"
                        size={6}
                        projectId={projectId}
                        identifier="adi6goMEamJE"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Value – Issuer Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="abz6oMfcaxN0"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Value – Fraud Transaction Count"
                        size={6}
                        projectId={projectId}
                        identifier="acL6liEgfGwT"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Transaction Value – Fraud Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="acl6iDpceHeW"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TransactionValue;
