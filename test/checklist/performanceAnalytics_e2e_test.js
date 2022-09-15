import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    assertActiveLeftMenuItem,
    expectSingleDashboardContent,
    assertAllVisualizationsExist,
    assertAllVisualizationBlocksExist,
    navigateTo,
    addFilterValue,
    applyFilter,
    assertAllFiltersExist,
    getVisualizationByIdentifier,
    isErrorBy,
    assertTooltipExists,
    assertTooltipOfVisualizationExists,
    waitForLoading,
    clearAll
} from "../helpers/pageUtils";
import { t } from "testcafe";
import {hasDataWithLegend, hasDataWithLegendByPath, hasDataWithLegendWithRect} from "../helpers/chartUtils";
import {PEERS, PORTFOLIO, REGION} from "../helpers/constants";

loginAutoTestUserAndNavigate("Performance Analytics - e2e", 1, "performance-analytics/key-insights");

test(`should load all filters, kpi's and visualizations`, async () => {
    let visualizationID = "acAbbpqYd5YU";
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
    await clearAll();

    await navigateTo("performance-analytics/card-not-present");
    visualizationID = "ac3bOwykfmfc";
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
    await clearAll();

    await navigateTo("performance-analytics/card-present");
    visualizationID = "abyfdU9edkuQ";
    await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country", "productGroup"]);
    await addFilterValue("cidAndIca_parent", "236711");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PEERS))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
    await addFilterValue("productGroup", "CONSUMER PREPAID");
    await applyFilter();
    await t
        .expect(await hasDataWithLegendByPath(visualizationID, REGION))
        .ok()
        .expect(await hasDataWithLegendByPath(visualizationID, PORTFOLIO))
        .ok();
});
