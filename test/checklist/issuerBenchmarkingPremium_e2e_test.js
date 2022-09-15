// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    switchVisualizationBlockToQuarterly,
    assertVisualizationBlockExists,
    getVisualizationBlockByIdentifier,
    waitForLoading,
    selectProject,
    addFilterValueByIndex,
    switchVisualizationBlockToMonthly,
    removeFilterValue,
    isNoData,
} from "../helpers/pageUtils";
import { COUNTRY, ME, PEERS, PEER_BEST_IN_CLASS, WORLDWIDE, REGION } from "../helpers/constants";
import { hasDataWithLegend } from "../helpers/chartUtils";

const month = "monthYear";
const issuer_ICA = "cidAndIssuerIca_child";
const region = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const channelSummary = "channelSummaryCpCnp";
const channelDetail = "channelDetail";
const corridor = "corridor";
const creditOrDebit = "creditOrDebitAndProductGroup_parent";
const productType = "creditOrDebitAndProductGroup_child";
const cardType = "cardType";
//Have full data
const anotherCid = "112113 ";
const anotherIca = "18649 SIX PAYMENT SERVICES AG";
const testCid = "100002 ";
const testIca = "1001 CAPITAL ONE BANK (USA)  NATIONAL ASSOCIA";

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Fraud Deep Dive - e2e", 1, "issuer-benchmarking-premium/fraud-deep-dive");

test("should load all filters and visualizations", async t => {
    const visualizationID = "aaHoRYWtbls8";
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationID);
    await selectProject(anotherCid);
    await addFilterValueByIndex(month, 5);
    await addFilterValueByIndex(month, 4);
    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    const xAxisLabels = visualizationBlock.find(".highcharts-axis-labels.highcharts-xaxis-labels");
    const xAxisLabelsAfterSwitch = getVisualizationBlockByIdentifier("ac0CSIq9bc6C").find(
        ".highcharts-axis-labels.highcharts-xaxis-labels",
    );
    await addFilterValue(issuer_ICA, anotherIca);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t.expect(xAxisLabels.textContent).match(/([A-z]{3} )[0-9]{4}/);
    await switchVisualizationBlockToQuarterly(visualizationID);
    await assertVisualizationBlockExists("ac0CSIq9bc6C");
    await t.expect(xAxisLabelsAfterSwitch.textContent).match(/Q[1-4]\/[0-9]{4}/);
    await switchVisualizationBlockToMonthly("ac0CSIq9bc6C");

    await addFilterValue(region, "EUROPE");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        // .expect(await hasDataWithLegend(visualizationID, REGION))
        // .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await addFilterValue(country, "SWITZERLAND");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        // .expect(await hasDataWithLegend(visualizationID, REGION))
        // .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();

    await addFilterValue("creditOrDebitAndProductGroup_parent", "DEBIT");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        // .expect(await hasDataWithLegend(visualizationID, REGION))
        // .ok()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();


    await addFilterValue(region, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();

    await removeFilterValue(region, "UNITED STATES");
    await removeFilterValue(region, "EUROPE");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .ok();

    await addFilterValue(country, "UNITED STATES");
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await t
        .expect(await hasDataWithLegend(visualizationID, WORLDWIDE))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, ME))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, REGION))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, COUNTRY))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEERS))
        .notOk()
        .expect(await hasDataWithLegend(visualizationID, PEER_BEST_IN_CLASS))
        .notOk();
});

test("combine all filters", async t => {
    await selectProject(testCid);
    await getVisualizationBlockByIdentifier("aaHoRYWtbls8");
    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Present");
    await addFilterValue(channelDetail, "CP-CAT-Other");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await applyFilter();

    for (let visualizationID of ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await removeFilterValue(channelSummary, "Card Present");
    await addFilterValue(channelSummary, "Card Not Present");
    await applyFilter();
    for (let visualizationID of ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.e-Commerce / 3DS Deep Dive - e2e", 1,
    "issuer-benchmarking-premium/e-commerce-3-ds-deep-dive");

test("combine all filters", async t => {
    const visualizationIDs = ["abnM2fLleBy1", "aayRlHiicFvN", "abdRltERhSCm", "abwRjPnTewPn"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Not Present");
    await addFilterValue(channelDetail, "CNP-E-Commerce");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await applyFilter();

    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await removeFilterValue(channelDetail, "CNP-E-Commerce");
    await addFilterValue(channelDetail, "CP-PoS");
    await applyFilter();
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Card Present / EMV Deep Dive - e2e", 1,
    "issuer-benchmarking-premium/card-present-emv-deep-dive");

test("combine all filters", async t => {
    const visualizationIDs = ["aabR6doKgzam", "aaQR6lIzaXIQ", "aa8R6F5bbUeH, acmR3I4hfD81"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Present");
    await addFilterValue(channelDetail, "CP-CAT-Other");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await applyFilter();

    for (let visualizationID of ["acmR3I4hfD81", "aaQR6lIzaXIQ", "aabR6doKgzam", "aa8R6F5bbUeH"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await removeFilterValue(issuer_ICA, testIca);
    await addFilterValue(issuer_ICA, "1148 CAPITAL ONE BANK (USA)  NATIONAL ASSOCIA");
    await applyFilter();

    for (let visualizationID of ["aabR6doKgzam", "acmR3I4hfD81", "aa8R6F5bbUeH", "aaQR6lIzaXIQ"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.General Overview - e2e", 1,
    "issuer-benchmarking-premium/general-overview");

test("combine all filters", async t => {
    const visualizationIDs = ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adMR6zP5fI6P", "abTScKhFhS3X"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Present");
    await addFilterValue(channelDetail, "CP-CAT-Other");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await applyFilter();

    for (let visualizationID of ["aaHoRYWtbls8", "aanoXvtLdOfJ", "abTScKhFhS3X"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await t.expect(await isNoData("adMR6zP5fI6P")).ok();

    await removeFilterValue(corridor, "Cross Border");
    await addFilterValue(corridor, "Domestic");
    await applyFilter();

    for (let visualizationID of ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adMR6zP5fI6P"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await t.expect(await isNoData("abTScKhFhS3X")).ok();
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Channel Overview - e2e", 1,
    "issuer-benchmarking-premium/channel-overview");

test("combine all filters", async t => {
    const visualizationIDs = ["acnScQBJaVLW", "adzSbT8ThAwd", "acfScu6nbd0Z", "aafSjkyvgv5t"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Present");
    await addFilterValue(channelDetail, "CP-CAT-Other");
    await addFilterValue(corridor, "Cross Border");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "CONSUMER CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await applyFilter();

    for (let visualizationID of ["adzSbT8ThAwd", "acfScu6nbd0Z", "aafSjkyvgv5t"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }

    await t.expect(await isNoData("acnScQBJaVLW")).notOk();

    await removeFilterValue(channelSummary, "Card Present");
    await removeFilterValue(channelDetail, "CP-CAT-Other");
    await addFilterValue(channelSummary, "Card Not Present");
    await addFilterValue(channelDetail, "CNP-E-Commerce");
    await applyFilter();

    for (let visualizationID of ["acnScQBJaVLW", "acfScu6nbd0Z", "aafSjkyvgv5t"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }

    await t.expect(await isNoData("adzSbT8ThAwd")).notOk();
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Channel and Corridor Overview - e2e", 1,
    "issuer-benchmarking-premium/channel-and-corridor-overview");

test("combine all filters", async t => {
    const visualizationIDs = ["aaFSjKk2bPJn", "aafSlrRKffNv", "abCShowZg3qH", "actSgB7fdaqK"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "CONSUMER CREDIT WORLD ELITE");
    await addFilterValue(cardType, "MASTERCARD");
    await addFilterValue(channelSummary, "Card Not Present");
    await addFilterValue(channelDetail, "CNP-E-Commerce");
    await applyFilter();

    for (let visualizationID of ["aafSlrRKffNv", "actSgB7fdaqK"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    for (let visualizationID of ["aaFSjKk2bPJn", "abCShowZg3qH"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }

    await addFilterValue(corridor, "Cross Border");
    await applyFilter();

    for (let visualizationID of ["aaFSjKk2bPJn", "aafSlrRKffNv", "abCShowZg3qH"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).ok();
    }

    await t.expect(await isNoData("actSgB7fdaqK")).notOk();
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Authorization Decline Rates - e2e", 1,
    "issuer-benchmarking-premium/authorization-decline-rates");

test("combine all filters", async t => {
    const visualizationIDs = ["adZpe50Hg6qW", "aaYSlBxuix3B", "abUSiH21aNMr", "adzSgaLcfoQn"];
    await selectProject(testCid);
    for (let visualizationID of visualizationIDs) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValue(issuer_ICA, testIca);
    await addFilterValue(region, "UNITED STATES");
    await addFilterValue(country, "UNITED STATES");
    await addFilterValue(channelSummary, "Card Not Present");
    await addFilterValue(channelDetail, "CNP-E-Commerce");
    await addFilterValue(creditOrDebit, "CREDIT");
    await addFilterValue(productType, "COMMERCIAL CREDIT");
    await addFilterValue(cardType, "MASTERCARD");
    await addFilterValue(corridor, "Cross Border");
    await applyFilter();

    for (let visualizationID of ["adZpe50Hg6qW", "aaYSlBxuix3B", "adzSgaLcfoQn"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationIDs)).notOk();
    }

    await t.expect(await isNoData("abUSiH21aNMr")).ok();

    await removeFilterValue(corridor, "Cross Border");
    await addFilterValue(corridor, "Domestic");
    await applyFilter();

    for (let visualizationID of ["adZpe50Hg6qW", "aaYSlBxuix3B", "abUSiH21aNMr"]) {
        await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
        await t.expect(await isNoData(visualizationID)).notOk();
    }

    await t.expect(await isNoData("adzSgaLcfoQn")).ok();
});
