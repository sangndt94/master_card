// (C) 2019 GoodData Corporation
import { t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    getVisualizationBlockByIdentifier,
    selectProject,
    waitForLoading,
    waitToDisappear,
    getFilterItems,
    waitForChildFilterLoading,
    expectSingleDashboardContent,
    assertDefaultValueAllFilters
} from "../helpers/pageUtils";

async function checkRenderChart(visualizationIdentifier) {
    const visualiztionBlock = getVisualizationBlockByIdentifier(visualizationIdentifier);
    const xAxisLabels = visualiztionBlock.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    const legends = visualiztionBlock.find(".series");
    const axisTitle = visualiztionBlock.find(".highcharts-axis-title");
    await t
        .hover(visualiztionBlock)
        .expect(xAxisLabels.textContent)
        .ok()
        .expect(legends.textContent)
        .eql("WORLDWIDEREGIONCOUNTRYPEERSPEER BEST-IN-CLASSME")
        .expect(axisTitle.textContent)
        .eql("Quarter/Year (Period)");
}

loginAutoTestUserAndNavigate("Issuer Benchmarking.General Overview", 1, "issuer-benchmarking-standard/general-overview");

test("should load all filters, kpi's and visualizations", async () => {
    await assertDefaultValueAllFilters(["cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "creditOrDebit"]);
    await selectProject("100002");
    await assertActiveLeftMenuItem("GENERAL OVERVIEW");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist(["ac0CSIq9bc6C", "aafC0PYjepPV", "abHC0e4Bh0Fb", "acICSFGpbckf"]);
    await assertAllFiltersExist(["cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "creditOrDebit"]);
});

// This is unstable because of MC-191 executeVisualization sometimes returns 503 Service unavailable
test("should render visualizations correctly", async () => {
    await waitToDisappear(".s-dashboard-loading");
    await waitForLoading(getVisualizationBlockByIdentifier("ac0CSIq9bc6C"));
    await checkRenderChart("ac0CSIq9bc6C");
    await checkRenderChart("aafC0PYjepPV");
    await checkRenderChart("abHC0e4Bh0Fb");
    await checkRenderChart("acICSFGpbckf");
});

test.skip("should apply filter and legend", async t => {
    await waitToDisappear(".s-dashboard-loading");
    const visualiztionBlock = getVisualizationBlockByIdentifier("ac0CSIq9bc6C");
    const worldwideTrackers = visualiztionBlock.find(".highcharts-series-0 .highcharts-point");
    const meTrackers = visualiztionBlock.find(".highcharts-series-5 .highcharts-point");
    const meLegend = visualiztionBlock.find(".series-name").withText("ME");
    await waitForLoading(visualiztionBlock);
    await addFilterValue("creditOrDebit", "CREDIT");
    await applyFilter();
    await waitForLoading(visualiztionBlock);
    await t
        .expect(meTrackers.visible)
        .ok()
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
});
