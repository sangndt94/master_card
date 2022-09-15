// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";

import Dashboard from "../components/Dashboard";
import FineCoarseVisualizationBlock from "../../../../components/dashboardBlocks/FineCoarseVisualizationBlock";
import projectMeta from "../projectMeta";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";

const ECommerce3DSDeepDive: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIssuerIca_parent",
        "monthYear",
        "cidAndIssuerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
        "channelSummaryCpCnp",
        "channelDetail",
        "corridor",
        "creditOrDebitAndProductGroup_parent",
        "creditOrDebitAndProductGroup_child",
        "cardType",
    );

    const projectId = useProjectId();

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndIssuerIca_parent"])}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <Container fluid className="s-dashboard-content">
                <Row>
                    <DateInfoWithCheck
                        filters={visFilters}
                        projectId={projectId}
                        size={6}
                        isDateRange={projectMeta.isDateRange}
                    />
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate"]} />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="3DS Usage Rate"
                        coarseGranularityVisualization="aaSCXQ9rg9So"
                        fineGranularityVisualization="abnM2fLleBy1"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="e-Commerce where 3DS Not Used Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abCCYcBzf2Lc"
                        fineGranularityVisualization="aayRlHiicFvN"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="3DS Merchant-only Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aauCY6kOdMPD"
                        fineGranularityVisualization="abdRltERhSCm"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="3DS Fully-authenticated Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abECXScYhgxY"
                        fineGranularityVisualization="abwRjPnTewPn"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ECommerce3DSDeepDive;
