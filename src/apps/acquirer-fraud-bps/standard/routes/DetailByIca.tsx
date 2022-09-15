// (C) 2020 GoodData Corporation
import React, { useState } from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import BlockHeading from "../../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../../components/filters/FilterBar";
import { useFilters, filterList } from "../contexts/FilterStateContext";
import Grid from "../../../../components/utils/Grid";
import Typography from "../../../../components/utils/Typography";
import { css } from "emotion";
import styleGuide from "../../../../components/styleGuide/styleGuide";
import Hr from "../../../../components/utils/Hr";
import VisualizationWrapper from "../../../../components/visualization/VisualizationWrapper";
import GranularitySwitch from "../../../../components/dashboardBlocks/GranularitySwitch";
import GranularitySwitchByItem from "../../../../components/dashboardBlocks/GranularitySwitchByItem";
import HrText from "../../../../components/utils/HrText";

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
    textConfig: css({
        textAlign: "center",
        color: styleGuide.color.textMuted,
    }),
    flexGrowTitle: css({
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    }),
    flexGrowCollapsedAndQuarterly: css({
        display: "flex",
        width: "280px",
        justifyContent: "flex-end",
        alignItems: "center",
        textAlign: "end",
    }),
    tableSplit: css({
        flex: "1",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    }),
    titleGranularity: css({
        padding: styleGuide.spacing(0, 2),
    }),
};
const buttonGranularity = [
    {
        title: "ICA",
        quarterly: "aclbvJkNdB8w",
        collapsed: "acgzM7YNh7Sr",
    },
    {
        title: "Credit / Debit",
        quarterly: "abcz59tpfhDK",
        collapsed: "aanAbJ0Ber4y",
    },
    {
        title: "Channel",
        quarterly: "acpAKOc3itrf",
        collapsed: "abMALR4AgeRw",
    },
    {
        title: "Corridor",
        quarterly: "abFAid39a4CW",
        collapsed: "acPAcIP2hhE3",
    },
];
const DetailByIca: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);
    const [useFineGranularity, setUseFineGranularity] = useState(true);

    const [useGranularity, setUseGranularity] = useState(buttonGranularity[0].title);
    const filterGranularity = buttonGranularity.filter((item) => item.title === useGranularity);
    const visualizationUsedDate = useFineGranularity
        ? filterGranularity[0].quarterly
        : filterGranularity[0].collapsed;

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters}
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
                        Detail By ICA
                    </Typography>
                    <div className={classes.flexGrow}>
                        <div className={classes.flexGrowTitle}>
                            <div className={classes.tableSplit}>
                                <Typography Component="span" variant="body">
                                    Show table split by:&emsp;
                                </Typography>
                                {buttonGranularity.map((item, index) => (
                                    <GranularitySwitchByItem
                                        setUseGranularity={setUseGranularity}
                                        useGranularity={useGranularity}
                                        key={index}
                                        item={item}
                                    />
                                ))}
                            </div>
                            <div className={classes.flexGrowCollapsedAndQuarterly}>
                                <Typography Component="span" variant="body">
                                    Granularity:
                                </Typography>
                                <GranularitySwitch
                                    useFineGranularity={useFineGranularity}
                                    setUseFineGranularity={setUseFineGranularity}
                                    firstItemName="Quarterly"
                                    secondItemName="Collapsed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                <Grid lg={1}>
                    <VisualizationWrapper
                        size={12}
                        projectId={projectId}
                        filters={visFilters}
                        identifier={visualizationUsedDate}
                        height={tallHeight}
                        enableExports
                        exportTitle={`${
                            useFineGranularity ? "Quarterly" : "All time"
                        } by ${useGranularity.replace(" / ", " ")}`}
                    />
                    <BlockHeading className={classes.textConfig}>
                        <HrText
                            color={styleGuide.color.textMuted}
                            text={<span className={classes.titleGranularity}>Total Values By Quarters</span>}
                        />
                    </BlockHeading>
                    <VisualizationWrapper
                        size={12}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aepbj8Icb7g9"
                        height={tallHeight}
                        enableExports
                        exportTitle="Fraud BPS - Totals by Quarters"
                    />
                </Grid>
            </VisualizationBlockBase>
        </Dashboard>
    );
};

export default DetailByIca;
