// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";

import VisualizationBlock from "../../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";
import projectMeta from "../../premium/projectMeta";
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";

const ECommerceAuthenticationOverview: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndAcquirerIca_parent",
        "cidAndAcquirerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
    );

    const projectId = useProjectId();

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndAcquirerIca_parent"])}
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate", "bmk.netfraudrateacq"]} />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="CVC2 Usage Rate"
                        projectId={projectId}
                        identifier="ab5I9mKVgnpJ"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="CVC2 No Match Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="advI6ePVbX8z"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="CVC2 Match Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aa3JcM7jgaHM"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="3DS Usage Rate"
                        projectId={projectId}
                        identifier="abyJa9YLfYfI"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="3DS Not Used Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abtJdh7KcZvS"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="3DS Used Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aa6Jf7r1h2S8"
                        filters={visFilters}
                        withPeers
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ECommerceAuthenticationOverview;
