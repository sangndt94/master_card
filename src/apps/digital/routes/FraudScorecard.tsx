// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { tinyHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const FraudScorecard: React.FC = () => {
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
                        header="Gross Fraud Basis Points by Transaction Type Detail"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="acCRhM6bdhbp"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Approved Transaction Volume (%) by Transaction Type Detail"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aalRBX4RaOcm"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Basis Points by Device Type"
                        description="as populated in the data – this field is not mandatory"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaZRmAAxc3Ni"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Approved Transaction Volume (%) by Device Type"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="abdRzxODbMny"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Basis Points by Value Band"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaqRuvP0ivE2"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Approved Transaction Volume (%) by Value Band"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaeRB4TLdg6M"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Basis Points by Merchant Country"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aanRuHGmdwy7"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Approved Transaction Volume (%) by Merchant Country"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaURxgjKaVEX"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Basis Points by Merchant"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aayRu2ANb4VM"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Approved Transaction Volume (%) by Merchant"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaNRzqTwhGSv"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default FraudScorecard;
