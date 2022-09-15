// (C) 2020 GoodData Corporation
import { t, Selector } from "testcafe";
import fixtureWithLogin from "../helpers/fixtureWithLogin";

fixtureWithLogin("Style Guide.Style Guide", 1, "style-guide");

test("should render menu and navigate to routes on click", async () => {
    const menuItems = Selector(".s-style-guide-menu-item");
    await t.expect(menuItems.exists).ok();

    const menuItemTexts = [];
    for (let menuItemIndex = 0; menuItemIndex < (await menuItems.count); menuItemIndex++) {
        const menuItem = menuItems.nth(menuItemIndex);
        menuItemTexts.push(await menuItem.textContent);
        await t.click(menuItem);
        // wait for previous route to be unmounted
        await t.wait(200);
        const body = Selector(".s-sg-body");
        await t.expect(body.exists).ok();
    }
    await t
        .expect(menuItemTexts)
        .eql([
            "Typography",
            "Colors",
            "Buttons",
            "Inputs",
            "Headline",
            "Context Menu",
            "Filters",
            "Icons",
            "Heatmaps",
            "Communication",
        ]);
});
