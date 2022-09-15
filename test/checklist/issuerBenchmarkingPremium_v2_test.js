// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {PEERS, PEER_BEST_IN_CLASS, COUNTRY, REGION} from "../helpers/constants";
import {
    applyFilter,
    addFilterValue,
    addFilterValueByIndex,
    getVisualizationBlockByIdentifier,
    selectProject,
    waitForLoading,
    navigate,
    assertDataLayersExists,
    assertTooltipExists,
    isNoData,
    clearAll,
    removeFilterValue
} from "../helpers/pageUtils";
import {hasDataWithLegend} from "../helpers/chartUtils";

const month = "monthYear";
const issuerICA = "cidAndIssuerIca_child";
const channelSummary = "channelSummaryCpCnp";
const channelDetail = "channelDetail";
const corridor = "corridor";
const creditOrDebit = "creditOrDebitAndProductGroup_parent";
const productType = "creditOrDebitAndProductGroup_child";
const cardType = "cardType";
const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const testCID = "100002";

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.General Overview - version 2", 1,
    "issuer-benchmarking-premium/fraud-deep-dive");

test("should hide Peers & BIC if less than 5 competitors", async t => {
    await navigate("GENERAL OVERVIEW");
    const visualizationID =  "aaHoRYWtbls8";
    await assertTooltipExists(visualizationID, "Month/Year (Period)");
    await selectProject(testCID);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/general-overview",
            title: "Issuer Benchmarking Premium - General Overview",
            type: ""
        }
    });
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await selectProject("100104 RIVERVIEW BANK");
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(month, "Mar 2020");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(issuerICA, "18588 RIVERVIEW BANK");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(channelSummary, "Card Not Present");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(channelDetail, "CNP-E-Commerce");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        //.expect(await hasDataWithLegend(visualizationID, PEERS))
        //.notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(corridor, "Domestic");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValue(creditOrDebit, "CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await isNoData(visualizationID))
        .ok();
    await addFilterValue(cardType, "CIRRUS");
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
    await addFilterValue(issuerICA, "83408");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk("Country shouldn't be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
});

test("check filter for month - general overview", async t => {
    await navigate("GENERAL OVERVIEW");
    const visualizationID =  "aanoXvtLdOfJ";
    await selectProject(testCID);
    await addFilterValueByIndex("monthYear", 5);
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/general-overview",
            title: "Issuer Benchmarking Premium - General Overview",
            type: ""
        }
    });
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
    await addFilterValueByIndex("monthYear", 4);
    await addFilterValueByIndex("monthYear", 3);
    await addFilterValueByIndex("monthYear", 2);
    await addFilterValueByIndex("monthYear", 1);
    await addFilterValueByIndex("monthYear", 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();
});
