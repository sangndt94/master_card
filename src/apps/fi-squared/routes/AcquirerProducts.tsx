// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const AcquirerProducts: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "corridor",
        "creditOrDebit",
        "PANEntryMode",
    );
    const projectId = useProjectId();
    const { currentVsPreviousQuarter } = useQuarter();

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    projectId={projectId}
                    filters={filters}
                    clearFilters={clearFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <Container fluid className="s-dashboard-content">
                <Row>
                    <HeadlineVisualizationBlock
                        header="Total Gross Fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header="Credit Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="abO25kPKireZ"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Debit Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="aaq28mcFgQzr"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Credit Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ac224MFfef4y"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="adt25mjyirgv"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Debit Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acX25vhXfLsb"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="aaq3co4Mg6nJ"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerProducts;
