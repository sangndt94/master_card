// (C) 2019 GoodData Corporation
import {loginIsolatedTestAndNavigate} from "../helpers/fixtureWithLogin";
import {
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    expectSingleDashboardContent,
    selectProject,
    addFilterValue,
    applyFilter,
    waitForLoading,
    getVisualizationBlockByIdentifier, assertVisualizationsLoadSuccessful, removeFilterValue,
} from "../helpers/pageUtils";
import {hasDataWithLegend} from "../helpers/chartUtils";
import {COUNTRY, ME, PEER_BEST_IN_CLASS, PEERS, REGION, WORLDWIDE} from "../helpers/constants";

loginIsolatedTestAndNavigate(
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
