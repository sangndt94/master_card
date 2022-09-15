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

const ChannelOverview: React.FC = () => {
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
                        header="CP - Point of Sale Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="acgIqo1DdM5J"
                        fineGranularityVisualization="aaAjWeeBbbK1"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="CP - Point of Sale Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="aa2Iufu3gB2X"
                        fineGranularityVisualization="ac8jSNaoiyhL"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="CP - ATM Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="ab5It7l1fPKo"
                        fineGranularityVisualization="aacjZqCOcqT8"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="CP - ATM Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abvIuQIbitNT"
                        fineGranularityVisualization="ab3jUfiYark4"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Other CP Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abrIt7yYcgFl"
                        fineGranularityVisualization="aaWp7r9fd7Qc"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Other CP Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="acnIrNj9g8EG"
                        fineGranularityVisualization="acgp5AW4e6Bm"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Gross Fraud Volume By CP Channels"
                        coarseGranularityVisualization="abXhaDDsilaj"
                        fineGranularityVisualization="acap5EZfdHkJ"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Net Fraud Volume By CP Channels"
                        coarseGranularityVisualization="abNhcvRVhrfW"
                        fineGranularityVisualization="aacqbwsQb2l8"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Cleared Volume By CP Channels"
                        coarseGranularityVisualization="aakIBwGDcibI"
                        fineGranularityVisualization="acup5tE8gHMT"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="CNP - e-Commerce Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abmIyPoreFhA"
                        fineGranularityVisualization="ab2kmsfdfYek"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="CNP - e-Commerce Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abOIv70OhE9w"
                        fineGranularityVisualization="acBklEpmgMgF"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="CNP - MO/TO Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abaIy3eEeFM3"
                        fineGranularityVisualization="acoklYrZaJNu"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="CNP - MO/TO Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abeIzpPIazU6"
                        fineGranularityVisualization="acqkmdjahY0V"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Other CNP Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aawIBDo5bcv4"
                        fineGranularityVisualization="abMqcV13f6sf"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Other CNP Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="acMIwz1qaHDq"
                        fineGranularityVisualization="abJqckyBfOFx"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Gross Fraud Volume By CNP Channels"
                        coarseGranularityVisualization="abxhbHMTaJSH"
                        fineGranularityVisualization="abEqeFGXhQ1i"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Net Fraud Volume By CNP Channels"
                        coarseGranularityVisualization="aathkihve5BZ"
                        fineGranularityVisualization="acoqdjcdhke1"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Cleared Volume By CNP Channels"
                        coarseGranularityVisualization="ab7IRsxYh7Pl"
                        fineGranularityVisualization="acQqcRHoemXN"
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

export default ChannelOverview;
