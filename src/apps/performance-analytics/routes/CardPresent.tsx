// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import VisualizationBlockBase, {
    tallerHeight,
    headlineHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters, filterList } from "../contexts/FilterStateContext";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import Typography from "../../../components/utils/Typography";
import { css } from "emotion";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Hr from "../../../components/utils/Hr";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";

const classes = {
    flexRow: css({
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        margin: styleGuide.spacing(-1),
        "> *": {
            margin: styleGuide.spacing(1),
        },
    }),
    flexGrow: css({
        flex: "1 1 auto",
    }),
    flexStatic: css({
        flex: "0 0 auto",
    }),
    headline: css({
        flex: "0 0 auto",
        minWidth: 150,
    }),
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    inlineHeadline: css({
        display: "inline-block",
        minWidth: "2em",
        minHeight: "1em",
        // override all internal headline fontSize and height styles to display as inline text
        div: {
            fontSize: `${styleGuide.typography.fontSize.body}px !important`,
            maxHeight: "1em",
            padding: 0,
        },
        "*": {
            margin: "0 !important",
            padding: "0 !important",
        },
    }),
};

const CardPresent: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);

    const commonHeadlineProps = {
        className: classes.inlineHeadline,
        projectId,
        filters: visFilters,
        ErrorComponent: SmallError,
        height: "auto",
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
            <VisualizationBlockBase height="auto">
                <div className={classes.flexRow}>
                    <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                        Card Present
                    </Typography>
                    <div className={classes.flexGrow}>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="abwv56oDc5QB" />
                        <Typography Component="span" variant="body" className={classes.flexGrow}>
                            {" "}
                            of transaction attempts are CP.&emsp;
                        </Typography>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="ab9v18rzcJpN" />
                        <Typography Component="span" variant="body" className={classes.flexGrow}>
                            {" "}
                            of fraud $ are CP.
                        </Typography>
                    </div>
                </div>

                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                <Grid lg={2}>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acbQzIknf6X7"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated approval rate for 16 months
                            </BlockHeading>
                        </div>

                        <VisualizationWrapper
                            header={<BlockHeading>Approval Rate</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abyfdU9edkuQ"
                            withPeers
                        />

                        <VisualizationWrapper
                            header={<BlockHeading>CNP Spend as % of Total Spend</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abDuyauMcmqA"
                            withPeers
                        />
                    </Grid>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abSQzMi7aVAD"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated fraud rate for 13 months
                            </BlockHeading>
                        </div>

                        <VisualizationWrapper
                            header={<BlockHeading>Fraud BPS</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abBfd6PMdlf3"
                            withPeers
                        />

                        <VisualizationWrapper
                            header={<BlockHeading>Fraud</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaJuztzUeCpX"
                            withPeers
                        />
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <Typography variant="menuGroupTitle">Chip Growth</Typography>

                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                <Grid lg={2}>
                    <VisualizationWrapper
                        header={<BlockHeading>% of Volume</BlockHeading>}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaXwh7sVeDGq"
                        withPeers
                    />
                    <VisualizationWrapper
                        header={<BlockHeading>CHIP APPROVAL RATE</BlockHeading>}
                        height={tallerHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acmwdZGvgjBW"
                        withPeers
                    />
                </Grid>
            </VisualizationBlockBase>

            <Grid lg={2}>
                <Grid>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                            CP Domestic
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <Grid>
                            <VisualizationWrapper
                                header={<BlockHeading>Approval Rate Vs Fraud BPS - Me</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaCfkaXOcm4k"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>CP Domestic Spend as % of all CP Spend</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abNvM7Tbgv0p"
                                withPeers
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Distribution Of Fraud</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="ab9vKmnLbsaU"
                                withPeers
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>
                <Grid>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                            CP Cross Border
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <Grid>
                            <VisualizationWrapper
                                header={<BlockHeading>Approval Rate Vs Fraud BPS - Me</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaQfmAV7cFC5"
                            />
                            <VisualizationWrapper
                                header={
                                    <BlockHeading>CP Cross Border Spend as % of all CP Spend</BlockHeading>
                                }
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abHvM3wKfoZm"
                                withPeers
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Distribution Of Fraud</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aavvT8FObVxo"
                                withPeers
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>
            </Grid>
        </Dashboard>
    );
};

export default CardPresent;
