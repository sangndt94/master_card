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

const CardPresentTechnologyDeepDive: React.FC = () => {
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate", "bmk.emvfallbackrate"]} />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="EMV Chip (Contact) Usage Rate"
                        coarseGranularityVisualization="aaeJCf0Qg80t"
                        fineGranularityVisualization="aaWLwRYvbtoA"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="EMV Chip (Contact) Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="adoJwjR9bWfp"
                        fineGranularityVisualization="ac3Luc6UdNYL"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Contactless Usage Rate"
                        coarseGranularityVisualization="aaAJCgAEhrUx"
                        fineGranularityVisualization="abiLTgkNdDcq"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Contactless Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="ad4JuQmxetwv"
                        fineGranularityVisualization="aaVLU2OYaWhS"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Magstripe Usage Rate"
                        coarseGranularityVisualization="aaSJBCbTcfjc"
                        fineGranularityVisualization="acNMavKac0NR"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Magstripe Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aajJDBoSgV7w"
                        fineGranularityVisualization="abdLV6cQgrqN"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Chip-to-Magstripe Fallback Rate"
                        coarseGranularityVisualization="aa1JBEyhggMj"
                        fineGranularityVisualization="acWMazSJdjkN"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Chip-to-Magstripe Fallback Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aaXJA5KRfYg8"
                        fineGranularityVisualization="abhLVVo6h5xF"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Partial Grade Usage Rate"
                        coarseGranularityVisualization="abEJAk5Egt0N"
                        fineGranularityVisualization="acvMe0L4hrNe"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Partial Grade Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aaCJGEknd2A7"
                        fineGranularityVisualization="abMLVO4bgmfp"
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

export default CardPresentTechnologyDeepDive;
