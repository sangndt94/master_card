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

const GeneralOverview: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIssuerIca_parent",
        "monthYear",
        "cidAndIssuerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
        "channelSummaryCpCnp",
        "channelDetail",
        "corridor",
        "creditOrDebitAndProductGroup_parent",
        "creditOrDebitAndProductGroup_child",
        "cardType",
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudrate", "bmk.netfraudrateiss"]} />
                </Row>
                <Row>
                    <FineCoarseVisualizationBlock
                        header="Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="ac0CSIq9bc6C"
                        fineGranularityVisualization="aaHoRYWtbls8"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Net Fraud Rate (BPS)"
                        coarseGranularityVisualization="aafC0PYjepPV"
                        fineGranularityVisualization="aanoXvtLdOfJ"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="Domestic Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="abHC0e4Bh0Fb"
                        fineGranularityVisualization="adMR6zP5fI6P"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Cross Border Gross Fraud Rate (BPS)"
                        coarseGranularityVisualization="acICSFGpbckf"
                        fineGranularityVisualization="abTScKhFhS3X"
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

export default GeneralOverview;
