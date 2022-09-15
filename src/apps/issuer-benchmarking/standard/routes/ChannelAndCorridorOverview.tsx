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

const ChannelAndCorridorOverview: React.FC = () => {
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate"]} />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Card Present Domestic Gross Fraud Rate"
                        identifier="aabC2WfHaxLr"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Domestic Gross Fraud Rate"
                        identifier="aauC08RCgIdI"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Present Cross Border Gross Fraud Rate (BPS)"
                        identifier="aaSCZ80QhO3e"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Cross Border Gross Fraud Rate (BPS)"
                        identifier="aaKC00PveMKQ"
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

export default ChannelAndCorridorOverview;
