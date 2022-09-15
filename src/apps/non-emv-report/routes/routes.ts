// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Overview from "./Overview";
import PerformanceDrivers from "./PerformanceDrivers";
import CustomerInsights from "./CustomerInsights";
import TopIndustriesBySpend from "./TopIndustriesBySpend";
import TerminalAnalysis from "./TerminalAnalysis";
import OperationalMetricsOverview from "./OperationalMetricsOverview";
import OperationalMetricsFraud from "./OperationalMetricsFraud";
import OperationalMetricsChargeback from "./OperationalMetricsChargeback";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/overview",
        title: "Overview",
        component: Overview,
    },
    {
        path: "/performance-drivers",
        title: "Performance Drivers",
        component: PerformanceDrivers,
    },
    {
        path: "/customer-insights",
        title: "Customer Insights",
        component: CustomerInsights,
    },
    {
        path: "/top-industries-merchants-by-spend",
        title: "Top Industries Merchants By Spend",
        component: TopIndustriesBySpend,
    },
    {
        path: "/terminal-analysis",
        title: "Terminal Analysis",
        component: TerminalAnalysis,
    },
    {
        path: "/operational-metrics-overview",
        title: "Overview",
        heading: "Operational Metrics",
        component: OperationalMetricsOverview,
    },
    {
        path: "/operational-metrics-fraud",
        title: "Fraud",
        component: OperationalMetricsFraud,
    },
    {
        path: "/operational-metrics-chargeback",
        title: "Chargeback",
        component: OperationalMetricsChargeback,
    },
];
