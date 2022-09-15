// (C) 2007-2019 GoodData Corporation
import GeneralOverview from "./GeneralOverview";
import ChannelOverview from "./ChannelOverview";
import ChannelAndCorridorOverview from "./ChannelAndCorridorOverview";
import AuthorizationDeclineRates from "./AuthorizationDeclineRates";
import ECommerce3DSDeepDive from "./ECommerce3DSDeepDive";
import CardPresentEMVDeepDive from "./CardPresentEMVDeepDive";
import FraudDeepDive from "./FraudDeepDive";
import { IRouteDefinition } from "../../../../types";

export const issuerBenchmarkingPremiumRoutes: IRouteDefinition[] = [
    {
        path: "/issuer-benchmarking-premium/fraud-deep-dive",
        title: "Fraud Deep Dive",
        component: FraudDeepDive,
    },
    {
        path: "/issuer-benchmarking-premium/e-commerce-3-ds-deep-dive",
        title: "e-Commerce / 3DS Deep Dive",
        component: ECommerce3DSDeepDive,
    },
    {
        path: "/issuer-benchmarking-premium/card-present-emv-deep-dive",
        title: "Card Present / EMV Deep Dive",
        component: CardPresentEMVDeepDive,
    },
    {
        path: "/issuer-benchmarking-premium/general-overview",
        title: "General Overview",
        component: GeneralOverview,
    },
    {
        path: "/issuer-benchmarking-premium/channel-overview",
        title: "Channel Overview",
        component: ChannelOverview,
    },
    {
        path: "/issuer-benchmarking-premium/channel-and-corridor-overview",
        title: "Channel and Corridor Overview",
        component: ChannelAndCorridorOverview,
    },
    {
        path: "/issuer-benchmarking-premium/authorization-decline-rates",
        title: "Authorization Decline Rates",
        component: AuthorizationDeclineRates,
    },
];
