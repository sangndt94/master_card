// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    customHeadlineRowHeight,
    normalHeight,
    tallerHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import styleGuide from "../../../components/styleGuide/styleGuide";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import SmallError from "../../../components/utils/SmallError";

const gridSpacing = styleGuide.spacing(2);

const Overview: React.FC = () => {
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
            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12}>
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Total MO/TO Spend</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaUiPk1Je4q5"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aahiQP4Ya986"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaLiP2qWdjus"
                            withPeers
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <BlockHeading textAlign="center">MO/TO Vs. Other CNP</BlockHeading>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abniQ3LtbRbD"
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
                                identifier="abeiPOKMfrZL"
                                withPeers
                            />
                            <BlockHeading textAlign="center" variant="label">
                                Benchmark
                            </BlockHeading>
                        </Grid>
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlock
                header={<BlockHeading>MO/TO Spend Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="acoiPyFLgYrD"
            />

            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12} marginBottom={gridSpacing} alignItems="center">
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Total MO/TO Transactions</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa3jkiMNfqf6"
                            textAlign="center"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abdjifzKhamI"
                            textAlign="center"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abtjjBsGfaWy"
                            withPeers
                            textAlign="center"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <BlockHeading textAlign="center">MO/TO Vs. Other CNP</BlockHeading>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="adRje73rf67E"
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
                                identifier="acdjgDmablCg"
                                withPeers
                            />
                            <BlockHeading textAlign="center" variant="label">
                                Benchmark
                            </BlockHeading>
                        </Grid>
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlock
                header={<BlockHeading>MO/TO Transactions Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="abvjljJUdRPD"
            />

            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12} marginBottom={gridSpacing} alignItems="center">
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Total MO/TO Active Cards</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abDjkxdyd7FB"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abdjlzX6go0w"
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abOjj4BZfm4P"
                            withPeers
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <Grid sm={1} gap={0} lgSpan={2}>
                            <BlockHeading textAlign="center" marginBottom={styleGuide.spacing(1)}>
                                MO/TO Vs. Other CNP
                            </BlockHeading>
                            <BlockHeading textAlign="center" variant="subtitle">
                                All cards having both MO/TO and CNP transactions are considered exclusively
                                MO/TO for this analysis
                            </BlockHeading>
                        </Grid>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abpjkxkJdq7B"
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
                                identifier="aa8jxrbpertK"
                                withPeers
                            />
                            <BlockHeading textAlign="center" variant="label">
                                Benchmark
                            </BlockHeading>
                        </Grid>
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlock
                header={<BlockHeading>MO/TO Active Card Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="aaHjw5goica0"
            />
        </Dashboard>
    );
};

export default Overview;
