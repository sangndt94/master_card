// (C) 2019 GoodData Corporation
import { t } from "testcafe";
import {loginAutoTestUserAndNavigate} from "../helpers/fixtureWithLogin";
import {
    assertAllFiltersExist,
    assertActiveLeftMenuItem,
    navigateTo,
    addFilterValue,
    assertFilterValue,
    assertAllKpiBlocksExist,
    assertAllVisualizationBlocksExist,
    clearAll,
    getFilterById,
    getFilterItems,
    waitForChildFilterLoading,
    expectSingleDashboardContent,
    assertDataLayersExists,
} from "../helpers/pageUtils";

loginAutoTestUserAndNavigate("Digital", 1, "digital/overview");

test("should load all filters, kpi's and visualizations on Overview", async () => {
    await assertActiveLeftMenuItem("OVERVIEW");
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["issuerIca"]);
    await assertAllKpiBlocksExist(["ab6uAXwQixpy", "aaQuE4QWdqJB", "aaSuE0dnbvYz", "ab8uynxYcKXj", "acHuAUa0aDRm", "abLuCGpKeZ9T"]);
    await assertAllVisualizationBlocksExist(["aap3N4qBbJVj", "abV6b5qVdEly", "ac759yQKc631", "ac66aGhJdsKW",
        "ac76ca5kgA8A", "aaSNcHlEieJJ", "aaYNez8xcbcj", "abMNcOYgii6b"]);

    await navigateTo("digital/fraud-scorecard");
    await assertActiveLeftMenuItem("FRAUD SCORECARD");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/fraud-scorecard",
            title: "Digital - Fraud Scorecard",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["acCRhM6bdhbp", "aalRBX4RaOcm", "aaZRmAAxc3Ni", "abdRzxODbMny",
        "aaqRuvP0ivE2", "aaeRB4TLdg6M", "aanRuHGmdwy7", "aaNRzqTwhGSv"]);

    await navigateTo("digital/digital-wallet-analysis");
    await assertActiveLeftMenuItem("DIGITAL WALLET ANALYSIS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/digital-wallet-analysis",
            title: "Digital - Digital Wallet Analysis",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "merchantRegionAndName_parent", "merchantRegionAndName_child", "month", "valueBand", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["abSSB33YcCBi", "aavIaGzlalHj", "abkSMfcGhuh7", "aasSPmCIdhWD", "adlSJELtcr9l"]);

    await navigateTo("digital/tokenized-remote-commerce");
    await assertActiveLeftMenuItem("TOKENIZED REMOTE COMMERCE");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/tokenized-remote-commerce",
            title: "Digital - Tokenized Remote Commerce",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "merchantRegionAndName_parent", "merchantRegionAndName_child", "month", "valueBand", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aaNH7BGzbKAz", "aauH7Ou7geTj", "aagH7qTUclDL", "abuH8aHJfgz9", "abRH7xtCbKOF"]);

    await navigateTo("digital/transaction-channel");
    await assertActiveLeftMenuItem("TRANSACTION CHANNEL");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/transaction-channel",
            title: "Digital - Transaction Channel",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "merchantRegionAndName_parent", "merchantRegionAndName_child", "month", "valueBand", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["abrIDA3vc30b", "aalUxNcXgEN8", "acaIBDL1aUpA", "aaUX7xdDb08u", "aaeX988vaWcR", "aaiX9Tv3e8qb"]);

    await navigateTo("digital/transaction-value");
    await assertActiveLeftMenuItem("TRANSACTION VALUE");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/transaction-value",
            title: "Digital - Transaction Value",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aaQX9GFBha2V", "abXX6BcGgbYO", "abYYmDvpfAmC", "acl6iDpceHeW",
    "adi6goMEamJE", "acL6liEgfGwT", "abz6oMfcaxN0"]);

    await navigateTo("digital/merchant-detail");
    await assertActiveLeftMenuItem("MERCHANT DETAIL");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/merchant-detail",
            title: "Digital - Merchant Detail",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent", "transactionTypeAndDetail_child",
        "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aaL5wC5Jgd59", "aaL5wC5Jgd59", "abg5vBM4fVoz", "aa05wc0dg7eM", "acB5uf1TfQOA"]);
});

test("should load all filters, kpi's and visualizations on Provisioning Messages", async () => {
    await navigateTo("digital/provisioning-messages");
    await assertActiveLeftMenuItem("PROVISIONING MESSAGES");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/provisioning-messages",
            title: "Digital - Provisioning Messages",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "month", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aar5AHcuasEM", "abr88VVKe9oh", "aaM89Jo6fKvq", "aac9hkzwhZ9i"]);

    await navigateTo("digital/wallet-provider-recommendations-issuer-decision");
    await assertActiveLeftMenuItem("WALLET PROVIDER RECOMMENDATIONS & ISSUER DECISION");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/wallet-provider-recommendations-issuer-decision",
            title: "Digital - Wallet Provider Recommendations & Issuer Decision",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "month", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aag9jsqMfl9A", "abJ9hTqLdvVS", "abn9h0I0ddsN", "aaW9jP3ebX15"]);

    await navigateTo("digital/yellow-path-account-device-score");
    await assertActiveLeftMenuItem("YELLOW PATH – ACCOUNT & DEVICE SCORE");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/yellow-path-account-device-score",
            title: "Digital - Yellow Path – Account & Device Score",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "tokenRequestor", "month", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aaJ9rMMHdXPW", "aaX9o0WKfPun", "aar9n9mNcBWK", "aaM9oTEEbv1O",
        "aby9oYtXcBCV", "abi9pvVdgrIr", "aby9jj4Ah5k1", "aaZ9oiQycFnF"]);

    await navigateTo("digital/yellow-path-recommendation-reasons");
    await assertActiveLeftMenuItem("YELLOW PATH – RECOMMENDATION REASONS");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/yellow-path-recommendation-reasons",
            title: "Digital - Yellow Path – Recommendation Reasons",
            type: ""
        }
    });
    await expectSingleDashboardContent();
    await assertAllFiltersExist(["wallet", "reasonType", "month", "issuerRegionAndCountry_parent",
        "issuerRegionAndCountry_child", "productType"]);
    await assertAllVisualizationBlocksExist(["aa89oZ6wcYPR", "aaQ9rXoCd8ET", "aaLn6u3mbwu2"]);
});

test("should retain filter values on Fraud Scorecard", async () => {
    await navigateTo("digital/fraud-scorecard");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await navigateTo("digital/digital-wallet-analysis");
    await assertFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("productType", "CR");
    await clearAll();
    await t.expect(getFilterById("productType").find(".s-filter-multi-value").exists).eql(false);
    await t.expect(getFilterById("issuerRegionAndCountry_child").find(".s-filter-multi-value").exists).eql(false);
});

test("should apply parent child filter on Fraud Scorecard", async () => {
    await navigateTo("digital/fraud-scorecard");
    await t.expect(await getFilterItems("issuerRegionAndCountry_parent")).contains("US");
    await t.expect(await getFilterItems("issuerRegionAndCountry_child")).contains("UNITED STATES");
    const transactionsDetail = await getFilterItems("transactionTypeAndDetail_child");
    await t.expect(transactionsDetail.length > 0).ok();
    await addFilterValue("transactionTypeAndDetail_parent", "Other");
    await waitForChildFilterLoading("transactionTypeAndDetail_child");
    const transactionsDetailAfterChanging = await getFilterItems("transactionTypeAndDetail_child");
    await t
        .expect(transactionsDetailAfterChanging.length)
        .eql(1, "Parent filter do not affect to child filter");
});
