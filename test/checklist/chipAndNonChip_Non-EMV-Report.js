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

loginAutoTestUserAndNavigate("Non-EMV Report", 1, "non-emv-report/overview");

const navGroups = [
    {
        title: "Overview",
        path: "non-emv-report/overview",
        visualizationIds: ["adlXanBVcOSn", "aahXoPAVfbXN", "acvXidP1ftww", "abK1xcmYetqh", "aav1F8seiEiW", "aaj1KPTObTAi",
        "aa32a3i0eLZy", "aaL2hX30eKhd", "aaZ2idbvgFdC", "abw2hIuoar5M", "aaf2rljren1B", "abS2n3aefgvU",
        "aad2FbJsiFWz", "abI2GgJMg8cn", "aal2MznWgXn9", "abH2TYMWcdeI", "aci2TqJBbjQf", "abh2YTKIftdP"]
    },
    {
        title: "Performance Drivers",
        path: "non-emv-report/performance-drivers",
        visualizationIds: ["abQ8ni9BdY1U", "abw8nlAzcJVc", "aaU8rARpf0wV", "acM8m9GedvUI", "aaLcUM1Tg7Fv",
            "abBee4ypdLAZ", "aa0elgFVdJna", "abbes0WxezAG", "abpertFubFi9", "aaAeyTPoeiEM",
            "aaneGx1Jd6Bk", "abjeGecFaKzs", "abkeGaEegW3Y", "abEeH08PfjHt", "aaviL37FeEHC"]
    },
    {
        title: "Customer Insights",
        path: "non-emv-report/customer-insights",
        visualizationIds: ["aafjZU8Resji", "abzSS8nsh0gr", "abkjOU2qa2l6", "aczSSQrBezqV", "aaxj4m6benXN",
            "abXk1bqqbwKv", "aa4pqybLdiH2", "abdqhF7ig2MG", "abGTeGuXbf0u", "aeGpUQfBei9i",
            "aaTk4tqAaDT1", "aaQTf8JQdfwg", "aeVpUQMtfZuT", "acqS9KAFaP2g", "adhp9lhCfmG5"]
    },
    {
        title: "Top Industries Merchants By Spend",
        path: "non-emv-report/top-industries-merchants-by-spend",
        visualizationIds: ["aaRqEhXIhEf6", "aact0oUObYAy", "aajule0scdpm", "aayukniyeWWA"]
    },
    {
        title: "Terminal Analysis",
        path: "non-emv-report/terminal-analysis",
        visualizationIds: ["aazvGZw5eIkT", "abHvNomggPh3", "aaIwuEy1gJE2", "aaCgzGCUgHfn",
            "abqgxHoeh9Vg", "ablgzuDAgrKO", "acfBflz2fF9v", "aasYWxfpasEN", "aaDYWuMPg3O8"]
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
