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

const FraudSummary: React.FC = () => {
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
                        ]}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="aaAIniUDfHHp"
                        filters={visFilters}
                        withPeers
                    />
                    <VisualizationBlock
                        header="Net Fraud Rate (BPS)"
                        size={6}
                        projectId={projectId}
                        identifier="abjImH6AdRgl"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Gross Fraud vs Net Fraud Volume"
                        projectId={projectId}
                        identifier="abdXYjfcd0nq"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default FraudSummary;
