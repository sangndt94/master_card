// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import theme from "../../../utils/theme";
import GlossaryCategory from "./GlossaryCategory";
import GlossaryCalculations from "./GlossaryCalculations";
import GlossaryHowToAccess from "./GlossaryHowToAccess";
import GlossaryDigital from "./GlossaryDigital";
import GlossaryBenchmarking from "./GlossaryBenchmarking";
import GlossaryBenchmarkingPremium from "./GlossaryBenchmarkingPremium";
import GlossaryFraudIntelligenceInsights from "./GlossaryFraudIntelligenceInsights";

export const glossaryRoutes: IRouteDefinition[] = [
    {
        path: "/glossary/glossary",
        title: "Glossary",
        heading: "Glossary Categories",
        component: GlossaryCategory,
        exact: true,
    },
    {
        path: "/glossary/calculations",
        title: "Calculations",
        component: GlossaryCalculations,
    },
    {
        path: "/glossary/how-to-access",
        title: "How to access",
        component: GlossaryHowToAccess,
    },
    {
        path: "/glossary/digital",
        title: "Digital",
        component: GlossaryDigital,
        heading: "Products Overview",
        groupColor: theme.color.primary,
    },
    {
        path: "/glossary/benchmarking",
        title: "Benchmarking",
        component: GlossaryBenchmarking,
        groupColor: theme.color.primary,
    },
    {
        path: "/glossary/benchmarking-premium",
        title: "Benchmarking Premium",
        component: GlossaryBenchmarkingPremium,
        groupColor: theme.color.primary,
    },
    {
        path: "/glossary/fraud-intelligence-insights",
        title: "Fraud Intelligence Insights",
        component: GlossaryFraudIntelligenceInsights,
        groupColor: theme.color.primary,
    },
];
