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
    navigate,
    getVisualizationByIdentifier,
    assertDataLayersExists,
    assertDefaultValueAllFilters,
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

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Issuer Executive Summary - e2e", 1, "fii/global-fraud-overview");

test("should render correctly at Global Fraud Overview", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await waitForLoading(getVisualizationBlockByIdentifier("ab1rrKT1driD"));
    await assertVisualizationsHaveLegend(["abArrCKBer3Q", "ab4rqn5Bg5nx", "ab0rpMsLaiiG", "aaerxMNCelkW",
        "ab1rrKT1driD", "abZrsVsndeAw", "adHrq72XaKtS", "aa6rxeohbcwT", "aaorEnCGeGwW",
        "aaRrC5PThdpj", "aavrDR86fwNd", "abIrDsdsanpX", "aaXrGNFsfdk6", "abQrDp85h4Ho"]);
    await assertVisualizationsHaveXAxis(["abArrCKBer3Q", "ab4rqn5Bg5nx", "ab0rpMsLaiiG", "aaerxMNCelkW",
        "ab1rrKT1driD", "abZrsVsndeAw", "adHrq72XaKtS", "aa6rxeohbcwT", "aaorEnCGeGwW",
        "aaRrC5PThdpj", "aavrDR86fwNd", "abIrDsdsanpX", "aaXrGNFsfdk6", "abQrDp85h4Ho"]);
});

test("should render correctly at Fraud Deep Dive", async () => {
    await navigate("FRAUD DEEP DIVE");
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await waitForLoading(await getVisualizationByIdentifier("aegslXVtdi9C"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-fraud-deep-dive",
            title: "Fraud Intelligence Insights (FI²) - Fraud Deep Dive",
            type: ""
        }
    });
    await assertAllVisualizationsExistWithQONQTitle(["aegslXVtdi9C", "acysorg1eyQN", "adjsnsqMg79u", "aeCslJaLgfoA",
        "abLsrKuniu3c", "acWsnfnehY80", "adNsp4tLgmYS", "ac0sp20SirwP", "aeNsoe0SfXtU", "adwsn5tqfKju",
        "aacsxNSJdy3Q", "acWsp6NRirzB", "aaEsBnP8dUxC", "acdswZqNhoRC", "aeTsrl4tg3zZ", "aatsBpXvdCEb",
        "abOsxvFDfMtE", "ab6sxzTAaWsd", "acZsDepJgCAJ", "ac8sC7PrgAj0", "abVsDogqfynH", "acNsEkRpinEO",
        "adfsCq9deK3V", "acLsC8WLfPQA", "aaXsN5gnb91X", "aaYsOuLobhqN", "abesMC1Yfcks", "aeAsFgwzgpzd",
        "acdsDklbc3u6", "aawsO3aths82"]);
});

test("should render correctly at Gross Fraud BPS", async () => {
    await navigate("GROSS FRAUD BPS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("aaEVp6ZkakP4"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-gross-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Gross Fraud BPS",
            type: ""
        }
    });
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["abesOpXvaF2z", "aansREeXivDu", "aaEVp6ZkakP4",
        "aaWVoMF1hIdQ", "aaDVqypTc8Kf"]);
    await assertVisualizationsHaveXAxis(["abesOpXvaF2z", "aansREeXivDu", "aaEVp6ZkakP4",
        "aaWVoMF1hIdQ", "aaDVqypTc8Kf"]);
});

test("should render correctly at Net Fraud BPS", async () => {
    await navigate("NET FRAUD BPS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await waitForLoading(getVisualizationBlockByIdentifier("acxVwN5Tb8P5"));
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-net-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Net Fraud BPS",
            type: ""
        }
    });
    await assertAllVisualizationsExistWithQONQTitle(["ad6sm6VWfdSO"]);
    await assertVisualizationsHaveLegend(["aaYVzz29hod0", "abbVyXnxh19K", "acxVwN5Tb8P5",
        "acPVw22lcnMA", "abwVxMjKhogX"]);
    await assertVisualizationsHaveXAxis(["aaYVzz29hod0", "abbVyXnxh19K", "acxVwN5Tb8P5",
        "acPVw22lcnMA", "abwVxMjKhogX"]);
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
});

test("should render correctly at CORRIDORS", async () => {
    await navigate("CORRIDORS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("CORRIDORS");
    await waitForLoading(getVisualizationBlockByIdentifier("acRVxgGLcijU"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["acRVxgGLcijU", "aaeVFxCXfHQx", "aaxVFuLwfxpz",
        "aaeVKfZsgrJl", "aaeVK46igHAe"]);
    await assertVisualizationsHaveXAxis(["acRVxgGLcijU", "aaeVFxCXfHQx", "aaeVKfZsgrJl",
        "aaeVK46igHAe", "aalVK37BbYyQ"]);
});

test("should render correctly at PRODUCTS", async () => {
    await navigate("PRODUCTS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("PRODUCTS");
    await waitForLoading(getVisualizationBlockByIdentifier("ab5VGZYZhBCL"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["acoVARa2g3MJ", "ac6VyIPJgxUc", "ab5VGZYZhBCL", "ab7VGr9lf2p8"]);
    await assertVisualizationsHaveXAxis(["acoVARa2g3MJ", "ac6VyIPJgxUc", "ab5VGZYZhBCL", "ab7VGr9lf2p8"]);
});

test("should render correctly at CHANNELS", async () => {
    await navigate("CHANNELS");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("CHANNELS");
    await waitForLoading(getVisualizationBlockByIdentifier("acrVF7jDaRPf"));
    await assertAllVisualizationsExistWithQONQTitle(["adZsmkdBhQcu"]);
    await assertVisualizationsHaveLegend(["aafVGBvIaHxd", "aaZVFxCXfHQx", "acrVF7jDaRPf","abKVG65YhiQv"]);
    await assertVisualizationsHaveXAxis(["aafVGBvIaHxd", "aaZVFxCXfHQx", "acrVF7jDaRPf","abKVG65YhiQv"]);
});
