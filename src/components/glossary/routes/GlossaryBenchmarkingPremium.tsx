// (C) 2020 GoodData Corporation
import React from "react";
import { css } from "emotion";
import GlossaryProductCard, { ITableOfContentsItem } from "../GlossaryProductCard";
import styleGuide from "../../styleGuide/styleGuide";
import { tooltipSafetyMargin } from "../../dashboardBlocks/DashboardContent";
import Typography from "../../utils/Typography";

const classes = {
    section: css({
        paddingTop: styleGuide.spacing(3),
        scrollMarginTop: tooltipSafetyMargin,
        scrollSnapMarginTop: tooltipSafetyMargin, // for Safari
    }),
    paragraph: css({
        margin: styleGuide.spacing(1, 0, 1, 0),
        fontSize: 16,
    }),
    image: css({
        display: "block",
        marginTop: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
        marginRight: "auto",
        maxWidth: "100%",
    }),
};

const renderContent = () => {
    return (
        <div>
            <section id="toc1-" className={classes.section}>
                <Typography variant="label" className={classes.paragraph}>
                    Users can <b>benchmark</b> fraud performance relative to peers.
                    <ul>
                        <li>
                            Informs strategic decisions based on competitive position across peers,
                            best-in-class, countries, regions and the world
                        </li>
                        <li>
                            Identifies performance gaps and areas of improvement in business areas with high
                            fraud rates and decline rates across channels, corridors and transaction types
                        </li>
                        <li>Provides insight into successful strategies used by peers to prevent fraud</li>
                    </ul>
                </Typography>
                <Typography variant="label" className={classes.paragraph}>
                    Benchmarking (Premium) insights is available as part of the premium tier for both issuers
                    and acquirers.
                </Typography>
                <Typography variant="label" className={classes.paragraph}>
                    <b>Acquirers</b> click on the Acquirer Insights on the main page to find Acquirer
                    Benchmarking or Acquirer Premium Benchmarking (only for Premium tier). Clicking on either
                    allows access to benchmarking insights.
                </Typography>
                <img src={require("./images/benchmarking/issuers.png")} className={classes.image} />
                <Typography variant="label" className={classes.paragraph}>
                    <b>Issuers</b> click on the Issuer Insights on the main page to find Issuer Benchmarking
                    or Issuer Premium Benchmarking (only for Premium tier). Clicking on either allows access
                    to Benchmarking insights.
                </Typography>
                <img src={require("./images/benchmarking/acquirers.png")} className={classes.image} />
            </section>
            <section id="toc2-" className={classes.section}>
                <img src={require("./images/benchmarking/table.png")} className={classes.image} />
            </section>
            <section id="toc3-" className={classes.section}>
                <section id="toc3-1" className={classes.section}>
                    <Typography variant="caption">Fraud Deep Dive</Typography>
                    <img
                        src={require("./images/benchmarking/premium/fraud/1.png")}
                        className={classes.image}
                    />
                </section>
                <section id="toc3-2" className={classes.section}>
                    <Typography variant="caption">E-Commerce / 3DS Overview</Typography>
                    <img src={require("./images/benchmarking/premium/3ds/1.png")} className={classes.image} />
                </section>
                <section id="toc3-3" className={classes.section}>
                    <Typography variant="caption">Card Present / EMV Overview</Typography>
                    <img src={require("./images/benchmarking/premium/emv/1.png")} className={classes.image} />
                </section>
                <section id="toc3-4" className={classes.section}>
                    <Typography variant="caption">General Overview</Typography>
                    <img
                        src={require("./images/benchmarking/premium/overview/1.png")}
                        className={classes.image}
                    />
                </section>
                <section id="toc3-5" className={classes.section}>
                    <Typography variant="caption">Channel Overview</Typography>
                    <img
                        src={require("./images/benchmarking/premium/channel/1.png")}
                        className={classes.image}
                    />
                </section>
                <section id="toc3-6" className={classes.section}>
                    <Typography variant="caption">Channel and Corridor Overview</Typography>
                    <img
                        src={require("./images/benchmarking/premium/corridor/1.png")}
                        className={classes.image}
                    />
                </section>
                <section id="toc3-7" className={classes.section}>
                    <Typography variant="caption">Authorization Decline Rates</Typography>
                    <img
                        src={require("./images/benchmarking/premium/authorization/1.png")}
                        className={classes.image}
                    />
                </section>
            </section>
        </div>
    );
};

const tableOfContents: ITableOfContentsItem[] = [
    {
        title: "Description",
    },
    {
        title: "Feature List",
    },
    {
        title: "Gallery",
        sections: [
            {
                title: "Fraud Deep Dive",
            },
            {
                title: "E-Commerce / 3DS Overview",
            },
            {
                title: "Card Present / EMV Overview",
            },
            {
                title: "General Overview",
            },
            {
                title: "Channel Overview",
            },
            {
                title: "Channel and Corridor Overview",
            },
            {
                title: "Authorization Decline Rates",
            },
        ],
    },
];

const GlossaryBenchmarkingPremium: React.FC = () => {
    return (
        <GlossaryProductCard
            title="Benchmarking Premium"
            renderContent={renderContent}
            tableOfContents={tableOfContents}
        />
    );
};

export default GlossaryBenchmarkingPremium;
