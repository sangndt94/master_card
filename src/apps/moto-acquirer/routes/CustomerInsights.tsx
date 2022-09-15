// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import { normalHeight, tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import styleGuide from "../../../components/styleGuide/styleGuide";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";

const CustomerInsights: React.FC = () => {
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
            <Grid lg={2} gap={styleGuide.spacing(0, 2)}>
                <DashboardBlock
                    header={
                        <BlockHeading typographyComponent="span">
                            MO/TO spend share on total CNP spend
                        </BlockHeading>
                    }
                    description={
                        <BlockHeading variant="subtitle" typographyComponent="span">
                            This section considers only the cardholders who had MO/TO transactions in the
                            current month
                        </BlockHeading>
                    }
                >
                    <VisualizationWrapper
                        height={normalHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acJo3atpbtDH"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading typographyComponent="span">Spend Trend</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaRtpGtObwwD"
                    />
                </DashboardBlock>

                <DashboardBlock
                    header={
                        <BlockHeading typographyComponent="span">
                            MO/TO transactions share on total CNP transactions
                        </BlockHeading>
                    }
                    description={
                        <BlockHeading variant="subtitle" typographyComponent="span">
                            This section considers only the cardholders who had MO/TO transactions in the
                            current month
                        </BlockHeading>
                    }
                >
                    <VisualizationWrapper
                        height={normalHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aalpduTZa0jz"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading typographyComponent="span">Transactions Trend</BlockHeading>}
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaepe5lphqme"
                    />
                </DashboardBlock>
            </Grid>

            <Grid lg={3}>
                <DashboardBlock
                    header={
                        <BlockHeading textAlign="center" typographyComponent="span">
                            Average ticket value (ATV)
                        </BlockHeading>
                    }
                >
                    <Grid sm={2}>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    MO/TO
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaEtBI3kcGOl"
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Other CNP
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abktG4kGiw4C"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>ATV - M-o-M Growth</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acA5GxhfbUn7"
                            gridColumn="1 / -1"
                        />
                    </Grid>
                </DashboardBlock>
                <DashboardBlock
                    header={
                        <BlockHeading textAlign="center" typographyComponent="span">
                            Average spend per customer (SPC)
                        </BlockHeading>
                    }
                >
                    <Grid sm={2}>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    MO/TO
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abT5IXlEf1Te"
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Other CNP
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abC5Jbvdc5bM"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>SPC - M-o-M Growth</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aamfaY6Yb37T"
                            gridColumn="1 / -1"
                        />
                    </Grid>
                </DashboardBlock>
                <DashboardBlock
                    header={
                        <BlockHeading textAlign="center" typographyComponent="span">
                            Average transactions per customer (TPC)
                        </BlockHeading>
                    }
                >
                    <Grid sm={2}>
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    MO/TO
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="adm5FqTpeCoB"
                        />
                        <HeadlineVisualization
                            header={
                                <BlockHeading textAlign="center" variant="label">
                                    Other CNP
                                </BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acm5Ih3GcbO4"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>TPC - M-o-M Growth</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa2UfbBig36I"
                            gridColumn="1 / -1"
                        />
                    </Grid>
                </DashboardBlock>
            </Grid>
        </Dashboard>
    );
};

export default CustomerInsights;
