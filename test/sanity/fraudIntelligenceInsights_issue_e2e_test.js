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
    isColumnChart,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    getVisualizationBlockXAxisLabelByIdentifier,
    navigate, assertDefaultValueAllFilters,
    addFilterValue,
    waitForChildFilterLoading, getVisualizationBlockTitleByIdentifier
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

async function assertLineChartsWithIndexed(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        const labels = await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t
            .expect(await isLineChart(identifier)).ok(`${identifier} should be a line chart`)
            .expect(labels.length)
            .eql(8)
            .expect(await isSameValueAtFirstTracker(identifier))
            .ok(identifier + " should be indexed")
            .expect(await getVisualizationBlockTitleByIdentifier(identifier))
            .contains("INDEXED");
    }
}

async function assertLineChartsWithOutIndexed(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        const labels = await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t
            .expect(await isLineChart(identifier)).ok(`${identifier} should be a line chart`)
            .expect(labels.length)
            .eql(8)
            .expect(await isSameValueAtFirstTracker(identifier))
            .notOk(identifier + " should be indexed")
            .expect(await getVisualizationBlockTitleByIdentifier(identifier))
            .notContains("INDEXED");
    }
}

async function assertColumnCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isColumnChart(identifier)).ok(`${identifier} should be a column chart`);
    }
}

async function isSameValueAtFirstTracker(visualizationIdentifier) {
    const visualization = await getVisualizationBlockByIdentifier(visualizationIdentifier);
    const trackers = await visualization.find(".highcharts-tracker");
    for (let i = 1; i < await trackers.count - 1; i++) {
        if (await visualization.find(`.highcharts-tracker.highcharts-series-${i} path`).nth(0).getAttribute("d") !==
            await visualization.find(`.highcharts-tracker.highcharts-series-${i - 1} path`).nth(0).getAttribute("d")) {
            return false;
        }
    }
    return true;
}

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Issuer Executive Summary - e2e", 1, "fii/global-fraud-overview");

test("should render correctly at Global Fraud Overview", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await waitForLoading(getVisualizationBlockByIdentifier("ab1rrKT1driD"));
    await assertBubbleCharts(["abArrCKBer3Q", "ab4rqn5Bg5nx", "ab0rpMsLaiiG", "aaerxMNCelkW"]);
    await assertBarCharts(["ab1rrKT1driD", "abZrsVsndeAw", "adHrq72XaKtS", "aa6rxeohbcwT"]);
    await t.expect(await isTreemapChart("aacrErGgfKYH")).ok();
    await assertLineChartsWithIndexed(["abIrDsdsanpX", "aaXrGNFsfdk6", "abQrDp85h4Ho"]);
    await assertLineChartsWithOutIndexed(["aaorEnCGeGwW", "aaRrC5PThdpj", "aavrDR86fwNd"]);
});

test("should render correctly at Gross Fraud BPS", async () => {
    await navigate("GROSS FRAUD BPS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("aaEVp6ZkakP4"));
    await assertLineChartsWithIndexed(["aansREeXivDu"]);
    await assertLineChartsWithOutIndexed(["abesOpXvaF2z"]);
    await assertBarCharts(["aaEVp6ZkakP4", "aaWVoMF1hIdQ", "aaDVqypTc8Kf"]);
});

test("should render correctly at Net Fraud BPS", async () => {
    await navigate("NET FRAUD BPS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("acxVwN5Tb8P5"));
    await assertLineChartsWithOutIndexed(["aaYVzz29hod0", "abbVyXnxh19K"]);
    await assertBarCharts(["acxVwN5Tb8P5", "acPVw22lcnMA", "abwVxMjKhogX"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("PANEntryMode", "Chip - Contactless");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductType", "MASTERCARD DEBIT");
    await waitForLoading(getVisualizationBlockByIdentifier("acxVwN5Tb8P5"));
    await assertAllVisualizationBlocksExist([
        "ad6sm6VWfdSO", "aaYVzz29hod0", "abbVyXnxh19K", "acxVwN5Tb8P5", "acPVw22lcnMA", "abwVxMjKhogX"
    ]);
});

test("should render correctly at CORRIDORS", async () => {
    await navigate("CORRIDORS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("CORRIDORS");
    await waitForLoading(getVisualizationBlockByIdentifier("aaxVFuLwfxpz"));
    await assertLineChartsWithOutIndexed(["acRVxgGLcijU", "aaeVFxCXfHQx", "aaxVFuLwfxpz"]);
    await assertBarCharts(["aaeVKfZsgrJl", "aaeVK46igHAe", "aalVK37BbYyQ"]);
    await assertColumnCharts(["aeaVFms4f7qJ", "acrVHgr8fUZf", "abaVLwavcmff"]);
    await assertAllVisualizationBlocksExist([
        "acRVxgGLcijU", "aaeVFxCXfHQx", "aaxVFuLwfxpz", "aaeVKfZsgrJl", "aaeVK46igHAe",
        "aalVK37BbYyQ", "aeaVFms4f7qJ", "acrVHgr8fUZf", "abaVLwavcmff"
    ]);
});

test("should render correctly at PRODUCTS", async () => {
    await navigate("PRODUCTS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("PRODUCTS");
    await waitForLoading(getVisualizationBlockByIdentifier("ab7VGr9lf2p8"));
    await assertLineChartsWithOutIndexed(["acoVARa2g3MJ", "ac6VyIPJgxUc"]);
    await assertBarCharts(["ab5VGZYZhBCL", "ab7VGr9lf2p8"]);
    await assertColumnCharts(["aaTVMa4QhLZd", "aaRVMaXMeqy6"]);
    await assertAllVisualizationBlocksExist([
        "acoVARa2g3MJ", "ac6VyIPJgxUc", "ab5VGZYZhBCL", "ab7VGr9lf2p8", "aaTVMa4QhLZd", "aaRVMaXMeqy6"
    ]);
});

test("should render correctly at CHANNELS", async () => {
    await navigate("CHANNELS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("CHANNELS");
    await waitForLoading(getVisualizationBlockByIdentifier("abKVG65YhiQv"));
    await assertLineChartsWithOutIndexed(["aafVGBvIaHxd", "aaZVFxCXfHQx"]);
    await assertBarCharts(["acrVF7jDaRPf", "abKVG65YhiQv"]);
    await assertColumnCharts(["aaiVOWDGbPJH", "afgVFxnQgdhk"]);
    await assertAllVisualizationBlocksExist([
        "aafVGBvIaHxd", "aaZVFxCXfHQx", "acrVF7jDaRPf", "abKVG65YhiQv", "aaiVOWDGbPJH", "afgVFxnQgdhk"
    ]);
});
