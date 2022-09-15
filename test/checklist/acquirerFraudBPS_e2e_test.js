import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    addFilterValueByIndex,
    applyFilter,
    assertActiveLeftMenuItem, assertAllVisualizationsExist,
    assertDefaultValueAllFilters,
    assertTooltipOfVisualizationExists, assertVisualizationExists,
    clearAll,
    getVisualizationByIdentifier,
    navigate,
    resetChanges, waitForLoading
} from "../helpers/pageUtils";
import { Selector, t} from "testcafe";
import { hasDataWithLegend } from "../helpers/chartUtils";
import { NET_FRAUD_BPS } from "../helpers/constants";

const testQuater = "quarter";
const testIca = "ica";
const test3ds = "3ds";
const testCorridor = "corridor";
const testCreditOrDebit = "creditOrDebit";
const testProductGroup = "productGroup";
const testChannelSummary = "channelSummaryAndChannelDetail_parent";
const testChannelDetail = "channelSummaryAndChannelDetail_child";
const testRegion = "regionAndCountry_parent";
const testCountry = "regionAndCountry_child";

loginAutoTestUserAndNavigate("FRAUD BPS ACQUIRER.e2e",1,"acquirer-fraud-bps-standard/overview");

test(`should apply filter and render correctly at Overview`, async t => {
    const visualizationIDs = ["aacA3CHsdbIf", "acYAVWVsbgrf", "aaTAXuDYbCXs", "abGHbgSddzus", "abPAV6iNfFoa", "aaNAYteEfjAY",
        "aaJnrUTdbto1", "aaOnrQKBbXZc", "aclA3Ehyg7y8", "adZtdhEBd2RJ", "aaktobeldpj4", "aaOnrQKBbXZc", "abXLpt1AcP4j",
        "acxtfTo0cGaG", "abctnojnfb6S"];

    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("OVERVIEW");
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertDefaultValueAllFilters([testQuater, testIca, test3ds, testCorridor, testCreditOrDebit,
        testProductGroup, testChannelSummary, testChannelDetail, testRegion, testCountry]);
    await assertAllVisualizationsExist(visualizationIDs);
    await assertTooltipOfVisualizationExists(visualizationID, "Quarter");
    await t
        .expect(await hasDataWithLegend(visualizationID, NET_FRAUD_BPS))
        .ok();
    await addFilterValueByIndex(testIca, 0);
    await addFilterValueByIndex(testQuater, 0);
    await addFilterValueByIndex(test3ds, 0);
    await addFilterValueByIndex(testCorridor, 0);
    await addFilterValueByIndex(testCreditOrDebit, 0);
    await addFilterValueByIndex(testProductGroup, 0);
    await addFilterValueByIndex(testChannelDetail, 0);
    await addFilterValueByIndex(testCountry, 0);
    await addFilterValueByIndex(testRegion, 0);
    await applyFilter();
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertVisualizationExists(visualizationID);
    await clearAll();
    await assertDefaultValueAllFilters([testQuater, testIca, test3ds, testCorridor, testCreditOrDebit,
        testProductGroup, testChannelSummary, testChannelDetail, testRegion, testCountry]);
    await addFilterValueByIndex(testQuater, 0);
    await addFilterValueByIndex(testIca, 0);
    await resetChanges();
    await assertDefaultValueAllFilters([testQuater, testIca]);

    await navigate("DETAIL BY ICA");
    const anotherVisualizationIDs = ["aclbvJkNdB8w", "aepbj8Icb7g9"];
    await assertDefaultValueAllFilters([testQuater, testIca, test3ds, testCorridor, testCreditOrDebit,
        testProductGroup, testChannelSummary, testChannelDetail, testRegion, testCountry]);
    await waitForLoading(await getVisualizationByIdentifier("aclbvJkNdB8w"));
    await assertAllVisualizationsExist(anotherVisualizationIDs);
    await assertActiveLeftMenuItem("DETAIL BY ICA");
    await assertActiveItemSplitBy("ICA");
    await addFilterValueByIndex(testIca, 0);
    await applyFilter();
    await assertVisualizationExists("aclbvJkNdB8w");
    await navigate("OVERVIEW");
    await assertActiveLeftMenuItem("OVERVIEW");
    await waitForLoading(await getVisualizationByIdentifier("aacA3CHsdbIf"));
    await assertVisualizationExists("aacA3CHsdbIf");
});

export const assertActiveItemSplitBy = async label =>{
    const splitItem = Selector(".GranularitySwitch").find(".active");
    await t.expect(splitItem.exists).ok();
    await t.expect(splitItem.innerText).eql(label);
};
