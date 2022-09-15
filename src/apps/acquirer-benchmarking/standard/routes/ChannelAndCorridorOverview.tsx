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

const ChannelAndCorridorOverview: React.FC = () => {
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
                    <VisualizationBlock
                        header="Card Present Domestic Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acaIYngsiwul"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Present Domestic Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abGI1czfcmKC"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Present Cross Border Inter-regional Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abOI18xydNKB"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Present Cross Border Inter-regional Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acIIYjXieA05"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Present Cross Border Intra-regional Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abSI0WSximSz"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Present Cross Border Intra-regional Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abRI0UI2fAJw"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Card Present Gross Fraud Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="abJI1ditaI3K"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Card Present Net Fraud Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="ac9I0ZINfvPy"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Card Present Cleared Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="adPIYnJuh7ku"
                        filters={visFilters}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Not Present Domestic Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abgI4bRtcX2h"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Domestic Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="adjI0N40a1mC"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Not Present Cross Border Inter-regional Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="adHI048jaOzd"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Cross Border Inter-regional Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acQI2FfZcI4U"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Not Present Cross Border Intra-regional Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="ab8I4LKucukZ"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Cross Border Intra-regional Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="adQI04qDfCjD"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Card Not Present Gross Fraud Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="adlI3KTUdl2R"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Card Not Present Net Fraud Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="aaPI7B4SarRq"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Card Not Present Cleared Volume By Corridor"
                        size={4}
                        projectId={projectId}
                        identifier="abSI56qHdGsf"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ChannelAndCorridorOverview;
