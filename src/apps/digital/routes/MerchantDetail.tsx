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

const MerchantDetail: React.FC = () => {
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
                        header="Top 5 Merchants – Fraud Volume (USD)"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="aaL5wC5Jgd59"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Top 5 Merchant Countries – Fraud Basis Points"
                        size={6}
                        height={tinyHeight}
                        projectId={projectId}
                        identifier="acG5oqoxhrkN"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Merchant Region – Approved Transaction Volume (%) & Fraud Basis Points"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="abg5vBM4fVoz"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Merchant Region – Fraud Volume (%)"
                        size={6}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aa05wc0dg7eM"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Top 20 Merchants – Fraud Basis Points"
                        projectId={projectId}
                        identifier="acB5uf1TfQOA"
                        filters={visFilters}
                        config={{
                            colorPalette: Array(10)
                                .fill(null)
                                .map((_, index, array) => {
                                    const multiplier = ((index * 1) / array.length) * 0.5;
                                    return {
                                        guid: String(index),
                                        fill: {
                                            r: 207 + (255 - 207) * multiplier,
                                            g: 70 + (255 - 70) * multiplier,
                                            b: 255 * multiplier,
                                        },
                                    };
                                }),
                        }}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default MerchantDetail;
