// (C) 2020 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    getVisualizationBlockByIdentifier,
    selectProject,
    waitForLoading,
    removeFilterValue,
    assertVisualizationsLoadSuccessful,
} from "../helpers/pageUtils";

const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const testCid = "100222";

loginAutoTestUserAndNavigate(
    "Acquirer Issuer Benchmarking.Fraud Summary - version 2",
    1,
    "acquirer-benchmarking-standard/fraud-summary"
);

test("should render visualizations correctly", async () => {
    const visualizationID = "aaAIniUDfHHp";
    await selectProject(testCid);
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
