// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import Grid from "../../../components/utils/Grid";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import {
    tallHeight,
    customHeadlineRowHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import { arrowPercentFormat } from "../../../components/visualization/CustomHeadline";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";

const PerformanceDrivers: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIca_parent",
        "cidAndIca_child",
        "country",
    );

    const commonHeadlineProps = {
        projectId,
        filters: visFilters,
        rateFormat: arrowPercentFormat,
        height: customHeadlineRowHeight,
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
            <DashboardBlock header={<BlockHeading>Average Ticket Value</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="abQ8ni9BdY1U"
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="abw8nlAzcJVc"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Non-Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="aaU8rARpf0wV"
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="acM8m9GedvUI"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaLcUM1Tg7Fv"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>

            <DashboardBlock header={<BlockHeading>Spend Per Customer</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="abBee4ypdLAZ"
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="aa0elgFVdJna"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Non-Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="abbes0WxezAG"
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="abpertFubFi9"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaAeyTPoeiEM"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>

            <DashboardBlock header={<BlockHeading>Transactions Per Customer</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="aaneGx1Jd6Bk"
                            filters={visFilters}
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="abjeGecFaKzs"
                            filters={visFilters}
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Non-Chip</BlockHeading>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Portfolio
                                </BlockHeading>
                            }
                            identifier="abkeGaEegW3Y"
                            {...commonHeadlineProps}
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Benchmark
                                </BlockHeading>
                            }
                            identifier="abEeH08PfjHt"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaviL37FeEHC"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>
        </Dashboard>
    );
};

export default PerformanceDrivers;
