// (C) 2020 GoodData Corporation
import { Selector, t } from "testcafe";
import fixtureWithLogin from "../helpers/fixtureWithLogin";
import { assertDataLayersExists, navigateTo } from "../helpers/pageUtils";

fixtureWithLogin("Digital.e2e", 1, "digital/overview");

test("should render glossary link and redirect to the glossary", async () => {
    const glossaryLink = Selector(".s-glossary-link");

    await t.expect(glossaryLink.textContent).contains("Glossary");
    await t.click(glossaryLink);

    const glossaryCard = Selector(".s-glossary");
    await t.expect(glossaryCard.exists).ok();
});

test("should render 'Back to dashboard' link and redirect to the previous dashboard", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const backToDashboardLink = Selector(".s-back-dashboard");

    await t.expect(backToDashboardLink.textContent).eql("Back to Dashboard");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    await t.click(backToDashboardLink);

    const glossaryCard = Selector(".s-glossary");
    await t.expect(glossaryCard.exists).notOk();
});

test("should render 'Switch dashboard' link and redirect to the app picker", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const switchDashboardLink = Selector(".s-switch-dashboard");

    await t.expect(switchDashboardLink.textContent).eql("Switch Dashboard");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    await t.click(switchDashboardLink);

    const glossaryCard = Selector(".s-glossary");
    await t.expect(glossaryCard.exists).notOk();
});

test("should display the search results", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const searchInput = Selector(".s-search-input");

    await t.typeText(searchInput, "fraud");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    const searchResult = Selector(".s-search-result");
    await t.expect(searchResult.textContent).contains("fraud");

    const glossaryCards = Selector(".s-glossary-card");
    await t.expect(glossaryCards.count).gte(2);
});

test("should display the search results when the search query has no results", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const searchInput = Selector(".s-search-input");

    await t.typeText(searchInput, "wrong query");

    const searchResult = Selector(".s-no-result");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    await t.expect(searchResult.textContent).contains("wrong query");

    const glossaryCards = Selector(".s-glossary-card");
    await t.expect(glossaryCards.count).eql(0);
});

test("should reset search query when switching glossary category", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const searchInput = Selector(".s-search-input");

    await t.typeText(searchInput, "fraud");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    const searchResult = Selector(".s-search-result");
    await t.expect(searchResult.exists).ok();

    const glossaryCards = Selector(".s-glossary-card");
    await t.expect(glossaryCards.count).gte(2);

    const menuItem = Selector(".s-glossary-menu .s-menu-item");
    await t.click(menuItem);

    await t.expect(searchResult.exists).notOk();

    await t.expect(glossaryCards.count).eql(1);
});

test("should reset search query when clicking on product details link", async () => {
    await navigateTo("digital/overview/glossary/glossary");
    const searchInput = Selector(".s-search-input");

    await t.typeText(searchInput, "fraud");

    await assertDataLayersExists({
        event: "pageview",
        page: {
            path: "/digital/overview/glossary/glossary",
            title: "Digital",
            type: ""
        }
    });

    const searchResult = Selector(".s-search-result");
    await t.expect(searchResult.exists).ok();

    const glossaryCards = Selector(".s-glossary-card");
    await t.expect(glossaryCards.count).gte(2);

    const productDetailsLink = Selector(".s-product-details");
    await t.click(productDetailsLink);

    await t.expect(searchResult.exists).notOk();

    await t.expect(glossaryCards.count).eql(0);

    const glossaryProductCards = Selector(".s-glossary-product-card");
    await t.expect(glossaryProductCards.count).eql(1);
});
