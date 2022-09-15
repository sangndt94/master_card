// (C) 2020 GoodData Corporation
import React from "react";
import { css } from "emotion";
import GlossaryProductCard, { ITableOfContentsItem } from "../GlossaryProductCard";
import Typography from "../../utils/Typography";
import styleGuide from "../../styleGuide/styleGuide";
import { tooltipSafetyMargin } from "../../dashboardBlocks/DashboardContent";

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
                    Premium users can gain insights into <b>digital</b> payments and fraud.
                    <ul>
                        <li>
                            Offers extensive digital insights for card provisioning and tokenized transaction
                            processing
                        </li>
                        <li>
                            Includes a detailed view of digital market growth, wallet recommendations, issuer
                            decisioning and fraud within card provisioning
                        </li>
                        <li>
                            Elaborates on tokenized transaction fraud trends to promote a better digital
                            economy
                        </li>
                    </ul>
                </Typography>
            </section>
            <section id="toc2-" className={classes.section}>
                <img src={require("./images/digital/table.png")} className={classes.image} />
            </section>
            <section id="toc3-" className={classes.section}>
                <section id="toc3-1" className={classes.section}>
                    <Typography variant="section">Tokenized transactions</Typography>
                    <section id="toc3-1-1" className={classes.section}>
                        <Typography variant="caption">Overview</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/overview/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/overview/2.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/overview/3.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-2" className={classes.section}>
                        <Typography variant="caption">Fraud Scorecard</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/fraudScorecard/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/fraudScorecard/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-3" className={classes.section}>
                        <Typography variant="caption">Digital Wallet Analysis</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/digitalWalletAnalysis/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/digitalWalletAnalysis/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-4" className={classes.section}>
                        <Typography variant="caption">Tokenized Remote Commerce</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/tokenizedRemoteCommerce/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/tokenizedRemoteCommerce/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-5" className={classes.section}>
                        <Typography variant="caption">Transaction Channel</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/transactionChannel/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/transactionChannel/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-6" className={classes.section}>
                        <Typography variant="caption">Transaction Value</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/transactionValue/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/transactionValue/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-1-7" className={classes.section}>
                        <Typography variant="caption">Merchant Detail</Typography>
                        <img
                            src={require("./images/digital/tokenizedTransactions/merchantDetail/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/tokenizedTransactions/merchantDetail/2.png")}
                            className={classes.image}
                        />
                    </section>
                </section>
                <section id="toc3-2" className={classes.section}>
                    <Typography variant="section">Card Provisioning</Typography>
                    <section id="toc3-2-1" className={classes.section}>
                        <Typography variant="caption">Provisioning Messages</Typography>
                        <img
                            src={require("./images/digital/cardProvisioning/provisioningMessages/1.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-2-2" className={classes.section}>
                        <Typography variant="caption">
                            Wallet Provider Recommendations & Issuer Decision
                        </Typography>
                        <img
                            src={require("./images/digital/cardProvisioning/walletProviderRecommendations/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/cardProvisioning/walletProviderRecommendations/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-2-3" className={classes.section}>
                        <Typography variant="caption">Yellow Path – Account & Device Score</Typography>
                        <img
                            src={require("./images/digital/cardProvisioning/yellowPathAccount/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/cardProvisioning/yellowPathAccount/2.png")}
                            className={classes.image}
                        />
                    </section>
                    <section id="toc3-2-4" className={classes.section}>
                        <Typography variant="caption">Yellow Path – Recommendation Reasons</Typography>
                        <img
                            src={require("./images/digital/cardProvisioning/yellowPathRecommendation/1.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/cardProvisioning/yellowPathRecommendation/2.png")}
                            className={classes.image}
                        />
                        <img
                            src={require("./images/digital/cardProvisioning/yellowPathRecommendation/3.png")}
                            className={classes.image}
                        />
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
        title: "Gallery",
        sections: [
            {
                title: "Tokenized Transaction",
                sections: [
                    {
                        title: "Overview",
                    },
                    {
                        title: "Fraud Scorecard",
                    },
                    {
                        title: "Digital Wallet Analysis",
                    },
                    {
                        title: "Tokenized Remote Commerce",
                    },
                    {
                        title: "Transaction Channel",
                    },
                    {
                        title: "Transaction Value",
                    },
                    {
                        title: "Merchant Detail",
                    },
                ],
            },
            {
                title: "Card Provisioning",
                sections: [
                    {
                        title: "Provisioning Messages",
                    },
                    {
                        title: "Wallet Provider Recommendations & Issuer Decision",
                    },
                    {
                        title: "Yellow Path – Account & Device Score",
                    },
                    {
                        title: "Yellow Path – Recommendation Reasons",
                    },
                ],
            },
        ],
    },
];

const GlossaryDigital: React.FC = () => {
    return (
        <GlossaryProductCard
            title="Digital"
            renderContent={renderContent}
            tableOfContents={tableOfContents}
        />
    );
};

export default GlossaryDigital;
