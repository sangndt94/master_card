// (C) 2020 GoodData Corporation
import React, { useState, useEffect } from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallerHeight,
} from "../../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationWrapper from "../../../../components/visualization/VisualizationWrapper";
import Grid from "../../../../components/utils/Grid";
import FilterBar from "../../../../components/filters/FilterBar";
import { useFilters, filterList } from "../contexts/FilterStateContext";
import { css } from "emotion";
import styleGuide from "../../../../components/styleGuide/styleGuide";
import Hr from "../../../../components/utils/Hr";
import { Row, Container } from "react-grid-system";
import VisualizationBlock from "../../../../components/dashboardBlocks/VisualizationBlock";
import Typography from "../../../../components/utils/Typography";
import KpiGroupVisualization from "../../../../components/visualization/KpiGroupVisualization";
import getElements from "../../../../utils/getElements";
import { orderBy } from "lodash";
import LastQuarterDateInfo from "../../../../components/utils/LastQuarterDateInfo";

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

const Overview: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(...filterList);
    const [lastQuarter, setLastQuarter] = useState("");
    const quarterFilter = filters.find((item) => item.id === "quarter");

    useEffect(() => {
        (async () => {
            const data = await getElements(
                projectId,
                quarterFilter.displayFormIdentifier,
                quarterFilter.attributeQueryOptions,
            );
            if (quarterFilter?.selectedValues?.length === 0) {
                setLastQuarter(data.validElements.items[0].element.title);
            }
        })();
    }, []);

    const arraySort = quarterFilter?.selectedValues.reduce((acc, item) => {
        const itemFirst = item.label.split("/");
        return [...acc, { ...item, arraySort: itemFirst[1] + "/" + itemFirst[0] }];
    }, []);

    const quarter = orderBy(arraySort, ["arraySort"], ["desc"])[0]?.label || lastQuarter;

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
                <LastQuarterDateInfo quarter={quarter} />
                <Grid lg={4}>
                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaTAXuDYbCXs"
                        />
                    </VisualizationBlockBase>
                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abGHbgSddzus"
                        />
                    </VisualizationBlockBase>
                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abPAV6iNfFoa"
                        />
                    </VisualizationBlockBase>
                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaNAYteEfjAY"
                        />
                    </VisualizationBlockBase>
                </Grid>
                <Row>
                    <VisualizationBlock
                        header={<BlockHeading>Cleared Volume & Fraud BPS over Time</BlockHeading>}
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="aacA3CHsdbIf"
                    />
                    <VisualizationBlock
                        header={<BlockHeading>Approved Transactions & Decline Rate over Time</BlockHeading>}
                        size={6}
                        projectId={projectId}
                        filters={visFilters}
                        identifier="acYAVWVsbgrf"
                    />
                </Row>
                <Grid lg={2}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Gross Fraud BPS</Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                        <Grid>
                            <VisualizationWrapper
                                header={<BlockHeading>Gross Fraud BPS by Channel</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaJnrUTdbto1"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Gross Fraud BPS by Corridor</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aclA3Ehyg7y8"
                            />
                            <VisualizationWrapper
                                header={
                                    <BlockHeading>Gross Fraud BPS by 3DS Authentication Level</BlockHeading>
                                }
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="adZtdhEBd2RJ"
                                withPeers
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Gross Fraud BPS by Product Group</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaktobeldpj4"
                                withPeers
                            />
                        </Grid>
                    </VisualizationBlockBase>

                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Net Fraud BPS</Typography>
                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                        <Grid>
                            <VisualizationWrapper
                                header={<BlockHeading>Net Fraud BPS by Channel</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="aaOnrQKBbXZc"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Net Fraud BPS by Corridor</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abXLpt1AcP4j"
                            />
                            <VisualizationWrapper
                                header={
                                    <BlockHeading>Net Fraud BPS by 3DS Authentication Level</BlockHeading>
                                }
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="acxtfTo0cGaG"
                                withPeers
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Net Fraud BPS by Product Group</BlockHeading>}
                                height={tallerHeight}
                                projectId={projectId}
                                filters={visFilters}
                                identifier="abctnojnfb6S"
                                withPeers
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default Overview;
