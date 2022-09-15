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
    waitToDisappear,
    waitForLoading,
    waitForChildFilterLoading,
    getFilterItems,
    expectSingleDashboardContent,
} from "../helpers/pageUtils";

async function checkRenderChart(visualizationIdentifier, legendsTitle) {
    const visualizationBlock = getVisualizationBlockByIdentifier(visualizationIdentifier);
    const xAxisLabels = visualizationBlock.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    const legends = visualizationBlock.find(".series");
    const axisTitle = visualizationBlock.find(".highcharts-axis-title");
    await t
        .hover(visualizationBlock)
        .expect(xAxisLabels.textContent)
        .ok()
        .expect(legends.textContent)
        .eql(legendsTitle)
        .expect(axisTitle.textContent)
        .eql("Quarter/Year (Period)");
}

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking.Fraud Summary",
    1,
    "acquirer-benchmarking-standard/fraud-summary"
);

test("should load all filter, kpi's and visualizations", async () => {
    await selectProject("100222 ASSOCIATED BANK  N.A."); // No waitToDisappear because it is already waiting to stop loading in selectProject
    await assertActiveLeftMenuItem("FRAUD SUMMARY");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist(["aaAIniUDfHHp", "abjImH6AdRgl", "abdXYjfcd0nq"]);
    await assertAllFiltersExist([
        "cidAndAcquirerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
    ]);
});

test("should render visualizations correctly", async () => {
    await waitToDisappear(".s-dashboard-loading");
    await waitForLoading(getVisualizationBlockByIdentifier("aaAIniUDfHHp"));
    await checkRenderChart("aaAIniUDfHHp", "WORLDWIDEREGIONCOUNTRYPEERSPEER BEST-IN-CLASSME");
    await checkRenderChart("abjImH6AdRgl", "WORLDWIDEREGIONCOUNTRYPEERSPEER BEST-IN-CLASSME");
    await checkRenderChart("abdXYjfcd0nq", "GROSS FRAUDNET FRAUD");
});

test.skip("should apply filter and legend", async (t) => {
    await waitToDisappear(".s-dashboard-loading");
    const visualizationBlock = getVisualizationBlockByIdentifier("aaAIniUDfHHp");
    const worldwideTrackers = visualizationBlock.find(".highcharts-series-0 .highcharts-point");
    const countryTrackers = visualizationBlock.find(".highcharts-series-2 .highcharts-point");
    const meTrackers = visualizationBlock.find(".highcharts-series-5 .highcharts-point");
    const meLegend = visualizationBlock.find(".series-name").withText("ME");
    await waitForLoading(visualizationBlock);
    await addFilterValue("regionAndCountry_parent", "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(countryTrackers.exists)
        .notOk()
        .expect(meTrackers.visible)
        .ok()
        .click(meLegend)
        .expect(meTrackers.exists)
        .notOk()
        .expect(worldwideTrackers.visible)
        .ok();
});

test("should apply parent child filter", async (t) => {
    await selectProject("100222 ASSOCIATED BANK  N.A.");
    await waitForChildFilterLoading("cidAndAcquirerIca_child");
    await t
        .expect(await getFilterItems("cidAndAcquirerIca_child"))
        .contains("1505 ASSOCIATED BANK  N.A.", "8982 ASSOCIATED BANK  N.A.");

    await addFilterValue("regionAndCountry_parent", "EUROPE");
    await waitForChildFilterLoading("regionAndCountry_child");
    await t
        .expect(await getFilterItems("regionAndCountry_child"))
        .contains("SWITZERLAND");
});
