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

const IssuerProducts: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
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
                        header="Gross Fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />

                    <VisualizationBlock
                        header="Debit Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="acoVARa2g3MJ"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Credit Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="ac6VyIPJgxUc"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Debit Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ab5VGZYZhBCL"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="aaTVMa4QhLZd"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Credit Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ab7VGr9lf2p8"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="aaRVMaXMeqy6"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default IssuerProducts;
