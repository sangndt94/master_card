// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallerHeight,
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
import styleGuide from "../../../components/styleGuide/styleGuide";
import Hr from "../../../components/utils/Hr";
import { InlineLoading } from "../../../components/utils/CustomLoading";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import HrText from "../../../components/utils/HrText";

const classes = {
    flexRow: css({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        margin: styleGuide.spacing(-1),
        "> *": {
            margin: styleGuide.spacing(1),
        },
    }),
    flexGrow: css({
        flex: "1 1 0",
        minWidth: 100,
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

const KeyInsights: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);

    const commonHeadlineProps = {
        projectId,
        filters: visFilters,
        ErrorComponent: SmallError,
        height: "auto",
    };

    const inlineHeadlineProps = {
        ...commonHeadlineProps,
        LoadingComponent: InlineLoading,
        className: classes.inlineHeadline,
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
                        Global Insights
                    </Typography>
                    <Typography variant="body" className={classes.flexGrow}>
                        The approval rate for issuer for the time period is{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="acGQzlWfdaY3" /> and that
                        of peers and region is{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="abVQDlIhfRrk" withPeers />{" "}
                        and{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="acbQAhewg6I1" withPeers />
                        , respectively.
                        <br />
                        Issuer’s gross fraud basis points are{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="ac4QyseQg4zS" /> and that
                        of peers and region are{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="abuQETKgaqUB" withPeers />{" "}
                        BPS and{" "}
                        <HeadlineVisualization {...inlineHeadlineProps} identifier="aemQyiGUdfHb" withPeers />{" "}
                        BPS, respectively.
                    </Typography>
                </div>

                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                <Grid sm={1} lg={2}>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acNQquZzf6RL"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated approval rate for 16 months
                            </BlockHeading>
                        </div>
                        <VisualizationWrapper
                            header={<BlockHeading>Total Approval Rate</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="acAbbpqYd5YU"
                            withPeers
                        />
                    </Grid>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acEQpXAgeTfV"
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
                            identifier="acic2TpdcWGo"
                            withPeers
                        />
                    </Grid>
                </Grid>
            </VisualizationBlockBase>

            <VisualizationBlockBase height="auto">
                <div className={classes.flexRow}>
                    <Typography variant="menuGroupTitle" className={classes.flexStatic}>
                        Geographical Insights
                    </Typography>
                    <div className={classes.headline}>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="abRv14yrgSbe" />
                    </div>
                    <Typography className={classes.flexGrow} variant="body">
                        of transaction attempts were made cross border
                    </Typography>
                    <div className={classes.headline}>
                        <HeadlineVisualization {...commonHeadlineProps} identifier="abVv19ozbegF" />
                    </div>
                    <Typography className={classes.flexGrow} variant="body">
                        of fraud $ occurred cross border
                    </Typography>
                </div>

                <HrText color={styleGuide.color.textMuted} text="Cross Border" />

                <Grid sm={1} lg={2}>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abqQx0VngkSe"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated approval rate for 16 months
                            </BlockHeading>
                        </div>
                        <VisualizationWrapper
                            header={<BlockHeading>Cross Border Approval Rate</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abpbBT1DizNG"
                            withPeers
                        />
                    </Grid>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="adcQtl08e9Tr"
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
                            identifier="adbc1U2Fe9Py"
                            withPeers
                        />
                    </Grid>
                </Grid>

                <HrText color={styleGuide.color.textMuted} text="Domestic" />

                <Grid sm={1} lg={2}>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acdQuWLDbiS4"
                                withPeers
                            />
                            <BlockHeading typographyComponent="div" variant="subtitle" textAlign="center">
                                Aggregated approval rate for 16 months
                            </BlockHeading>
                        </div>
                        <VisualizationWrapper
                            header={<BlockHeading>Domestic Approval Rate</BlockHeading>}
                            height={tallerHeight}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="ab6bzqqtdXcg"
                            withPeers
                        />
                    </Grid>
                    <Grid>
                        <div>
                            <KpiGroupVisualization
                                height={headlineHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acSQtowoefms"
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
                            identifier="acgc3ENKdh0q"
                            withPeers
                        />
                    </Grid>
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default KeyInsights;
