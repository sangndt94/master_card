import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    waitForChildFilterLoading,
    isErrorBy,
    assertAllFiltersExist,
    navigateTo,
    getVisualizationByIdentifier
} from "../helpers/pageUtils";

const testCid = "102575";

loginAutoTestUserAndNavigate("Non-EMV Report.Operational Metrics", 1, "non-emv-report/operational-metrics-overview");

const navGroups = [
    {
        title: "Operational Metrics Overview",
        path: "non-emv-report/operational-metrics-overview",
        visualizationIds: ["aamHcZnPaiZA", "abJdFC6paW6c", "abAG5SDxaCHx"]
    },
    {
        title: "Operational Metrics Fraud",
        path: "non-emv-report/operational-metrics-fraud",
        visualizationIds: ["aaJHkjczasLf", "aauWojKTaoCf", "ackWndITagOj"]
    },
    {
        title: "Operational Metrics Chargeback",
        path: "non-emv-report/operational-metrics-chargeback",
        visualizationIds: ["acAHkGaZcXIQ", "aa6Hsk4acbGn", "abDW7tWvg0aV", "abfW7UrvcbxD",
            "aa4WQvONcwPL", "aavWGkTLdwz1", "afbW6spohLT8", "adPW9X5taC2Q"]
    }
];

navGroups.forEach(navGroup => {
    test(`should render donut & combo chart of ${navGroup.title}`, async () => {
        await navigateTo(navGroup.path);
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
        await addFilterValue("cidAndIca_parent", testCid);
        await waitForChildFilterLoading("cidAndIca_child");
        await addFilterValue("country", "FRANCE");
        await applyFilter();

        const visualizationIDs = navGroup.visualizationIds;

        visualizationIDs.forEach(async visualizationID => {
            const visualizationBlock = getVisualizationByIdentifier(visualizationID);
            await t
                .expect(await visualizationBlock.exists)
                .ok()
                .expect(await isErrorBy(visualizationBlock))
                .notOk();
        })
    })
});
