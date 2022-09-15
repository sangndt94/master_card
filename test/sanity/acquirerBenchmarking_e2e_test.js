// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    assertActiveLeftMenuItem,
    getVisualizationBlockByIdentifier,
    clearAll,
    waitForLoading,
    waitForChildFilterLoading,
    navigate,
    assertVisualizationsLoadSuccessful,
    addFilterValueByIndex,
    assertDataLayersExists,
} from "../helpers/pageUtils";

const acquirerICA = "cidAndAcquirerIca_child";
const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking.Fraud Summary - e2e",
    1,
    "acquirer-benchmarking-standard/fraud-summary"
);

test("should load all filter, kpi's and visualizations", async (t) => {
    const visualizationIDs = ["aaAIniUDfHHp", "abjImH6AdRgl", "abdXYjfcd0nq"];
    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("FRAUD SUMMARY");
    await waitForChildFilterLoading(acquirerICA);
    await addFilterValueByIndex(acquirerICA, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(regionID, 0);
    await waitForChildFilterLoading(country);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
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
    //await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await addFilterValueByIndex(regionID, 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("should switch chapter and apply child parent filter correctly", async (t) => {
    await navigate("CHANNEL SUMMARY");
    await assertActiveLeftMenuItem("CHANNEL SUMMARY");
    await waitForLoading(await getVisualizationBlockByIdentifier("abuIm7ozbn1V"));
    await assertVisualizationsLoadSuccessful([
        "abuIm7ozbn1V",
        "abzImZcogZCR",
        "aa2IpzEnaNZi",
        "abrIoJW4iuSC",
        "abpInog9eCNj",
        "aasIuk7rhXa5",
        "aa9IpkFHaAnb",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-summary",
            title: "Acquirer Benchmarking - Channel Summary",
            type: ""
        }
    });
    await addFilterValueByIndex(acquirerICA, 0);
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await navigate("CHANNEL OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("acgIqo1DdM5J"));
    await assertVisualizationsLoadSuccessful([
        "acgIqo1DdM5J",
        "aa2Iufu3gB2X",
        "ab5It7l1fPKo",
        "abvIuQIbitNT",
        "abrIt7yYcgFl",
        "acnIrNj9g8EG",
        "abQIu4tViwp8",
        "acjIt8x9gOJC",
        "aakIBwGDcibI",
        "abmIyPoreFhA",
        "abOIv70OhE9w",
        "abaIy3eEeFM3",
        "abeIzpPIazU6",
        "aawIBDo5bcv4",
        "acMIwz1qaHDq",
        "acqIv72ohFdU",
        "abYIOLHYdtb2",
        "ab7IRsxYh7Pl",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-overview",
            title: "Acquirer Benchmarking - Channel Overview",
            type: ""
        }
    });
    await navigate("CHANNEL AND CORRIDOR OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("acaIYngsiwul"));
    await assertVisualizationsLoadSuccessful([
        "acaIYngsiwul",
        "abGI1czfcmKC",
        "abOI18xydNKB",
        "acIIYjXieA05",
        "abSI0WSximSz",
        "abRI0UI2fAJw",
        "abJI1ditaI3K",
        "ac9I0ZINfvPy",
        "adPIYnJuh7ku",
        "abgI4bRtcX2h",
        "adjI0N40a1mC",
        "adHI048jaOzd",
        "acQI2FfZcI4U",
        "ab8I4LKucukZ",
        "adQI04qDfCjD",
        "adlI3KTUdl2R",
        "aaPI7B4SarRq",
        "abSI56qHdGsf",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-and-corridor-overview",
            title: "Acquirer Benchmarking - Channel and Corridor Overview",
            type: ""
        }
    });
    await navigate("E-COMMERCE AUTHENTICATION OVERVIEW");
    await navigate("CARD PRESENT TECHNOLOGY OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("aaeJCf0Qg80t"));
    await assertVisualizationsLoadSuccessful([
        "aaeJCf0Qg80t",
        "adoJwjR9bWfp",
        "aaAJCgAEhrUx",
        "aaSJBCbTcfjc",
        "aajJDBoSgV7w",
        "aa1JBEyhggMj",
        "aaXJA5KRfYg8",
        "abEJAk5Egt0N",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/card-present-technology-overview",
            title: "Acquirer Benchmarking - Card Present Technology Overview",
            type: ""
        }
    });
    await navigate("CHARGEBACKS");
    await waitForLoading(await getVisualizationBlockByIdentifier("aahJIQiQaqzW"));
    await assertVisualizationsLoadSuccessful(["aahJIQiQaqzW", "aayJIoCbeHCf", "abmYPhRaaP93"]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/chargebacks",
            title: "Acquirer Benchmarking - Chargebacks",
            type: ""
        }
    });
});

test("should switch chapter and apply child parent filter correctly at top merchant classifications", async () => {
    await navigate("TOP MERCHANT CLASSIFICATIONS");
    await waitForLoading(await getVisualizationBlockByIdentifier("aaTFyhcLgZG5"));
    await waitForChildFilterLoading(acquirerICA);
    await addFilterValueByIndex(acquirerICA, 0);
    await addFilterValueByIndex(regionID, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex("quarterYear", 0);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier("aaTFyhcLgZG5"));
    await assertVisualizationsLoadSuccessful([
        "aaeR0R03h386",
        "acmSp3oUhMY8",
        "aarFcm86fPIX",
        "aaTFyhcLgZG5",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/top-merchant-classifications",
            title: "Acquirer Benchmarking - Top Merchant Classifications",
            type: ""
        }
    });
    await navigate("CHANNEL OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("ab5It7l1fPKo"));
    await assertVisualizationsLoadSuccessful([
        "acgIqo1DdM5J",
        "aa2Iufu3gB2X",
        "ab5It7l1fPKo",
        "abvIuQIbitNT",
        "abrIt7yYcgFl",
        "acnIrNj9g8EG",
        "abQIu4tViwp8",
        "acjIt8x9gOJC",
        "aakIBwGDcibI",
        "abmIyPoreFhA",
        "abOIv70OhE9w",
        "abaIy3eEeFM3",
        "abeIzpPIazU6",
        "aawIBDo5bcv4",
        "acMIwz1qaHDq",
        "acqIv72ohFdU",
        "abYIOLHYdtb2",
        "ab7IRsxYh7Pl",
    ]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-overview",
            title: "Acquirer Benchmarking - Channel Overview",
            type: ""
        }
    });
});
