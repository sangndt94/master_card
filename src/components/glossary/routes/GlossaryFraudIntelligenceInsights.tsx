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
                    Users can gather market <b>fraud intelligence</b> from a global network.
                    <ul>
                        <li>Provides a detailed view of global fraud trends</li>
                        <li>
                            Provides better understanding of market vulnerabilities in regions and markets
                            around the world
                        </li>
                        <li>
                            Helps identify opportunities for new product concepts and modification of existing
                            products
                        </li>
                    </ul>
                </Typography>
            </section>
            <section id="toc2-" className={classes.section}>
                <img src={require("./images/fi2/table.png")} className={classes.image} />
            </section>
            <section id="toc3-" className={classes.section}>
                <Typography variant="section">Calculations used in Fraud Intelligence</Typography>
                <section id="toc3-1" className={classes.section}>
                    <Typography variant="caption">Fraud basis point</Typography>
                    <Typography variant="label" className={classes.paragraph}>
                        <b>Gross</b> = Fraud on processed transactions / Total Processed Transactions x 10,000
                        Issuer
                    </Typography>
                    <Typography variant="label" className={classes.paragraph}>
                        <b>Net</b> = (Fraud on processed transactions – 1st Chargebacks + 2nd Presentments –
                        Arbitrations) / Total Processed Transactions x 10,000
                    </Typography>
                    <Typography variant="label" className={classes.paragraph}>
                        <b>Acquirer Net</b> = (1st Chargebacks – 2nd Presentments + Arbitrations) / Total
                        Processed Transactions x 10,000
                    </Typography>
                </section>
            </section>
            <section id="toc3-2" className={classes.section}>
                <Typography variant="caption">EMV Transaction Volume (%)</Typography>
                <Typography variant="label" className={classes.paragraph}>
                    <b>EMV transaction volume %</b> = number of approved chip contact transactions / (number
                    of approved chip contact transactions + number of approved mag stripe contact
                    transactions)
                </Typography>
                <Typography variant="label" className={classes.paragraph}>
                    <b>NB:</b> Percentages of Processed Volume and Fraud Volume Throughout this Document may
                    not Total 100% due to the Occasional Exclusion of Certain Data Categories from this
                    Report`
                </Typography>
            </section>
            <section id="toc4-" className={classes.section}>
                <section id="toc4-1" className={classes.section}>
                    <Typography variant="section">Issuer Executive Summary</Typography>
                    <section id="toc4-1-1" className={classes.section}>
                        <Typography variant="caption">Global Fraud Overview</Typography>
                        <img src={require("./images/fi2/issuer/overview/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/overview/2.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/overview/3.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/overview/4.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-2" className={classes.section}>
                        <Typography variant="caption">Fraud Deep Dive</Typography>
                        <img src={require("./images/fi2/issuer/fraud/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-3" className={classes.section}>
                        <Typography variant="caption">Gross Fraud BPS</Typography>
                        <img src={require("./images/fi2/issuer/gross/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/gross/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-4" className={classes.section}>
                        <Typography variant="caption">Net Fraud BPS</Typography>
                        <img src={require("./images/fi2/issuer/net/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/net/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-5" className={classes.section}>
                        <Typography variant="caption">Corridors</Typography>
                        <img src={require("./images/fi2/issuer/corridors/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/corridors/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-6" className={classes.section}>
                        <Typography variant="caption">Products</Typography>
                        <img src={require("./images/fi2/issuer/products/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/products/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-1-7" className={classes.section}>
                        <Typography variant="caption">Channels</Typography>
                        <img src={require("./images/fi2/issuer/channels/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/issuer/channels/2.png")} className={classes.image} />
                    </section>
                </section>
                <section id="toc4-2" className={classes.section}>
                    <Typography variant="section">Acquirer Executive Summary</Typography>
                    <section id="toc4-2-1" className={classes.section}>
                        <Typography variant="caption">Global Fraud Overview</Typography>
                        <img
                            src={require("./images/fi2/acquirer/overview/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/overview/2.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/overview/3.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/overview/4.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-2-2" className={classes.section}>
                        <Typography variant="caption">Fraud Deep Dive</Typography>
                        <img src={require("./images/fi2/acquirer/fraud/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-2-3" className={classes.section}>
                        <Typography variant="caption">Gross Fraud BPS</Typography>
                        <img src={require("./images/fi2/acquirer/gross/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/acquirer/gross/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-2-4" className={classes.section}>
                        <Typography variant="caption">Net Fraud BPS</Typography>
                        <img src={require("./images/fi2/acquirer/net/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-2-5" className={classes.section}>
                        <Typography variant="caption">Corridors</Typography>
                        <img
                            src={require("./images/fi2/acquirer/corridors/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/corridors/2.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/corridors/3.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-2-6" className={classes.section}>
                        <Typography variant="caption">Products</Typography>
                        <img
                            src={require("./images/fi2/acquirer/products/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/products/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-2-7" className={classes.section}>
                        <Typography variant="caption">Channels</Typography>
                        <img
                            src={require("./images/fi2/acquirer/channels/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/acquirer/channels/2.png")}
                            className={classes.image}
                        />
                    </section>
                </section>
                <section id="toc4-3" className={classes.section}>
                    <Typography variant="section">Fraud Deep Dive</Typography>
                    <section id="toc4-3-1" className={classes.section}>
                        <Typography variant="caption">Issuer Region Fraud Deep Dive</Typography>
                        <img src={require("./images/fi2/fraud/issuer/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/fraud/issuer/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-3-2" className={classes.section}>
                        <Typography variant="caption">Acquirer Region Fraud Deep Dive</Typography>
                        <img src={require("./images/fi2/fraud/acquirer/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/fraud/acquirer/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-3-3" className={classes.section}>
                        <Typography variant="caption">POS Entry Mode Deep Dive</Typography>
                        <img src={require("./images/fi2/fraud/pos/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-3-4" className={classes.section}>
                        <Typography variant="caption">Channel Deep Dive</Typography>
                        <img src={require("./images/fi2/fraud/channel/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/fraud/channel/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-3-5" className={classes.section}>
                        <Typography variant="caption">
                            Card Not Present - Address Verification System (AVS)
                        </Typography>
                        <img src={require("./images/fi2/fraud/avs/1.png")} className={classes.image} />
                    </section>
                </section>
                <section id="toc4-4" className={classes.section}>
                    <Typography variant="section">Channel Deep Dive</Typography>
                    <section id="toc4-4-1" className={classes.section}>
                        <Typography variant="caption">POS EMV Chip</Typography>
                        <img src={require("./images/fi2/channel/pos/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-4-2" className={classes.section}>
                        <Typography variant="caption">Contactless Analysis</Typography>
                        <img
                            src={require("./images/fi2/channel/contactless/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/channel/contactless/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-4-3" className={classes.section}>
                        <Typography variant="caption">Automatic Fuel Dispenser – Issuer Region</Typography>
                        <img src={require("./images/fi2/channel/issuer/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-4-4" className={classes.section}>
                        <Typography variant="caption">Automatic Fuel Dispenser – Acquirer Region</Typography>
                        <img src={require("./images/fi2/channel/acquirer/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/channel/acquirer/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-4-5" className={classes.section}>
                        <Typography variant="caption">Cardholder Activated Terminal (Non-ATM/AFD)</Typography>
                        <img src={require("./images/fi2/channel/terminal/1.png")} className={classes.image} />
                    </section>
                    <section id="toc4-4-6" className={classes.section}>
                        <Typography variant="caption">
                            ATM EMV Chip Fallback to Magstripe (Entry Mode 80)
                        </Typography>
                        <img
                            src={require("./images/fi2/channel/atmMagstripe/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/channel/atmMagstripe/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-4-7" className={classes.section}>
                        <Typography variant="caption">
                            POS EMV Chip Fallback to Magstripe (Entry Mode 80)
                        </Typography>
                        <img
                            src={require("./images/fi2/channel/posMagstripe/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/fi2/channel/posMagstripe/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc4-4-8" className={classes.section}>
                        <Typography variant="caption">
                            POS EMV Chip Fallback to Voice (Entry Mode 79)
                        </Typography>
                        <img src={require("./images/fi2/channel/posVoice/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/channel/posVoice/2.png")} className={classes.image} />
                    </section>
                    <section id="toc4-4-9" className={classes.section}>
                        <Typography variant="caption">POS PAN Key Entered (Entry Mode 01)</Typography>
                        <img src={require("./images/fi2/channel/posKey/1.png")} className={classes.image} />
                        <img src={require("./images/fi2/channel/posKey/2.png")} className={classes.image} />
                    </section>
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
        title: "Calculations",
        sections: [
            {
                title: "Fraud Basis Point",
            },
            {
                title: "EMV Transaction Volume (%)",
            },
        ],
    },
    {
        title: "Gallery",
        sections: [
            {
                title: "Issuer Executive Summary",
                sections: [
                    {
                        title: "Global Fraud Overview",
                    },
                    {
                        title: "Fraud Deep Dive",
                    },
                    {
                        title: "Gross Fraud BPS",
                    },
                    {
                        title: "Net Fraud BPS",
                    },
                    {
                        title: "Corridors",
                    },
                    {
                        title: "Products",
                    },
                    {
                        title: "Channels",
                    },
                ],
            },
            {
                title: "Acquirer Executive Summary",
                sections: [
                    {
                        title: "Global Fraud Overview",
                    },
                    {
                        title: "Fraud Deep Dive",
                    },
                    {
                        title: "Gross Fraud BPS",
                    },
                    {
                        title: "Net Fraud BPS",
                    },
                    {
                        title: "Corridors",
                    },
                    {
                        title: "Products",
                    },
                    {
                        title: "Channels",
                    },
                ],
            },
            {
                title: "Fraud Deep Dive",
                sections: [
                    {
                        title: "Issuer Region Fraud Deep Dive",
                    },
                    {
                        title: "Acquirer Region Fraud Deep Dive",
                    },
                    {
                        title: "POS Entry Mode Deep Dive",
                    },
                    {
                        title: "Channel Deep Dive",
                    },
                    {
                        title: "Card Not Present - Address Verification System (AVS)",
                    },
                ],
            },
            {
                title: "Channel Deep Dive",
                sections: [
                    {
                        title: "POS EMV Chip",
                    },
                    {
                        title: "Contactless Analysis",
                    },
                    {
                        title: "Automatic Fuel Dispenser – Issuer Region",
                    },
                    {
                        title: "Automatic Fuel Dispenser – Acquirer Region",
                    },
                    {
                        title: "Cardholder Activated Terminal (Non-ATM/AFD)",
                    },
                    {
                        title: "ATM EMV Chip Fallback to Magstripe (Entry Mode 80)",
                    },
                    {
                        title: "POS EMV Chip Fallback to Magstripe (Entry Mode 80)",
                    },
                    {
                        title: "POS EMV Chip Fallback to Voice (Entry Mode 79)",
                    },
                    {
                        title: "POS PAN Key Entered (Entry Mode 01)",
                    },
                ],
            },
        ],
    },
];

const GlossaryFraudIntelligenceInsights: React.FC = () => {
    return (
        <GlossaryProductCard
            title="Fraud Intelligence Insights"
            renderContent={renderContent}
            tableOfContents={tableOfContents}
        />
    );
};

export default GlossaryFraudIntelligenceInsights;
