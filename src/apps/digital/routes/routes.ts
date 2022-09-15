// (C) 2007-2019 GoodData Corporation
import TokenizationTransactions from "./TokenizationTransactions";
import FraudScorecard from "./FraudScorecard";
import DigitalWalletAnalysis from "./DigitalWalletAnalysis";
import TokenizedRemoteCommerce from "./TokenizedRemoteCommerce";
import TransactionChannel from "./TransactionChannel";
import TransactionValue from "./TransactionValue";
import MerchantDetail from "./MerchantDetail";
import ProvisioningMessages from "./ProvisioningMessages";
import WalletProviderRecommendationsIssuerDecision from "./WalletProviderRecommendationsIssuerDecision";
import YellowPathAccountDeviceScore from "./YellowPathAccountDeviceScore";
import YellowPathRecommendationReasons from "./YellowPathRecommendationReasons";
import theme from "../../../utils/theme";
import { IRouteDefinition } from "../../../types";

export const digitalRoutes: IRouteDefinition[] = [
    {
        path: "/digital/overview",
        title: "Overview",
        heading: "Tokenized Transactions",
        component: TokenizationTransactions,
    },
    {
        path: "/digital/fraud-scorecard",
        title: "Fraud Scorecard",
        component: FraudScorecard,
    },
    {
        path: "/digital/digital-wallet-analysis",
        title: "Digital Wallet Analysis",
        component: DigitalWalletAnalysis,
    },
    {
        path: "/digital/tokenized-remote-commerce",
        title: "Tokenized Remote Commerce",
        component: TokenizedRemoteCommerce,
    },
    {
        path: "/digital/transaction-channel",
        title: "Transaction Channel",
        component: TransactionChannel,
    },
    {
        path: "/digital/transaction-value",
        title: "Transaction Value",
        component: TransactionValue,
    },
    {
        path: "/digital/merchant-detail",
        title: "Merchant Detail",
        component: MerchantDetail,
    },
    {
        path: "/digital/provisioning-messages",
        title: "Provisioning Messages",
        component: ProvisioningMessages,
        heading: "Card Provisioning",
        groupColor: theme.color.primary,
    },
    {
        path: "/digital/wallet-provider-recommendations-issuer-decision",
        title: "Wallet Provider Recommendations & Issuer Decision",
        component: WalletProviderRecommendationsIssuerDecision,
        groupColor: theme.color.primary,
    },
    {
        path: "/digital/yellow-path-account-device-score",
        title: "Yellow Path – Account & Device Score",
        component: YellowPathAccountDeviceScore,
        groupColor: theme.color.primary,
    },
    {
        path: "/digital/yellow-path-recommendation-reasons",
        title: "Yellow Path – Recommendation Reasons",
        component: YellowPathRecommendationReasons,
        groupColor: theme.color.primary,
    },
];
