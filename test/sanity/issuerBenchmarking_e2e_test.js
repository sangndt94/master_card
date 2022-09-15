// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    getVisualizationBlockByIdentifier,
    clearAll,
    applyFilter,
    navigate,
    waitForLoading,
    assertActiveLeftMenuItem,
    assertVisualizationsLoadSuccessful,
    addFilterValueByIndex,
    assertDataLayersExists,
} from "../helpers/pageUtils";

const issuerICAID = "cidAndIssuerIca_child";
const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const creditAndDebitID = "creditOrDebit";

loginAutoTestUserAndNavigate("Issuer Benchmarking.e2e", 1, "issuer-benchmarking-standard/general-overview");

test("should apply filter and render correctly at General Overview", async () => {
    const visualizationIDs =  ["ac0CSIq9bc6C", "aafC0PYjepPV", "abHC0e4Bh0Fb", "acICSFGpbckf"];
    const visualizationID =  visualizationIDs[0];
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await addFilterValueByIndex(issuerICAID, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful([visualizationID, "aafC0PYjepPV", "abHC0e4Bh0Fb", "acICSFGpbckf"]);

    await addFilterValueByIndex("creditOrDebit", 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(regionID, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(regionID, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("should apply filter and render correctly at Channel Overview", async () => {
    const visualizationID =  "aa9CWu9IgO6V";
    await navigate("CHANNEL OVERVIEW");
    await assertActiveLeftMenuItem("CHANNEL OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("abRCSz8dbx3W"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-standard/channel-overview",
            title: "Issuer Benchmarking - Channel Overview",
            type: ""
        }
    });
    await assertVisualizationsLoadSuccessful(["abRCSz8dbx3W", visualizationID, "aa1CWu9IgO6V", "aa4CVZ68cAU5"]);
    await assertVisualizationApplyFilter(visualizationID);
});

test("should apply filter and render correctly at Channel and Corridor Overview", async () => {
    const visualizationID =  "aaSCZ80QhO3e";
    await navigate("CHANNEL AND CORRIDOR OVERVIEW");
    await assertActiveLeftMenuItem("CHANNEL AND CORRIDOR OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("aabC2WfHaxLr"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-standard/channel-and-corridor-overview",
            title: "Issuer Benchmarking - Channel and Corridor Overview",
            type: ""
        }
    });
    await assertVisualizationsLoadSuccessful(["aabC2WfHaxLr", "aauC08RCgIdI", visualizationID, "aaKC00PveMKQ"]);
    await assertVisualizationApplyFilter(visualizationID);
});

test("should apply filter and render correctly at Authorization Decline Rates", async () => {
    const visualizationID =  "aalC2hZ2fOrK";
    await navigate("AUTHORIZATION DECLINE RATES");
    await assertActiveLeftMenuItem("AUTHORIZATION DECLINE RATES");
    await waitForLoading(await getVisualizationBlockByIdentifier("aaACXl1MfvUP"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-standard/authorization-decline-rates",
            title: "Issuer Benchmarking - Authorization Decline Rates",
            type: ""
        }
    });
    await assertVisualizationsLoadSuccessful(["aaACXl1MfvUP", "aa2C0eYmbcNI", "aaEC1QFCfaaB", visualizationID]);
    await assertVisualizationApplyFilter(visualizationID);
});

test("should apply filter and render correctly at e-Commerce / 3DS Overview", async () => {
    const visualizationID =  "aaSCXQ9rg9So";
    await navigate("E-COMMERCE / 3DS OVERVIEW");
    await assertActiveLeftMenuItem("E-COMMERCE / 3DS OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-standard/e-commerce-3-ds-overview",
            title: "Issuer Benchmarking - e-Commerce / 3DS Overview",
            type: ""
        }
    });
    await assertVisualizationsLoadSuccessful([visualizationID, "abCCYcBzf2Lc", "aauCY6kOdMPD", "abECXScYhgxY"]);
    await assertVisualizationApplyFilter(visualizationID);
});

test("should apply filter and render correctly at Card Present / EMV Overview", async () => {
    const visualizationID =  "acZCSkaWcZWt";
    await navigate("CARD PRESENT / EMV OVERVIEW");
    await assertActiveLeftMenuItem("CARD PRESENT / EMV OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("aaXC8fd3cfJv"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-standard/card-present-emv-overview",
            title: "Issuer Benchmarking - Card Present / EMV Overview",
            type: ""
        }
    });
    await assertVisualizationsLoadSuccessful(["aaXC8fd3cfJv", visualizationID, "aa0CXrNUbayv", "acECSKKUdVX1"]);
    await assertVisualizationApplyFilter(visualizationID);
});

async function assertVisualizationApplyFilter(visualizationID) {
    await addFilterValueByIndex(issuerICAID, 0);
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(creditAndDebitID, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
}
