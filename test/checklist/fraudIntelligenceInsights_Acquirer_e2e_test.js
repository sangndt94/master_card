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
    getVisualizationByIdentifier, navigateTo, assertDefaultValueAllFilters,
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

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Acquirer Executive Summary - e2e", 1, "fii/acquirer-global-fraud-overview");

test("should render correctly at GLOBAL FRAUD OVERVIEW", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await waitForLoading(getVisualizationBlockByIdentifier("abcsxx3oernH"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu", "acpV68FmiD7E", "aaFsxTdMhCnl", "abcsxx3oernH"]);
    await assertVisualizationsHaveLegend(["acUVY7qOfBsi", "abXV0to4isdE", "abbV1iHvfT8Q", "abYVZV1lhQ2P",
        "ac1VZNKZa6KI", "ac6V0Wl6ecTZ", "acBV1qkKfWqb"]);
    await assertVisualizationsHaveXAxis(["acUVY7qOfBsi", "abXV0to4isdE", "abbV1iHvfT8Q", "abYVZV1lhQ2P",
        "ac1VZNKZa6KI", "ac6V0Wl6ecTZ", "acBV1qkKfWqb"]);
});

test("should render correctly at FRAUD DEEP DIVE", async () => {
    await navigateTo("fii/acquirer-fraud-deep-dive");
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await waitForLoading(await getVisualizationByIdentifier("aau2ZQrIcNvJ"));
    await assertAllVisualizationsExistWithQONQTitle(["aaf1jm8BgNO1", "aaw1iP6YcIRi",
        "abp1h9U6bIyd", "abn1j9tLaYUz", "abW2U0pNcwm7", "aau2ZQrIcNvJ"]);
});

test("should render correctly at GROSS FRAUD BPS", async () => {
    await navigateTo("fii/acquirer-gross-fraud-bps");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "corridor", "creditOrDebit", "PANEntryMode"]);
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("acq20NhPcKV9"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["abE2019Hguyx", "abN6dSstcStU", "acq20NhPcKV9",
        "acA20HvGcZ5A", "aay25w5tevsC"]);
    await assertVisualizationsHaveXAxis(["abE2019Hguyx", "abN6dSstcStU", "acq20NhPcKV9",
        "acA20HvGcZ5A", "aay25w5tevsC"]);
});

test("should render correctly at NET FRAUD BPS", async () => {
    await navigateTo("fii/acquirer-net-fraud-bps");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "corridor", "creditOrDebit", "PANEntryMode"]);
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("ab06fJhyeaJs"));
    await assertAllVisualizationsExistWithQONQTitle(["acpV68FmiD7E"]);
    await assertVisualizationsHaveLegend(["acb6br92grfP", "abT6d4gFdxSz", "ab06fJhyeaJs",
        "aaJ6lukSh0IB"]);
    await assertVisualizationsHaveXAxis(["acb6br92grfP", "abT6d4gFdxSz", "ab06fJhyeaJs",
        "aaJ6lukSh0IB"]);
});

test("should render correctly at CORRIDORS", async () => {
    await navigateTo("fii/acquirer-corridor");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "corridor", "creditOrDebit", "PANEntryMode"]);
    await assertActiveLeftMenuItem("CORRIDORS");
    await waitForLoading(getVisualizationBlockByIdentifier("aah295SAbrYd"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["aaE27OZlfqe8", "ac922eMQdeVk", "aah295SAbrYd",
        "aaz3e7i7cJJp", "abf3cX7binPv"]);
    await assertVisualizationsHaveXAxis(["aaE27OZlfqe8", "ac922eMQdeVk", "aah295SAbrYd",
        "aaz3e7i7cJJp", "abf3cX7binPv"]);
});

test("should render correctly at PRODUCTS", async () => {
    await navigateTo("fii/acquirer-products");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "corridor", "creditOrDebit", "PANEntryMode"]);
    await assertActiveLeftMenuItem("PRODUCTS");
    await waitForLoading(getVisualizationBlockByIdentifier("ac224MFfef4y"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["abO25kPKireZ", "aaq28mcFgQzr", "ac224MFfef4y", "acX25vhXfLsb"]);
    await assertVisualizationsHaveXAxis(["abO25kPKireZ", "aaq28mcFgQzr", "ac224MFfef4y", "acX25vhXfLsb"]);
});

test("should render correctly at CHANNELS", async () => {
    await navigateTo("fii/acquirer-channels");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "corridor", "creditOrDebit", "PANEntryMode"]);
    await assertActiveLeftMenuItem("CHANNELS");
    await waitForLoading(getVisualizationBlockByIdentifier("acO25jmlgjXB"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["abX247WselWB", "abq25lMFa1hc", "acO25jmlgjXB","aay3a8bkhJqH"]);
    await assertVisualizationsHaveXAxis(["abX247WselWB", "abq25lMFa1hc", "acO25jmlgjXB","aay3a8bkhJqH"]);
});
