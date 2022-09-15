// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import FilterBar from "../../../components/filters/FilterBar";
import {
    disableCardTypeFilter,
    disableChannelFilter,
    disableCorridorFilter,
    standardFilterList,
    useFilters,
} from "../contexts/FilterStateContext";
import { Container } from "react-grid-system";
import Grid from "../../../components/utils/Grid";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import HrText from "../../../components/utils/HrText";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Typography from "../../../components/utils/Typography";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";

const EntryModes: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        ...standardFilterList,
    );
    const nonChannelFilters = disableChannelFilter(visFilters);
    const nonCorridorFilters = disableCorridorFilter(visFilters);
    const nonCardTypeFilters = disableCardTypeFilter(visFilters);

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
                        <Typography variant="menuGroupTitle">Channel Performance</Typography>

                        <HrText color={styleGuide.color.textMuted} text="TOP COF Channel Performance" />
                        <Grid lg={4}>
                            <VisualizationWrapper
                                header={<BlockHeading>COF channels volume</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonChannelFilters}
                                identifier="aaC05QQxankC"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>COF Channels</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonChannelFilters}
                                identifier="aao0Vx05eMlV"
                                gridColumn="auto / span 3"
                            />
                        </Grid>

                        <HrText
                            color={styleGuide.color.textMuted}
                            text="COF compared to Channel Performance"
                        />
                        <Grid lg={2}>
                            <VisualizationWrapper
                                header={<BlockHeading>E-Commerce</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonChannelFilters}
                                identifier="ady0SacgbcRp"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Recurring</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonChannelFilters}
                                identifier="abJ00zeGhpmh"
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Corridor Performance</Typography>

                        <HrText color={styleGuide.color.textMuted} text="TOP COF Corridor performance" />
                        <Grid lg={4}>
                            <VisualizationWrapper
                                header={<BlockHeading>Corridor performance</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCorridorFilters}
                                identifier="adJ2lGgMaSII"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>COF Corridors</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCorridorFilters}
                                identifier="adA2kG76bqKk"
                                gridColumn="auto / span 3"
                            />
                        </Grid>

                        <HrText
                            color={styleGuide.color.textMuted}
                            text="COF compared to Corridor Performance"
                        />
                        <Grid lg={2}>
                            <VisualizationWrapper
                                header={<BlockHeading>Domestic</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCorridorFilters}
                                identifier="aai2wlNxcMtA"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Cross-Border</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCorridorFilters}
                                identifier="abJ2t1rsdwaP"
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>

                <Grid lg={1}>
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Card Type Performance</Typography>

                        <HrText color={styleGuide.color.textMuted} text="TOP COF Card Type performance" />
                        <Grid lg={4}>
                            <VisualizationWrapper
                                header={<BlockHeading>Card Type Performance</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCardTypeFilters}
                                identifier="aau2wj7mcNsU"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>COF Card Type detail</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCardTypeFilters}
                                identifier="abA2wLkYaoF8"
                                gridColumn="auto / span 3"
                            />
                        </Grid>

                        <HrText
                            color={styleGuide.color.textMuted}
                            text="COF compared to Card Type Performance"
                        />
                        <Grid lg={2}>
                            <VisualizationWrapper
                                header={<BlockHeading>Mastercard Credit</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCardTypeFilters}
                                identifier="acq5iheHcWCg"
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Mastercard Debit</BlockHeading>}
                                height={tallHeight}
                                projectId={projectId}
                                filters={nonCardTypeFilters}
                                identifier="aaT5puoHbKdr"
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Grid>
            </Container>
        </Dashboard>
    );
};

export default EntryModes;
