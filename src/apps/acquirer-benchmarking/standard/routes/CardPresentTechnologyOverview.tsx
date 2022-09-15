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

const CardPresentTechnologyOverview: React.FC = () => {
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate", "bmk.emvfallbackrate"]} />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="EMV Chip (Contact) Usage Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aaeJCf0Qg80t"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="EMV Chip (Contact) Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="adoJwjR9bWfp"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Contactless Usage Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aaAJCgAEhrUx"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Contactless Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="ad4JuQmxetwv"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Magstripe Usage Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aaSJBCbTcfjc"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Magstripe Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aajJDBoSgV7w"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Chip-to-Magstripe Fallback Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aa1JBEyhggMj"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Chip-to-Magstripe Fallback Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aaXJA5KRfYg8"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Partial Grade Usage Rate"
                        size={6}
                        projectId={projectId}
                        identifier="abEJAk5Egt0N"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Partial Grade Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aaCJGEknd2A7"
                        filters={visFilters}
                        withPeers
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default CardPresentTechnologyOverview;
