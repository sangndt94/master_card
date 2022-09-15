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

loginAutoTestUserAndNavigate("MO/TO Operational Metrics Issuer", 1, "moto-issuer/overview");

const navGroups = [
    {
        title: "Overview",
        path: "moto-issuer/operational-metrics-overview",
        visualizationIds: ["aa382U9paRMt", "aao9cnklbDy9", "aat9cJquaSrU", "aaB9eUt2dGU6"]
    },
    {
        title: "Detail",
        path: "moto-issuer/operational-metrics-detail",
        visualizationIds: ["abi9nsq9g8tn", "aaf9uMtsiqJl", "abe9r270gVgW", "abu9niUhg2NX", "ace9q6Sghof1"]
    },
    {
        title: "Merchant Analysis",
        path: "moto-issuer/operational-metrics-merchant-analysis",
        visualizationIds: ["abR9DFmidevj", "acf9Pv09bDPO", "aazEECAIb9Ib", "aboVdI4PhqOG",
            "aabVAlXybozR", "aaiWlUC8gr7Z"]
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
            const visualization = getVisualizationByIdentifier(visualizationID);
            await t
                .expect(await visualization.exists)
                .ok()
                .expect(await isErrorBy(visualization))
                .notOk();
        })
    })
});
