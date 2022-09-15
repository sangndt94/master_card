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

const AcquirerChannels: React.FC = () => {
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
                        header="Card Present Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="abX247WselWB"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Card Not Present Gross Fraud BPS"
                        size={5}
                        projectId={projectId}
                        identifier="abq25lMFa1hc"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Card Present Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acO25jmlgjXB"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="acE26ZdMgyFC"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Card Not Present Fraud BPS Change ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aay3a8bkhJqH"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud USD Split"
                        size={6}
                        projectId={projectId}
                        identifier="acV249LkeHCc"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerChannels;
