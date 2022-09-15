// (C) 2019 GoodData Corporation
import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    addFilterValue,
    addFilterValueByIndex,
    applyFilter,
    getVisualizationBlockByIdentifier,
    waitForLoading,
    assertDefaultValueAllFilters,
    navigateTo,
} from "../helpers/pageUtils";
import { hasDataWithLegendWithRect} from "../helpers/chartUtils";
import {
    GREEN,
    RED,
    VOLUME_OF_PROVISIONING_REQUESTS_PERCENT,
    VOLUME_OF_SUCCESSFUL_PROVISIONING_REQUESTS_WITH_SU, YELLOW
} from "../helpers/constants";

loginAutoTestUserAndNavigate("Digital.e2e", 1, "digital/overview");

test("should render correctly at Card Provisioning Provisioning Messages", async () => {
    await navigateTo("digital/provisioning-messages");
    let visualizationID = "abr88VVKe9oh";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));

    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "month",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, VOLUME_OF_PROVISIONING_REQUESTS_PERCENT ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, VOLUME_OF_SUCCESSFUL_PROVISIONING_REQUESTS_WITH_SU))
        .ok();

    await waitForLoading(await getVisualizationBlockByIdentifier("aaM89Jo6fKvq"));
    const trackerPoint = await getVisualizationBlockByIdentifier("aaM89Jo6fKvq").find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaM89Jo6fKvq").find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aar5AHcuasEM", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("aaM89Jo6fKvq", "tokenRequestor", "APPLE PAY");

    const trackerSize = await getVisualizationBlockByIdentifier("aar5AHcuasEM").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aar5AHcuasEM").count)
        .eql(trackerSize);
});

test("should render correctly at Card Provisioning Wallet Provider Recommendations & Issuer Decision", async () => {
    await navigateTo("digital/wallet-provider-recommendations-issuer-decision");
    let visualizationID = "abn9h0I0ddsN";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));

    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "month",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, RED ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, YELLOW))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, GREEN))
        .ok();

    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aaW9jP3ebX15", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("aag9jsqMfl9A", "tokenRequestor", "APPLE PAY");

    const trackerSize = await getVisualizationBlockByIdentifier("aag9jsqMfl9A").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aag9jsqMfl9A").count)
        .eql(trackerSize);
});

test("should render correctly at Card Provisioning Yellow Path – Account & Device Score", async () => {
    await navigateTo("digital/yellow-path-account-device-score");
    let visualizationID = "aaJ9rMMHdXPW";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));

    await assertDefaultValueAllFilters(["wallet", "tokenRequestor", "month",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await t
        .expect(await hasDataWithLegendWithRect(visualizationID, "1" ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, "2"))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, "3" ))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, "4"))
        .ok()
        .expect(await hasDataWithLegendWithRect(visualizationID, "5" ))
        .ok();

    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaX9o0WKfPun").find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aar9n9mNcBWK", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter("aaX9o0WKfPun", "tokenRequestor", "APPLE PAY");

    const trackerSize = await getVisualizationBlockByIdentifier("aaX9o0WKfPun").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaX9o0WKfPun").count)
        .eql(trackerSize);
});

test("should render correctly at Card Provisioning Yellow Path – Recommendation Reasons", async () => {
    await navigateTo("digital/yellow-path-recommendation-reasons");
    let visualizationID = "aaLn6u3mbwu2";
    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));

    await assertDefaultValueAllFilters(["wallet", "reasonType", "month",
        "issuerRegionAndCountry_parent", "issuerRegionAndCountry_child", "productType"]);

    await waitForLoading(await getVisualizationBlockByIdentifier(visualizationID));
    const trackerPoint = await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count;

    await addFilterValueByIndex("month", 2);
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier(visualizationID).find(".highcharts-point").count)
        .notEql(trackerPoint);

    await assertVisualizationApplyFilter("aa89oZ6wcYPR", "wallet", "103 - APPLE PAY");
    await assertVisualizationApplyFilter(visualizationID, "reasonType", "Inactive account");

    const trackerSize = await getVisualizationBlockByIdentifier("aaQ9rXoCd8ET").count;

    await addFilterValueByIndex("month", 3);
    await addFilterValue("issuerRegionAndCountry_parent", "US");
    await addFilterValue("issuerRegionAndCountry_child", "UNITED STATE");
    await addFilterValue("productType", "DB");
    await applyFilter();
    await t
        .expect(await getVisualizationBlockByIdentifier("aaQ9rXoCd8ET").count)
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
