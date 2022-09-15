// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    getVisualizationBlockByTitle,
    switchVisualizationBlockToQuarterly,
    assertVisualizationBlockExists,
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    waitForLoading,
    waitToDisappear,
    expectSingleDashboardContent,
} from "../helpers/pageUtils";

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking Premium.Fraud Deep Dive",
    1,
    "acquirer-benchmarking-premium/fraud-deep-dive"
);

test("should load all filters, kpi's and visualizations", async () => {
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist([
        "aaTdGxu8evAY",
        "aaKdNWSwg7ba",
        "abIehajido03",
        "aapeoONbdOzy",
        "abafuIird8nB",
    ]);
    await assertAllFiltersExist([
        "monthYear",
        "cidAndIssuerIca_child",
        "regionAndCountry_parent",
        "regionAndCountry_child",
        "channelSummaryCpCnp",
        "channelDetail",
        "corridor",
        "creditOrDebitAndProductGroup_parent",
        "creditOrDebitAndProductGroup_child",
        "cardType",
    ]);
});

test("should allow for switching to quarterly", async (t) => {
    await waitToDisappear(".s-dashboard-loading");
    const xAxisLabels = getVisualizationBlockByTitle("MY CLEARED VOLUME").find(
        ".highcharts-axis-labels.highcharts-xaxis-labels",
    );
    const xAxisLabelsAfterSwitch = getVisualizationBlockByTitle("MY CLEARED VOLUME").find(
        ".highcharts-axis-labels.highcharts-xaxis-labels",
    );
    await waitForLoading(getVisualizationBlockByTitle("MY CLEARED VOLUME"));
    await t.expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
    await switchVisualizationBlockToQuarterly("abafuIird8nB");
    await assertVisualizationBlockExists("abnWNuvFhMSw");
    await t.expect(xAxisLabelsAfterSwitch.textContent).match(/Q[1-4]\/[0-9]{4}/);
});
