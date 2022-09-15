// (C) 2019 GoodData Corporation
import { t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { ME, WORLDWIDE, COUNTRY, REGION, PEERS, PEER_BEST_IN_CLASS } from "../helpers/constants";
import {
    applyFilter,
    addFilterValue,
    assertActiveLeftMenuItem,
    getVisualizationBlockByIdentifier,
    selectProject,
    clearAll,
    waitForLoading,
    waitForChildFilterLoading,
    getFilterItems,
    navigate,
    assertDataLayersExists,
    assertVisualizationsLoadSuccessful,
    assertDefaultValueAllFilters,
    assertTooltipExists,
    removeFilterValue
} from "../helpers/pageUtils";
import { hasDataWithLegend } from "../helpers/chartUtils";

const acquirerICA = "cidAndAcquirerIca_child";
const regionID = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const testCid = "100222";
const testIca = "1505 ASSOCIATED BANK  N.A.";

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking.Fraud Summary - e2e",
    1,
    "acquirer-benchmarking-standard/fraud-summary"
);
test("should load all filter, kpi's and visualizations", async () => {
    const visualizationID =  "aaAIniUDfHHp";
    await assertDefaultValueAllFilters(["cidAndAcquirerIca_child", "regionAndCountry_parent", "regionAndCountry_child"]);
    await assertTooltipExists(visualizationID, "Quarter/Year (Period)");
    await assertActiveLeftMenuItem("FRAUD SUMMARY");
    await selectProject(testCid);
    await waitForChildFilterLoading(acquirerICA);
    await addFilterValue(acquirerICA, testIca);
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await addFilterValue(regionID, "UNITED STATES");
    await waitForChildFilterLoading(country);
    await t
        .expect(await getFilterItems(country))
        .contains("UNITED STATES");

    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();

    await clearAll();
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();

    await clearAll();
    await addFilterValue(regionID, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(regionID, "EUROPE");
    await addFilterValue(country, "SWITZERLAND");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await clearAll();
    await addFilterValue(regionID, "UNITED STATES");
    await addFilterValue(regionID, "EUROPE");
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk();

    await clearAll();
    await selectProject("253094 SWISSKEY AG");
    await addFilterValue(regionID, "EUROPE");
    await addFilterValue(country, "SWITZERLAND");
    await addFilterValue(country, "LIECHTENSTEIN");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await clearAll();
    await addFilterValue(regionID, "EUROPE");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await clearAll();
    // check region is a valid peer group MC-390
    await selectProject("100222");
    await addFilterValue(regionID, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk("Country shouldn't be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok("Country should be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
    await addFilterValue(acquirerICA, "1505");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok("Country should be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
});

test("should switch chapter and apply child parent filter correctly", async () => {
    await selectProject(testCid);
    await navigate("CHANNEL SUMMARY");
    await assertActiveLeftMenuItem("CHANNEL SUMMARY");
    await waitForLoading(await getVisualizationBlockByIdentifier("abuIm7ozbn1V"));
    await assertVisualizationsLoadSuccessful(["abuIm7ozbn1V", "abzImZcogZCR", "aa2IpzEnaNZi", "abrIoJW4iuSC",
        "abpInog9eCNj", "aasIuk7rhXa5", "aa9IpkFHaAnb"]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-summary",
            title: "Acquirer Benchmarking - Channel Summary",
            type: ""
        }
    });
    await addFilterValue(acquirerICA, testIca);
    await addFilterValue(regionID, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await navigate("CHANNEL OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("ab5It7l1fPKo"));
    await assertVisualizationsLoadSuccessful(["ab5It7l1fPKo", "abvIuQIbitNT", "abQIu4tViwp8", "acjIt8x9gOJC",
        "aakIBwGDcibI", "aawIBDo5bcv4", "acMIwz1qaHDq", "acqIv72ohFdU", "abYIOLHYdtb2", "ab7IRsxYh7Pl"]);
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
    await assertVisualizationsLoadSuccessful(["acaIYngsiwul", "abGI1czfcmKC", "abOI18xydNKB", "acIIYjXieA05",
        "abSI0WSximSz", "abRI0UI2fAJw", "abJI1ditaI3K", "ac9I0ZINfvPy", "adPIYnJuh7ku", "abgI4bRtcX2h", "adjI0N40a1mC",
        "adHI048jaOzd", "acQI2FfZcI4U", "ab8I4LKucukZ", "adQI04qDfCjD", "adlI3KTUdl2R", "aaPI7B4SarRq", "abSI56qHdGsf"]);
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
    await assertVisualizationsLoadSuccessful(["aaeJCf0Qg80t", "adoJwjR9bWfp", "aaAJCgAEhrUx", "aaSJBCbTcfjc", "aajJDBoSgV7w",
        "aa1JBEyhggMj", "aaXJA5KRfYg8", "abEJAk5Egt0N"]);
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
    await selectProject(testCid);
    await navigate("TOP MERCHANT CLASSIFICATIONS");
    await waitForLoading(await getVisualizationBlockByIdentifier("aaTFyhcLgZG5"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/top-merchant-classifications",
            title: "Acquirer Benchmarking - Top Merchant Classifications",
            type: ""
        }
    });
    await waitForChildFilterLoading(acquirerICA);
    await addFilterValue(acquirerICA, testIca);
    await addFilterValue(regionID, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue("quarterYear", "Q2/2019");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier("aaTFyhcLgZG5"));
    await assertVisualizationsLoadSuccessful(["aaeR0R03h386", "acmSp3oUhMY8", "aarFcm86fPIX", "aaTFyhcLgZG5"]);
    await navigate("CHANNEL OVERVIEW");
    await waitForLoading(await getVisualizationBlockByIdentifier("ab5It7l1fPKo"));
    await assertVisualizationsLoadSuccessful(["ab5It7l1fPKo", "abvIuQIbitNT", "abQIu4tViwp8", "acjIt8x9gOJC",
        "aakIBwGDcibI", "aawIBDo5bcv4", "acMIwz1qaHDq", "acqIv72ohFdU", "abYIOLHYdtb2", "ab7IRsxYh7Pl"]);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/acquirer-benchmarking-standard/channel-overview",
            title: "Acquirer Benchmarking - Channel Overview",
            type: ""
        }
    });
});
