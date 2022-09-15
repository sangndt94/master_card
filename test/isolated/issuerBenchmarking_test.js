// (C) 2019 GoodData Corporation
import { t } from "testcafe";
import {loginIsolatedTestAndNavigate} from "../helpers/fixtureWithLogin";
import {
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    expectSingleDashboardContent,
    assertDefaultValueAllFilters
} from "../helpers/pageUtils";

loginIsolatedTestAndNavigate("Issuer Benchmarking.General Overview", 1, "issuer-benchmarking-standard/general-overview");

test("should load all filters, kpi's and visualizations", async () => {
    await assertDefaultValueAllFilters(["cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "creditOrDebit"]);
    await assertActiveLeftMenuItem("GENERAL OVERVIEW");
    await expectSingleDashboardContent();
    await assertAllVisualizationBlocksExist(["ac0CSIq9bc6C", "aafC0PYjepPV", "abHC0e4Bh0Fb", "acICSFGpbckf"]);
    await assertAllFiltersExist(["cidAndIssuerIca_child", "regionAndCountry_parent", "regionAndCountry_child", "creditOrDebit"]);
});
