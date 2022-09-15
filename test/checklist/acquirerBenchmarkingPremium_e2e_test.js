// (C) 2020 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel } from "../helpers/exportUtils";
import {
    applyFilter,
    addFilterValue,
    removeFilterValue,
    waitForLoading,
    selectProject,
    addFilterValueByIndex,
    getVisualizationBlockByIdentifier,
    switchVisualizationBlockToQuarterly,
    assertVisualizationBlockExists,
    isNoData,
    clearAll,
    navigate,
    switchVisualizationBlockToMonthly,
    getVisualizationBlockByTitle,
    assertDefaultValueAllFilters,
    assertTooltipExists
} from "../helpers/pageUtils";
import fs from "fs";
import {ME, PEERS, PEER_BEST_IN_CLASS, WORLDWIDE, REGION, COUNTRY} from "../helpers/constants";
import {hasDataWithLegend} from "../helpers/chartUtils";

const month = "monthYear";
const issuer_ICA = "cidAndAcquirerIca_child";
const region = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const channelSummary = "channelSummaryCpCnp";
const channelDetail = "channelDetail";
const corridor = "corridor";
const merchantClassification = "merchantClassification";
const productType = "productGroup";
const cardType = "cardType";
const testCid = "100222";
const testIca = "1505 ASSOCIATED BANK  N.A.";

const navGroups = [
    {
        title: "FRAUD DEEP DIVE",
        visualizationIds: ["aaTdGxu8evAY", "abIehajido03", "abafuIird8nB"]
    },
    {
        title: "CHANNEL SUMMARY",
        visualizationIds: ["aasiPlFddI6a", "aa5i1sAac6L9"]
    },
    {
        title: "CHANNEL OVERVIEW",
        visualizationIds: ["abEqeFGXhQ1i", "acoqdjcdhke1", "acQqcRHoemXN"]
    },
    {
        title: "CHANNEL AND CORRIDOR OVERVIEW",
        visualizationIds: ["aadlOY33iuJX", "ab0oHRTNcyMb"]
    },
    {
        title: "CARD PRESENT TECHNOLOGY DEEP DIVE",
        visualizationIds: ["aaWLwRYvbtoA", "abdLV6cQgrqN"]
    },
    {
        title: "CHARGEBACKS DEEP DIVE",
        visualizationIds: ["aaqMrrWqcLQA", "adEMzOjSdSjO", "aa1MG3p4idOc"]
    },
    {
        title: "TOP MERCHANT CLASSIFICATIONS DEEP DIVE",
        visualizationIds: ["acmSp3oUhMY8"]
    }
];

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking Premium.Fraud Deep Dive - e2e",
    1,
    "acquirer-benchmarking-premium/fraud-deep-dive"
);

test("should load all filters, kpi's and visualizations", async t => {
    const visualizationID =  "aaTdGxu8evAY";
    await assertDefaultValueAllFilters(["monthYear", "cidAndAcquirerIca_child", "regionAndCountry_parent",
        "regionAndCountry_child", "channelSummaryCpCnp", "channelDetail", "corridor", "cardType",
        "productGroup", "merchantClassification"]);
    await assertTooltipExists(visualizationID, "Month/Year (Period)");
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject(testCid);
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
    await addFilterValue(issuer_ICA, testIca);
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

    const xAxisLabels = getVisualizationBlockByTitle("GROSS FRAUD RATE (BPS)")
        .find(".highcharts-axis-labels.highcharts-xaxis-labels");
    const xAxisLabelsAfterSwitch = getVisualizationBlockByTitle("GROSS FRAUD RATE (BPS)")
        .find(".highcharts-axis-labels.highcharts-xaxis-labels");
    await waitForLoading(visualization);
    await t
        .expect(xAxisLabels.textContent)
        .match(/([A-z]{3} )[0-9]{4}/);
    await switchVisualizationBlockToQuarterly(visualizationID);
    await assertVisualizationBlockExists("aaAIniUDfHHp");
    await t
        .expect(xAxisLabelsAfterSwitch.textContent)
        .match(/Q[1-4]\/[0-9]{4}/);

    await switchVisualizationBlockToMonthly("aaAIniUDfHHp");
    await addFilterValue(region, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();

    await addFilterValue(region, "EUROPE");
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

    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();

    await removeFilterValue(region, "EUROPE");
    await applyFilter();
    await waitForLoading(visualization);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok();

    await addFilterValue(channelSummary, "CARD PRESENT");
    await addFilterValue(channelDetail, "CP-CAT-ATM");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(cardType, "MASTERCARD");
    await addFilterValue(productType, "CONSUMER CREDIT");
    await addFilterValue(merchantClassification, "QUASI CASH");
    await applyFilter();

    const visualizationIDs = ["aaTdGxu8evAY", "aaKdNWSwg7ba", "abIehajido03", "aapeoONbdOzy", "abafuIird8nB"];
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t
            .expect(await isNoData(visualizationID))
            .notOk();
    }

    await addFilterValueByIndex(month, 10);
    await applyFilter();

    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t
            .expect(await isNoData(visualizationID))
            .notOk();
    }

    await clearAll();
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t
            .expect(await isNoData(visualizationID))
            .notOk();
    }

    await clearAll();
    // check region is a valid peer group MC-390
    await selectProject("100222");
    await addFilterValue(region, "UNITED STATES");
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
    await addFilterValue(issuer_ICA, "1505");
    await applyFilter();
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await t
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok("Country should be showed")
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .ok("Region should be showed");
});

navGroups.forEach(navGroup => {
    if(process.env.MASTERCARD_FI_REPOSITORY_BRANCH === "develop") {
        test(`should export file at ${navGroup.title}`, async t => {
            await enableDownloadForHeadlessChrome(t);
            await navigate(navGroup.title);
            for (const identifier of navGroup.visualizationIds) {
                await t
                    .expect(fs.existsSync(await exportToExcel(identifier, "")))
                    .ok(`Excel file of visualization with id ${identifier} doesn't export`)
                    .expect(fs.existsSync(await exportToCSV(identifier, "")))
                    .ok(`CSV file of visualization with id ${identifier} doesn't export`)
            }
        });
    }
});
