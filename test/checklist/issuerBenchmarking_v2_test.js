// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {PEERS, PEER_BEST_IN_CLASS, REGION, COUNTRY} from "../helpers/constants";
import {
    applyFilter,
    addFilterValue,
    getVisualizationBlockByIdentifier,
    selectProject,
    waitForLoading,
    isNoData,
    navigateTo,
    assertTooltipExists,
    clearAll,
    removeFilterValue
} from "../helpers/pageUtils";
import { hasDataWithLegend } from "../helpers/chartUtils";

const creditOrDebit = "creditOrDebit";
const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const testCID = "100002";
const issueICA = "cidAndIssuerIca_child";
const anotherCID = "112113"; //CID without data at United State country

loginAutoTestUserAndNavigate("Issuer Benchmarking.General Overview", 1, "issuer-benchmarking-standard/general-overview");

test("should render visualizations correctly at General Overview", async t => {
    const visualizationID =  "ac0CSIq9bc6C";
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await clearAll();
    // check region is a valid peer group MC-390
    await selectProject("253094");
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk("Country shouldn't be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
    await addFilterValue(country, "SWITZERLAND");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok("Country should be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
    await removeFilterValue(country, "SWITZERLAND");
    await addFilterValue(country, "LIECHTENSTEIN");
    await addFilterValue(issueICA, "83408");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk("Country shouldn't be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
});

test("should render visualizations correctly at Channel Overview", async t => {
    await navigateTo("issuer-benchmarking-standard/channel-overview");
    const visualizationID =  "abRCSz8dbx3W";
    await assertTooltipExists(visualizationID, "Quarter/Year (Period)");
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
});

test("should render visualizations correctly at Channel and Corridor Overview", async t => {
    await navigateTo("issuer-benchmarking-standard/channel-and-corridor-overview");
    const visualizationID =  "aabC2WfHaxLr";
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
});

test("should render visualizations correctly at Authorization Decline Rates", async t => {
    await navigateTo("issuer-benchmarking-standard/authorization-decline-rates");
    const visualizationID =  "aaACXl1MfvUP";
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
});

test("should render visualizations correctly at e-Commerce / 3DS Overview", async t => {
    await navigateTo("issuer-benchmarking-standard/e-commerce-3-ds-overview");
    const visualizationID =  "aaSCXQ9rg9So";
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
});

test("should render visualizations correctly at Card Present / EMV Overview", async t => {
    await navigateTo("issuer-benchmarking-standard/card-present-emv-overview");
    const visualizationID =  "aaXC8fd3cfJv";
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject(anotherCID);
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
});
