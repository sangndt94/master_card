// (C) 2019 GoodData Corporation
import FraudSummary from "./FraudSummary";
import ChannelSummary from "./ChannelSummary";
import ChannelOverview from "./ChannelOverview";
import ChannelAndCorridorOverview from "./ChannelAndCorridorOverview";
import ECommerceAuthenticationOverview from "./ECommerceAuthenticationOverview";
import CardPresentTechnologyOverview from "./CardPresentTechnologyOverview";
import Chargebacks from "./Chargebacks";
import TopMerchantClassifications from "./TopMerchantClassifications";
import { IRouteDefinition } from "../../../../types";

export const acquirerBenchmarkingStandardRoutes: IRouteDefinition[] = [
    {
        path: "/acquirer-benchmarking-standard/fraud-summary",
        title: "Fraud Summary",
        component: FraudSummary,
    },
    {
        path: "/acquirer-benchmarking-standard/channel-summary",
        title: "Channel Summary",
        component: ChannelSummary,
    },
    {
        path: "/acquirer-benchmarking-standard/channel-overview",
        title: "Channel Overview",
        component: ChannelOverview,
    },
    {
        path: "/acquirer-benchmarking-standard/channel-and-corridor-overview",
        title: "Channel and Corridor Overview",
        component: ChannelAndCorridorOverview,
    },
    {
        path: "/acquirer-benchmarking-standard/e-commerce-authentication-overview",
        title: "e-Commerce Authentication Overview",
        component: ECommerceAuthenticationOverview,
    },
    {
        path: "/acquirer-benchmarking-standard/card-present-technology-overview",
        title: "Card Present Technology Overview",
        component: CardPresentTechnologyOverview,
    },
    {
        path: "/acquirer-benchmarking-standard/chargebacks",
        title: "Chargebacks",
        component: Chargebacks,
    },
    {
        path: "/acquirer-benchmarking-standard/top-merchant-classifications",
        title: "Top Merchant Classifications",
        component: TopMerchantClassifications,
    },
];
