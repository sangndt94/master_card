// (C) 2019 GoodData Corporation
import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    getKpiBlockContentByIdentifier,
    getVisualizationValuesBlockByIdentifier,
    getVisualizationBlockXAxisLablesByIdentifier,
    addFilterValue,
    addFilterValueByIndex,
    clearAll,
    applyFilter,
    getSelectedFilters,
    resetChanges,
    navigate,
    getVisualizationBlockByIdentifier,
    removeFilterValueByIndex,
    assertDataLayersExists,
    waitForLoading,
    assertDefaultValueAllFilters,
    assertTooltipExists
} from "../helpers/pageUtils";
import {hasDataWithLegend, hasDataWithLegendWithRect} from "../helpers/chartUtils";
import {
    CONTACTLESS,
    GROSS_FRAUD_BPS,
    IN_APP_E_COMM,
    OTHER,
    PERCENT_APPROVED_CURRENCY,
    PERCENT_FRAUD_CURRENCY,
} from "../helpers/constants";

const testIca = "1001 ";

loginAutoTestUserAndNavigate("Digital.e2e", 1, "digital/overview");

test("should render correctly at Tokenization Transactions Overview", async () => {
    let visualizationID = "aaSNcHlEieJJ";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["issuerIca", "month"]);
    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, PERCENT_APPROVED_CURRENCY))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, PERCENT_FRAUD_CURRENCY))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, GROSS_FRAUD_BPS))
        .ok();

    const applyButton = Selector(".FilterApply");
    let kpiContent, visualizationValues, comparedKpiContent, comparedVisualizationValues;

    kpiContent = await getKpiBlockContentByIdentifier("ab6uAXwQixpy");
    visualizationValues = await getVisualizationValuesBlockByIdentifier("aap3N4qBbJVj");
    await addFilterValue("issuerIca", testIca);
    await applyFilter();
    comparedKpiContent = await getKpiBlockContentByIdentifier("ab6uAXwQixpy");
    comparedVisualizationValues = await getVisualizationValuesBlockByIdentifier("aap3N4qBbJVj");
    await t
        .expect(comparedKpiContent)
        .notEql(kpiContent)
        .expect(comparedVisualizationValues)
        .notEql(visualizationValues);

    const monthItems = await getVisualizationBlockXAxisLablesByIdentifier("aap3N4qBbJVj");
    await removeFilterValueByIndex("issuerIca", 0);
    await addFilterValue("month", monthItems[0]);
    await applyFilter();
    kpiContent = await getKpiBlockContentByIdentifier("ab6uAXwQixpy");
    visualizationValues = await getVisualizationValuesBlockByIdentifier("aap3N4qBbJVj");
    await t
        .expect(kpiContent)
        .notEql(comparedKpiContent)
        .expect(visualizationValues)
        .notEql(comparedVisualizationValues);

    await addFilterValue("month", monthItems[1]);
    await resetChanges();
    await t
        .expect(await getSelectedFilters("month"))
        .notContains(monthItems[1])
        .expect(applyButton.hasAttribute('disabled'))
        .ok("Apply button should be disabled");

    await clearAll();
    await t
        .expect(await getKpiBlockContentByIdentifier("ab6uAXwQixpy"))
        .notEql(kpiContent)
        .expect(await getVisualizationValuesBlockByIdentifier("aap3N4qBbJVj"))
        .notEql(visualizationValues)
        .expect(applyButton.hasAttribute('disabled'))
        .ok("Apply button should be disabled");

    await addFilterValue("month", monthItems[2]);
    await applyFilter();
    await t
        .expect(await getKpiBlockContentByIdentifier("ab6uAXwQixpy"))
        .ok()
        .expect(await getVisualizationValuesBlockByIdentifier("aap3N4qBbJVj"))
        .ok();
});

test("should render correctly at Tokenization Transactions Fraud Scorecard", async () => {
    await navigate("FRAUD SCORECARD");
    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/fraud-scorecard",
            title: "Digital - Fraud Scorecard",
            type: ""
        }
    });
    let visualizationID = "acCRhM6bdhbp";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await assertTooltipExists(visualizationID, "Transaction Type Detail");

    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter(visualizationID, "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("aaZRmAAxc3Ni", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("abdRzxODbMny", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("aaqRuvP0ivE2", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter("aaeRB4TLdg6M", "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier(visualizationID).count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).count)
        .eql(trackerSize);
});

test("should render correctly at Tokenization Transactions Digital Wallet Analysis", async () => {
    await navigate("DIGITAL WALLET ANALYSIS");
    let visualizationID = "aasSPmCIdhWD";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aavIaGzlalHj", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("abkSMfcGhuh7", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("ac7sd4M5eBbl", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter(visualizationID, "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier(visualizationID).count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).count)
        .eql(trackerSize);
});

test("should render correctly at Tokenization Transactions Tokenized Remote Commerce", async () => {
    await navigate("TOKENIZED REMOTE COMMERCE");
    let visualizationID = "abRH7xtCbKOF";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);
    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aaNH7BGzbKAz", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("aagH7qTUclDL", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("abuH8aHJfgz9", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter(visualizationID, "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier(visualizationID).count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).count)
        .eql(trackerSize);
});

test("should render correctly at Tokenization Transactions Transaction Channel", async () => {
    await navigate("TRANSACTION CHANNEL");
    let visualizationID = "aalUxNcXgEN8";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegend(visualizationID, CONTACTLESS ))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, IN_APP_E_COMM ))
        .ok()
        .expect(await hasDataWithLegend(visualizationID, OTHER ))
        .ok();

    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter(visualizationID, "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("abrIDA3vc30b", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("acaIBDL1aUpA", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("aaUX7xdDb08u", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter("aaeX988vaWcR", "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier(visualizationID).count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaeX988vaWcR").count)
        .eql(trackerSize);
});

test("should render correctly at Tokenization Transactions Transaction Value", async () => {
    await navigate("TRANSACTION VALUE");
    let visualizationID = "aaQX9GFBha2V";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, PERCENT_APPROVED_CURRENCY ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, PERCENT_FRAUD_CURRENCY))
        .ok();

    const trackerPoint = await getVisualizationBlockByIdentifier("abz6oMfcaxN0").find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("abz6oMfcaxN0").find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter(visualizationID, "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("abXX6BcGgbYO", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("abYYmDvpfAmC", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("adi6goMEamJE", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter("abz6oMfcaxN0", "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier("abz6oMfcaxN0").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("abz6oMfcaxN0").count)
        .eql(trackerSize);
});

test("should render correctly at Tokenization Transactions Merchant Detail", async () => {
    await navigate("MERCHANT DETAIL");
    let visualizationID = "abg5vBM4fVoz";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "transactionTypeAndDetail_parent",
        "transactionTypeAndDetail_child", "valueBand", "month", "merchantRegionAndName_parent", "merchantRegionAndName_child",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, PERCENT_APPROVED_CURRENCY ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, GROSS_FRAUD_BPS))
        .ok();
    await waitForLoading(await getVisualizationBlockByIdentifier("acG5oqoxhrkN"));
    const trackerPoint = await getVisualizationBlockByIdentifier("acG5oqoxhrkN").find(".highcharts-point").count;

    await addFilterValueByIndex("month", 1);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("acG5oqoxhrkN").find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aaL5wC5Jgd59", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("acG5oqoxhrkN", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter(visualizationID, "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("aa05wc0dg7eM", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter("acB5uf1TfQOA", "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier("acB5uf1TfQOA").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("acB5uf1TfQOA").count)
        .eql(trackerSize);
});

export const assertVisualizationApplyFilter = async (visualizationID, filterID, filterValue) => {
    const visualization = await getVisualizationBlockByIdentifier(visualizationID);
    const initValue = visualization.find(".highcharts-tracker").count;
    await addFilterValue(filterID, filterValue);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-tracker").count)
        .notEql(initValue)
};
