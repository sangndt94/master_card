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

const TopMerchantClassifications: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndAcquirerIca_parent",
        "quarterYear",
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
                    <MetricsInfo size={6} metricKeys={["bmk.grossfraudvolume", "bmk.clearedvolume"]} />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="My Top Merchant Classifications By Gross Fraud Volume"
                        size={6}
                        projectId={projectId}
                        identifier="aaeR0R03h386"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="My Top Merchant Classifications By Cleared Volume"
                        size={6}
                        projectId={projectId}
                        identifier="acmSp3oUhMY8"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="Peers' Top Merchant Classifications By Gross Fraud Volume"
                        size={6}
                        projectId={projectId}
                        identifier="aarFcm86fPIX"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="Peers' Top Merchant Classifications By Cleared Volume"
                        size={6}
                        projectId={projectId}
                        identifier="aaTFyhcLgZG5"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TopMerchantClassifications;
