// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";
import { IChartConfig } from "@gooddata/react-components";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HeadlineGroup from "../../../components/dashboardBlocks/HeadlineGroup";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import DateNotice from "../../../components/moto/DateInfo";
import projectMeta from "../projectMeta";

const legendOnTheRightConfig: IChartConfig = {
    legend: {
        position: "right",
    },
};

const TokenizationTransactions: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "issuerIca",
        "month",
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
                <DateNotice
                    projectId={projectId}
                    dateAttributeDFIdentifier={projectMeta.dateAttributeDFIdentifier}
                    lastMonthMeasureIdentifier={projectMeta.lastMonthMeasureIdentifier}
                    laggedMonthMeasureIdentifier={projectMeta.laggedMonthMeasureIdentifier}
                    isDateRange={projectMeta.isDateRange}
                    displayProvisioningTransaction
                />
                <Row>
                    <HeadlineGroup
                        title="KPI's for the current year"
                        filters={visFilters}
                        headlines={[
                            {
                                header: "Approved Count (Y2D)",
                                measureIdentifier: "ab6uAXwQixpy",
                                projectId,
                            },
                            {
                                header: "Approved $ (Y2D)",
                                measureIdentifier: "aaQuE4QWdqJB",
                                projectId,
                            },
                            {
                                header: "Fraud count (Y2D)",
                                measureIdentifier: "aaSuE0dnbvYz",
                                projectId,
                            },
                            {
                                header: "Fraud $ (Y2D)",
                                measureIdentifier: "ab8uynxYcKXj",
                                projectId,
                            },
                            {
                                header: "Gross Fraud BPS (Y2D)",
                                measureIdentifier: "acHuAUa0aDRm",
                                projectId,
                            },
                            {
                                header: "Decline Rate (Y2D)",
                                measureIdentifier: "abLuCGpKeZ9T",
                                projectId,
                            },
                        ]}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Gross Fraud Basis Points"
                        projectId={projectId}
                        identifier="aap3N4qBbJVj"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Approved Transaction Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="ac759yQKc631"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Issuer Decline Rate"
                        size={6}
                        projectId={projectId}
                        identifier="ac76ca5kgA8A"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Fraud Transaction Count"
                        size={6}
                        projectId={projectId}
                        identifier="ac66aGhJdsKW"
                        filters={visFilters}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header="Fraud Volume (USD)"
                        size={6}
                        projectId={projectId}
                        identifier="abV6b5qVdEly"
                        filters={visFilters}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Top 3 Digital Wallets"
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aaSNcHlEieJJ"
                        filters={visFilters}
                        config={legendOnTheRightConfig}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Top 3 Tokenized Merchants"
                        height={tallHeight}
                        projectId={projectId}
                        identifier="aaYNez8xcbcj"
                        filters={visFilters}
                        config={legendOnTheRightConfig}
                        enableExports={true}
                    />
                </Row>

                <Row>
                    <VisualizationBlock
                        header="Transaction Channel"
                        height={tallHeight}
                        projectId={projectId}
                        identifier="abMNcOYgii6b"
                        filters={visFilters}
                        config={legendOnTheRightConfig}
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default TokenizationTransactions;
