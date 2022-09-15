// (C) 2019 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    assertAllVisualizationBlocksExist,
    assertAllFiltersExist,
    assertAllVisualizationsExist,
    assertActiveLeftMenuItem,
    navigateTo,
    expectSingleDashboardContent,
    assertDataLayersExists,
} from "../helpers/pageUtils";

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Issuer Executive Summary", 1, "fii/global-fraud-overview");

test("should load all filters, kpi's and visualizations", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist(["adZsmkdBhQcu", "ad6sm6VWfdSO", "aaFsxTdMhCnl", "abcsxx3oernH"]);
    await assertAllVisualizationBlocksExist([
        "abArrCKBer3Q",
        "ab4rqn5Bg5nx",
        "ab0rpMsLaiiG",
        "aaerxMNCelkW",
        "ab1rrKT1driD",
        "abZrsVsndeAw",
        "adHrq72XaKtS",
        "aa6rxeohbcwT",
        "aacrErGgfKYH",
        "aaorEnCGeGwW",
        "aaRrC5PThdpj",
        "aavrDR86fwNd",
        "abIrDsdsanpX",
        "aaXrGNFsfdk6",
        "abQrDp85h4Ho",
    ]);

    await navigateTo("fii/issuer-fraud-deep-dive");
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-fraud-deep-dive",
            title: "Fraud Intelligence Insights (FI²) - Fraud Deep Dive",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist([
        "aegslXVtdi9C",
        "acysorg1eyQN",
        "adjsnsqMg79u",
        "aeCslJaLgfoA",
        "abLsrKuniu3c",
        "acWsnfnehY80",
        "adNsp4tLgmYS",
        "ac0sp20SirwP",
        "aeNsoe0SfXtU",
        "adwsn5tqfKju",
        "aacsxNSJdy3Q",
        "acWsp6NRirzB",
        "aaEsBnP8dUxC",
        "acdswZqNhoRC",
        "aeTsrl4tg3zZ",
        "aatsBpXvdCEb",
        "abOsxvFDfMtE",
        "ab6sxzTAaWsd",
        "acZsDepJgCAJ",
        "ac8sC7PrgAj0",
        "abVsDogqfynH",
        "acNsEkRpinEO",
        "adfsCq9deK3V",
        "acLsC8WLfPQA",
        "aaXsN5gnb91X",
        "aaYsOuLobhqN",
        "abesMC1Yfcks",
        "aeAsFgwzgpzd",
        "acdsDklbc3u6",
        "aawsO3aths82",
    ]);

    await navigateTo("fii/issuer-gross-fraud-bps");
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-gross-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Gross Fraud BPS",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "abesOpXvaF2z",
        "aansREeXivDu",
        "aaEVp6ZkakP4",
        "aaWVoMF1hIdQ",
        "aaDVqypTc8Kf",
    ]);

    await navigateTo("fii/issuer-net-fraud-bps");
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-net-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Net Fraud BPS",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "ad6sm6VWfdSO",
        "aaYVzz29hod0",
        "abbVyXnxh19K",
        "acxVwN5Tb8P5",
        "acPVw22lcnMA",
        "abwVxMjKhogX",
    ]);

    await navigateTo("fii/issuer-corridors");
    await assertActiveLeftMenuItem("CORRIDORS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-corridors",
            title: "Fraud Intelligence Insights (FI²) - Corridors",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "acRVxgGLcijU",
        "aaeVFxCXfHQx",
        "aaxVFuLwfxpz",
        "aaeVKfZsgrJl",
        "aeaVFms4f7qJ",
        "aaeVK46igHAe",
        "acrVHgr8fUZf",
        "aalVK37BbYyQ",
        "abaVLwavcmff",
    ]);

    await navigateTo("fii/issuer-products");
    await assertActiveLeftMenuItem("PRODUCTS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-products",
            title: "Fraud Intelligence Insights (FI²) - Products",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "acoVARa2g3MJ",
        "ac6VyIPJgxUc",
        "ab5VGZYZhBCL",
        "aaTVMa4QhLZd",
        "ab7VGr9lf2p8",
        "aaRVMaXMeqy6",
    ]);

    await navigateTo("fii/issuer-channels");
    await assertActiveLeftMenuItem("CHANNELS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/issuer-channels",
            title: "Fraud Intelligence Insights (FI²) - Channels",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "aafVGBvIaHxd",
        "aaZVFxCXfHQx",
        "acrVF7jDaRPf",
        "aaiVOWDGbPJH",
        "abKVG65YhiQv",
        "afgVFxnQgdhk",
    ]);

    // MC-224 FI2: Hide Iss, Acq Region overview
    // await navigateTo("fii/issuing-region-overview");
    // await assertActiveLeftMenuItem("ISSUING REGION OVERVIEW");
    // await expectSingleDashboardContent();
    // await assertFilterExists("issuerRegion");
    // await assertAllVisualizationsExist(["adZsmkdBhQcu", "ad6sm6VWfdSO", "aaFsxTdMhCnl",
    //     "abcsxx3oernH", "aarFAkzregII"]);
});

loginAutoTestUserAndNavigate(
    "Fraud Intelligence Insights.Acquirer Executive Summary",
    1,
    "fii/acquirer-global-fraud-overview",
);

test("should load all filters, kpi's and visualizations", async () => {
    await assertActiveLeftMenuItem("GLOBAL FRAUD OVERVIEW");
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist(["adZsmkdBhQcu", "acpV68FmiD7E", "aaFsxTdMhCnl", "abcsxx3oernH"]);
    await assertAllVisualizationBlocksExist([
        "ae3VTKMYcvEe",
        "acbVWkWfhn8I",
        "abRV01DbfVWx",
        "aa80pvFnbxnf",
        "acUVY7qOfBsi",
        "abXV0to4isdE",
        "abbV1iHvfT8Q",
        "abYVZV1lhQ2P",
        "abtV15MubXQL",
        "ac1VZNKZa6KI",
        "acpV0eJOfuAi",
        "aeaVXWHNfvwU",
        "ac6V0Wl6ecTZ",
        "acBV1qkKfWqb",
        "abBV32Hygb02",
    ]);

    await navigateTo("fii/acquirer-fraud-deep-dive");
    await assertActiveLeftMenuItem("FRAUD DEEP DIVE");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-fraud-deep-dive",
            title: "Fraud Intelligence Insights (FI²) - Fraud Deep Dive",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllVisualizationsExist([
        "aaf1jm8BgNO1",
        "aaw1iP6YcIRi",
        "aaj1jWQ9fTW6",
        "abP1f2kpepyC",
        "adr1bQODbXkM",
        "ab71goeoit0I",
        "abq1iMi9avPW",
        "abp1h9U6bIyd",
        "abn1j9tLaYUz",
        "aa61h2ztfazX",
        "aae1mAazdg8Z",
        "aaZ1kcl8cmio",
        "abW2U0pNcwm7",
        "aau2ZQrIcNvJ",
        "aeU2QfwqhgLp",
        "aao2ZP9XdUJm",
        "aaZ2XQ4KfFAM",
        "acO2Ud9fgcvO",
        "aaK2XLPefgos",
        "adM2UzQRh5M6",
        "abg2ZOCPdDL5",
        "abh2Yxd6bUh9",
        "aa720DZ1hJIj",
        "aa92YAaRdq5f",
        "acg2Yuv3eVXF",
        "acd2ZBcNdxNH",
        "aaw22a0Ciizw",
        "acZ2YprvgVRE",
        "acz2WxArcfmL",
        "abV2ZEltdr4G",
    ]);

    await navigateTo("fii/acquirer-gross-fraud-bps");
    await assertActiveLeftMenuItem("GROSS FRAUD BPS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-gross-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Gross Fraud BPS",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "creditOrDebit",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "abE2019Hguyx",
        "abN6dSstcStU",
        "acq20NhPcKV9",
        "acA20HvGcZ5A",
        "aay25w5tevsC",
    ]);

    await navigateTo("fii/acquirer-net-fraud-bps");
    await assertActiveLeftMenuItem("NET FRAUD BPS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-net-fraud-bps",
            title: "Fraud Intelligence Insights (FI²) - Net Fraud BPS",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "creditOrDebit",
    ]);
    await assertAllVisualizationBlocksExist([
        "acpV68FmiD7E",
        "acb6br92grfP",
        "abT6d4gFdxSz",
        "ab06fJhyeaJs",
        "aaJ6lukSh0IB",
    ]);

    await navigateTo("fii/acquirer-corridor");
    await assertActiveLeftMenuItem("CORRIDORS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-corridor",
            title: "Fraud Intelligence Insights (FI²) - Corridors",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "creditOrDebit",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "aaE27OZlfqe8",
        "ac922eMQdeVk",
        "aah295SAbrYd",
        "aaz3e7i7cJJp",
        "aa33eIwDdyCq",
        "abf3cX7binPv",
        "aaC3fKlZinlO",
        "ab13cUSxcSwm",
        "abY3cSGzinCF",
    ]);

    await navigateTo("fii/acquirer-products");
    await assertActiveLeftMenuItem("PRODUCTS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-products",
            title: "Fraud Intelligence Insights (FI²) - Products",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "creditOrDebit",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "abO25kPKireZ",
        "aaq28mcFgQzr",
        "ac224MFfef4y",
        "adt25mjyirgv",
        "acX25vhXfLsb",
        "aaq3co4Mg6nJ",
    ]);

    await navigateTo("fii/acquirer-channels");
    await assertActiveLeftMenuItem("CHANNELS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/fii/acquirer-channels",
            title: "Fraud Intelligence Insights (FI²) - Channels",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "creditOrDebit",
    ]);
    await assertAllVisualizationBlocksExist([
        "adZsmkdBhQcu",
        "abX247WselWB",
        "abq25lMFa1hc",
        "acO25jmlgjXB",
        "acE26ZdMgyFC",
        "aay3a8bkhJqH",
        "acV249LkeHCc",
    ]);
});

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Fraud Deep Dive", 1, "fii/issuer-region-fraud-deep-dive");

test("should load all filters, kpi's and visualizations at Fraud Deep Dive", async () => {
    await assertActiveLeftMenuItem("ISSUER REGION FRAUD DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "aaGQFftHe52m",
        "abnQEtdocnYO",
        "abUQE4XAc0Z0",
        "adwQFkHKgkXr",
        "aaTQLs7OcGXa",
        "acpQIJSrf4AB"
    ]);

    await navigateTo("fii/acquirer-region-fraud-deep-dive");
    await assertActiveLeftMenuItem("ACQUIRER REGION FRAUD DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "abpQM6EIdfgA",
        "abr4jaI5bTH6",
        "aaWQNRRjhw2j",
        "aaTQNVA2itSL",
        "adQQIHfzaCFZ",
        "abXQMCEgiCQI"
    ]);

    await navigateTo("fii/pos-entry-mode-deep-dive");
    await assertActiveLeftMenuItem("POS ENTRY MODE DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "aad4px9OcnKl",
        "abu4lZ3JdxXa",
        "aax4pmqFcgpH",
        "abe39LHle8wH"
    ]);

    await navigateTo("fii/channel-deep-dive");
    await assertActiveLeftMenuItem("CHANNEL DEEP DIVE");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "cpCnpAndChannel_parent",
        "cpCnpAndChannel_child",
        "PANEntryMode",
        "corridor",
        "cardProductType",
    ]);
    await assertAllVisualizationBlocksExist([
        "aaD4bio8eTqL",
        "aad4edSpa10l",
        "aaM4aCiCfmNq",
        "ab26f1YQcBRe",
        "aag6oT6NcsJu",
        "aap6n5Tpa0PY",
        "abz6nN4TfCIe"
    ]);

    await navigateTo("fii/card-not-present-address-verification-system-avs");
    await assertActiveLeftMenuItem("CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "channel",
        "cardProductType",
        "cardProductGroup",
        "corridor"
    ]);
    await assertAllVisualizationBlocksExist([
        "aaX6v2xPhRs8",
        "abK6CNaTaJQB",
        "abS6udLge3fa"
    ]);
});

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.Channel Deep Dive", 1, "fii/pos-emv-chip");

test("should load all filters, kpi's and visualizations at Channel Deep Dive", async () => {
    await assertActiveLeftMenuItem("POS EMV CHIP");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup",
        "issuerMultiRegion"
    ]);
    await assertAllVisualizationBlocksExist([
        "aaW69azrhq2c",
        "aaE7aV3We2YP"
    ]);

    await navigateTo("fii/contactless-analysis");
    await assertActiveLeftMenuItem("CONTACTLESS ANALYSIS");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "ab3oEOhJfnOg",
        "aaioF3Jzei7r",
        "aauoHbXNglHn",
        "adaoR6lFanbu",
        "ad4oR7rwbUDf"
    ]);

    await navigateTo("fii/automatic-fuel-dispenser-issuer-region");
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ISSUER REGION");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "abWoWi1Se6vD",
        "aaDTiClBc5KK",
        "afcoWduRe54A"
    ]);

    await navigateTo("fii/automatic-fuel-dispenser-acquirer-region");
    await assertActiveLeftMenuItem("AUTOMATIC FUEL DISPENSER - ACQUIRER REGION");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "aaWvkHcwevnW",
        "acsvh35yezOX",
        "aaIvooUbhlc4",
        "ae2oWYeyhhBt",
        "aaKo4SXlfaEK"
    ]);

    await navigateTo("fii/cardholder-activated-terminal-non-atm-afd");
    await assertActiveLeftMenuItem("CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "aaMBce6mdWnz",
        "aaZBanMzbcQD"
    ]);

    await navigateTo("fii/atm-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertActiveLeftMenuItem("ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "acTBJN14hRHS",
        "aaXDhp0Vdz5X",
        "aamDmVNCcKGN",
        "aczFWnTMdFw9",
        "aaODlZxgfxYR",
        "aa3DmeA2aJLb"
    ]);

    await navigateTo("fii/pos-emv-chip-fallback-to-mag-stripe-entry-mode-80");
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "abLF4hp9gyjq",
        "abJF4bYDbS4a",
        "aaoGbOvJhi19",
        "abgGbDnTdCqc",
        "aciF8OhidEEH",
        "aalGeitUdHc7"
    ]);

    await navigateTo("fii/pos-emv-chip-fallback-to-voice-entry-mode-79");
    await assertActiveLeftMenuItem("POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "aaEum8CrfQ6h",
        "abyungC0gBXd",
        "aeuoWP3Velej",
        "abAAqvzYcuV8",
        "aa4uv6k6h4PG",
        "aaSArLZohK6z"
    ]);

    await navigateTo("fii/pos-pan-key-entered-entry-mode-01");
    await assertActiveLeftMenuItem("POS PAN KEY ENTERED (ENTRY MODE 01)");
    await expectSingleDashboardContent();
    await assertAllFiltersExist([
        "corridor",
        "cardProductType",
        "cardProductGroup"
    ]);
    await assertAllVisualizationBlocksExist([
        "aa1GAyHteYS9",
        "acgAvYBOc09y",
        "aa0AB6ifeSlx",
        "acmAx7WhbBcS",
        "abzAxvHsb32L",
        "aaxACPgohALO"
    ]);
});
