// (C) 2007-2019 GoodData Corporation
import { Model } from "@gooddata/react-components";
import { VisualizationInput, VisualizationObject } from "@gooddata/typings";
import { IAttributeFilterValue, INormalizedAttributeFilter } from "../types";

// TODO model helpers add textFilter: false which webapp does not pass through validation. we should fix the helpers to include textFilter only when true
const fixTextFilter = ({ positiveAttributeFilter }): VisualizationInput.IPositiveAttributeFilter => ({
    positiveAttributeFilter: {
        displayForm: positiveAttributeFilter.displayForm,
        in: positiveAttributeFilter.in,
        ...(positiveAttributeFilter.textFilter && { textFilter: positiveAttributeFilter.textFilter }),
    },
});

const getVisualizationFilterFor = (displayFormIdentifier: string, selectedValues: IAttributeFilterValue[]) =>
    fixTextFilter(
        Model.attributeFilter(displayFormIdentifier).inUris(
            ...selectedValues.map((selectedValue) => selectedValue.value),
        ),
    );

const getVisualizationFiltersForBasicFilter = (filter: INormalizedAttributeFilter) =>
    (filter.selectedValues && filter.selectedValues.length) > 0
        ? getVisualizationFilterFor(filter.displayFormIdentifier, filter.selectedValues)
        : null;

export const getVisFilters = (filters: INormalizedAttributeFilter[]) =>
    filters.map((filter) => getVisualizationFiltersForBasicFilter(filter)).filter(Boolean);

export const getAllFilters = (
    visualizationObject: VisualizationObject.IVisualizationObject,
    filters: VisualizationObject.VisualizationObjectFilter[] = [],
): VisualizationInput.IFilter[] => {
    const allFilters = [...(visualizationObject.content.filters || []), ...filters].filter((filter) => {
        // Measure value filter is not supported
        if (!VisualizationObject.isMeasureValueFilter(filter)) {
            if (VisualizationObject.isAttributeFilter(filter)) {
                if (VisualizationObject.isPositiveAttributeFilter(filter)) {
                    return filter.positiveAttributeFilter.in.length > 0;
                }
                return filter.negativeAttributeFilter.notIn.length > 0;
            }
            return true;
        }
        // tslint:disable-next-line:no-console
        console.warn(`Measure value filter is not supported in BucketExecutor: ${JSON.stringify(filter)}`);
        return false;
    });
    // Without measure filter the types should be compatible
    return allFilters as VisualizationInput.IFilter[];
};

export const getSampleVisualizationObjectWithFilters = ({
    filters = [],
}: {
    filters?: VisualizationObject.VisualizationObjectFilter[];
} = {}): VisualizationObject.IVisualizationObject => ({
    meta: { title: "test" },
    content: {
        visualizationClass: null,
        buckets: [
            {
                items: [
                    {
                        measure: {
                            definition: {
                                measureDefinition: {
                                    item: {
                                        identifier: "m1Identifier",
                                    },
                                },
                            },
                            localIdentifier: "m1",
                            title: "Measure 1",
                        },
                    },
                ],
                localIdentifier: "measures",
            },
            {
                items: [
                    {
                        visualizationAttribute: {
                            displayForm: {
                                identifier: "a1Identifier",
                            },
                            localIdentifier: "a1",
                            title: "Attribute 1", // This is correctly returned even though the type is not correct
                        },
                    } as any, // see "Attribute 1"
                ],
                localIdentifier: "attributes",
            },
        ],
        filters,
    },
});
