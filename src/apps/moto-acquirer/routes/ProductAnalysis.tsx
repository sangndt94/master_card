// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallerHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import styleGuide from "../../../components/styleGuide/styleGuide";

// line-height in pixels needs a unit unlike min-height, so we need to strip it by parsing it before calculating the min-height.
const donutHeadingMinHeight = parseInt(String(styleGuide.typography.lineHeight.caption), 10) * 4;
import DateNotice from "../../../components/moto/DateInfo";

const ProductAnalysis: React.FC = () => {
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
                <Grid md={1} lg={2} xl={6}>
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Spend Share
                                <br />
                                by Product
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaRXW2fIfn8V"
                    />
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Transactions Share
                                <br />
                                by Product
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aajX0SXzajTa"
                    />
                    <VisualizationWrapper
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaBXYIgEfOcs"
                        gridColumn="auto / span 4"
                    />
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <Grid md={1} lg={2} xl={6}>
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Spend Share
                                <br />
                                by Product Group
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaD8ohucbSJS"
                    />
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Transactions Share
                                <br />
                                by Product Group
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aao8qRr9d45C"
                    />
                    <VisualizationWrapper
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abp8tWEbbScV"
                        gridColumn="auto / span 4"
                    />
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <Grid md={1} lg={2} xl={6}>
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Spend Share by Product Type
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaW8X4Xsddud"
                    />
                    <VisualizationWrapper
                        header={
                            <BlockHeading textAlign="center" minHeight={donutHeadingMinHeight}>
                                MO/TO Transactions Share by Product Type
                            </BlockHeading>
                        }
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abE8XdkjaRnD"
                    />
                    <VisualizationWrapper
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abO8wdpic0aF"
                        gridColumn="auto / span 4"
                    />
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default ProductAnalysis;
