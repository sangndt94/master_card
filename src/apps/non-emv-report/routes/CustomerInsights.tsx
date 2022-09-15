// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import {
    tallHeight,
    customHeadlineRowHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import DashboardBlock from "../../../components/dashboardBlocks/DashboardBlock";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import SmallError from "../../../components/utils/SmallError";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import { arrowPercentFormat } from "../../../components/visualization/CustomHeadline";

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
            <DashboardBlock header={<BlockHeading>Low Spend Customers</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Spend</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aafjZU8Resji"
                            ErrorComponent={SmallError}
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abzSS8nsh0gr"
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Transactions</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abkjOU2qa2l6"
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aczSSQrBezqV"
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaxj4m6benXN"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>

            <DashboardBlock header={<BlockHeading>Medium Spend Customers</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Spend</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abXk1bqqbwKv"
                            ErrorComponent={SmallError}
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa4pqybLdiH2"
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Transactions</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abdqhF7ig2MG"
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abGTeGuXbf0u"
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aeGpUQfBei9i"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>

            <DashboardBlock header={<BlockHeading>High Spend Customers</BlockHeading>}>
                <Grid lg={2}>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Spend</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaTk4tqAaDT1"
                            ErrorComponent={SmallError}
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaQTf8JQdfwg"
                            ErrorComponent={SmallError}
                        />
                    </Grid>
                    <Grid md={2}>
                        <BlockHeading textAlign="center">Transactions</BlockHeading>
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aeVpUQMtfZuT"
                        />
                        <HeadlineVisualization
                            header={<BlockHeading textAlign="center">Non-Chip</BlockHeading>}
                            rateFormat={arrowPercentFormat}
                            height={customHeadlineRowHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acqS9KAFaP2g"
                        />
                    </Grid>
                    <VisualizationWrapper
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="adhp9lhCfmG5"
                        gridColumn="1 / -1"
                    />
                </Grid>
            </DashboardBlock>
        </Dashboard>
    );
};

export default CustomerInsights;
