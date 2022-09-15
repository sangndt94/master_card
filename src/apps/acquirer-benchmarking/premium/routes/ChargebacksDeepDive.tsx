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

const ChargebacksDeepDive: React.FC = () => {
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
                <DateInfoWithCheck
                    filters={visFilters}
                    projectId={projectId}
                    isDateRange={projectMeta.isDateRange}
                />
                <Row>
                    <FineCoarseVisualizationBlock
                        header="Percentage of Fraud Charged Back"
                        coarseGranularityVisualization="aahJIQiQaqzW"
                        fineGranularityVisualization="aaqMrrWqcLQA"
                        projectId={projectId}
                        filters={visFilters}
                        withPeers
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <FineCoarseVisualizationBlock
                        header="My Chargeback Reason Types"
                        coarseGranularityVisualization="acGXWz1Ke0yk"
                        fineGranularityVisualization="adEMzOjSdSjO"
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        enableExports={true}
                    />
                    <FineCoarseVisualizationBlock
                        header="Percentage of Fraud Represented"
                        coarseGranularityVisualization="abmYPhRaaP93"
                        fineGranularityVisualization="aa1MG3p4idOc"
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

export default ChargebacksDeepDive;
