// (C) 2020 GoodData Corporation
import React from "react";
import { Container } from "react-grid-system";

import {
    getFilterDisplayFormIdentifiers,
    overviewFilterList,
    useFilters,
} from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import { HeatmapHorizontalAttribute } from "../../../../components/dashboardBlocks/HeatmapHorizontalAttribute";
import { HeatmapVerticalAttribute } from "../../../../components/dashboardBlocks/HeatmapVerticalAttribute";
import VisualizationBlock from "../../../../components/dashboardBlocks/VisualizationBlock";
import BlockHeading from "../../../../components/dashboardBlocks/BlockHeading";
import { HeatmapAttributes } from "../../../../components/dashboardBlocks/HeatmapAttributes";
import Grid from "../../../../components/utils/Grid";
import VisualizationBlockBase from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import Hr from "../../../../components/utils/Hr";
import Typography from "../../../../components/utils/Typography";
import styleGuide from "../../../../components/styleGuide/styleGuide";
import { css } from "emotion";
import KpiGroupVisualization from "../../../../components/visualization/KpiGroupVisualization";

const classes = {
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
};

const Overview: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        ...overviewFilterList,
    );

    const projectId = useProjectId();

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndIssuingIca_parent"])}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <Container fluid className="s-dashboard-content">
                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">DI Score</Typography>
                        <Typography variant="subtitle">
                            You can click on filterable heatmap in order to narrow down presented insights
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <HeatmapHorizontalAttribute
                            attribute={getFilterDisplayFormIdentifiers("diScore")[0]}
                            metrics={["aay7mJrqfwrh", "adg7TDhXimBI", "abo70WnIaQAK"]}
                            projectId={projectId}
                            filters={visFilters}
                            applyFilters={applyFilters}
                            normalizedFilters={filters}
                        />
                    </VisualizationBlockBase>
                </Grid>

                <VisualizationBlockBase height="auto">
                    <Grid md={2} lg={4}>
                        <KpiGroupVisualization
                            projectId={projectId}
                            identifier="aa134BCzc49M"
                            filters={visFilters}
                            kpiDefaultTitle="Fraud Rate by Dollar (BPS)"
                        />
                        <KpiGroupVisualization
                            projectId={projectId}
                            identifier="aa837FeJeHL2"
                            filters={visFilters}
                            kpiDefaultTitle="Approval Rate"
                        />
                        <KpiGroupVisualization
                            projectId={projectId}
                            identifier="aaR38da4iFYg"
                            filters={visFilters}
                            kpiDefaultTitle="Transaction Review Rate"
                        />
                        <KpiGroupVisualization
                            projectId={projectId}
                            identifier="abh4djOScnlY"
                            filters={visFilters}
                            kpiDefaultTitle="Fraud Amount"
                        />
                    </Grid>
                </VisualizationBlockBase>

                <Grid lg={2}>
                    <VisualizationBlock
                        header={<BlockHeading>Approval Decline Ratio</BlockHeading>}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="abIck4SDbxDw"
                    />
                    <VisualizationBlock
                        header={<BlockHeading>Fraud over Time</BlockHeading>}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaqcsn2VcOIt"
                    />
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle" Component="h1">
                            DTI Score
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <HeatmapVerticalAttribute
                            attribute={getFilterDisplayFormIdentifiers("dtiScore")[0]}
                            metrics={[
                                "acabVXtTfeUw",
                                "abo6uCpqdkRf",
                                "abwcoTTWbiLN",
                                "aay7mJrqfwrh",
                                "abbbZKHCagwo",
                            ]}
                            projectId={projectId}
                            filters={visFilters}
                        />
                    </VisualizationBlockBase>
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle" Component="h1">
                            Fraud by AuthIQ
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <HeatmapAttributes
                            attributes={[
                                getFilterDisplayFormIdentifiers("authIQRanksOverallAmount")[0],
                                getFilterDisplayFormIdentifiers("authIQSegments")[0],
                            ]}
                            metric="abo70WnIaQAK"
                            projectId={projectId}
                            filters={visFilters}
                        />
                    </VisualizationBlockBase>
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default Overview;
