// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    headlineWithoutTitleInnerHeight,
    normalHeight,
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import styleGuide from "../../../components/styleGuide/styleGuide";

import DateNotice from "../../../components/moto/DateInfo";
import SmallError from "../../../components/utils/SmallError";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";

const gridSpacing = styleGuide.spacing(2);

const TerminalAnalysis: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIca_parent",
        "cidAndIca_child",
        "country",
    );
    const commonHeadlineProps = {
        projectId,
        filters: visFilters,
        height: headlineWithoutTitleInnerHeight,
        ErrorComponent: SmallError,
    };
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
            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6}>
                    <Grid sm={1}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Terminal Count</BlockHeading>}
                            identifier="aazvGZw5eIkT"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            identifier="abHvNomggPh3"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            identifier="aacvXqszbqzQ"
                            projectId={projectId}
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={5}>
                        <Grid lg={1} xl={2}>
                            <BlockHeading textAlign="center" marginBottom={styleGuide.spacing(1)}>
                                Share Chip Vs. Non-Chip Transactions
                            </BlockHeading>
                            <Grid sm={1} gap={0}>
                                <VisualizationWrapper
                                    height={normalHeight}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aaIwuEy1gJE2"
                                />
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            </Grid>
                            <Grid sm={1} gap={0}>
                                <VisualizationWrapper
                                    height={normalHeight}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="aaCgzGCUgHfn"
                                    withPeers
                                />
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            </Grid>
                        </Grid>
                        <Grid lg={1} xl={2}>
                            <BlockHeading textAlign="center" marginBottom={styleGuide.spacing(1)}>
                                Share Chip Vs. Non-Chip Spend
                            </BlockHeading>
                            <Grid sm={1} gap={0}>
                                <VisualizationWrapper
                                    height={normalHeight}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="abqgxHoeh9Vg"
                                />
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            </Grid>
                            <Grid sm={1} gap={0}>
                                <VisualizationWrapper
                                    height={normalHeight}
                                    projectId={projectId}
                                    filters={visFilters}
                                    identifier="ablgzuDAgrKO"
                                    withPeers
                                />
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </VisualizationBlockBase>
            <VisualizationBlock
                header={<BlockHeading>Terminal share by transaction type</BlockHeading>}
                projectId={projectId}
                filters={visFilters}
                identifier="acfBflz2fF9v"
            />
            <VisualizationBlockBase height="auto">
                <Grid lg={2}>
                    <VisualizationWrapper
                        header={<BlockHeading>Top Industries for non-chip terminals</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aasYWxfpasEN"
                    />
                    <VisualizationWrapper
                        header={
                            <BlockHeading>
                                <br />
                            </BlockHeading>
                        }
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaDYWuMPg3O8"
                    />
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default TerminalAnalysis;
