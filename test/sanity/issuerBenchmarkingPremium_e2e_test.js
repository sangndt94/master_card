// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    getVisualizationBlockByIdentifier,
    waitForLoading,
    addFilterValueByIndex,
    assertVisualizationsLoadSuccessful,
    removeFilterValueByIndex,
    navigate, assertDataLayersExists
} from "../helpers/pageUtils";

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

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.Fraud Deep Dive - e2e", 1, "issuer-benchmarking-premium/fraud-deep-dive");

test("should load all filters and visualizations", async () => {
    const visualizationIDs = ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"];
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationIDs[0]);
    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(issuer_ICA, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex("creditOrDebitAndProductGroup_parent", 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(region, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(region, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(region, 0);
    await removeFilterValueByIndex(region, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(visualizationBlock);
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters", async () => {
    const visualizationIDs = ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adZpe50Hg6qW"];
    await getVisualizationBlockByIdentifier(visualizationIDs[0]);
    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelSummary, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at e-Commerce / 3DS Deep Dive", async () => {
    const visualizationIDs = ["abnM2fLleBy1", "aayRlHiicFvN", "abdRltERhSCm", "abwRjPnTewPn"];
    await navigate("E-COMMERCE / 3DS DEEP DIVE");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/e-commerce-3-ds-deep-dive",
            title: "Issuer Benchmarking Premium - e-Commerce / 3DS Deep Dive",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(channelDetail, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at Card Present / EMV Deep Dive", async () => {
    const visualizationIDs = ["aabR6doKgzam", "aaQR6lIzaXIQ", "aa8R6F5bbUeH, acmR3I4hfD81"];
    await navigate("CARD PRESENT / EMV DEEP DIVE");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/card-present-emv-deep-dive",
            title: "Issuer Benchmarking Premium - Card Present / EMV Deep Dive",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(issuer_ICA, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at General Overview", async () => {
    const visualizationIDs = ["aaHoRYWtbls8", "aanoXvtLdOfJ", "adMR6zP5fI6P", "abTScKhFhS3X"];
    await navigate("GENERAL OVERVIEW");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/general-overview",
            title: "Issuer Benchmarking Premium - General Overview",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(corridor, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at Channel Overview", async () => {
    const visualizationIDs = ["acnScQBJaVLW", "adzSbT8ThAwd", "acfScu6nbd0Z", "aafSjkyvgv5t"];
    await navigate("CHANNEL OVERVIEW");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/channel-overview",
            title: "Issuer Benchmarking Premium - Channel Overview",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(channelSummary, 0);
    await removeFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(channelSummary, 1);
    await addFilterValueByIndex(channelDetail, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at Channel and Corridor Overview", async () => {
    const visualizationIDs = ["aaFSjKk2bPJn", "aafSlrRKffNv", "abCShowZg3qH", "actSgB7fdaqK"];
    await navigate("CHANNEL AND CORRIDOR OVERVIEW");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/channel-and-corridor-overview",
            title: "Issuer Benchmarking Premium - Channel and Corridor Overview",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(corridor, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});

test("combine all filters at Authorization Decline Rates", async () => {
    const visualizationIDs = ["adZpe50Hg6qW", "aaYSlBxuix3B", "abUSiH21aNMr", "adzSgaLcfoQn"];
    await navigate("AUTHORIZATION DECLINE RATES");
    await assertVisualizationsLoadSuccessful(visualizationIDs);
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/issuer-benchmarking-premium/authorization-decline-rates",
            title: "Issuer Benchmarking Premium - Authorization Decline Rates",
            type: ""
        }
    });

    await addFilterValueByIndex(month, 3);
    await addFilterValueByIndex(month, 2);
    await addFilterValueByIndex(month, 1);
    await addFilterValueByIndex(month, 0);
    await addFilterValueByIndex(issuer_ICA, 0);
    await addFilterValueByIndex(region, 0);
    await addFilterValueByIndex(country, 0);
    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(creditOrDebit, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(cardType, 0);
    await addFilterValueByIndex(corridor, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(corridor, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});
