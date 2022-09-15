// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { t } from "testcafe";
import {
    assertAllVisualizationBlocksExist,
    assertActiveLeftMenuItem,
    isBubbleChart,
    isBarChart,
    isLineChart,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    getVisualizationBlockXAxisLabelByIdentifier,
    addFilterValue, navigateTo, clearAll, isColumnChart, isPieChart,
} from "../helpers/pageUtils";

async function assertBubbleCharts(visualizationIdentifiers) {
    visualizationIdentifiers.forEach(async function (identifier) {
        await t.expect(await isBubbleChart(identifier)).ok(`${identifier} should be a bubble chart`);
    });
}

async function assertBarCharts(visualizationIdentifiers) {
    visualizationIdentifiers.forEach(async function (identifier) {
        await t.expect(await isBarChart(identifier)).ok(`${identifier} should be a bar chart`);
    });
}

async function assertLineCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isLineChart(identifier)).ok(`${identifier} should be a line chart`);
    }
}

async function assertPieCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isPieChart(identifier)).ok(`${identifier} should be a pie chart`);
    }
}

async function assertColumnCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isColumnChart(identifier)).ok(`${identifier} should be a column chart`);
    }
}

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Channel Deep Dive - e2e", 1, "fii/pos-emv-chip");

test("should render correctly at POS EMV CHIP", async () => {
    await assertActiveLeftMenuItem("POS EMV CHIP");
    await waitForLoading(getVisualizationBlockByIdentifier("aaW69azrhq2c"));
    await assertBubbleCharts(["aaW69azrhq2c"]);
    await assertColumnCharts(["aaE7aV3We2YP"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("issuerMultiRegion", "CAN");
    await addFilterValue("issuerMultiRegion", "EUR");
    await addFilterValue("issuerMultiRegion", "US");
    await waitForLoading(getVisualizationBlockByIdentifier("aaW69azrhq2c"));
    await assertAllVisualizationBlocksExist([
        "aaW69azrhq2c",
        "aaE7aV3We2YP"
    ]);
    await clearAll();

});

test("should render correctly at CONTACTLESS ANALYSIS", async () => {
    await navigateTo("fii/contactless-analysis");
    await assertActiveLeftMenuItem("CONTACTLESS ANALYSIS");
    await waitForLoading(getVisualizationBlockByIdentifier("ab3oEOhJfnOg"));
    await assertPieCharts(["ad4oR7rwbUDf"]);
    await assertColumnCharts(["ab3oEOhJfnOg", "aaioF3Jzei7r", "aauoHbXNglHn", "adaoR6lFanbu"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("ab3oEOhJfnOg"));
    await assertAllVisualizationBlocksExist([
        "ad4oR7rwbUDf",
        "ab3oEOhJfnOg",
        "aaioF3Jzei7r",
        "aauoHbXNglHn",
        "adaoR6lFanbu"
    ]);
    await clearAll();
});

test("should render correctly at AUTOMATIC FUEL DISPENSER - ISSUER REGION", async () => {
    await navigateTo("fii/automatic-fuel-dispenser-issuer-region");
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ISSUER REGION");
    await waitForLoading(getVisualizationBlockByIdentifier("afcoWduRe54A"));
    await assertLineCharts(["aaDTiClBc5KK"]);
    await assertColumnCharts(["abWoWi1Se6vD", "afcoWduRe54A"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("afcoWduRe54A"));
    await assertAllVisualizationBlocksExist([
        "aaDTiClBc5KK",
        "abWoWi1Se6vD",
        "afcoWduRe54A"
    ]);
    await clearAll();
});

test("should render correctly at AUTOMATIC FUEL DISPENSER - ACQUIRER REGION", async () => {
    await navigateTo("fii/automatic-fuel-dispenser-acquirer-region");
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ACQUIRER REGION");
    await waitForLoading(getVisualizationBlockByIdentifier("acsvh35yezOX"));
    await assertColumnCharts(["aaWvkHcwevnW", "acsvh35yezOX", "aaIvooUbhlc4", "ae2oWYeyhhBt", "aaKo4SXlfaEK"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("acsvh35yezOX"));
    await assertAllVisualizationBlocksExist([
        "aaWvkHcwevnW",
        "acsvh35yezOX",
        "aaIvooUbhlc4",
        "ae2oWYeyhhBt",
        "aaKo4SXlfaEK"
    ]);
    await clearAll();
});

test("should render correctly at CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)", async () => {
    await navigateTo("fii/cardholder-activated-terminal-non-atm-afd");
    await assertActiveLeftMenuItem("CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaMBce6mdWnz"));
    await assertBarCharts(["aaMBce6mdWnz", "aaZBanMzbcQD"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("aaZBanMzbcQD"));
    await assertAllVisualizationBlocksExist([
        "aaMBce6mdWnz",
        "aaZBanMzbcQD"
    ]);
    await clearAll();
});

test("should render correctly at ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)", async () => {
    await navigateTo("fii/atm-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertActiveLeftMenuItem("ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await waitForLoading(getVisualizationBlockByIdentifier("aamDmVNCcKGN"));
    await assertLineCharts(["aamDmVNCcKGN", "aczFWnTMdFw9"]);
    await assertColumnCharts(["acTBJN14hRHS", "aaXDhp0Vdz5X", "aaODlZxgfxYR", "aa3DmeA2aJLb"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("aamDmVNCcKGN"));
    await assertAllVisualizationBlocksExist([
        "aamDmVNCcKGN",
        "aczFWnTMdFw9",
        "acTBJN14hRHS",
        "aaXDhp0Vdz5X",
        "aaODlZxgfxYR",
        "aa3DmeA2aJLb"
    ]);
    await clearAll();
});

test("should render correctly at POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)", async () => {
    await navigateTo("fii/pos-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaoGbOvJhi19"));
    await assertLineCharts(["aaoGbOvJhi19", "abgGbDnTdCqc"]);
    await assertColumnCharts(["abLF4hp9gyjq", "abJF4bYDbS4a", "aciF8OhidEEH", "aalGeitUdHc7"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("aaoGbOvJhi19"));
    await assertAllVisualizationBlocksExist([
        "aaoGbOvJhi19",
        "abgGbDnTdCqc",
        "abLF4hp9gyjq",
        "abJF4bYDbS4a",
        "aciF8OhidEEH",
        "aalGeitUdHc7"
    ]);
    await clearAll();
});

test("should render correctly at POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)", async () => {
    await navigateTo("fii/pos-emv-chip-fallback-to-voice-entry-mode-79");
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaEum8CrfQ6h"));
    await assertLineCharts(["aeuoWP3Velej", "abAAqvzYcuV8"]);
    await assertColumnCharts(["aaEum8CrfQ6h", "abyungC0gBXd", "aa4uv6k6h4PG", "aaSArLZohK6z"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("aaEum8CrfQ6h"));
    await assertAllVisualizationBlocksExist([
        "aeuoWP3Velej",
        "abAAqvzYcuV8",
        "aaEum8CrfQ6h",
        "abyungC0gBXd",
        "aa4uv6k6h4PG",
        "aaSArLZohK6z"
    ]);
    await clearAll();
});

test("should render correctly at POS PAN KEY ENTERED (ENTRY MODE 01)", async () => {
    await navigateTo("fii/pos-pan-key-entered-entry-mode-01");
    await assertActiveLeftMenuItem("POS PAN KEY ENTERED (ENTRY MODE 01)");
    await waitForLoading(getVisualizationBlockByIdentifier("aa0AB6ifeSlx"));
    await assertLineCharts(["aa0AB6ifeSlx", "acmAx7WhbBcS"]);
    await assertColumnCharts(["aa1GAyHteYS9", "acgAvYBOc09y", "abzAxvHsb32L", "aaxACPgohALO"]);
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductGroup", "CREDIT COMMERCIAL");
    await addFilterValue("cardProductGroup", "CREDIT CONSUMER STANDARD");
    await waitForLoading(getVisualizationBlockByIdentifier("aa0AB6ifeSlx"));
    await assertAllVisualizationBlocksExist([
        "aa0AB6ifeSlx",
        "acmAx7WhbBcS",
        "aa1GAyHteYS9",
        "acgAvYBOc09y",
        "abzAxvHsb32L",
        "aaxACPgohALO"
    ]);
    await clearAll();
});
