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

const ChannelSummary: React.FC = () => {
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
                        header="Card Present Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abuIm7ozbn1V"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abzImZcogZCR"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Card Present Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aa2IpzEnaNZi"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Card Not Present Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abrIoJW4iuSC"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Gross Fraud Volume By CP/CNP"
                        size={4}
                        projectId={projectId}
                        identifier="abpInog9eCNj"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Net Fraud Volume By CP/CNP"
                        size={4}
                        projectId={projectId}
                        identifier="aasIuk7rhXa5"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Cleared Volume By CP/CNP"
                        size={4}
                        projectId={projectId}
                        identifier="aa9IpkFHaAnb"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ChannelSummary;
