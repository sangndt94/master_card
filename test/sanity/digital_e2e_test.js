// (C) 2019 GoodData Corporation
import { Selector, t } from "testcafe";
import {loginAutoTestUserAndNavigate} from "../helpers/fixtureWithLogin";
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
    navigateTo
} from "../helpers/pageUtils";
import fs from "fs";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel} from "../helpers/exportUtils";

loginAutoTestUserAndNavigate("Digital.e2e", 1, "digital/overview");

const testIca = "1001 ";
const navGroups = [
    {
        title: "OVERVIEW",
        path: "digital/overview",
        visualizationIds: ["aap3N4qBbJVj", "aaSNcHlEieJJ", "abMNcOYgii6b"]
    },
    {
        title: "FRAUD SCORECARD",
        path: "digital/fraud-scorecard",
        visualizationIds: ["acCRhM6bdhbp", "aaqRuvP0ivE2", "aanRuHGmdwy7"]
    },
    {
        title: "DIGITAL WALLET ANALYSIS",
        path: "digital/digital-wallet-analysis",
        visualizationIds: ["abSSB33YcCBi", "abkSMfcGhuh7", "aasSPmCIdhWD"]
    },
    {
        title: "TOKENIZED REMOTE COMMERCE",
        path: "digital/tokenized-remote-commerce",
        visualizationIds: ["aauH7Ou7geTj", "aaNH7BGzbKAz"]
    },
    {
        title: "TRANSACTION CHANNEL",
        path: "digital/transaction-channel",
        visualizationIds: ["abrIDA3vc30b", "acaIBDL1aUpA", "aaiX9Tv3e8qb"]
    },
    {
        title: "TRANSACTION VALUE",
        path: "digital/transaction-value",
        visualizationIds: ["abYYmDvpfAmC", "abz6oMfcaxN0", "acL6liEgfGwT"]
    },
    {
        title: "MERCHANT DETAIL",
        path: "digital/merchant-detail",
        visualizationIds: ["acG5oqoxhrkN", "acB5uf1TfQOA"]
    },
    {
        title: "WALLET PROVIDER RECOMMENDATIONS & ISSUER DECISION",
        path: "digital/wallet-provider-recommendations-issuer-decision",
        visualizationIds: ["abn9h0I0ddsN", "aaW9jP3ebX15"]
    },
    {
        title: "YELLOW PATH – ACCOUNT & DEVICE SCORE",
        path:"digital/yellow-path-account-device-score",
        visualizationIds: ["aby9oYtXcBCV", "aby9jj4Ah5k1"]
    },
    {
        title: "YELLOW PATH – RECOMMENDATION REASONS",
        path: "digital/yellow-path-recommendation-reasons",
        visualizationIds: ["aa89oZ6wcYPR", "aaLn6u3mbwu2"]
    }
];

test("should render correctly at Tokenization Transactions Overview", async () => {
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

    await assertVisualizationApplyFilter("acCRhM6bdhbp", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("aaZRmAAxc3Ni", "tokenRequestor", "APPLE PAY");
    await assertVisualizationApplyFilter("abdRzxODbMny", "transactionTypeAndDetail_parent", "In-App / E-Comm");
    await assertVisualizationApplyFilter("aaqRuvP0ivE2", "transactionTypeAndDetail_child", "DSRP containing UCAF");
    await assertVisualizationApplyFilter("aaeRB4TLdg6M", "valueBand", "$100-$500");

    const trackerSize = await getVisualizationBlockByIdentifier("aaeRB4TLdg6M").count;
    await addFilterValueByIndex("month", 3);
    await addFilterValue("merchantRegionAndName_parent", "US");
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaeRB4TLdg6M").count)
        .eql(trackerSize);
});

navGroups.forEach(navGroup => {
    if(process.env.MASTERCARD_FI_REPOSITORY_BRANCH === "develop") {
        test(`should export file at ${navGroup.title}`, async t => {
            await enableDownloadForHeadlessChrome(t);
            await navigateTo(navGroup.path);
            for (const identifier of navGroup.visualizationIds) {
                await t
                    .expect(fs.existsSync(await exportToExcel(identifier, "")))
                    .ok(`Excel file of visualization with id ${identifier} doesn't export`)
                    .expect(fs.existsSync(await exportToCSV(identifier, "")))
                    .ok(`CSV file of visualization with id ${identifier} doesn't export`)
            }
        });
    }
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
