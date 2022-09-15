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

const ChannelOverview: React.FC = () => {
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
                        header="CP - Point of Sale Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acgIqo1DdM5J"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="CP - Point of Sale Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aa2Iufu3gB2X"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="CP - ATM Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="ab5It7l1fPKo"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="CP - ATM Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abvIuQIbitNT"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Other CP Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abrIt7yYcgFl"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Other CP Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acnIrNj9g8EG"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Gross Fraud Volume By CP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="abQIu4tViwp8"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Net Fraud Volume By CP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="acjIt8x9gOJC"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Cleared Volume By CP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="aakIBwGDcibI"
                        filters={visFilters}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="CNP - e-Commerce Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abmIyPoreFhA"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="CNP - e-Commerce Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abOIv70OhE9w"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="CNP - MO/TO Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abaIy3eEeFM3"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="CNP - MO/TO Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abeIzpPIazU6"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Other CNP Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aawIBDo5bcv4"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Other CNP Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="acMIwz1qaHDq"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Gross Fraud Volume By CNP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="acqIv72ohFdU"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Net Fraud Volume By CNP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="abYIOLHYdtb2"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Cleared Volume By CNP Channels"
                        size={4}
                        projectId={projectId}
                        identifier="ab7IRsxYh7Pl"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ChannelOverview;
