// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
    extraTallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";

const TopIndustriesMerchantsBySpend: React.FC = () => {
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
            <VisualizationBlockBase height="auto" header={<BlockHeading>Customer Insights</BlockHeading>}>
                <Grid lg={2}>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaG5O0ZvgbMz"
                    />
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="ab1DceG7fGip"
                    />
                    <Grid lgSpan={2}>
                        <VisualizationWrapper
                            projectId={projectId}
                            height={extraTallHeight}
                            filters={visFilters}
                            identifier="aaH70CLCcXYV"
                        />
                    </Grid>
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default TopIndustriesMerchantsBySpend;
