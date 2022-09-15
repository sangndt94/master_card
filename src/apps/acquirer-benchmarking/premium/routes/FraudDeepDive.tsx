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
import MetricsInfo from "../../../../components/dashboardBlocks/MetricsInfo";
import DateInfoWithCheck from "../../../../components/dashboardBlocks/DateInfoWithCheck";

const FraudDeepDive: React.FC = () => {
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
                        metricKeys={["bmk.grossfraudrate", "bmk.netfraudrateacq", "bmk.clearedvolume"]}
                    />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="aaAIniUDfHHp"
                        fineGranularityVisualization="aaTdGxu8evAY"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="abjImH6AdRgl"
                        fineGranularityVisualization="aaKdNWSwg7ba"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Gross Fraud Volume"
                        coarseGranularityVisualization="aaxWPoESiA2A"
                        fineGranularityVisualization="abIehajido03"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Net Fraud Volume"
                        coarseGranularityVisualization="abfWNU1eeb3Z"
                        fineGranularityVisualization="aapeoONbdOzy"
                        size={4}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="My Cleared Volume"
                        coarseGranularityVisualization="abnWNuvFhMSw"
                        fineGranularityVisualization="abafuIird8nB"
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

export default FraudDeepDive;
