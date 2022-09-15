// (C) 2007-2019 GoodData Corporation
import GeneralOverview from "./GeneralOverview";
import ChannelOverview from "./ChannelOverview";
import ChannelAndCorridorOverview from "./ChannelAndCorridorOverview";
import AuthorizationDeclineRates from "./AuthorizationDeclineRates";
import ECommerce3DSOverview from "./ECommerce3DSOverview";
import CardPresentEMVOverview from "./CardPresentEMVOverview";
import { IRouteDefinition } from "../../../../types";

export const issuerBenchmarkingStandardRoutes: IRouteDefinition[] = [
    {
        path: "/issuer-benchmarking-standard/general-overview",
        title: "General Overview",
        component: GeneralOverview,
    },
    {
        path: "/issuer-benchmarking-standard/channel-overview",
        title: "Channel Overview",
        component: ChannelOverview,
    },
    {
        path: "/issuer-benchmarking-standard/channel-and-corridor-overview",
        title: "Channel and Corridor Overview",
        component: ChannelAndCorridorOverview,
    },
    {
        path: "/issuer-benchmarking-standard/authorization-decline-rates",
        title: "Authorization Decline Rates",
        component: AuthorizationDeclineRates,
    },
    {
        path: "/issuer-benchmarking-standard/e-commerce-3-ds-overview",
        title: "e-Commerce / 3DS Overview",
        component: ECommerce3DSOverview,
    },
    {
        path: "/issuer-benchmarking-standard/card-present-emv-overview",
        title: "Card Present / EMV Overview",
        component: CardPresentEMVOverview,
    },
];
