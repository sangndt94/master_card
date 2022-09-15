// (C) 2020 GoodData Corporation
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    waitForLoading,
    addFilterValueByIndex,
    getVisualizationBlockByIdentifier,
    clearAll,
    assertVisualizationsLoadSuccessful,
    removeFilterValueByIndex,
} from "../helpers/pageUtils";

const month = "monthYear";
const issuer_ICA = "cidAndAcquirerIca_child";
const region = "regionAndCountry_parent";
const country = "regionAndCountry_child";
const channelSummary = "channelSummaryCpCnp";
const channelDetail = "channelDetail";
const corridor = "corridor";
const merchantClassification = "merchantClassification";
const productType = "productGroup";
const cardType = "cardType";

loginAutoTestUserAndNavigate(
    "Acquirer Benchmarking Premium.Fraud Deep Dive - e2e",
    1,
    "acquirer-benchmarking-premium/fraud-deep-dive"
);

test("should load all filters, kpi's and visualizations", async () => {
    const visualizationIDs = ["aaTdGxu8evAY", "aaKdNWSwg7ba", "abIehajido03", "aapeoONbdOzy", "abafuIird8nB"];
    const visualization = await getVisualizationBlockByIdentifier(visualizationIDs[0]);
    await waitForLoading(visualization);
    await addFilterValueByIndex(issuer_ICA, 0);
    await applyFilter();
    await waitForLoading(visualization);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(region, 0);
    await applyFilter();
    await waitForLoading(visualization);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(region, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(country, 0);
    await applyFilter();
    await waitForLoading(visualization);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await removeFilterValueByIndex(region, 0);
    await applyFilter();
    await waitForLoading(visualization);
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(channelSummary, 0);
    await addFilterValueByIndex(channelDetail, 0);
    await addFilterValueByIndex(corridor, 0);
    await addFilterValueByIndex(cardType, 0);
    await addFilterValueByIndex(productType, 0);
    await addFilterValueByIndex(merchantClassification, 0);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await addFilterValueByIndex(month, 1);
    await applyFilter();
    await assertVisualizationsLoadSuccessful(visualizationIDs);

    await clearAll();
    await assertVisualizationsLoadSuccessful(visualizationIDs);
});
