// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { t } from "testcafe";
import {
    assertVisualizationExists,
    assertActiveLeftMenuItem,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    hasLegend,
    getAxisTitle,
    getVisualizationByIdentifier,
    assertDefaultValueAllFilters,
    navigateTo,
    clearAll,
    assertTooltipOfVisualizationExists,
} from "../helpers/pageUtils";

async function assertVisualizationsHaveLegend(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        await t
            .expect(await hasLegend(await getVisualizationBlockByIdentifier(visualizationIdentifiers[i])))
            .notOk(`${visualizationIdentifiers[i]} should\'t have legend`);
    }
}

async function assertVisualizationsHaveXAxis(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        await t
            .expect(await hasXAxesTitle(visualizationIdentifiers[i]))
            .ok(`${visualizationIdentifiers[i]} has item`);
    }
}

async function hasXAxesTitle(visualizationIdentifier) {
    const title = await getAxisTitle(await getVisualizationBlockByIdentifier(visualizationIdentifier));
    return title === "​" || title === "​​"; //Empty titles is &#8203; or &#8203;&#8203;
}

export const assertAllVisualizationsExistWithQONQTitle = async identifiers => {
    for (let i = 0; i < identifiers.length; i++) {
        const visualization = await getVisualizationByIdentifier(identifiers[i]);
        await assertVisualizationExists(identifiers[i]);
        await t
            .expect(await visualization.find(".s-lastMeasure").textContent)
            .eql("QONQ");
    }
};

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.POS EMV chip - e2e", 1, "fii/pos-emv-chip");

test("should render correctly at POS EMV CHIP", async () => {
    await assertActiveLeftMenuItem("POS EMV CHIP");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup", "issuerMultiRegion"]);
    await waitForLoading(getVisualizationBlockByIdentifier("aaW69azrhq2c"));
    await assertTooltipOfVisualizationExists("aaW69azrhq2c", "ISS REGION");
    await assertVisualizationsHaveLegend(["aaW69azrhq2c"]);
    await assertVisualizationsHaveXAxis(["aaE7aV3We2YP"]);
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
});

test("should render correctly at CONTACTLESS ANALYSIS", async () => {
    await navigateTo("fii/contactless-analysis");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("CONTACTLESS ANALYSIS");
    await waitForLoading(await getVisualizationByIdentifier("ab3oEOhJfnOg"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveXAxis(["adaoR6lFanbu", "ab3oEOhJfnOg"]);
    await assertVisualizationsHaveLegend(["aaioF3Jzei7r", "aauoHbXNglHn", "ad4oR7rwbUDf"]);
});

test("should render correctly at AUTOMATIC FUEL DISPENSER - ISSUER REGION", async () => {
    await navigateTo("fii/automatic-fuel-dispenser-issuer-region");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ISSUER REGION");
    await waitForLoading(getVisualizationBlockByIdentifier("aaDTiClBc5KK"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["abWoWi1Se6vD", "afcoWduRe54A"]);
    await assertVisualizationsHaveXAxis(["abWoWi1Se6vD", "aaDTiClBc5KK"]);
});

test("should render correctly at AUTOMATIC FUEL DISPENSER - ACQUIRER REGION", async () => {
    await navigateTo("fii/automatic-fuel-dispenser-acquirer-region");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ACQUIRER REGION");
    await waitForLoading(getVisualizationBlockByIdentifier("adZsmkdBhQcu"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["aaWvkHcwevnW", "acsvh35yezOX",
        "aaIvooUbhlc4", "ae2oWYeyhhBt", "aaKo4SXlfaEK"]);
});

test("should render correctly at CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)", async () => {
    await navigateTo("fii/cardholder-activated-terminal-non-atm-afd");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaMBce6mdWnz"));
    await assertVisualizationsHaveXAxis(["aaMBce6mdWnz", "aaZBanMzbcQD"]);
    await assertVisualizationsHaveLegend(["aaMBce6mdWnz", "aaZBanMzbcQD"]);
});

test("should render correctly at ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)", async () => {
    await navigateTo("fii/atm-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await waitForLoading(getVisualizationBlockByIdentifier("aczFWnTMdFw9"));
    await assertVisualizationsHaveXAxis(["aamDmVNCcKGN", "aczFWnTMdFw9"]);
    await assertVisualizationsHaveLegend(["acTBJN14hRHS", "aaXDhp0Vdz5X",
        "aamDmVNCcKGN", "aczFWnTMdFw9", "aaODlZxgfxYR", "aa3DmeA2aJLb"]);
});

test("should render correctly at POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)", async () => {
    await navigateTo("fii/pos-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaoGbOvJhi19"));
    await assertVisualizationsHaveXAxis(["aaoGbOvJhi19", "abgGbDnTdCqc"]);
    await assertVisualizationsHaveLegend(["abLF4hp9gyjq", "abJF4bYDbS4a",
        "aaoGbOvJhi19", "abgGbDnTdCqc", "aciF8OhidEEH", "aalGeitUdHc7"]);
});

test("should render correctly at POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)", async () => {
    await navigateTo("fii/pos-emv-chip-fallback-to-voice-entry-mode-79");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)");
    await waitForLoading(getVisualizationBlockByIdentifier("aeuoWP3Velej"));
    await assertVisualizationsHaveXAxis(["aeuoWP3Velej", "abAAqvzYcuV8"]);
    await assertVisualizationsHaveLegend(["aaEum8CrfQ6h", "abyungC0gBXd",
        "aeuoWP3Velej", "abAAqvzYcuV8", "aa4uv6k6h4PG", "aaSArLZohK6z"]);
});

test("should render correctly at POS PAN KEY ENTERED (ENTRY MODE 01)", async () => {
    await navigateTo("fii/pos-pan-key-entered-entry-mode-01");
    await assertDefaultValueAllFilters(["corridor", "cardProductType", "cardProductGroup"]);
    await assertActiveLeftMenuItem("POS PAN KEY ENTERED (ENTRY MODE 01)");
    await waitForLoading(getVisualizationBlockByIdentifier("aa0AB6ifeSlx"));
    await assertVisualizationsHaveXAxis(["aa0AB6ifeSlx", "acmAx7WhbBcS"]);
    await assertVisualizationsHaveLegend(["aa1GAyHteYS9", "acgAvYBOc09y",
        "aa0AB6ifeSlx", "acmAx7WhbBcS", "abzAxvHsb32L", "aaxACPgohALO"]);
});
