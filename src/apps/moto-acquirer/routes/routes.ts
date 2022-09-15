// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Overview from "./Overview";
import PerformanceDrivers from "./PerformanceDrivers";
import CustomerInsights from "./CustomerInsights";
import TopIndustriesMerchantsBySpend from "./TopIndustriesMerchantsBySpend";
import TopIndustriesMerchantsByTransactions from "./TopIndustriesMerchantsByTransactions";
import ProductAnalysis from "./ProductAnalysis";
import OperationalMetricsOverview from "./OperationalMetricsOverview";
import OperationalMetricsDetail from "./OperationalMetricsDetail";
import OperationalMetricsMerchantAnalysis from "./OperationalMetricsMerchantAnalysis";

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
        component: TopIndustriesMerchantsBySpend,
    },
    {
        path: "/top-industries-merchants-by-transactions",
        title: "Top Industries Merchants by Transactions",
        component: TopIndustriesMerchantsByTransactions,
    },
    {
        path: "/product-analysis",
        title: "Product Analysis",
        component: ProductAnalysis,
    },
    {
        path: "/operational-metrics-overview",
        title: "Overview",
        heading: "Operational Metrics",
        component: OperationalMetricsOverview,
    },
    {
        path: "/operational-metrics-detail",
        title: "Detail",
        component: OperationalMetricsDetail,
    },
    {
        path: "/operational-metrics-merchant-analysis",
        title: "Merchant Analysis",
        component: OperationalMetricsMerchantAnalysis,
    },
];
