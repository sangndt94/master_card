// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import { standardFilterList, useFilters } from "../contexts/FilterStateContext";
import { Container } from "react-grid-system";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Grid from "../../../components/utils/Grid";
import VisualizationBlockBase, {
    customHeadlineRowHeight,
    moreTallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HrText from "../../../components/utils/HrText";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Hr from "../../../components/utils/Hr";
import { css } from "emotion";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";

const classes = {
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    headlineSpacer: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }),
};

const Overview: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        ...standardFilterList,
    );
    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters}
                    projectId={projectId}
                    clearFilters={clearFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <Container fluid className="s-dashboard-content">
                <VisualizationBlockBase height="auto">
                    <HrText color={styleGuide.color.textMuted} text="COF" />
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        boxShadow={false}
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">
                                                Approved Transactions
                                            </BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="aa0TXbs9gPtD"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Approved $</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="absUbUhlbCbT"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">
                                                Declined Transactions
                                            </BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="abzUb1wOahgk"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Approval Rate</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="abBUrE8rfHk6"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">Gross Fraud BPS</BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="abYvhrlhfQ8D"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Net Fraud BPS</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="acXvenoSeyzS"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>

                    <HrText color={styleGuide.color.textMuted} text="Other" />
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        boxShadow={false}
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">
                                                Approved Transactions
                                            </BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="aaTTZQkXgrLv"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Approved $</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="ablUcYtBbz5j"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">
                                                Declined Transactions
                                            </BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="aaXUazbRhsyL"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Approval Rate</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="abAUvd1BcgDg"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={
                                            <BlockHeading textAlign="center">Gross Fraud BPS</BlockHeading>
                                        }
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="absUNeXhgjGb"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                    <HeadlineVisualization
                                        header={<BlockHeading textAlign="center">Net Fraud BPS</BlockHeading>}
                                        className={classes.headlineSpacer}
                                        projectId={projectId}
                                        filters={visFilters}
                                        identifier="adCUJ1SugOGW"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </VisualizationBlockBase>

                <Grid lg={2}>
                    <VisualizationBlock
                        header={<BlockHeading>COF Approved Transactions & Penetration</BlockHeading>}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abOUYRdOc2Mp"
                    />
                    <VisualizationBlock
                        header={<BlockHeading>Approval rate COF vs. Other</BlockHeading>}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aabU4M0GftND"
                    />
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlock
                        header={
                            <BlockHeading>
                                Top 10 Merchant Categories for COF (only E-Commerce and Recurring channels)
                                <Hr color={styleGuide.color.textMuted} className={classes.simpleDivider} />
                            </BlockHeading>
                        }
                        projectId={projectId}
                        filters={visFilters}
                        identifier="adlVkDiJfEbu"
                        height={moreTallHeight}
                    />
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default Overview;
