// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { useFilters } from "../contexts/FilterStateContext";
import Dashboard from "../components/Dashboard";
import VisualizationBlockBase, {
    customHeadlineRowHeight,
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";
import FilterBar from "../../../components/filters/FilterBar";
import GeoChart from "../../../components/dashboardBlocks/GeoChart";
import { areFiltersFinished } from "../../../components/filters/utils";
import CustomLoading from "../../../components/utils/CustomLoading";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";

const IssuingRegionOverview: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters("issuerRegion");
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
            {areFiltersFinished(filters) ? (
                <Container fluid className="s-dashboard-content">
                    <Row>
                        <VisualizationRow
                            size={12}
                            minHeight={customHeadlineRowHeight}
                            height="auto"
                            count={4}
                        >
                            {({ onLoadingChanged }) => {
                                return (
                                    <>
                                        <HeadlineVisualization
                                            header="Gross fraud BPS"
                                            projectId={projectId}
                                            identifier="adZsmkdBhQcu"
                                            filters={visFilters}
                                            onLoadingChanged={onLoadingChanged}
                                        />

                                        <HeadlineVisualization
                                            header="Net Fraud BPS"
                                            projectId={projectId}
                                            identifier="ad6sm6VWfdSO"
                                            filters={visFilters}
                                            onLoadingChanged={onLoadingChanged}
                                        />

                                        <HeadlineVisualization
                                            header="Approval rate"
                                            projectId={projectId}
                                            identifier="aaFsxTdMhCnl"
                                            filters={visFilters}
                                            onLoadingChanged={onLoadingChanged}
                                        />

                                        <HeadlineVisualization
                                            header="Decline rate"
                                            projectId={projectId}
                                            identifier="abcsxx3oernH"
                                            filters={visFilters}
                                            onLoadingChanged={onLoadingChanged}
                                        />
                                    </>
                                );
                            }}
                        </VisualizationRow>
                    </Row>
                    <Row>
                        <VisualizationBlockBase
                            header={`Indexed Fraud by Country ${currentQuarter}`}
                            height={tallHeight}
                            size={6}
                        >
                            <GeoChart projectId={projectId} identifier="aarFAkzregII" filters={visFilters} />
                        </VisualizationBlockBase>
                    </Row>
                </Container>
            ) : (
                <CustomLoading className="s-dashboard-loading" label="Loading filters" />
            )}
        </Dashboard>
    );
};

export default IssuingRegionOverview;
