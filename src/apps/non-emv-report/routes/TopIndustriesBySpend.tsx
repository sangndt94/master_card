// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";

const TopIndustriesBySpend: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIca_parent",
        "cidAndIca_child",
        "country",
    );
    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndIca_parent"])}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <DateNotice projectId={projectId} lastMonthOnly />
            <VisualizationBlockBase
                height="auto"
                header={<BlockHeading>Top 5 Industries by spend - Chip</BlockHeading>}
            >
                <Grid lg={2}>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaRqEhXIhEf6"
                    />
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aact0oUObYAy"
                    />
                </Grid>
            </VisualizationBlockBase>
            <VisualizationBlockBase
                height="auto"
                header={<BlockHeading>Top 5 Industries by spend - Non-Chip</BlockHeading>}
            >
                <Grid lg={2}>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aajule0scdpm"
                    />
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aayukniyeWWA"
                    />
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default TopIndustriesBySpend;
