// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import GeoChart from "../../../components/dashboardBlocks/GeoChart";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualizationBlock from "../../../components/visualization/HeadlineVisualizationBlock";

const ContactlessAnalysis: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "corridor",
        "cardProductType",
        "cardProductGroup",
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
                    <VisualizationBlockBase
                        header={`Contactless Penetration by Countries ${currentQuarter}`}
                        size={6}
                        height={tallHeight}
                    >
                        <GeoChart projectId={projectId} identifier="aaJfNr0qfv5z" filters={visFilters} />
                    </VisualizationBlockBase>

                    <HeadlineVisualizationBlock
                        header="Total Gross Fraud BPS"
                        size={2}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="adZsmkdBhQcu"
                        filters={visFilters}
                    />

                    <VisualizationBlock
                        header={`Top Merchant Categories by Contactless Usage and Gross Fraud BPS ${currentQuarter}`}
                        size={4}
                        height={tallHeight}
                        projectId={projectId}
                        identifier="ab3oEOhJfnOg"
                        filters={visFilters}
                        sortingOverride={[
                            {
                                sortByMeasureIndex: 0,
                                direction: "desc",
                            },
                        ]}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Contactless Gross Fraud BPS by Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aaioF3Jzei7r"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Contactless % Approved Transactions by Issuer Region"
                        size={6}
                        projectId={projectId}
                        identifier="aauoHbXNglHn"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`MDES and Non MDES Contactless Performance ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="adaoR6lFanbu"
                        filters={visFilters}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Products by Contactless ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ad4oR7rwbUDf"
                        filters={visFilters}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default ContactlessAnalysis;
