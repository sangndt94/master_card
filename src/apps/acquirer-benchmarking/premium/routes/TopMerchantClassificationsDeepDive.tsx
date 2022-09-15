// (C) 2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";
import VisualizationBlock from "../../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import { tallerHeight } from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import projectMeta from "../projectMeta";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";

const TopMerchantClassificationsDeepDive: React.FC = () => {
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
                        metricKeys={["bmk.grossfraudvolume", "bmk.netfraudvolumeacq", "bmk.clearedvolume"]}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="My Top Merchant Classifications By Gross Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aaeR0R03h386"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Peers' Top Merchant Classifications By Gross Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aarFcm86fPIX"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Country Top Merchant Classifications By Gross Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aahR5GQJbvA6"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Top Merchant Classifications By Net Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aaKSaCIicICF"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Peers' Top Merchant Classifications By Net Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aaLFsTPjcb5k"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Country Top Merchant Classifications By Net Fraud Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="abwR84NAeBFQ"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Top Merchant Classifications By Cleared Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="acmSp3oUhMY8"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Peers' Top Merchant Classifications By Cleared Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aaTFyhcLgZG5"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Country Top Merchant Classifications By Cleared Volume"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        identifier="aegSlwVdaVWe"
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TopMerchantClassificationsDeepDive;
