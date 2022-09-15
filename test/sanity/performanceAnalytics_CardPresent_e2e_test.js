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
    assertTooltipOfVisualizationExists
} from "../helpers/pageUtils";
import { t } from "testcafe";

loginAutoTestUserAndNavigate("Performance Analytics.Card Present - e2e", 1, "performance-analytics/card-present");

test(`should load all filters, kpi's and visualizations for action menu CARD PRESENT`, async () => {
    await navigateTo("performance-analytics/card-present");
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await addFilterValue("country", "LIECHTENSTEIN");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/performance-analytics/card-present",
            title: "Performance Analytics - Card Present",
            type: ""
        }
    });
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await assertTooltipOfVisualizationExists("abyfdU9edkuQ", "Month/Year (Period)");
    await assertActiveLeftMenuItem("CARD PRESENT");
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist(["abwv56oDc5QB","ab9v18rzcJpN","acbQzIknf6X7","abyfdU9edkuQ","abDuyauMcmqA",
        "abSQzMi7aVAD","abBfd6PMdlf3","aaJuztzUeCpX","aaXwh7sVeDGq","acmwdZGvgjBW","aaCfkaXOcm4k",
        "abNvM7Tbgv0p","ab9vKmnLbsaU","aaQfmAV7cFC5","abHvM3wKfoZm","aavvT8FObVxo"]);
    await assertAllVisualizationBlocksExist(["abwv56oDc5QB", "ab9v18rzcJpN","acbQzIknf6X7","abSQzMi7aVAD"]);
    const visualization = getVisualizationByIdentifier("abyfdU9edkuQ");
    const xAxisLabels = visualization.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    await waitForLoading(visualization);
    await t.expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
});

const headlineCharts = [
    ["Headline Card Present Approval Rate", "acbQzIknf6X7"],
    ["Headline Card Present Fraud BPS", "abSQzMi7aVAD"]
];

const lineCharts = [
    ["Line Card Present Approval Rate", "abyfdU9edkuQ"],
    ["Line Card Present Fraud BPS", "abBfd6PMdlf3"]
];

const columnCharts = [
    ["Column Card Present CNP Spend as % of Total Spend", "abDuyauMcmqA"],
    ["Column Card Present Fraud", "aaJuztzUeCpX"]
];

const comboCharts = [
    ["Combo CP Domestic Approval Rate Vs Fraud BPS - Me", "aaCfkaXOcm4k"],
    ["Combo CP Cross Border Approval Rate Vs Fraud BPS - Me", "aaQfmAV7cFC5"]
];

headlineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-present");
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-present",
                title: "Performance Analytics - Card Present",
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
    })
});

lineCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-present");
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-present",
                title: "Performance Analytics - Card Present",
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
    })
});

columnCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-present");
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-present",
                title: "Performance Analytics - Card Present",
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
    })
});

comboCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await navigateTo("performance-analytics/card-present");
        await addFilterValue("cidAndIca_parent", "236711");
        await addFilterValue("country", "LIECHTENSTEIN");
        await assertDataLayersExists({
            event: "pageview",
            page: {
                path: "/performance-analytics/card-present",
                title: "Performance Analytics - Card Present",
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
    })
});
