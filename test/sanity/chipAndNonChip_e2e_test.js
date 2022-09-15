import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    waitForChildFilterLoading,
    isErrorBy,
    getVisualizationByIdentifier
} from "../helpers/pageUtils";

const testCid = "102575";

loginAutoTestUserAndNavigate("Non-EMV Report", 1, "non-emv-report/overview");

const yOYAndTotalCharts = [
    ["Total Chip Spend", "adlXanBVcOSn"],
    ["Total Chip Transactions", "aa32a3i0eLZy"],
    ["Chip Active Cards", "aad2FbJsiFWz"],
    ["Y-o-Y Portfolio of Chip Spend", "aahXoPAVfbXN"],
    ["Y-o-Y Benchmark of Chip Spend", "acvXidP1ftww"],
    ["Y-o-Y Portfolio of Chip Transactions", "aaL2hX30eKhd"],
    ["Y-o-Y Benchmark of Chip Transactions", "aaZ2idbvgFdC"],
    ["Y-o-Y Portfolio of Active Cards", "abI2GgJMg8cn"],
    ["Y-o-Y Benchmark of Active Cards", "aal2MznWgXn9"],
];

const donutAndComboCharts = [
    ["abK1xcmYetqh", "aav1F8seiEiW", "aaj1KPTObTAi", "Chip Spend"],
    ["abw2hIuoar5M", "aaf2rljren1B", "abS2n3aefgvU", "Chip Transactions"],
    ["abH2TYMWcdeI", "aci2TqJBbjQf", "abh2YTKIftdP", "Active Cards"],
];

yOYAndTotalCharts.forEach(([title, identifier]) => {
    test(`should render chart ${title}`, async () => {
        await addFilterValue("cidAndIca_parent", testCid);
        await waitForChildFilterLoading("cidAndIca_child");
        await addFilterValue("country", "FRANCE");
        await applyFilter();

        const chart = getVisualizationByIdentifier(identifier).withText(new RegExp(title.concat(".*")));
        await t.expect(await isErrorBy(chart)).notOk();
    });
});

donutAndComboCharts.forEach(
    ([donutPortfolioIdentifier, donutBenchmarkIdentifier, comboIdentifier, group]) => {
        test(`should render donut & combo chart of ${group}`, async () => {
            await addFilterValue("cidAndIca_parent", testCid);
            await waitForChildFilterLoading("cidAndIca_child");
            await addFilterValue("country", "FRANCE");
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
