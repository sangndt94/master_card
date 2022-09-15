// (C) 2019 GoodData Corporation
import {loginIsolatedTestAndNavigate} from "../helpers/fixtureWithLogin";
import {
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    expectSingleDashboardContent,
    assertDefaultValueAllFilters
} from "../helpers/pageUtils";

loginIsolatedTestAndNavigate("Issuer Benchmarking Premium.Fraud Deep Dive", 1, "issuer-benchmarking-premium/fraud-deep-dive");

test("should load all filters, kpi's and visualizations", async () => {
    await assertDefaultValueAllFilters(["monthYear", "cidAndIssuerIca_child", "regionAndCountry_parent",
        "regionAndCountry_child", "channelSummaryCpCnp", "channelDetail", "corridor", "creditOrDebitAndProductGroup_parent",
        "creditOrDebitAndProductGroup_child", "cardType"]);
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist(["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"]);
    await assertAllFiltersExist([
        "monthYear", "cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "channelSummaryCpCnp",
        "channelDetail", "corridor", "creditOrDebitAndProductGroup_parent", "creditOrDebitAndProductGroup_child", "cardType"
    ]);
});
