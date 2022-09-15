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

const ECommerceAuthenticationDeepDive: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndAcquirerIca_parent",
        "monthYear",
        "cidAndAcquirerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
        "channelSummaryCpCnp",
        "channelDetail",
        "corridor",
        "cardType",
        "productGroup",
        "merchantClassification",
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
                    <FineCoarseVisualizationBlock
                        header="CVC2 Usage Rate"
                        coarseGranularityVisualization="ab5I9mKVgnpJ"
                        fineGranularityVisualization="aaCwMPi2ct07"
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="CVC2 No Match Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="advI6ePVbX8z"
                        fineGranularityVisualization="aaewPhp9h00S"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="CVC2 Match Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aa3JcM7jgaHM"
                        fineGranularityVisualization="aaLwOfe2cj9H"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="3DS Usage Rate"
                        coarseGranularityVisualization="abyJa9YLfYfI"
                        fineGranularityVisualization="abFwTpBxgM78"
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="3DS Not Used Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abtJdh7KcZvS"
                        fineGranularityVisualization="abNwKA4Ch6UB"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="3DS Used Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aa6Jf7r1h2S8"
                        fineGranularityVisualization="abzwN6rrd5oQ"
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

export default ECommerceAuthenticationDeepDive;
