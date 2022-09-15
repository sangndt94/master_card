// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { t } from "testcafe";
import {
    assertActiveLeftMenuItem,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    hasLegend,
    getAxisTitle,
    getVisualizationByIdentifier, assertDefaultValueAllFilters, navigateTo,
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

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Fraud Deep Dive - e2e", 1, "fii/issuer-region-fraud-deep-dive");

test("should render correctly at ISSUER REGION FRAUD DEEP DIVE", async () => {
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("ISSUER REGION FRAUD DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("abUQE4XAc0Z0"));
    await assertVisualizationsHaveXAxis(["adwQFkHKgkXr", "aaTQLs7OcGXa", "acpQIJSrf4AB"]);
});

test("should render correctly at ACQUIRER REGION FRAUD DEEP DIVE", async () => {
    await navigateTo("fii/acquirer-region-fraud-deep-dive");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("ACQUIRER REGION FRAUD DEEP DIVE");
    await waitForLoading(await getVisualizationByIdentifier("adQQIHfzaCFZ"));
    await assertVisualizationsHaveXAxis(["aaTQNVA2itSL", "adQQIHfzaCFZ", "abXQMCEgiCQI"]);

});

test("should render correctly at POS ENTRY MODE DEEP DIVE", async () => {
    await navigateTo("fii/pos-entry-mode-deep-dive");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("POS ENTRY MODE DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("aad4px9OcnKl"));
    await assertVisualizationsHaveLegend(["aad4px9OcnKl", "abu4lZ3JdxXa", "aax4pmqFcgpH"]);
});

test("should render correctly at CHANNEL DEEP DIVE", async () => {
    await navigateTo("fii/channel-deep-dive");
    await assertDefaultValueAllFilters(["cpCnpAndChannel_parent", "cpCnpAndChannel_child", "PANEntryMode", "corridor", "cardProductType"]);
    await assertActiveLeftMenuItem("CHANNEL DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("aaM4aCiCfmNq"));
    await assertVisualizationsHaveLegend(["aaD4bio8eTqL", "aad4edSpa10l", "aaM4aCiCfmNq", "ab26f1YQcBRe",
        "aap6n5Tpa0PY", "abz6nN4TfCIe"]);
    await assertVisualizationsHaveXAxis(["aag6oT6NcsJu", "aap6n5Tpa0PY"]);
});

test("should render correctly at CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)", async () => {
    await navigateTo("fii/card-not-present-address-verification-system-avs");
    await assertDefaultValueAllFilters(["channel", "cardProductType", "cardProductGroup", "corridor"]);
    await assertActiveLeftMenuItem("CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)");
    await waitForLoading(getVisualizationBlockByIdentifier("aaX6v2xPhRs8"));
    await assertVisualizationsHaveXAxis(["aaX6v2xPhRs8", "abK6CNaTaJQB", "abS6udLge3fa"]);
});
