// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import { filterList, useFilters } from "../contexts/FilterStateContext";
import { Container } from "react-grid-system";
import Grid from "../../../components/utils/Grid";
import VisualizationBlockBase, {
    extraTallHeight,
    normalHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Hr from "../../../components/utils/Hr";
import Typography from "../../../components/utils/Typography";
import { css } from "emotion";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";

const classes = {
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    gap: css({
        marginBottom: styleGuide.spacing(2),
    }),
};

const DeclineReasons: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);
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
                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Top Decline Reasons</Typography>

                        <Hr color={styleGuide.color.textMuted} className={classes.simpleDivider} />
                        <Grid lg={2}>
                            <VisualizationWrapper
                                header={<BlockHeading>Credential on File</BlockHeading>}
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="adqZTZ9nfuO0"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Other entry modes</BlockHeading>}
                                height={normalHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aclZXGlFhaXX"
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">COF Decline Reason Deep Dive</Typography>
                        <Hr color={styleGuide.color.textMuted} className={classes.simpleDivider} />

                        <VisualizationWrapper
                            header={<BlockHeading>Issuer Declines heatmap</BlockHeading>}
                            height={normalHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acuZZnLCgVEF"
                            className={classes.gap}
                        />

                        <VisualizationWrapper
                            header={<BlockHeading>Issuer Declines Detail by ICA</BlockHeading>}
                            height={extraTallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aebZU9vMaQJD"
                        />
                    </VisualizationBlockBase>
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default DeclineReasons;
