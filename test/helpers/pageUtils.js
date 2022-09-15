// (C) 2019 GoodData Corporation
import { Selector, t } from "testcafe";

// Navigation

export const navigateTo = async path => {
    await t.navigateTo(`${process.env.TEST_BACKEND}#/${path}`);
};

export const selectProject = async projectTitle => {
    const dashboardHeaderSelect = Selector(".CidDashboardHeader");
    await t.expect(dashboardHeaderSelect.visible).ok();
    await waitForLoading(dashboardHeaderSelect);
    const filterOption = Selector(".s-filter-option");
    if (await dashboardHeaderSelect.innerText === projectTitle ) {
        return;
    }
    await t
        .click(dashboardHeaderSelect)
        .typeText(dashboardHeaderSelect.find("input"), projectTitle)
        .expect(filterOption.visible)
        .ok()
        .click(filterOption);
};

export const selectDigitalProject = async projectTitle => {
    const dashboardHeaderSelect = Selector(".DashboardHeaderSelect");
    await t.expect(dashboardHeaderSelect.visible).ok();
    await waitForLoading(dashboardHeaderSelect);
    const filterOption = Selector("div").withText(projectTitle).withAttribute("tabindex", "-1");
    if (await dashboardHeaderSelect.innerText === projectTitle ) {
        return;
    }
    await t.click(dashboardHeaderSelect);
    await t.typeText(dashboardHeaderSelect.find("input"), projectTitle);
    await t.expect(filterOption.visible).ok();
    return t.click(filterOption);
};

export const waitToDisappear = async (query) => {
    await t.expect(Selector(query).exists).ok();
    return t.expect(Selector(query).exists).notOk();
};

// Visualization blocks

export const getVisualizationBlockByTitle = title =>
    Selector(".Heading").withText(title).parent(".s-visualization-block").nth(0);

export const getVisualizationBlockByIdentifier = identifier =>
    Selector(`.s-visualization-block-${identifier}`);

export const getVisualizationBlockTitleByIdentifier = identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".Heading").innerText;
};

export const assertVisualizationBlockExists = async identifier => {
    await t.expect(getVisualizationBlockByIdentifier(identifier).exists).ok("Missing visualization with identifier: " + identifier);
};

export const assertAllVisualizationBlocksExist = async identifiers => {
    for (let i = 0; i < identifiers.length; i++) {
        await assertVisualizationBlockExists(identifiers[i]);
    }
};

export const switchVisualizationBlockToQuarterly = async identifier => {
    await t.click(getVisualizationBlockByIdentifier(identifier).find(".s-granularity-coarse"));
};

export const switchVisualizationBlockToMonthly = async identifier => {
    await t.click(getVisualizationBlockByIdentifier(identifier).find(".s-granularity-fine"));
};

export const getVisualizationValuesBlockByIdentifier = async identifier => {
    const values = [];
    const visualization = getVisualizationBlockByIdentifier(identifier);
    await waitForLoading(visualization);
    const labels = visualization.find(".highcharts-data-label tspan");

    for (let i = 0; i < await labels.count; i++) {
        values.push(await labels.nth(i).textContent);
    }
    return values;
};

export const getVisualizationBlockXAxisLablesByIdentifier = async identifier => {
    const values = [];
    const visualization = getVisualizationBlockByIdentifier(identifier);
    await waitForLoading(visualization);
    const labels = visualization.find(".highcharts-xaxis-labels tspan");

    for (let i = 0; i < await labels.count; i++) {
        values.push(await labels.nth(i).textContent);
    }
    return values;
};

export const getVisualizationBlockXAxisLabelByIdentifier = async identifier => {
    const values = [];
    const visualization = getVisualizationBlockByIdentifier(identifier);
    await waitForLoading(visualization);
    const labels = visualization.find(".highcharts-xaxis-labels text");

    for (let i = 0; i < await labels.count; i++) {
        values.push(await labels.nth(i).textContent);
    }
    return values;
};

export const isBubbleChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-bubble-series").exists;
};

export const isBarChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-bar-series").exists;
};

export const isLineChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-line-series").exists;
};

export const isColumnChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-column-series").exists;
};

export const isTreemapChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-treemap-series").exists;
};

export const isPieChart = async identifier => {
    return getVisualizationBlockByIdentifier(identifier).find(".highcharts-pie-series").exists;
};

export const isError = async identifier => {
    const visualization = await getVisualizationBlockByIdentifier(identifier);
    await waitForLoading(visualization);
    return await visualization.find(".s-error").exists && !(await visualization.textContent).includes("No data");
};

export const isErrorBy = async selector => {
    return await selector.hasClass("s-error").exists && !(await selector.textContent).includes("No data");
};

export const isNoData = async identifier => {
    const visualization = await getVisualizationBlockByIdentifier(identifier);
    return await visualization.find(".s-error").exists && (await visualization.textContent).includes("No data");
};

export const isNoDataBy = async selector => {
    return await selector.hasClass("s-error").exists && (await selector.textContent).includes("No data");
};
// Visualization

export const getVisualizationByIdentifier = identifier =>
    Selector(`.s-visualization-${identifier}`);

export const assertVisualizationExists = async identifier => {
    await t.expect(getVisualizationByIdentifier(identifier).exists).ok("Missing visulization with identifier: " + identifier);
};

export const assertAllVisualizationsExist = async identifiers => {
    for (let i = 0; i < identifiers.length; i++) {
        await assertVisualizationExists(identifiers[i]);
    }
};

// ignores the NO DATA error
export const assertVisualizationsLoadSuccessful = async identifiers => {
    for (let i = 0; i < identifiers.length; i++) {
        await t
            .expect(await isError(identifiers[i]))
            .notOk("There is error with " + identifiers[i]);
    }
};

// Kpi blocks

export const getKpiBlockByTitle = title =>
    Selector(".Heading").withText(title).parent(".s-kpi-block").nth(0);

export const getKpiBlockByIdentifier = identifier => Selector(`.s-kpi-block-${identifier}`);

export const getKpiBlockContentByIdentifier = async identifier => {
    return getKpiBlockByIdentifier(identifier).find(".gdc-kpi").innerText;
};

export const assertKpiBlockExists = async identifier => {
    await t.expect(getKpiBlockByIdentifier(identifier).exists).ok();
};

export const assertAllKpiBlocksExist = async identifiers => {
    identifiers.forEach(async identifier => {
        await assertKpiBlockExists(identifier);
    });
};

// Nav menu

export const getLeftMenu = () => Selector(".s-menu");

export const getActiveLeftMenuItem = () => getLeftMenu().find(".s-menu-item-active");

export const assertActiveLeftMenuItem = async text => {
    const menuItem = getActiveLeftMenuItem();
    await t.expect(menuItem.exists).ok();
    await t.expect(menuItem.innerText).eql(text);
};

export const navigate = async pageTitle => {
    await t.click(getLeftMenu().find(".navItem").withText(pageTitle));
};

// Filters

export const getFilterById = id => Selector(`.s-filter-${id}`);

export const assertFilterExists = async label => {
    await t.expect(getFilterById(label).exists).ok();
};

export const assertAllFiltersExist = async ids => {
    ids.forEach(async id => {
        await assertFilterExists(id);
    });
};

export const assertDefaultValueAllFilters = async ids => {
    ids.forEach(async id => {
        await t
            .expect(await getFilterById(id).find(".css-drdnex-placeholder").textContent)
            .eql("All");
    });
};

export const addFilterValue = async (label, value) => {
    const filter = getFilterById(label);
    const input = filter.find("input");
    const loadingIndicator = filter.find(".s-filter-loading");

    await t.typeText(input, value);
    await t.expect(loadingIndicator.exists).notOk();
    await t.click(filter.find(".s-filter-option"));
};

export const addFilterValueByIndex = async (label, index) => {
    const filter = getFilterById(label);
    const input = filter.find("input");
    await t.click(input);
    const items = await filter.find(".s-filter-option");
    await t.click(items.nth(index));
    await t.expect(items.exist).notOk();
};

export const removeFilterValue = async (label, value) => {
    const filter = getFilterById(label);
    const removedValue = filter.find("div").withAttribute("title", value);
    await t.click(removedValue.find("path"));
};

export const removeFilterValueByIndex = async (label, index) => {
    const filter = getFilterById(label);
    const removedValue = filter.find(".s-filter-multi-value .s-clear-value").nth(index);
    await t.click(removedValue.find("path"));
};

export const getFilterItems = async (filterID) => {
    await waitForChildFilterLoading(filterID);
    const filter = getFilterById(filterID);
    const arrow = filter.find("div").withAttribute("aria-hidden", "true");
    await t.click(arrow);
    const items = await filter.find(".s-filter-option");
    await t.wait(100); // reduces instability

    const count = await items.count;
    const values = await Promise.all(Array(count).fill(null).map((_, index) => {
        return items.nth(index).textContent;
    }));

    await t.click(arrow).expect(items.exists).notOk();
    return values;
};

export const getSelectedFilters = async (label) => {
    const filter = getFilterById(label);
    const selectedFilters = filter.find(".s-filter-multi-value");
    const values = [];

    for (let i = 0; i < await selectedFilters.count; i++) {
        values.push(await selectedFilters.nth(i).textContent);
    }
    return values;
};

export const assertFilterValue = async (label, value) => {
    const filter = getFilterById(label);
    const relevantValue = filter.find(".s-filter-multi-value").withText(value);
    await t.expect(relevantValue.exists).ok();
};

export const resetChanges = () => t.click(Selector(".controlLink .linkIcon"));

export const clearAll = () => t.click(Selector(".controlLink").withText("✕ Clear all"));

export const applyFilter = () => t.click(Selector(".FilterApply"));

// Waiting

export const waitForLoading = async (element) => {
    const loading = await element.find(".s-loading");
    await t.hover(element);
    if (loading.exists) {
        await t
            .expect(loading.exists)
            .notOk("Loading did not disappear in time", { timeout: 120000 }); // timeout needs to be longer than the longest uncached visualization takes to load
    }
};

export const assertTooltipExists = async (visualizationID , value) => {
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationID);
    const element = visualizationBlock.find(".highcharts-series-0 .highcharts-point").nth(0);
    const tooltipTitle = Selector(".gd-viz-tooltip-content .gd-viz-tooltip-title");
    await waitForLoading(visualizationBlock);
    await t
        .hover(element)
        .click(element)
        .expect(tooltipTitle.innerText).contains(value);
};

export const assertTooltipOfVisualizationExists = async (visualizationID , value) => {
    const visualization = await getVisualizationByIdentifier(visualizationID);
    const element = visualization.find(".highcharts-series-0 .highcharts-point").nth(0);
    const tooltipTitle = Selector(".gd-viz-tooltip-content .gd-viz-tooltip-title");
    await waitForLoading(visualization);
    await t
        .hover(element)
        .click(element)
        .expect(tooltipTitle.innerText).contains(value);
};

export const waitForChildFilterLoading = async (filterID) => {
    const filter = getFilterById(filterID);
    const filterLoading = await filter.find(".s-filter-loading");
    if (filterLoading.exists) {
        await t
            .expect(filterLoading.exists)
            .notOk();
    }
};

// In case of a problem in router, it may render multiple routes at once
export const expectSingleDashboardContent = () => {
    const dashboardContent = Selector(".s-dashboard-content");
    return t
        .expect(dashboardContent.count).eql(1);
};

// Legend

export const hasLegend = async (webElement) => {
    await t
        .expect(webElement.visible)
        .ok();
    return await webElement.find(".viz-static-legend-wrap").exists;
};

export const getAxisTitle = async (webElement) => {
    await t
        .expect(webElement.visible)
        .ok();
    return await webElement.find(".highcharts-xaxis .highcharts-axis-title").textContent;
};

// Google tag manager

export const assertDataLayersExists = async data => {
    const dataLayer = await t.eval(() => window[`dataLayer`]);
    const dataLayerJson = dataLayer.pop();
    await t
        .expect(await `${dataLayerJson["isGoodData"]}`).eql("yes", "isGoodData is always yes for tests")
        .expect(await `${Object.values(dataLayerJson["page"])}`).eql(`${Object.values(data["page"])}`,"page attribute should be equal")
        .expect(await `${dataLayerJson["event"]}`).eql(`${data["event"]}`, "event attribute should be equal");
}
