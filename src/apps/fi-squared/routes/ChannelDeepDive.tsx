// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import useQuarter from "../hooks/useQuarter";

const ChannelDeepDive: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    );
    const projectId = useProjectId();
    const { currentQuarter } = useQuarter();

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
                    <VisualizationBlock
                        header="QonQ Gross Fraud BPS Change by CP/CNP"
                        size={6}
                        projectId={projectId}
                        identifier="aaD4bio8eTqL"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="QonQ Gross Fraud BPS Change by Channel"
                        size={6}
                        projectId={projectId}
                        identifier="aad4edSpa10l"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="QonQ Approval Change by Channel"
                        size={6}
                        projectId={projectId}
                        identifier="aaM4aCiCfmNq"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="% Split"
                        size={6}
                        projectId={projectId}
                        identifier="ab26f1YQcBRe"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Top Fraud Types by Channel ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aag6oT6NcsJu"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Top Fraud Corridors by Channel ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aap6n5Tpa0PY"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Top 10 Merchant Categories by Reported Fraud USD ${currentQuarter}`}
                        size={12}
                        projectId={projectId}
                        identifier="abz6nN4TfCIe"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ChannelDeepDive;
