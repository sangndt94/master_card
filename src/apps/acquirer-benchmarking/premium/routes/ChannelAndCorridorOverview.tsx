// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import FineCoarseVisualizationBlock from "../../../../components/dashboardBlocks/FineCoarseVisualizationBlock";
import { tallerHeight } from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import projectMeta from "../projectMeta";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";

const ChannelAndCorridorOverview: React.FC = () => {
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
                    <MetricsInfo
                        size={6}
                        metricKeys={[
                            "bmk.grossfraudrate",
                            "bmk.netfraudrateacq",
                            "bmk.grossfraudvolume",
                            "bmk.netfraudvolumeacq",
                            "bmk.clearedvolume",
                        ]}
                    />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Present Domestic Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="acaIYngsiwul"
                        fineGranularityVisualization="aadlOY33iuJX"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Present Domestic Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abGI1czfcmKC"
                        fineGranularityVisualization="aazlRTO5gvSg"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Present Cross Border Inter-regional Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abOI18xydNKB"
                        fineGranularityVisualization="aadlS48fb8wc"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Present Cross Border Inter-regional Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="acIIYjXieA05"
                        fineGranularityVisualization="aaBlPA0Whcuo"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Present Cross Border Intra-regional Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abSI0WSximSz"
                        fineGranularityVisualization="aaylUo4yb8N5"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Present Cross Border Intra-regional Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abRI0UI2fAJw"
                        fineGranularityVisualization="aaSlSHKybXvq"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Card Present Gross Fraud Volume By Corridor"
                        coarseGranularityVisualization="ab2t1ttYcg6V"
                        fineGranularityVisualization="ab0oHRTNcyMb"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Card Present Net Fraud Volume By Corridor"
                        coarseGranularityVisualization="adftYDKpfLHT"
                        fineGranularityVisualization="abToKAMvhErb"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Card Present Cleared Volume By Corridor"
                        coarseGranularityVisualization="adPIYnJuh7ku"
                        fineGranularityVisualization="aanoRmUmfxg1"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Domestic Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abgI4bRtcX2h"
                        fineGranularityVisualization="aceoKourig4o"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Domestic Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="adjI0N40a1mC"
                        fineGranularityVisualization="addoRBihhtqc"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Cross Border Inter-regional Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="adHI048jaOzd"
                        fineGranularityVisualization="aafo03GIfUJ9"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Cross Border Inter-regional Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="acQI2FfZcI4U"
                        fineGranularityVisualization="acuoVskacDBn"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Cross Border Intra-regional Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="ab8I4LKucukZ"
                        fineGranularityVisualization="ab2oW2oecZmX"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Cross Border Intra-regional Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="adQI04qDfCjD"
                        fineGranularityVisualization="acIoVE4rbM0T"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Card Not Present Gross Fraud Volume By Corridor"
                        coarseGranularityVisualization="aaGt9cYdgaU6"
                        fineGranularityVisualization="aaso60KvbIlE"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Card Not Present Net Fraud Volume By Corridor"
                        coarseGranularityVisualization="aait9JQTcUB1"
                        fineGranularityVisualization="aaMo6Ve6eDoK"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Card Not Present Cleared Volume By Corridor"
                        coarseGranularityVisualization="abSI56qHdGsf"
                        fineGranularityVisualization="ab8o3Qaphm9K"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ChannelAndCorridorOverview;
