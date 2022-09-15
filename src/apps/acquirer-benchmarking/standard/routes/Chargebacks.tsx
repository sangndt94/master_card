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

const Chargebacks: React.FC = () => {
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
                <DateInfoWithCheck
                    filters={visFilters}
                    projectId={projectId}
                    isDateRange={projectMeta.isDateRange}
                />
                <Row>
                    <VisualizationBlock
                        header="Percentage of Fraud Charged Back"
                        projectId={projectId}
                        identifier="aahJIQiQaqzW"
                        filters={visFilters}
                        withPeers
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="My Chargeback Reason Types"
                        size={6}
                        projectId={projectId}
                        identifier="aayJIoCbeHCf"
                        filters={visFilters}
                    />
                    <VisualizationBlock
                        header="Percentage of Fraud Represented"
                        size={6}
                        projectId={projectId}
                        identifier="abmYPhRaaP93"
                        filters={visFilters}
                        withPeers
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default Chargebacks;
