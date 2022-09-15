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
    assertTooltipOfVisualizationExists,
    waitForLoading,
    clearAll
} from "../helpers/pageUtils";
import { t } from "testcafe";

loginAutoTestUserAndNavigate("Performance Analytics.Card Not Present  - e2e", 1, "performance-analytics/card-not-present");

test(`should load all filters, kpi's and visualizations for action menu CARD NOT PRESENT`, async () => {
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await assertTooltipOfVisualizationExists("ac3bOwykfmfc", "Month/Year (Period)");
    await assertActiveLeftMenuItem("CARD NOT PRESENT");
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist(["abpv6taVc5jI","aaewd3zpbP7h","aa0QAovQfHcb","ac3bOwykfmfc", "aacuAiWlg2xo",
        "ac1QuQHyc7rU","ac5c1C40efm8","acjuues0h61a","acAeY6SOgsg0","aaifejb3hOwD","aatfeMYzii3N",
        "aaNfeHmbcqst","aaQvNaIubX1s","abvvM7tpd7uF","abfffmmdgRp7","abMvJw8YgzZZ","adbvJVdbczD4"]);
    await assertAllVisualizationBlocksExist(["abpv6taVc5jI", "aaewd3zpbP7h","aa0QAovQfHcb","ac1QuQHyc7rU"]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/performance-analytics/card-not-present",
            title: "Performance Analytics - Card Not Present",
            type: ""
        }
    });
    const visualization = getVisualizationByIdentifier("ac3bOwykfmfc");
    const xAxisLabels = visualization.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    await waitForLoading(visualization);
    await t.expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
    await clearAll();
});

const headlineCharts = [
    ["Headline Card Not Present Approval Rate", "aa0QAovQfHcb"],
    ["Headline Card Not Present Fraud BPS", "ac1QuQHyc7rU"]
];

const lineCharts = [
    ["Line Card Not Present Approval Rate", "ac3bOwykfmfc"],
    ["Line Card Not Present Fraud BPS", "ac5c1C40efm8"]
];

const columnCharts = [
    ["Column Card Not Present CNP Spend as % of Total Spend", "aacuAiWlg2xo"],
    ["Column Card Not Present Fraud", "acjuues0h61a"]
];

const comboCharts = [
    ["Combo CNP Domestic Approval Rate Vs Fraud BPS - Me", "aaNfeHmbcqst"],
    ["Combo CNP Cross Border Approval Rate Vs Fraud BPS - Me", "abfffmmdgRp7"]
];

headlineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-not-present");
        await addFilterValue("cidAndIca_parent", "159213");
        await addFilterValue("country", "SWITZERLAND");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-not-present",
                title: "Performance Analytics - Card Not Present",
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
        await clearAll();
    })
});

lineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-not-present");
        await addFilterValue("cidAndIca_parent", "159213");
        await addFilterValue("country", "SWITZERLAND");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-not-present",
                title: "Performance Analytics - Card Not Present",
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
        await clearAll();
    })
});

columnCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-not-present");
        await addFilterValue("cidAndIca_parent", "159213");
        await addFilterValue("country", "SWITZERLAND");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-not-present",
                title: "Performance Analytics - Card Not Present",
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
        await clearAll();
    })
});

comboCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-not-present");
        await addFilterValue("cidAndIca_parent", "159213");
        await addFilterValue("country", "SWITZERLAND");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-not-present",
                title: "Performance Analytics - Card Not Present",
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
        await clearAll();
    })
});
