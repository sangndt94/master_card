// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    switchVisualizationBlockToQuarterly,
    assertVisualizationBlockExists,
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    waitToDisappear,
    getVisualizationBlockByIdentifier,
    waitForLoading,
    selectProject,
    waitForChildFilterLoading,
    getFilterItems,
    expectSingleDashboardContent,
    assertDefaultValueAllFilters
} from "../helpers/pageUtils";

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Fraud Deep Dive", 1, "issuer-benchmarking-premium/fraud-deep-dive");

test("should load all filters, kpi's and visualizations", async () => {
    await assertDefaultValueAllFilters(["monthYear", "cidAndIssuerIca_child", "regionAndCountry_parent",
        "regionAndCountry_child", "channelSummaryCpCnp", "channelDetail", "corridor", "creditOrDebitAndProductGroup_parent",
        "creditOrDebitAndProductGroup_child", "cardType"]);
    await selectProject("100002");
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist(["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"]);
    await assertAllFiltersExist([
        "monthYear", "cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "channelSummaryCpCnp",
        "channelDetail", "corridor", "creditOrDebitAndProductGroup_parent", "creditOrDebitAndProductGroup_child", "cardType"
    ]);
});

test("should allow for switching to quarterly", async t => {
    await waitToDisappear(".s-dashboard-loading");
    const visualizationBlock = getVisualizationBlockByIdentifier("aaHoRYWtbls8");
    const xAxisLabels = visualizationBlock.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    const xAxisLabelsAfterSwitch = getVisualizationBlockByIdentifier("ac0CSIq9bc6C").find(".highcharts-axis-labels.highcharts-xaxis-labels");
    await waitForLoading(visualizationBlock);
    await t
        .expect(xAxisLabels.textContent)
        .match(/([A-z]{3} )[0-9]{4}/);
    await switchVisualizationBlockToQuarterly("aaHoRYWtbls8");
    await waitForLoading(await getVisualizationBlockByIdentifier("ac0CSIq9bc6C"));
    await assertVisualizationBlockExists("ac0CSIq9bc6C");
    await t
        .expect(await xAxisLabelsAfterSwitch.textContent)
        .match(/Q[1-4]\/[0-9]{4}/);
});

// Skipped: See MC-216 and MC-73
test.skip("should apply filter and legend", async t => {
    await waitToDisappear(".s-dashboard-loading");
    const visualizationBlock = getVisualizationBlockByIdentifier("aaHoRYWtbls8");
    const worldwideTrackers = visualizationBlock.find(".highcharts-series-0 .highcharts-point");
    const meTrackers = visualizationBlock.find(".highcharts-series-5 .highcharts-point");
    const meLegend = visualizationBlock.find(".series-name").withText("ME");
    await waitForLoading(visualizationBlock);
    await addFilterValue("monthYear", "Nov 2017");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(meTrackers.visible)
        .ok()
        .expect(meTrackers.count)
        .eql(1)
        .expect(worldwideTrackers.count)
        .eql(1)
        .click(meLegend)
        .expect(meTrackers.exists)
        .notOk()
        .expect(worldwideTrackers.visible)
        .ok();
});

test("should apply parent child filter", async t => {
    await selectProject("100104 RIVERVIEW BANK");
    await waitForChildFilterLoading("cidAndIssuerIca_child");
    await t
        .expect(await getFilterItems("cidAndIssuerIca_child"))
        .contains("18588 RIVERVIEW BANK");
    await addFilterValue("regionAndCountry_parent", "EUROPE");
    await waitForChildFilterLoading("regionAndCountry_child");
    await t
        .expect(await getFilterItems("regionAndCountry_child"))
        .contains("SWITZERLAND");
    await addFilterValue("creditOrDebitAndProductGroup_parent", "DEBIT");
    await waitForChildFilterLoading("creditOrDebitAndProductGroup_child");
    const productType = await getFilterItems("creditOrDebitAndProductGroup_child");
    await t
        .expect(productType.length)
        .eql(8, "Parent filter do not affect to child filter");
});
