// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import FilterBar from "../../../components/filters/FilterBar";
import { filterList, useFilters } from "../contexts/FilterStateContext";
import { Container } from "react-grid-system";
import Grid from "../../../components/utils/Grid";
import VisualizationBlockBase, {
    moreTallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Typography from "../../../components/utils/Typography";
import { css } from "emotion";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Hr from "../../../components/utils/Hr";

const classes = {
    flexRow: css({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        margin: styleGuide.spacing(-1),
        "> *": {
            margin: styleGuide.spacing(1),
        },
    }),
    flexGrow: css({
        flex: "0 1 auto",
        minWidth: 100,
    }),
    flexStatic: css({
        flex: "0 0 auto",
    }),
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    gap: css({
        marginBottom: styleGuide.spacing(2),
    }),
};

const Merchant: React.FC = () => {
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
                        <div className={classes.flexRow}>
                            <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                                COF merchant categories by Channels
                            </Typography>
                            <Typography variant="body" className={classes.flexGrow}>
                                <span style={{ color: styleGuide.color.positive }}>
                                    Green indicates values which are lower than rates of non-COF POS Entry
                                    Modes
                                </span>
                                <br />
                                <span style={{ color: styleGuide.color.negative }}>
                                    Red indicates values which are higher than rates of non-COF POS Entry
                                    Modes
                                </span>
                            </Typography>
                        </div>

                        <Hr color={styleGuide.color.textMuted} className={classes.simpleDivider} />
                        <VisualizationWrapper
                            height={moreTallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa75vCRBaUZl"
                            className={classes.gap}
                        />
                    </VisualizationBlockBase>
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <div className={classes.flexRow}>
                            <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                                COF merchants by Channels
                            </Typography>
                            <Typography variant="body" className={classes.flexGrow}>
                                <span style={{ color: styleGuide.color.positive }}>
                                    Green indicates values which are lower than rates of non-COF POS Entry
                                    Modes
                                </span>
                                <br />
                                <span style={{ color: styleGuide.color.negative }}>
                                    Red indicates values which are higher than rates of non-COF POS Entry
                                    Modes
                                </span>
                            </Typography>
                        </div>

                        <Hr color={styleGuide.color.textMuted} className={classes.simpleDivider} />
                        <VisualizationWrapper
                            height={moreTallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abk5vZWXg7QF"
                            className={classes.gap}
                        />
                    </VisualizationBlockBase>
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default Merchant;
