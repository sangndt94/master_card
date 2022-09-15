import {
    assertActiveLeftMenuItem,
    assertAllVisualizationsExist,
    assertDefaultValueAllFilters,
    assertTooltipOfVisualizationExists,
    getVisualizationByIdentifier,
    navigateTo,
    waitForLoading
} from "../helpers/pageUtils";
import fixtureWithLogin from "../helpers/fixtureWithLogin";
import { hasDataWithLegendWithRect} from "../helpers/chartUtils";
import {t} from "testcafe";

const enteredMonth = "enteredMonthAndDate_parent";
const enteredDate = "enteredMonthAndDate_child";
const fraudType = "fraudType";
const merchantName = "merchantName";
const acquirer = "acquirer";
const issuer = "issuer";
const mcc = "mcc";
const usTransAmountBucket = "usTransAmountBucket";
const errorCode = "errorCode";
const submissionType = "submissionType";

const groupSuccessfulCharts = [
    ["Transactions by Month", "aa5qhgorgPQV"],
    ["Avg Time to Report by Month", "abKTo5ynaupm"],
    ["Fraud GDV by Month", "aavsBDcOiqkP"],
    ["Avg Fraud Loss by Month", "aa4sDdMhhA2x"],
    ["Transactions by Fraud Type", "aaNqkBBAbPwf"],
    ["Transactions by Card Product", "aaQqkK0ebpLs"],
    ["Transactions by Secure Code", "aa9qgz8ccbZn"],
    ["Transactions by Card Presence", "aa7qhZlQa5s7"],
    ["Transactions by Cardholder Presence", "aboqgIp1ixK5"],
    ["Transactions by MCC - Top 15", "abeqk4ZrfRuy"],
    ["Transaction Details", "aadO1Dngix8V"]
];

const groupDeletedCharts = [
    ["Transactions by Month", "aacGSwlpbrvX"],
    ["Transaction Details", "aapO7E2DiCle"]
];

const groupPosCharts = [
    ["Transactions by CAT Level/POS Term Type", "aaC4UfdphRUv"],
    ["Transactions by Terminal Attendance", "aak4VyfvaQea"],
    ["Transactions by Terminal Operating Environment", "aaM4UKLdafzO"],
    ["Transactions by Terminal Capability", "abe4RPg6gN92"],
    ["Transactions by Card Presence", "aa7qhZlQa5s7"],
    ["Transactions by Cardholder Presence", "aboqgIp1ixK5"],
    ["Transactions by Electronic Commerce", "abW4NWFjipiy"],
    ["Transactions by Secure Code", "aa9qgz8ccbZn"],
    ["Transactions by POS Entry Mode", "abi4UvOfeF3F"]
];

fixtureWithLogin("Reported Fraud Acquirer", 1, "reported-fraud-acquirer/successful");

test.skip(`should apply filter and render correctly at Successful`, async () => {
    const visualizationIDs = ["aa5qhgorgPQV", "abYIRExzhLzo", "abJIRa3LbJwm", "acOIQjUwauSX", "abEIRbGUbH5w",
        "abKTo5ynaupm", "aavsBDcOiqkP", "aa4sDdMhhA2x", "aaQFSURqdG9k", "aaOFVYlbfI1s", "aawFSEg5hjvZ",
        "aaNqkBBAbPwf", "aaQqkK0ebpLs", "aa9qgz8ccbZn", "aa7qhZlQa5s7",
        "aboqgIp1ixK5", "abeqk4ZrfRuy", "aadO1Dngix8V"];
    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("SUCCESSFUL TRANSACTIONS");
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertDefaultValueAllFilters([enteredDate, fraudType, merchantName, acquirer,
        issuer, mcc, usTransAmountBucket]);
    await assertAllVisualizationsExist(visualizationIDs);
    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, "Transaction Count"))
        .ok()
    await assertTooltipOfVisualizationExists(visualizationIDs[12], "Card Product Code");
    await checkRenderChartByTitle(groupSuccessfulCharts);
});

test(`should apply filter and render correctly at ERRORED AND DELETED TRANSACTIONS`, async () =>{
    await navigateTo("reported-fraud-acquirer/deleted");
    const visualizationIDs = ["aacGSwlpbrvX", "aaUJltaacheK", "aapO7E2DiCle"];
    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("DELETED TRANSACTIONS");
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertDefaultValueAllFilters([enteredDate, errorCode, submissionType]);
    await assertAllVisualizationsExist(visualizationIDs);
    await checkRenderChartByTitle(groupDeletedCharts);
});

test(`should apply filter and render correctly at GEOGRAPHY`, async () =>{
    await navigateTo("reported-fraud-acquirer/geography");
    const visualizationIDs = ["aaUJltaacheK", "aabJiZDZa4Bl"];
    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("GEOGRAPHY");
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertDefaultValueAllFilters([enteredDate, fraudType, merchantName, acquirer,
        issuer, mcc, usTransAmountBucket]);
    await assertAllVisualizationsExist(visualizationIDs);
});

test(`should apply filter and render correctly at POS`, async () =>{
    await navigateTo("reported-fraud-acquirer/pos");
    const visualizationIDs = ["aaC4UfdphRUv", "aak4VyfvaQea", "aaM4UKLdafzO", "abe4RPg6gN92",
        "aa7qhZlQa5s7", "aboqgIp1ixK5", "abW4NWFjipiy", "aa9qgz8ccbZn", "abi4UvOfeF3F"];
    const visualizationID = visualizationIDs[0];
    await assertActiveLeftMenuItem("POS");
    await waitForLoading( await getVisualizationByIdentifier(visualizationID));
    await assertDefaultValueAllFilters([enteredDate, fraudType, merchantName, acquirer,
        issuer, mcc, usTransAmountBucket]);
    await assertAllVisualizationsExist(visualizationIDs);
    await checkRenderChartByTitle(groupPosCharts);
});

export const checkRenderChartByTitle = async (groupCharts) => {
    groupCharts.forEach(async ([title, visualizationID])  => {
        const visualization = await getVisualizationByIdentifier(visualizationID);
        await waitForLoading(visualization);
        await t
            .expect(await visualization.exists)
            .ok()
            // remove some tests contain "See Full List"
            .expect(await visualization.find(".Heading").textContent.replace("See Full List", ""))
            .eql(title);
    })
};
