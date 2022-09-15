// (C) 2020 GoodData Corporation
import { t, Selector } from "testcafe";
import fixtureWithLogin from "../helpers/fixtureWithLogin";
import { getVisualizationBlockByIdentifier, waitForLoading } from "../helpers/pageUtils";

fixtureWithLogin("Export", 1, "style-guide/context-menu");

test.skip("should show the export menu and options to download Excel and CSV files", async () => {
    const visualizationBlock = await getVisualizationBlockByIdentifier("aaHjw5goica0");
    await waitForLoading(visualizationBlock);

    const contextMenuTrigger = visualizationBlock.find(".s-TriggerButton");
    await t.expect(contextMenuTrigger.visible).ok().click(contextMenuTrigger);
    const contextMenuItems = visualizationBlock.find(".s-MenuItem");
    await t.expect(contextMenuItems.count).eql(2);

    // TestCafe cannot actually assert the file download has been triggered. However it is on the road map.
});
