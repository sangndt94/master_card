// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import GeoChart from "../../../components/dashboardBlocks/GeoChart";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import useQuarter from "../hooks/useQuarter";

const CardholderActivatedTerminalNonATMAFD: React.FC = () => {
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
                        header={`MPoS Acceptance Device - % of Non AFD/ATM CAT Volume ${currentQuarter}`}
                        height={tallHeight}
                        size={6}
                    >
                        <GeoChart projectId={projectId} identifier="acX99DrfbGpb" filters={visFilters} />
                    </VisualizationBlockBase>
                    <VisualizationBlockBase
                        header={`Self Service Acceptance Device - % of Non AFD/ATM CAT Volume ${currentQuarter}`}
                        height={tallHeight}
                        size={6}
                    >
                        <GeoChart projectId={projectId} identifier="aafFD3BXfhrj" filters={visFilters} />
                    </VisualizationBlockBase>
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Non AFD/ATM CAT Transactions"
                        size={6}
                        projectId={projectId}
                        identifier="aaMBce6mdWnz"
                        filters={visFilters}
                        sortingOverride={[
                            {
                                sortByMeasureIndex: 0,
                                direction: "desc",
                            },
                        ]}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Fraud Contribution by Non AFD/ATM CAT"
                        size={6}
                        projectId={projectId}
                        identifier="aaZBanMzbcQD"
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
            </Container>
        </Dashboard>
    );
};

export default CardholderActivatedTerminalNonATMAFD;
