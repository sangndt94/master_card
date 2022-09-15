// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import Grid from "../../../components/utils/Grid";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import {
    tallHeight,
    microHeight,
    customHeadlineRowHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import { arrowPercentFormat } from "../../../components/visualization/CustomHeadline";
import SmallError from "../../../components/utils/SmallError";

const PerformanceDrivers: React.FC = () => {
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
            <DashboardBlock header={<BlockHeading>Average Ticket Value</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">MO/TO</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Portfolio</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abDjy6Cnboal"
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Benchmark</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaPjAL8jc0x4"
                            withPeers
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Other CNP</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Portfolio</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aarjOgfrfUea"
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Benchmark</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            ErrorComponent={SmallError}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaCjOgNtgFgm"
                            withPeers
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aa0oHJK0aSY7"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>
            <Grid lg={2}>
                <DashboardBlock
                    header={
                        <BlockHeading textAlign="center" width="100%">
                            Cross Border spend
                        </BlockHeading>
                    }
                >
                    <Grid md={2}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Portfolio</BlockHeading>}
                            height={microHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abffbJH8deZx"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Benchmark</BlockHeading>}
                            height={microHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="achfb5jiiiGP"
                            withPeers
                        />
                        <VisualizationWrapper
                            footer={
                                <BlockHeading textAlign="center" variant="label" textTransform="none">
                                    Portfolio
                                </BlockHeading>
                            }
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="ab4XD78FhZcA"
                        />
                        <VisualizationWrapper
                            footer={
                                <BlockHeading textAlign="center" variant="label" textTransform="none">
                                    Benchmark
                                </BlockHeading>
                            }
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="ab0XD7BdhX8v"
                            withPeers
                        />
                    </Grid>
                </DashboardBlock>

                <DashboardBlock
                    header={
                        <BlockHeading textAlign="center" width="100%">
                            Cross Border transactions
                        </BlockHeading>
                    }
                >
                    <Grid md={2}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Portfolio</BlockHeading>}
                            height={microHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="adGe60PLgtTf"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Benchmark</BlockHeading>}
                            height={microHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aefe5QyPf1T0"
                            withPeers
                        />
                        <VisualizationWrapper
                            footer={
                                <BlockHeading textAlign="center" variant="label" textTransform="none">
                                    Portfolio
                                </BlockHeading>
                            }
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acJXDw6IhVyO"
                        />
                        <VisualizationWrapper
                            footer={
                                <BlockHeading textAlign="center" variant="label" textTransform="none">
                                    Benchmark
                                </BlockHeading>
                            }
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abAXCYOpdouG"
                            withPeers
                        />
                    </Grid>
                </DashboardBlock>
            </Grid>
        </Dashboard>
    );
};

export default PerformanceDrivers;
