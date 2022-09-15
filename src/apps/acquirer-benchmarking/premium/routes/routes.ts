// (C) 2019 GoodData Corporation
import FraudDeepDive from "./FraudDeepDive";
import ChannelSummary from "./ChannelSummary";
import ChannelOverview from "./ChannelOverview";
import ChannelAndCorridorOverview from "./ChannelAndCorridorOverview";
import ECommerceAuthenticationDeepDive from "./ECommerceAuthenticationDeepDive";
import CardPresentTechnologyDeepDive from "./CardPresentTechnologyDeepDive";
import ChargebacksDeepDive from "./ChargebacksDeepDive";
import TopMerchantClassificationsDeepDive from "./TopMerchantClassificationsDeepDive";
import { IRouteDefinition } from "../../../../types";

export const acquirerBenchmarkingPremiumRoutes: IRouteDefinition[] = [
    {
        path: "/acquirer-benchmarking-premium/fraud-deep-dive",
        title: "Fraud Deep Dive",
        component: FraudDeepDive,
    },
    {
        path: "/acquirer-benchmarking-premium/channel-summary",
        title: "Channel Summary",
        component: ChannelSummary,
    },
    {
        path: "/acquirer-benchmarking-premium/channel-overview",
        title: "Channel Overview",
        component: ChannelOverview,
    },
    {
        path: "/acquirer-benchmarking-premium/channel-and-corridor-overview",
        title: "Channel and Corridor Overview",
        component: ChannelAndCorridorOverview,
    },
    {
        path: "/acquirer-benchmarking-premium/e-commerce-authentication-deep-dive",
        title: "e-Commerce Authentication Deep Dive",
        component: ECommerceAuthenticationDeepDive,
    },
    {
        path: "/acquirer-benchmarking-premium/card-present-technology-deep-dive",
        title: "Card Present Technology Deep Dive",
        component: CardPresentTechnologyDeepDive,
    },
    {
        path: "/acquirer-benchmarking-premium/chargebacks-deep-dive",
        title: "Chargebacks Deep Dive",
        component: ChargebacksDeepDive,
    },
    {
        path: "/acquirer-benchmarking-premium/top-merchant-classifications-deep-dive",
        title: "Top Merchant Classifications Deep Dive",
        component: TopMerchantClassificationsDeepDive,
    },
];
