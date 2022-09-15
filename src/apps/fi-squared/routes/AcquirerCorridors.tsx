// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const AcquirerCorridors: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "corridor",
        "creditOrDebit",
        "PANEntryMode",
    );
    const projectId = useProjectId();

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
                        header="Gross fraud BPS"
                        size={2}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                        height={tallHeight}
                    />
                    <VisualizationBlock
                        header="Acq - Domestic gross fraud BPS"
                        size={10}
                        projectId={projectId}
                        identifier="aaE27OZlfqe8"
                        filters={visFilters}
                        height={tallHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Acq - Cross border intra regional gross fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="ac922eMQdeVk"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Acq - Cross border interregional gross fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="aah295SAbrYd"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Acq - Domestic gross fraud BPS Change"
                        size={6}
                        projectId={projectId}
                        identifier="aaz3e7i7cJJp"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Acq - Domestic fraud USD split"
                        size={6}
                        projectId={projectId}
                        identifier="aa33eIwDdyCq"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Acq - intra regional  gross fraud BPS Change"
                        size={6}
                        projectId={projectId}
                        identifier="abf3cX7binPv"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Acq - Intra regional fraud USD split"
                        size={6}
                        projectId={projectId}
                        identifier="aaC3fKlZinlO"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Acq - Inter regional gross fraud BPS Change"
                        size={6}
                        projectId={projectId}
                        identifier="ab13cUSxcSwm"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Acq - Inter regional fraud USD split"
                        size={6}
                        projectId={projectId}
                        identifier="abY3cSGzinCF"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerCorridors;
