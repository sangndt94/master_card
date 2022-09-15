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

const CardPresentEMVDeepDive: React.FC = () => {
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate", "bmk.emvfallbackrate"]} />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="EMV Usage Rate"
                        coarseGranularityVisualization="aaXC8fd3cfJv"
                        fineGranularityVisualization="aabR6doKgzam"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="EMV Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="acZCSkaWcZWt"
                        fineGranularityVisualization="aaQR6lIzaXIQ"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="EMV Fallback Rate"
                        coarseGranularityVisualization="aa0CXrNUbayv"
                        fineGranularityVisualization="acmR3I4hfD81"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="EMV Fallback Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="acECSKKUdVX1"
                        fineGranularityVisualization="aa8R6F5bbUeH"
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

export default CardPresentEMVDeepDive;
