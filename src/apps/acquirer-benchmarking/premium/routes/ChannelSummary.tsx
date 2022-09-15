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

const ChannelSummary: React.FC = () => {
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
                        header="Card Present Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abuIm7ozbn1V"
                        fineGranularityVisualization="aasiPlFddI6a"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abzImZcogZCR"
                        fineGranularityVisualization="aa7iWMe9blHt"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Card Present Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="aa2IpzEnaNZi"
                        fineGranularityVisualization="acPiWNy3bmv0"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Card Not Present Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abrIoJW4iuSC"
                        fineGranularityVisualization="aa5i1sAac6L9"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Gross Fraud Volume By CP/CNP"
                        coarseGranularityVisualization="ab6Pc3r6fyaD"
                        fineGranularityVisualization="aaAjbolhiEGM"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Net Fraud Volume By CP/CNP"
                        coarseGranularityVisualization="aaXPhRZPhgx9"
                        fineGranularityVisualization="abPjqznpgmGq"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Cleared Volume By CP/CNP"
                        coarseGranularityVisualization="aa9IpkFHaAnb"
                        fineGranularityVisualization="acjDYRMdinsd"
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

export default ChannelSummary;
