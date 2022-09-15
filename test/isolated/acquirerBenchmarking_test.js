// (C) 2020 GoodData Corporation
import { loginIsolatedTestAndNavigate } from "../helpers/fixtureWithLogin";
import {
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    selectProject,
    expectSingleDashboardContent,
    addFilterValue,
    applyFilter,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    assertVisualizationsLoadSuccessful, removeFilterValue,
} from "../helpers/pageUtils";

const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";

loginIsolatedTestAndNavigate(
    "Acquirer Benchmarking.Fraud Summary",
    1,
    "acquirer-benchmarking-standard/fraud-summary"
);

test("should load all filter, kpi's and visualization1", async () => {
    await selectProject("100222 ASSOCIATED BANK  N.A.");
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
    const visualizationID = "aaAIniUDfHHp";
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful([visualizationID]);
    await removeFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful([visualizationID]);
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await assertVisualizationsLoadSuccessful([visualizationID]);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await assertVisualizationsLoadSuccessful([visualizationID]);
});
