// (C) 2020 GoodData Corporation
import React from "react";
import { Container } from "react-grid-system";

import { filterList, getFilterDisplayFormIdentifiers, useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import FilterBar from "../../../../components/filters/FilterBar";
import Dashboard from "../components/Dashboard";
import Grid from "../../../../components/utils/Grid";
import VisualizationBlockBase, {
    normalHeight,
    tinyHeight,
} from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import Hr from "../../../../components/utils/Hr";
import Typography from "../../../../components/utils/Typography";
import styleGuide from "../../../../components/styleGuide/styleGuide";
import { css } from "emotion";
import KpiGroupVisualization from "../../../../components/visualization/KpiGroupVisualization";
import { HeatmapVerticalAttribute } from "../../../../components/dashboardBlocks/HeatmapVerticalAttribute";
import BlockHeading from "../../../../components/dashboardBlocks/BlockHeading";
import VisualizationWrapper from "../../../../components/visualization/VisualizationWrapper";
import { IdentifierSelector } from "../../../../components/dashboardBlocks/IdentifierSelector";
import { getFilterIdentifier } from "../../../../components/filters/utils";
import CustomVisualization from "../../../../components/visualization/CustomVisualization";
import { NineGroupPresentation } from "../../../../components/visualization/NineGroup";
import BlockContent from "../../../../components/dashboardBlocks/BlockContent";

import selectionIcon from "../../../../static/interactivity.svg";

const classes = {
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    selectionSign: css({
        fontWeight: styleGuide.typography.fontWeight.bold,
        fontSize: styleGuide.typography.fontSize.section,
    }),
    centered: css({
        margin: "auto",
    }),
    gap: css({
        paddingBottom: styleGuide.spacing(2),
    }),
    noFilterContent: css({
        backgroundColor: styleGuide.color.bodyBackground,
        padding: styleGuide.spacing(2),
        display: "flex",
        flexDirection: "row",
        height: tinyHeight,
    }),
    selectionIcon: css({
        marginRight: styleGuide.spacing(2),
    }),
};

const timeFilter = (filters) => {
    if (!filters) {
        return [];
    }

    return filters.filter(
        (filter) =>
            getFilterIdentifier(filter) === getFilterDisplayFormIdentifiers("month")[0] ||
            getFilterIdentifier(filter) === getFilterDisplayFormIdentifiers("cidAndIssuingIca")[0],
    );
};

const isFiltered = (filters) => {
    return JSON.stringify(filters) !== JSON.stringify(timeFilter(filters));
};

const selectionHeader = (
    <Typography variant="productTitle" Component="span" className={classes.centered}>
        Selection
    </Typography>
);

const DIScore: React.FC = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);

    const projectId = useProjectId();

    const headlineRender = (identifier: string) => {
        const [domesticCP, domesticCNP, crossCP, crossCNP] = identifier.split(",");

        return (
            <>
                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                <Grid md={2} lg={4}>
                    <KpiGroupVisualization
                        projectId={projectId}
                        identifier={domesticCP}
                        filters={visFilters}
                        kpiDefaultTitle="Domestic CP"
                    />
                    <KpiGroupVisualization
                        projectId={projectId}
                        identifier={domesticCNP}
                        filters={visFilters}
                        kpiDefaultTitle="Domestic CNP"
                    />
                    <KpiGroupVisualization
                        projectId={projectId}
                        identifier={crossCP}
                        filters={visFilters}
                        kpiDefaultTitle="Cross Border CP"
                    />
                    <KpiGroupVisualization
                        projectId={projectId}
                        identifier={crossCNP}
                        filters={visFilters}
                        kpiDefaultTitle="Cross Border CNP"
                    />
                </Grid>
            </>
        );
    };

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
                <IdentifierSelector
                    projectId={projectId}
                    filters={visFilters}
                    headerLeft={<Typography variant="menuGroupTitle">Corridors by Card Presence</Typography>}
                    values={[
                        [
                            <span className={classes.selectionSign}>#</span>,
                            <span className={classes.selectionSign}>$</span>,
                            <span className={classes.selectionSign}>%</span>,
                        ],
                    ]}
                    selectionMap={[
                        {
                            identifier: "abbXYpEQcXlo,aaJX0z5odnBy,aa9XYNithqPi,abcXZHdRgbwt",
                            visualizationOverride: headlineRender,
                        },
                        {
                            identifier: "aa9XZnfEcsoE,abrXZVbzikgu,abgXYXbWbvgL,aa8XZtLugA5k",
                            visualizationOverride: headlineRender,
                        },
                        {
                            identifier: "aa9X0yZYaMF6,abOXZVbzikgu,abnX0L11cCVb,abzX0U1fhJAs",
                            visualizationOverride: headlineRender,
                        },
                    ]}
                />

                <VisualizationBlockBase height="auto">
                    <Grid lg={1}>
                        <Typography variant="menuGroupTitle">DI Score</Typography>
                        <Typography variant="subtitle">
                            You can click on filterable heatmap in order to narrow down presented insights
                        </Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                        <HeatmapVerticalAttribute
                            attribute={getFilterDisplayFormIdentifiers("diScore")[0]}
                            metrics={["aay7mJrqfwrh", "adg7TDhXimBI", "abo70WnIaQAK"]}
                            projectId={projectId}
                            filters={visFilters}
                            applyFilters={applyFilters}
                            normalizedFilters={filters}
                        />
                    </Grid>
                    <Hr color={styleGuide.color.border} className={classes.simpleDivider} />
                    <Grid lg={2} className={classes.gap}>
                        {isFiltered(visFilters) ? (
                            <CustomVisualization
                                header={selectionHeader}
                                projectId={projectId}
                                identifier="abLXLpBzh3Zh"
                                filters={visFilters}
                                CommonPresentationOverride={NineGroupPresentation}
                            />
                        ) : (
                            <div>
                                <BlockContent header={selectionHeader}>
                                    <div className={classes.noFilterContent}>
                                        <img src={selectionIcon} className={classes.selectionIcon} />
                                        <Typography
                                            variant="body"
                                            Component="span"
                                            className={classes.centered}
                                        >
                                            In order to show data for specific selection, use filters or
                                            interactive Insights.
                                        </Typography>
                                    </div>
                                </BlockContent>
                            </div>
                        )}
                        <CustomVisualization
                            header={
                                <Typography
                                    variant="productTitle"
                                    Component="span"
                                    className={classes.centered}
                                >
                                    Whole population
                                </Typography>
                            }
                            projectId={projectId}
                            identifier="abLXLpBzh3Zh"
                            filters={timeFilter(visFilters)}
                            CommonPresentationOverride={NineGroupPresentation}
                        />
                    </Grid>
                    <VisualizationWrapper
                        header={<BlockHeading>Approval and Fraud BPS Rate over Time</BlockHeading>}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aalXLyLacDy1"
                        height={normalHeight}
                    />
                </VisualizationBlockBase>
            </Container>
        </Dashboard>
    );
};

export default DIScore;
