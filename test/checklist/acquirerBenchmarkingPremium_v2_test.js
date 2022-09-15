// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    removeFilterValue,
    waitForLoading,
    selectProject,
    addFilterValueByIndex,
    getVisualizationBlockByIdentifier,
} from "../helpers/pageUtils";
import { ME, PEERS, PEER_BEST_IN_CLASS, WORLDWIDE, REGION, COUNTRY } from "../helpers/constants";
import { hasDataWithLegend } from "../helpers/chartUtils";

const country = "regionAndCountry_child";
const region = "regionAndCountry_parent";
const month = "monthYear";
const testCid = "100167 ";

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking Premium.Fraud Deep Dive - version 2",
    1,
    "acquirer-benchmarking-premium/fraud-deep-dive",
);

test("check filter for month", async (t) => {
    const visualizationID = "aaTdGxu8evAY";
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject(testCid);
    await waitForLoading(visualization);
    await addFilterValueByIndex(month, 23);
    await addFilterValueByIndex(month, 22);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();
    await addFilterValueByIndex(month, 21);
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();
    await selectProject("100212 FIRST NATIONAL BANK + TRUST COMPANY  THE");
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
});

test("Last closed quarter should be affected by filter", async (t) => {
    const visualizationID = "aaTdGxu8evAY";
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject(testCid);
    await waitForLoading(visualization);
    await addFilterValue(country, "UNITED STATES");
    //There are PEERS at May, Jun & Jul 2018 when not filter by month
    await addFilterValueByIndex(month, 13);
    await addFilterValueByIndex(month, 14);
    await addFilterValueByIndex(month, 15);
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();
});

test("Combine filter", async (t) => {
    const visualizationID = "aaTdGxu8evAY";
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject("101692 METABANK");
    await addFilterValue("cidAndAcquirerIca_child", "1473 METABANK");
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue("channelSummaryCpCnp", "CARD PRESENT");
    await addFilterValue("channelDetail", "CP-PoS");
    await addFilterValue("corridor", "Cross Border");
    await addFilterValue("cardType", "MASTERCARD");
    await addFilterValue("productGroup", "CONSUMER CREDIT");
    await addFilterValue("merchantClassification", "OTHER RETAIL");
    await applyFilter();
    await waitForLoading(visualization);
    await t.expect(visualization.find(".s-error").exists).ok();
    await addFilterValue("cidAndAcquirerIca_child", "20307 METABANK");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
});

test("Combine region and country filters", async (t) => {
    const visualizationID = "aaKdNWSwg7ba";
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject(testCid);
    await addFilterValue(region, "EUROPE");
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "SWITZERLAND");
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await removeFilterValue(region, "EUROPE");
    await applyFilter();
    await waitForLoading(visualization);
    // stuck by MC-427
    // await t.expect(await hasDataWithLegend(visualizationID, REGION)).ok();
});
