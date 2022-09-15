// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
    headlineHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters, filterList } from "../contexts/FilterStateContext";
import SmallError from "../../../components/utils/SmallError";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import Typography from "../../../components/utils/Typography";
import { css } from "emotion";
import Hr from "../../../components/utils/Hr";
import styleGuide from "../../../components/styleGuide/styleGuide";
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

const CardNotPresent: React.FC = () => {
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
                        Card Not Present
                    </Typography>
                    <div className={classes.flexGrow}>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="abpv6taVc5jI" />
                        <Typography Component="span" variant="body" className={classes.flexGrow}>
                            {" "}
                            of transaction attempts are CNP.&emsp;
                        </Typography>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="aaewd3zpbP7h" />
                        <Typography Component="span" variant="body" className={classes.flexGrow}>
                            {" "}
                            of fraud $ are CNP.
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
                                identifier="aa0QAovQfHcb"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated approval rate for 16 months
                            </BlockHeading>
                        </div>

                        <VisualizationWrapper
                            header={<BlockHeading>Approval Rate</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="ac3bOwykfmfc"
                            withPeers
                        />

                        <VisualizationWrapper
                            header={<BlockHeading>CNP Spend as % of Total Spend</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aacuAiWlg2xo"
                            withPeers
                        />
                    </Grid>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="ac1QuQHyc7rU"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated fraud rate for 13 months
                            </BlockHeading>
                        </div>

                        <VisualizationWrapper
                            header={<BlockHeading>Fraud BPS</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="ac5c1C40efm8"
                            withPeers
                        />

                        <VisualizationWrapper
                            header={<BlockHeading>Fraud</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acjuues0h61a"
                            withPeers
                        />
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <Typography variant="menuGroupTitle">Card Not Present by Type</Typography>

                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                <Grid lg={3}>
                    <VisualizationWrapper
                        header={<BlockHeading flex="0">Portfolio</BlockHeading>}
                        description="CNP spend and fraud as a % of total spend/fraud"
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acAeY6SOgsg0"
                    />
                    <VisualizationWrapper
                        header={<BlockHeading flex="0">Peers</BlockHeading>}
                        description="CNP spend and fraud as a % of total spend/fraud"
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aaifejb3hOwD"
                        withPeers
                    />
                    <VisualizationWrapper
                        header={<BlockHeading flex="0">Region</BlockHeading>}
                        description="CNP spend and fraud as a % of total spend/fraud"
                        height={tallHeight}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aatfeMYzii3N"
                        withPeers
                    />
                </Grid>
            </VisualizationBlockBase>

            <Grid lg={2}>
                <VisualizationBlockBase height="auto">
                    <Typography variant="menuGroupTitle">CNP Domestic</Typography>
                    <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                    <Grid>
                        <VisualizationWrapper
                            header={<BlockHeading>Approval Rate Vs Fraud BPS - Me</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaNfeHmbcqst"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>CNP Domestic Spend as % of all CNP Spend</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaQvNaIubX1s"
                            withPeers
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>Distribution Of Fraud</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abvvM7tpd7uF"
                            withPeers
                        />
                    </Grid>
                </VisualizationBlockBase>

                <VisualizationBlockBase height="auto">
                    <Typography variant="menuGroupTitle">CNP Cross Border</Typography>
                    <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                    <Grid>
                        <VisualizationWrapper
                            header={<BlockHeading>Approval Rate Vs Fraud BPS - Me</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abfffmmdgRp7"
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>CNP Cross Border Spend as % of all CNP Spend</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abMvJw8YgzZZ"
                            withPeers
                        />
                        <VisualizationWrapper
                            header={<BlockHeading>Distribution Of Fraud</BlockHeading>}
                            height={tallHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="adbvJVdbczD4"
                            withPeers
                        />
                    </Grid>
                </VisualizationBlockBase>
            </Grid>
        </Dashboard>
    );
};

export default CardNotPresent;
