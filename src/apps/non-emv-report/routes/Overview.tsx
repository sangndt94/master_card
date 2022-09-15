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

    const commonHeadlineProps = {
        projectId,
        filters: visFilters,
        ErrorComponent: SmallError,
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
            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12}>
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Total Chip Spend</BlockHeading>}
                            identifier="adlXanBVcOSn"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            identifier="aahXoPAVfbXN"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            identifier="acvXidP1ftww"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <BlockHeading textAlign="center">Spend Chip Vs. Non-Chip</BlockHeading>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abK1xcmYetqh"
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
                                identifier="aav1F8seiEiW"
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
                header={<BlockHeading>Spend Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="aaj1KPTObTAi"
            />

            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12} marginBottom={gridSpacing} alignItems="center">
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Total Chip Transactions</BlockHeading>}
                            identifier="aa32a3i0eLZy"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            identifier="aaL2hX30eKhd"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            identifier="aaZ2idbvgFdC"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <Grid sm={1} lgSpan={2}>
                            <BlockHeading textAlign="center">Transactions Chip Vs. Non-Chip</BlockHeading>
                            <BlockHeading textAlign="center" variant="subtitle">
                                All cards having both Chip and Non-Chip transactions are considered
                                exclusively Chip for this analysis
                            </BlockHeading>
                        </Grid>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abw2hIuoar5M"
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
                                identifier="aaf2rljren1B"
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
                header={<BlockHeading>Transactions Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="abS2n3aefgvU"
            />

            <VisualizationBlockBase height="auto">
                <Grid sm={1} lg={6} xl={12} marginBottom={gridSpacing} alignItems="center">
                    <Grid sm={1} lg={3} alignItems="center" alignContent="center" lgSpan={6}>
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Chip Active Cards</BlockHeading>}
                            identifier="aad2FbJsiFWz"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Portfolio</BlockHeading>}
                            identifier="abI2GgJMg8cn"
                            {...commonHeadlineProps}
                        />
                        <VisualizationWrapper
                            header={<BlockHeading textAlign="center">Y-o-Y Benchmark</BlockHeading>}
                            identifier="aal2MznWgXn9"
                            {...commonHeadlineProps}
                            withPeers
                        />
                    </Grid>
                    <Grid sm={1} lg={2} marginBottom={gridSpacing} alignItems="center" lgSpan={6}>
                        <Grid sm={1} lgSpan={2}>
                            <BlockHeading textAlign="center">Active Cards Chip Vs. Non-Chip</BlockHeading>
                            <BlockHeading textAlign="center" variant="subtitle">
                                All cards having both Chip and Non-Chip transactions are considered
                                exclusively Chip for this analysis
                            </BlockHeading>
                        </Grid>
                        <Grid sm={1} gap={0}>
                            <VisualizationWrapper
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abH2TYMWcdeI"
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
                                identifier="aci2TqJBbjQf"
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
                header={<BlockHeading>Active Card Trend &amp; Growth</BlockHeading>}
                height={tallerHeight}
                projectId={projectId}
                filters={visFilters}
                identifier="abh2YTKIftdP"
            />
        </Dashboard>
    );
};

export default Overview;
