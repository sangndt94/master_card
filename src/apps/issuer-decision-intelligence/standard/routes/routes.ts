// (C) 2020 GoodData Corporation
import Overview from "./Overview";
import { IRouteDefinition } from "../../../../types";
import UnderConstruction from "./UnderConstruction";

export const issuerDecisionIntelligenceRoutes: IRouteDefinition[] = [
    {
        path: "/issuer-decision-intelligence-standard/getting-started",
        title: "Getting Started",
        component: UnderConstruction,
    },
    {
        path: "/issuer-decision-intelligence-standard/overview",
        title: "Overview",
        component: Overview,
    },
];
