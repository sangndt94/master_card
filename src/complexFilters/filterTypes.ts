// (C) 2020 GoodData Corporation

import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";
import { IValidElementsResponse } from "@gooddata/gooddata-js";
import { IVisualizationProps } from "@gooddata/react-components/dist/components/uri/Visualization";

export type ProjectId = string;
export type DisplayFormIdentifier = string;
export type MeasureIdentifier = string;

export type ElementsCacheByPagingIdentifier = Map<IValidElementsOptions, IValidElementsResponse>;
export type ElementsCacheByDisplayFormIdentifier = Map<
    DisplayFormIdentifier,
    ElementsCacheByDisplayFormIdentifier
>;
export type ElementsCacheByProjectId = Map<ProjectId, ElementsCacheByDisplayFormIdentifier>;

export const elementsCache = new Map<ProjectId, ElementsCacheByDisplayFormIdentifier>();

export type FilterId = string;
export type AttributeDisplayFormIdentifier = string;

export type FilterPreset = "S" | "M" | "L";

export interface IAutoSelectValue {
    value: string;
}
export interface IAutoSelectIndex {
    index: number;
}
export type AutoSelect = IAutoSelectValue | IAutoSelectIndex;

export type ItemValue = string;

export type FilterType =
    | "expressionFilter"
    | "measureValueFilter"
    | "absoluteDateFilter"
    | "relativeDateFilter"
    | "positiveAttributeFilter"
    | "negativeAttributeFilter";

/**
 * IFilterDeclaration
 * Use this to define filters without having to explicitly specify all properties.
 */
export interface IFilterDeclaration extends Omit<IValidElementsOptions, "limit" | "offset"> {
    /**
     * Must be unique. Should match declarationMap key.
     */
    id: FilterId;
    /**
     * Workspace ID. Do not mix different projectIds in one declarationMap.
     */
    projectId: ProjectId;
    attributeDisplayFormIdentifier: AttributeDisplayFormIdentifier;
    label: React.ReactNode;
    placeholder?: React.ReactNode;
    /**
     * Can be used in a Filter component to specify special styles or sizes of the component.
     */
    preset?: FilterPreset;
    /**
     * Can have more than one value selected. default is false = single select.
     */
    isMultiSelect?: boolean;
    /**
     * This will be initial value if filter switches types like: positiveAttributeFilter <-> negativeAttributeFilter.
     */
    defaultFilterType?: FilterType;
    /**
     * Automatically selects a value by either index or text match. Requires selected value before filters are considered ready.
     */
    autoSelect?: AutoSelect;
    /**
     * Restrict elements by selected items of other filter ids (Parent(FilterId) -> child(this filter)).
     */
    restrictedByFilterIds?: FilterId[];
    /**
     * Only show elements that have data for any of the listed measure identifiers
     */
    restrictedByMeasureIdentifiers?: MeasureIdentifier[];
    /**
     * Element items selected but not applied. These DO NOT affect visualizationFilters, but DO affect restricted filters.
     */
    selectedItems?: ItemValue[];
    /**
     * Element items selected AND applied. These DO affect visualizationFilters, but DO NOT affect restricted filters.
     */
    selectedItemsApplied?: ItemValue[];
    /**
     * Component name to be used as a presentational component of this filter. FilterBar will try to resolve this using filterComponentMap[filterState.Component]
     */
    Component?: string;
}

/**
 * IFilterState
 * This is the internal state of a complex filter. It's based on IFilterDeclaration, adds default values and properties that define current state of the filter.
 * Optional properties of IFilterDeclaration should be required in IFilterState.
 */
export interface IFilterState extends IFilterDeclaration {
    /**
     * Can have more than one value selected. default is false = single select.
     */
    isMultiSelect: boolean;
    /**
     * This will be initial value if filter switches types like: positiveAttributeFilter <-> negativeAttributeFilter.
     */
    defaultFilterType: FilterType;
    /**
     * Current filter type. FilterBar can use this to decide what component should be used: filterComponentMap[filterState.filterType] if Component is not specified.
     */
    filterType: FilterType;
    /**
     * True if filter is dependant on other filter which is not yet ready
     */
    isPendingDependency: boolean;
    /**
     * True if filter should have some selected elements but does not have any selected yet.
     */
    isPendingSelectedElements: boolean;
    /**
     * Restrict elements by selected items of other filter ids (Parent(FilterId) -> child(this filter)).
     */
    restrictedByFilterIds: FilterId[];
    /**
     * Only show elements that have data for any of the listed measure identifiers
     */
    restrictedByMeasureIdentifiers: MeasureIdentifier[];
    /**
     * Current filter error. E.g. Authorization required or Connection error
     */
    error: Error | undefined;
    /**
     * Element items selected but not applied. These DO NOT affect visualizationFilters, but DO affect restricted filters.
     */
    selectedItems: ItemValue[];
    /**
     * Element items selected AND applied. These DO affect visualizationFilters, but DO NOT affect restricted filters.
     */
    selectedItemsApplied: ItemValue[];
}

export interface IFilterDeclarationMap {
    [key: string]: IFilterDeclaration;
}

export type SetFiltersState = React.Dispatch<React.SetStateAction<IFilterState[]>>;
export type SetFilterState = React.Dispatch<React.SetStateAction<IFilterState>>;
export type SetSelectedItems = React.SetStateAction<IFilterState["selectedItems"]>;

// Consider CompatibilityFilter, ExtendedFilter
export type VisualizationFilter = IVisualizationProps["filters"][0];

export interface IUseFiltersState {
    filtersState: IFilterState[];
    updateFilterSelectedItems: (filterId: FilterId, selectedItemsDispatch: SetSelectedItems) => void;
    applyFilters: (filterIds?: FilterId[]) => void;
    resetFilters: (filterIds?: FilterId[]) => void;
    clearFilters: (filterIds?: FilterId[], ignoreAutoSelect?: boolean) => void;
    setAttributeFilter: (filterId?: string) => void;
    updateFilterError: (filterId: FilterId, error: Error) => void;
    areAppliedFiltersReady: boolean;
}

export interface IFiltersContext {
    filtersState: IFilterState[];
    setFiltersState: SetFiltersState;
}

export type UseFiltersState = (usedFilterIds: FilterId[]) => IUseFiltersState;

export type GetFilterElements = (
    offset: number,
    limit?: number,
    search?: string,
) => Promise<IValidElementsResponse>;

export type UseFilterElements = (
    filterId: FilterId,
) => { getFilterElements: GetFilterElements; filterElementsContext: string };

export interface IFilterProps extends IFilterState {
    className?: string;
    useFilterElements: UseFilterElements;
    clearFilters: IUseFiltersState["clearFilters"];
    updateFilterSelectedItems: IUseFiltersState["updateFilterSelectedItems"];
    Component: string;
}
export function isAutoSelectIndex(autoSelect?: AutoSelect): autoSelect is IAutoSelectIndex {
    return typeof autoSelect !== "undefined" && "index" in autoSelect;
}

export function isAutoSelectValue(autoSelect?: AutoSelect): autoSelect is IAutoSelectValue {
    return typeof autoSelect !== "undefined" && "value" in autoSelect;
}
