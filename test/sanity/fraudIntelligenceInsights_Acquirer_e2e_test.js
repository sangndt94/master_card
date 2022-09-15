// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { t } from "testcafe";
import {
    assertAllVisualizationBlocksExist,
    assertActiveLeftMenuItem,
    isBubbleChart,
    isTreemapChart,
    isBarChart,
    isLineChart,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    getVisualizationBlockXAxisLabelByIdentifier,
    addFilterValue,
    waitForChildFilterLoading, navigateTo, clearAll, isColumnChart,
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

async function assertColumnCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isColumnChart(identifier)).ok(`${identifier} should be a column chart`);
    }
}

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Acquirer Executive Summary - e2e", 1, "fii/acquirer-global-fraud-overview");

test("should render correctly at Global Fraud Overview", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await waitForLoading(getVisualizationBlockByIdentifier("aa80pvFnbxnf"));
    await assertBubbleCharts(["ae3VTKMYcvEe", "acbVWkWfhn8I", "abRV01DbfVWx", "aa80pvFnbxnf"]);
    await assertBarCharts(["acUVY7qOfBsi", "abXV0to4isdE", "abbV1iHvfT8Q", "abYVZV1lhQ2P"]);
    await t.expect(await isTreemapChart("abtV15MubXQL")).ok();
    await assertLineCharts([
        "ac1VZNKZa6KI",
        "acpV0eJOfuAi",
        "aeaVXWHNfvwU",
        "ac6V0Wl6ecTZ",
        "acBV1qkKfWqb",
        "abBV32Hygb02"
    ]);
});

test("should render correctly at Gross Fraud BPS", async () => {
    await navigateTo("fii/acquirer-gross-fraud-bps");
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("abN6dSstcStU"));
    await assertLineCharts(["abE2019Hguyx", "abN6dSstcStU"]);
    await assertBarCharts(["acq20NhPcKV9", "acA20HvGcZ5A", "aay25w5tevsC"]);
});

test("should render correctly at Net Fraud BPS", async () => {
    await navigateTo("fii/acquirer-net-fraud-bps");
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("aaJ6lukSh0IB"));
    await assertLineCharts(["acb6br92grfP", "abT6d4gFdxSz"]);
    await assertBarCharts(["ab06fJhyeaJs", "aaJ6lukSh0IB"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("creditOrDebit", "CR");
    await addFilterValue("PANEntryMode", "Chip - Contact");
    await addFilterValue("PANEntryMode", "Chip Fallback - Mag Stripe");
    await waitForLoading(getVisualizationBlockByIdentifier("aaJ6lukSh0IB"));
    await assertAllVisualizationBlocksExist([
        "acb6br92grfP",
        "abT6d4gFdxSz",
        "ab06fJhyeaJs",
        "aaJ6lukSh0IB"
    ]);
    await clearAll();
});

test("should render correctly at CORRIDORS", async () => {
    await navigateTo("fii/acquirer-corridor");
    await assertActiveLeftMenuItem("CORRIDORS");
    await waitForLoading(getVisualizationBlockByIdentifier("ab13cUSxcSwm"));
    await assertLineCharts(["aaE27OZlfqe8", "ac922eMQdeVk", "aah295SAbrYd"]);
    await assertBarCharts(["aaz3e7i7cJJp", "abf3cX7binPv", "ab13cUSxcSwm"]);
    await assertColumnCharts(["aa33eIwDdyCq", "aaC3fKlZinlO", "abY3cSGzinCF"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("creditOrDebit", "CR");
    await addFilterValue("PANEntryMode", "Chip - Contact");
    await addFilterValue("PANEntryMode", "Chip Fallback - Mag Stripe");
    await waitForLoading(getVisualizationBlockByIdentifier("ab13cUSxcSwm"));
    await assertAllVisualizationBlocksExist([
        "aaE27OZlfqe8",
        "ac922eMQdeVk",
        "aah295SAbrYd",
        "aaz3e7i7cJJp",
        "abf3cX7binPv",
        "ab13cUSxcSwm",
        "aa33eIwDdyCq",
        "aaC3fKlZinlO",
        "abY3cSGzinCF"
    ]);
    await clearAll();
});

test("should render correctly at PRODUCTS", async () => {
    await navigateTo("fii/acquirer-products");
    await assertActiveLeftMenuItem("PRODUCTS");
    await waitForLoading(getVisualizationBlockByIdentifier("acX25vhXfLsb"));
    await assertLineCharts(["abO25kPKireZ", "aaq28mcFgQzr"]);
    await assertBarCharts(["ac224MFfef4y", "acX25vhXfLsb"]);
    await assertColumnCharts(["adt25mjyirgv", "aaq3co4Mg6nJ"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("creditOrDebit", "CR");
    await addFilterValue("PANEntryMode", "Chip - Contact");
    await addFilterValue("PANEntryMode", "Chip Fallback - Mag Stripe");
    await waitForLoading(getVisualizationBlockByIdentifier("acX25vhXfLsb"));
    await assertAllVisualizationBlocksExist([
        "abO25kPKireZ",
        "aaq28mcFgQzr",
        "ac224MFfef4y",
        "acX25vhXfLsb",
        "adt25mjyirgv",
        "aaq3co4Mg6nJ"
    ]);
    await clearAll();
});

test("should render correctly at CHANNELS", async () => {
    await navigateTo("fii/acquirer-channels");
    await assertActiveLeftMenuItem("CHANNELS");
    await waitForLoading(getVisualizationBlockByIdentifier("aay3a8bkhJqH"));
    await assertLineCharts(["abX247WselWB", "abq25lMFa1hc"]);
    await assertBarCharts(["acO25jmlgjXB", "aay3a8bkhJqH"]);
    await assertColumnCharts(["acE26ZdMgyFC", "acV249LkeHCc"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("creditOrDebit", "CR");
    await addFilterValue("PANEntryMode", "Chip - Contact");
    await addFilterValue("PANEntryMode", "Chip Fallback - Mag Stripe");
    await waitForLoading(getVisualizationBlockByIdentifier("aay3a8bkhJqH"));
    await assertAllVisualizationBlocksExist([
        "abX247WselWB",
        "abq25lMFa1hc",
        "acO25jmlgjXB",
        "aay3a8bkhJqH",
        "acE26ZdMgyFC",
        "acV249LkeHCc"
    ]);
    await clearAll();
});
