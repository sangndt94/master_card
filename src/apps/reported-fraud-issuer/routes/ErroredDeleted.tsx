// (C) 2020 GoodData Corporation
import { css } from "emotion";
import React, { useState } from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import VisualizationBlockBase, {
    tallHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import VisualizationWrapper from "../../../components/visualization/VisualizationWrapper";
import Button from "../../../components/controls/Button";
import { IconList } from "../../../components/icon";
import VisualizationPopIn from "../../../components/dashboardBlocks/VisualizationPopIn";
import { LoadingComponent } from "@gooddata/react-components";
import KpiGroupVisualization from "../../../components/visualization/KpiGroupVisualization";
import Typography from "../../../components/utils/Typography";
import styleGuide from "../../../components/styleGuide/styleGuide";
import Hr from "../../../components/utils/Hr";
import { useDeepEffect } from "../../../hooks/useDeepEffect";
import { Container } from "react-grid-system";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";
import SmallError from "../../../components/utils/SmallError";
import {
    getClearAndReinitializeFilters,
    addHiddenStatusFilter,
    useInitializeStatusFilter,
    ERRORED_STATUS,
    DELETED_STATUS,
} from "../hooks/filtersHooks";

const classes = {
    headingWithLink: css({
        display: "flex",
        justifyContent: "space-between",
    }),
    simpleDivider: css({
        margin: styleGuide.spacing(2, 0),
    }),
    visualization: css({
        padding: styleGuide.spacing(3),
    }),
    transactionsTotal: css({
        display: "inline-block",
        minWidth: "2em",
        minHeight: "1em",
        // override all internal headline fontSize and height styles to display as inline text
        div: {
            fontSize: `${styleGuide.typography.fontSize.subtitle}px !important`,
            maxHeight: "1em",
            padding: 0,
        },
        "*": {
            margin: "0 !important",
            padding: "0 !important",
        },
    }),
};

const ErroredDeleted: React.FC = () => {
    const projectId = useProjectId();
    const [displayErroredPopin, setDisplayErroredPopin] = useState(false);
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "enteredMonthAndDate_parent",
        "enteredMonthAndDate_child",
        "errorCode",
        "submissionType",
        "cardProduct",
        "securityCode",
        "cardholderPresence",
        "statusAndCardPresence_parent",
        "statusAndCardPresence_child",
    );

    const [erroredVisFilters, setErroredVisFilters] = useState(visFilters);
    const [deletedVisFilters, setDeletedVisFilters] = useState(visFilters);
    const [isStatusLoading, setIsStatusLoading] = useState(true);

    useInitializeStatusFilter(projectId, [ERRORED_STATUS, DELETED_STATUS], filters, setIsStatusLoading);

    useDeepEffect(() => {
        const updateFilters = async () => {
            setIsStatusLoading(true);
            const newErroredFilters = await addHiddenStatusFilter(projectId, visFilters, "Errored");
            setErroredVisFilters(newErroredFilters);
            const newDeletedFilters = await addHiddenStatusFilter(projectId, visFilters, "Deleted");
            setDeletedVisFilters(newDeletedFilters);
            setIsStatusLoading(false);
        };
        updateFilters();
    }, [visFilters, projectId]);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [ERRORED_STATUS, DELETED_STATUS],
        filters,
        setIsStatusLoading,
    );

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters}
                    projectId={projectId}
                    clearFilters={clearAndReinitializeFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            {isStatusLoading ? (
                <LoadingComponent />
            ) : (
                <Container fluid className="s-dashboard-content">
                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Errored Transactions</Typography>

                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                        <Grid lg={2}>
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="aaUJltaacheK"
                                filters={erroredVisFilters}
                                kpiDefaultTitle="Transaction Count"
                                className={classes.visualization}
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={erroredVisFilters}
                                identifier="aacGSwlpbrvX"
                                height={tallHeight}
                                className={classes.visualization}
                            />
                        </Grid>
                        <Grid lg={2}>
                            <VisualizationWrapper
                                header={
                                    <BlockHeading className={classes.headingWithLink}>
                                        Transactions by Error Code - Top 15
                                        <Button
                                            onClick={() => setDisplayErroredPopin(true)}
                                            variant="text"
                                            color="textMain"
                                            endIcon={<IconList height="1em" width="1.143em" />}
                                        >
                                            See Full List
                                        </Button>
                                    </BlockHeading>
                                }
                                projectId={projectId}
                                filters={erroredVisFilters}
                                identifier="aa0ZaZG0dS11"
                                height={tallHeight}
                                className={classes.visualization}
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Transactions by Submission Type</BlockHeading>}
                                projectId={projectId}
                                filters={erroredVisFilters}
                                identifier="aa5GFdfQhhgC"
                                height={tallHeight}
                                className={classes.visualization}
                            />
                        </Grid>
                        {displayErroredPopin && (
                            <VisualizationPopIn setDisplayPopIn={setDisplayErroredPopin}>
                                <VisualizationWrapper
                                    header={
                                        <BlockHeading>Transactions by Error Code - Full List</BlockHeading>
                                    }
                                    projectId={projectId}
                                    filters={erroredVisFilters}
                                    identifier="aaoGnIR3hShi"
                                    height={tallHeight}
                                    enableExports={true}
                                    isPopIn={true}
                                    exportTitle="Transactions by Error Code - Errored Transactions"
                                />
                            </VisualizationPopIn>
                        )}
                        <Grid lg={1}>
                            <VisualizationWrapper
                                header={<BlockHeading>Transaction Details</BlockHeading>}
                                subtitle={
                                    <BlockHeading variant="subtitle">
                                        Total of&nbsp;
                                        <HeadlineVisualization
                                            projectId={projectId}
                                            filters={erroredVisFilters}
                                            errorComponent={SmallError}
                                            identifier="aaqGm6qHe1jd"
                                            className={classes.transactionsTotal}
                                        />
                                        &nbsp;transactions. Up to 10,000 transactions are listed.
                                    </BlockHeading>
                                }
                                projectId={projectId}
                                filters={erroredVisFilters}
                                identifier="aapO7E2DiCle"
                                height={tallHeight}
                                enableExports={true}
                                className={classes.visualization}
                                exportTitle="Transaction Details - Errored Transactions"
                            />
                        </Grid>
                    </VisualizationBlockBase>

                    <VisualizationBlockBase height="auto">
                        <Typography variant="menuGroupTitle">Deleted Transactions</Typography>

                        <Hr color={styleGuide.color.border} className={classes.simpleDivider} />

                        <Grid lg={2}>
                            <KpiGroupVisualization
                                projectId={projectId}
                                identifier="aaUJltaacheK"
                                filters={deletedVisFilters}
                                kpiDefaultTitle="Transaction Count"
                                className={classes.visualization}
                            />
                            <VisualizationWrapper
                                header={<BlockHeading>Transactions by Month</BlockHeading>}
                                projectId={projectId}
                                filters={deletedVisFilters}
                                identifier="aacGSwlpbrvX"
                                height={tallHeight}
                                className={classes.visualization}
                            />
                        </Grid>

                        <Grid lg={1}>
                            <VisualizationWrapper
                                header={<BlockHeading>Transaction Details</BlockHeading>}
                                subtitle={
                                    <BlockHeading variant="subtitle">
                                        Total of&nbsp;
                                        <HeadlineVisualization
                                            projectId={projectId}
                                            filters={deletedVisFilters}
                                            errorComponent={SmallError}
                                            identifier="aaqGm6qHe1jd"
                                            className={classes.transactionsTotal}
                                        />
                                        &nbsp;transactions. Up to 10,000 transactions are listed.
                                    </BlockHeading>
                                }
                                projectId={projectId}
                                filters={deletedVisFilters}
                                identifier="aapO7E2DiCle"
                                height={tallHeight}
                                enableExports={true}
                                className={classes.visualization}
                                exportTitle="Transaction Details - Deleted Transactions"
                            />
                        </Grid>
                    </VisualizationBlockBase>
                </Container>
            )}
        </Dashboard>
    );
};

export default ErroredDeleted;
