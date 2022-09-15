// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";

import VisualizationBlock from "../../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";
import projectMeta from "../../../acquirer-benchmarking/premium/projectMeta";
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";

const CardPresentEMVOverview: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIssuerIca_parent",
        "cidAndIssuerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
        "creditOrDebit",
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
                    <VisualizationBlock
                        header="EMV Usage Rate"
                        identifier="aaXC8fd3cfJv"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="EMV Gross Fraud Rate (BPS)"
                        identifier="acZCSkaWcZWt"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="EMV Fallback Rate"
                        identifier="aa0CXrNUbayv"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="EMV Fallback Gross Fraud Rate (BPS)"
                        identifier="acECSKKUdVX1"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default CardPresentEMVOverview;
