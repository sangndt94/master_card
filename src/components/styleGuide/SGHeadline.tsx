// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import { css } from "emotion";
import HeadlineVisualization from "../visualization/HeadlineVisualization";
import { arrowPercentFormat, percentFormat } from "../visualization/CustomHeadline";
import Kpi from "../visualization/Kpi";
import KpiGroup, { IKpiGroupProps } from "../visualization/KpiGroup";
import VisualizationBlockBase, { customHeadlineRowHeight } from "../dashboardBlocks/VisualizationBlockBase";
import KpiGroupVisualization from "../visualization/KpiGroupVisualization";
import VisualizationRow from "../dashboardBlocks/VisualizationRow";

const classes = {
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: styleGuide.spacing(2),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
    kpiGroup: css({
        justifyContent: "center",
    }),
    kpiGroupMainKpi: css({
        display: "block",
        padding: styleGuide.spacing(0.5, 1),
        margin: "0 auto",
    }),
    kpiGroupSmallKpi: css({
        display: "inline-block",
        padding: styleGuide.spacing(0.5, 1),
    }),
    kpiGroupSmallLabel: css({
        color: styleGuide.typography.color.secondary,
    }),
};

const kpis: IKpiGroupProps["kpis"] = [
    {
        beforeContent: (
            <Typography variant="caption" Component="div">
                Approval Rate
            </Typography>
        ),
        value: 0.2345,
        format: percentFormat,
        responsive: true,
        className: classes.kpiGroupMainKpi,
    },
    {
        afterContent: (
            <Typography variant="caption" Component="span" className={classes.kpiGroupSmallLabel}>
                &ensp;vs Peer
            </Typography>
        ),
        value: 1.2045,
        format: arrowPercentFormat,
        typographyVariant: "caption",
        className: classes.kpiGroupSmallKpi,
    },
    {
        afterContent: (
            <Typography variant="caption" Component="span" className={classes.kpiGroupSmallLabel}>
                &ensp;vs Region
            </Typography>
        ),
        value: -0.0356,
        format: arrowPercentFormat,
        typographyVariant: "caption",
        className: classes.kpiGroupSmallKpi,
    },
];

const approvalRateFilters = [
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.customer.cid.name" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/507/elements?id=156"],
        },
    },
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.issuerbenchmarking.issuerica.icaname" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/502/elements?id=154"],
        },
    },
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.issuerbenchmarking.country" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/505/elements?id=123"],
        },
    },
];
const approvalRateInvalidFilters = [
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.customer.cid.name" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/507/elements?id=156"],
        },
    },
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.issuerbenchmarking.issuerica.icaname" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/502/elements?id=154"],
        },
    },
    {
        positiveAttributeFilter: {
            displayForm: { identifier: "label.issuerbenchmarking.country" },
            in: ["/gdc/md/hwmgtf5okuxmaj4dis462nmhc0i18rkg/obj/505/elements?id=124"],
        },
    },
];

export const SGHeadline: FC<{}> = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Headline
            </Typography>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        Kpi - responsive
                    </Typography>

                    <div>
                        <Kpi responsive value={123.456} format={arrowPercentFormat} />
                    </div>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Kpi - default fixed size
                    </Typography>

                    <div>
                        <Kpi value={-123.456} format={arrowPercentFormat} />
                    </div>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Kpi - variant body
                    </Typography>

                    <div>
                        <Kpi value={0} typographyVariant="body" format={arrowPercentFormat} />
                    </div>
                </div>
            </div>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        KpiGroup
                    </Typography>

                    <VisualizationBlockBase height="auto">
                        <KpiGroup kpis={kpis} className={classes.kpiGroup} />
                    </VisualizationBlockBase>
                </div>
            </div>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        KpiGroupVisualization
                    </Typography>

                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId="hwmgtf5okuxmaj4dis462nmhc0i18rkg"
                            identifier="abtLseXrfdM4"
                        />
                    </VisualizationBlockBase>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        KpiGroupVisualization - no data
                    </Typography>

                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId="hwmgtf5okuxmaj4dis462nmhc0i18rkg"
                            identifier="abtLseXrfdM4"
                            filters={approvalRateInvalidFilters}
                        />
                    </VisualizationBlockBase>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        KpiGroupVisualization - proxy
                    </Typography>

                    <VisualizationBlockBase height="auto">
                        <KpiGroupVisualization
                            projectId="hwmgtf5okuxmaj4dis462nmhc0i18rkg"
                            identifier="abtLseXrfdM4"
                            filters={approvalRateFilters}
                            withPeers
                        />
                    </VisualizationBlockBase>
                </div>
            </div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                VisualizationRow
            </Typography>
            <div>
                <VisualizationRow
                    size={12}
                    minHeight={customHeadlineRowHeight}
                    height="auto"
                    count={2}
                    header="Gross fraud BPS"
                >
                    {({ onLoadingChanged }) => {
                        return (
                            <>
                                <HeadlineVisualization
                                    header="Eur"
                                    projectId="k55rs6vt2j6p7lyi40uvmq9ulp197kxn"
                                    identifier="aaf1jm8BgNO1"
                                    onLoadingChanged={onLoadingChanged}
                                />

                                <HeadlineVisualization
                                    header="Ap"
                                    projectId="k55rs6vt2j6p7lyi40uvmq9ulp197kxn"
                                    identifier="aaw1iP6YcIRi"
                                    onLoadingChanged={onLoadingChanged}
                                />
                            </>
                        );
                    }}
                </VisualizationRow>
            </div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                CustomHeadline
            </Typography>
            <div className={classes.list}>
                <HeadlineVisualization
                    header="With proxy"
                    textAlign="center"
                    rateFormat={arrowPercentFormat}
                    projectId="lh5ubnebyxw2oyal2zhzbhfx16olnv7b"
                    identifier="aaPjAL8jc0x4"
                    withPeers
                    filters={[
                        {
                            positiveAttributeFilter: {
                                displayForm: { identifier: "label.ica.cid.name" },
                                in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/552/elements?id=5"],
                            },
                        },
                        {
                            positiveAttributeFilter: {
                                displayForm: { identifier: "label.ica.childicaid.icaname" },
                                in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/549/elements?id=10"],
                            },
                        },
                        {
                            positiveAttributeFilter: {
                                displayForm: { identifier: "label.country.country.name" },
                                in: ["/gdc/md/lh5ubnebyxw2oyal2zhzbhfx16olnv7b/obj/1439/elements?id=6"],
                            },
                        },
                    ]}
                />
                <HeadlineVisualization
                    header="Without proxy"
                    textAlign="center"
                    rateFormat={arrowPercentFormat}
                    projectId="lh5ubnebyxw2oyal2zhzbhfx16olnv7b"
                    identifier="aaPjAL8jc0x4"
                />
            </div>
        </div>
    );
};
