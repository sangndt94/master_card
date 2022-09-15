// (C) 2020 GoodData Corporation
import Overview from "./Overview";
import DIScore from "./DIScore";
import { IRouteDefinition } from "../../../../types";
import UnderConstruction from "./UnderConstruction";

export const issuerDecisionIntelligenceRoutes: IRouteDefinition[] = [
    {
        path: "/issuer-decision-intelligence-premium/getting-started",
        title: "Getting Started",
        component: UnderConstruction,
    },
    {
        path: "/issuer-decision-intelligence-premium/overview",
        title: "Overview",
        component: Overview,
    },
    {
        path: "/issuer-decision-intelligence-premium/geography",
        title: "Geography",
        component: UnderConstruction,
    },
    {
        path: "/issuer-decision-intelligence-premium/di-score",
        title: "DI Score",
        component: DIScore,
    },
    {
        path: "/issuer-decision-intelligence-premium/dti-score",
        title: "DTI Score",
        component: UnderConstruction,
    },
    {
        path: "/issuer-decision-intelligence-premium/authiq",
        title: "AuthIQ",
        component: UnderConstruction,
    },
    {
        path: "/issuer-decision-intelligence-premium/benchmarking",
        title: "Benchmarking",
        component: UnderConstruction,
    },
];
