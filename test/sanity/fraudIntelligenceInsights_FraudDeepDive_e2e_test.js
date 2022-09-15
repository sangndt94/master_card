// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import { t } from "testcafe";
import {
    assertAllVisualizationBlocksExist,
    assertActiveLeftMenuItem,
    isTreemapChart,
    isBarChart,
    waitForLoading,
    getVisualizationBlockByIdentifier,
    getVisualizationBlockXAxisLabelByIdentifier,
    addFilterValue,
    waitForChildFilterLoading, navigateTo, clearAll, isColumnChart,
} from "../helpers/pageUtils";

async function assertBarCharts(visualizationIdentifiers) {
    visualizationIdentifiers.forEach(async function (identifier) {
        await t.expect(await isBarChart(identifier)).ok(`${identifier} should be a bar chart`);
    });
}

async function assertColumnCharts(visualizationIdentifiers) {
    for (let i = 0; i < visualizationIdentifiers.length; i++) {
        const identifier = visualizationIdentifiers[i];
        await getVisualizationBlockXAxisLabelByIdentifier(identifier);
        await t.expect(await isColumnChart(identifier)).ok(`${identifier} should be a column chart`);
    }
}

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Fraud Deep Dive - e2e", 1, "fii/issuer-region-fraud-deep-dive");

test("should render correctly at ISSUER REGION FRAUD DEEP DIVE", async () => {
    await assertActiveLeftMenuItem("ISSUER REGION FRAUD DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("abUQE4XAc0Z0"));
    await assertBarCharts(["aaTQLs7OcGXa", "acpQIJSrf4AB"]);
    await assertColumnCharts(["aaGQFftHe52m", "abnQEtdocnYO", "abUQE4XAc0Z0", "adwQFkHKgkXr"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("PANEntryMode", "Chip - Contactless");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductType", "MASTERCARD DEBIT");
    await waitForLoading(getVisualizationBlockByIdentifier("abUQE4XAc0Z0"));
    await assertAllVisualizationBlocksExist([
        "aaTQLs7OcGXa",
        "acpQIJSrf4AB",
        "aaGQFftHe52m",
        "abnQEtdocnYO",
        "abUQE4XAc0Z0",
        "adwQFkHKgkXr"
    ]);
    await clearAll();
});

test("should render correctly at ACQUIRER REGION FRAUD DEEP DIVE", async () => {
    await navigateTo("fii/acquirer-region-fraud-deep-dive");
    await assertActiveLeftMenuItem("ACQUIRER REGION FRAUD DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("aaWQNRRjhw2j"));
    await assertBarCharts(["adQQIHfzaCFZ", "abXQMCEgiCQI"]);
    await assertColumnCharts(["abpQM6EIdfgA", "abr4jaI5bTH6", "aaWQNRRjhw2j", "aaTQNVA2itSL"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("PANEntryMode", "Chip - Contactless");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductType", "MASTERCARD DEBIT");
    await waitForLoading(getVisualizationBlockByIdentifier("aaWQNRRjhw2j"));
    await assertAllVisualizationBlocksExist([
        "adQQIHfzaCFZ",
        "abXQMCEgiCQI",
        "abpQM6EIdfgA",
        "abr4jaI5bTH6",
        "aaWQNRRjhw2j",
        "aaTQNVA2itSL"
    ]);
    await clearAll();
});

test("should render correctly at POS ENTRY MODE DEEP DIVE", async () => {
    await navigateTo("fii/pos-entry-mode-deep-dive");
    await assertActiveLeftMenuItem("POS ENTRY MODE DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("aax4pmqFcgpH"));
    await assertBarCharts(["abu4lZ3JdxXa", "abe39LHle8wH"]);
    await assertColumnCharts(["aad4px9OcnKl", "aax4pmqFcgpH"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("PANEntryMode", "Chip - Contactless");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductType", "MASTERCARD DEBIT");
    await waitForLoading(getVisualizationBlockByIdentifier("aax4pmqFcgpH"));
    await assertAllVisualizationBlocksExist([
        "aad4px9OcnKl",
        "abu4lZ3JdxXa",
        "aax4pmqFcgpH",
        "abe39LHle8wH"
    ]);
    await clearAll();
});

test("should render correctly at CHANNEL DEEP DIVE", async () => {
    await navigateTo("fii/channel-deep-dive");
    await assertActiveLeftMenuItem("CHANNEL DEEP DIVE");
    await waitForLoading(getVisualizationBlockByIdentifier("aaM4aCiCfmNq"));
    await assertBarCharts(["aag6oT6NcsJu", "aap6n5Tpa0PY"]);
    await assertColumnCharts(["aaM4aCiCfmNq", "aaD4bio8eTqL", "aad4edSpa10l", "ab26f1YQcBRe"]);
    await addFilterValue("cpCnpAndChannel_parent", "Card Present");
    await waitForChildFilterLoading("cpCnpAndChannel_child");
    await addFilterValue("cpCnpAndChannel_child", "CP-CAT-AFD");
    await addFilterValue("PANEntryMode", "Chip - Contactless");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductType", "MASTERCARD CREDIT");
    await addFilterValue("cardProductType", "MASTERCARD DEBIT");
    await waitForLoading(getVisualizationBlockByIdentifier("aaM4aCiCfmNq"));
    await assertAllVisualizationBlocksExist([
        "aaD4bio8eTqL",
        "aad4edSpa10l",
        "aaM4aCiCfmNq",
        "ab26f1YQcBRe",
        "aag6oT6NcsJu",
        "aap6n5Tpa0PY"
    ]);
    await t.expect(await isTreemapChart("abz6nN4TfCIe")).ok();
    await clearAll();
});

test("should render correctly at CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)", async () => {
    await navigateTo("fii/card-not-present-address-verification-system-avs");
    await assertActiveLeftMenuItem("CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)");
    await waitForLoading(getVisualizationBlockByIdentifier("abS6udLge3fa"));
    await assertBarCharts(["aaX6v2xPhRs8", "abK6CNaTaJQB", "abS6udLge3fa"]);
    await addFilterValue("channel", "CNP-E-Commerce");
    await addFilterValue("cardProductType", "CIRRUS & MAESTRO");
    await addFilterValue("cardProductGroup", "PREPAID");
    await addFilterValue("corridor", "Domestic");
    await addFilterValue("corridor", "Inter");
    await addFilterValue("corridor", "Intra");
    await waitForLoading(getVisualizationBlockByIdentifier("abS6udLge3fa"));
    await assertAllVisualizationBlocksExist([
        "aaX6v2xPhRs8",
        "abK6CNaTaJQB",
        "abS6udLge3fa"
    ]);
    await clearAll();
});
