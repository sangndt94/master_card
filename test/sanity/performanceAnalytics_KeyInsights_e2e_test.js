import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    assertActiveLeftMenuItem,
    expectSingleDashboardContent,
    assertAllVisualizationsExist,
    assertAllVisualizationBlocksExist,
    navigateTo,
    addFilterValue,
    applyFilter,
    assertAllFiltersExist,
    getVisualizationByIdentifier,
    isErrorBy,
    assertDataLayersExists,
    waitForLoading,
    assertTooltipOfVisualizationExists,
    clearAll,
} from "../helpers/pageUtils";
import { t } from "testcafe";

loginAutoTestUserAndNavigate("Performance Analytics.KeyInsights - e2e", 1, "performance-analytics/key-insights");

test(`should load all filters, kpi's and visualizations for action menu KEY INSIGHTS`, async () => {
    await navigateTo("performance-analytics/key-insights");
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await addFilterValue("country", "LIECHTENSTEIN");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/performance-analytics/key-insights",
            title: "Performance Analytics - Key Insights",
            type: ""
        }
    });
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await assertTooltipOfVisualizationExists("acAbbpqYd5YU", "Month/Year (Period)");
    await assertActiveLeftMenuItem("KEY INSIGHTS");
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist(["acGQzlWfdaY3","abVQDlIhfRrk","acbQAhewg6I1","ac4QyseQg4zS","abuQETKgaqUB",
        "aemQyiGUdfHb","acNQquZzf6RL","acAbbpqYd5YU","acEQpXAgeTfV","acic2TpdcWGo","abRv14yrgSbe",
        "abVv19ozbegF","abqQx0VngkSe","abpbBT1DizNG","adcQtl08e9Tr","adbc1U2Fe9Py","acdQuWLDbiS4",
        "ab6bzqqtdXcg","acSQtowoefms","acgc3ENKdh0q"]);
    await assertAllVisualizationBlocksExist(["acGQzlWfdaY3","abVQDlIhfRrk","acbQAhewg6I1", "ac4QyseQg4zS","abuQETKgaqUB",
        "aemQyiGUdfHb","acNQquZzf6RL", "acEQpXAgeTfV","abRv14yrgSbe","abVv19ozbegF", "abqQx0VngkSe",
        "adcQtl08e9Tr","acdQuWLDbiS4","acSQtowoefms"]);
    const visualization = getVisualizationByIdentifier("acAbbpqYd5YU");
    const xAxisLabels = visualization.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    await waitForLoading(visualization);
    await t
        .expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
    await clearAll();
});

const headlineCharts = [
    ["Headline Global Insights Approval Rate", "abqQx0VngkSe"],
    ["Headline Global Insights Fraud BPS", "adcQtl08e9Tr"],
    ["Headline Geographical Insights Cross Border Approval Rate", "abqQx0VngkSe"],
    ["Headline Geographical Insights Cross Border Fraud BPS", "adcQtl08e9Tr"],
    ["Headline Geographical Insights Domestic Approval Rate", "acdQuWLDbiS4"],
    ["Headline Geographical Insights Domestic Fraud BPS", "acSQtowoefms"]
];

const lineCharts = [
    ["Line Global Insights Approval Rate", "acAbbpqYd5YU"],
    ["Line Global Insights Fraud BPS", "acic2TpdcWGo"],
    ["Line Geographical Insights Cross Border Approval Rate", "abpbBT1DizNG"],
    ["Line Geographical Insights Fraud BPS", "adbc1U2Fe9Py"],
    ["Line Geographical Insights Domestic Approval Rate", "ab6bzqqtdXcg"],
    ["Line Geographical Insights Fraud BPS", "acgc3ENKdh0q"]
];

headlineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/key-insights");
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/key-insights",
                title: "Performance Analytics - Key Insights",
                type: ""
            }
        });
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("productGroup", "CONSUMER PREPAID");
        await applyFilter();
        const chart = getVisualizationByIdentifier(identifier).withText(new RegExp(title.concat(".*")));
        await t
            .expect(await isErrorBy(chart))
            .notOk()
        await clearAll();
    })
});

lineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/key-insights");
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/key-insights",
                title: "Performance Analytics - Key Insights",
                type: ""
            }
        });
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("productGroup", "CONSUMER PREPAID");
        await applyFilter();
        const chart = getVisualizationByIdentifier(identifier).withText(new RegExp(title.concat(".*")));
        await t
            .expect(await isErrorBy(chart))
            .notOk();
        const visualization = getVisualizationByIdentifier(identifier);
        const xAxisLabels = visualization.find(".highcharts-axis-labels.highcharts-xaxis-labels");
        await waitForLoading(visualization);
        await t.expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
        await clearAll();
    })
});
