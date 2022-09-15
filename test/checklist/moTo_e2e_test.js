// (C) 2020 GoodData Corporation
import { Selector, t } from "testcafe";
import fixtureWithLogin from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    waitForChildFilterLoading,
    isErrorBy,
    assertAllFiltersExist,
    getFilterItems,
    getVisualizationByIdentifier,
} from "../helpers/pageUtils";

const testCid = "103559";
const sites = [
    {
        name: "MO/TO Acquirer",
        page: "moto-acquirer/overview"
    },
    {
        name: "Issuer Acquirer",
        page: "moto-issuer/overview"
    }
];

const yOYAndTotalCharts = [
    ["Total MO/TO Spend", "aaUiPk1Je4q5"],
    ["Total MO/TO Transactions", "aa3jkiMNfqf6"],
    ["Total MO/TO Active Cards", "abDjkxdyd7FB"],
    ["Y-o-Y Portfolio of Spend", "aahiQP4Ya986"],
    ["Y-o-Y Benchmark of Spend", "aaLiP2qWdjus"],
    ["Y-o-Y Portfolio of Transactions", "abdjifzKhamI"],
    ["Y-o-Y Benchmark of Transactions", "abtjjBsGfaWy"],
    ["Y-o-Y Portfolio of Active Cards", "abdjlzX6go0w"],
    ["Y-o-Y Benchmark of Active Cards", "abOjj4BZfm4P"],
];

const donutAndComboCharts = [
    ["abniQ3LtbRbD", "abeiPOKMfrZL", "acoiPyFLgYrD", "Spend"],
    ["adRje73rf67E", "acdjgDmablCg", "abvjljJUdRPD", "Transactions"],
    ["abpjkxkJdq7B", "aa8jxrbpertK", "aaHjw5goica0", "Active Cards"],
];

sites.forEach(site => {
    fixtureWithLogin(`${site.name}.Overview - e2e`, 1, `${site.page}`);
    yOYAndTotalCharts.forEach(([title, identifier]) => {
        test(`should render chart ${title}`, async () => {
            await addFilterValue("cidAndIca_parent", testCid);
            await waitForChildFilterLoading("cidAndIca_child");
            await addFilterValue("country", "UNITED KINGDOM");
            await applyFilter();
            const chart = getVisualizationByIdentifier(identifier).withText(new RegExp(title.concat(".*")));
            await t
                .expect(await isErrorBy(chart))
                .notOk()
        });
    });

    donutAndComboCharts.forEach(
        ([donutPortfolioIdentifier, donutBenchmarkIdentifier, comboIdentifier, group]) => {
            test(`should render donut & combo chart of ${group}`, async () => {
                await addFilterValue("cidAndIca_parent", testCid);
                await waitForChildFilterLoading("cidAndIca_child");
                await addFilterValue("country", "UNITED KINGDOM");
                await applyFilter();

                const donutPortfolio = getVisualizationByIdentifier(donutPortfolioIdentifier);
                const donutBenchmark = getVisualizationByIdentifier(donutBenchmarkIdentifier);
                const comboChart = getVisualizationByIdentifier(comboIdentifier);
                await t
                    .expect(await donutPortfolio.exists)
                    .ok()
                    .expect(await isErrorBy(donutPortfolio))
                    .notOk()
                    .expect(await donutBenchmark.exists)
                    .ok()
                    .expect(await isErrorBy(donutBenchmark))
                    .notOk()
                    .expect(await comboChart.exists)
                    .ok()
                    .expect(await isErrorBy(comboChart))
                    .notOk();
            });
        },
    );

    test(`should apply default filters to chart`, async () => {
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
        await waitForChildFilterLoading("cidAndIca_child");
        const countryFilterItems = await getFilterItems("country");
        const icaFilterItems = await getFilterItems("cidAndIca_child");
        await t
            .expect(countryFilterItems)
            .contains(await Selector(".s-filter-country >div:not(.label)").textContent);
        await addFilterValue("cidAndIca_parent", testCid);
        await waitForChildFilterLoading("cidAndIca_child");

        const icaFilterUpdatedItems = await getFilterItems("cidAndIca_child");
        await t.expect(icaFilterItems).notEql(icaFilterUpdatedItems);
    });
});
