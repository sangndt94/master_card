// (C) 2020 GoodData Corporation
import {getVisualizationBlockByIdentifier} from "../helpers/pageUtils";
import {getVisualizationByIdentifier} from "./pageUtils";

// visualization block

export const getLegendColor = async (visualizationID, legend) => {
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationID);
    return visualizationBlock.find(".series-name")
        .withAttribute('title', legend)
        .prevSibling()
        .getStyleProperty('background-color');
};

export const hasDataWithLegend = async (visualizationID, legendItem) => {
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationID);
    const legendColor = await getLegendColor(visualizationID, legendItem);
    return await visualizationBlock.find(".highcharts-tracker path")
        .withAttribute('fill', legendColor.replace(/\s/g, '')).count !== 0;
};

export const hasDataWithLegendWithRect = async (visualizationID, legendItem) => {
    const visualizationBlock = await getVisualizationBlockByIdentifier(visualizationID);
    const legendColor = await getLegendColor(visualizationID, legendItem);
    return await visualizationBlock.find(".highcharts-tracker rect")
        .withAttribute('fill', legendColor.replace(/\s/g, '')).count !== 0;
};

// visualization

export const getLegendColorByVisualization = (visualizationID, legend) => {
    const visualization = getVisualizationByIdentifier(visualizationID);
    return visualization.find(".series-name")
        .withAttribute('title', legend)
        .prevSibling()
        .getStyleProperty('background-color');
};

export const hasDataWithLegendByPath = async (visualizationID, legendItem) => {
    const visualization = await getVisualizationByIdentifier(visualizationID);
    const legendColor = await getLegendColorByVisualization(visualizationID, legendItem);
    return await visualization.find(".highcharts-tracker path")
        .withAttribute('fill', legendColor.replace(/\s/g, '')).count !== 0;
};
