// (C) 2019 GoodData Corporation
import React from "react";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";

export interface IAppProjectMeta {
    projectRegexp: RegExp;
    projectIdentifier: string;
    getValidProjects: (projects: IProject[]) => IProject[];
    getProjectTitle: (project: IProject) => string;
    dateAttributeDFIdentifier?: string;
    lastMonthMeasureIdentifier?: string;
    laggedMonthMeasureIdentifier?: string;
    isDateRange?: boolean;
}

export interface IAppMeta extends IAppProjectMeta {
    routeBase: string;
    name: string;
    requiredFeatureFlags?: string[];
    FilterStateProvider: React.ComponentType;
    customProviders?: React.ComponentType[];
    routeDefinitions: IRouteDefinition[];
    relevantFor: string[];
    imagePath?: string;
}

export interface ILoadingState<V = any> {
    data: V;
    error: Error;
    isLoading: boolean;
}

export interface IProject {
    links: {
        self: string;
    };
    meta: {
        title: string;
    };
}

export interface IRouteDefinition {
    path: string;
    title: string;
    component: React.ComponentType<any>;
    heading?: string;
    exact?: boolean;
    groupColor?: string;
    omitFromMenu?: boolean;
}

export interface IAttributeFilterValue {
    label: string;
    value: string;
}

export type AttributeFilterPreset = "S" | "M" | "L" | "MAIN";

export interface IBasicAttributeFilter {
    type: "basicAttributeFilter";
    selectedValues: IAttributeFilterValue[];
    selectedValuesUnsaved?: IAttributeFilterValue[];
    placeholder: string;
    displayFormIdentifier: string;
    preset?: AttributeFilterPreset;
    attributeQueryOptions?: Partial<IValidElementsOptions>;
    isMulti?: boolean;
    autoSelectIndex?: number;
    isHidden?: boolean;
}

export interface IParentChildAttributeFilter {
    type: "parentChildAttributeFilter";
    parentValues: IAttributeFilterValue[];
    parentValuesUnsaved?: IAttributeFilterValue[];
    parentAttributeIdentifier: string;
    parentAttributeDisplayFormIdentifier: string;
    parentPlaceholder: string;
    parentPreset?: AttributeFilterPreset;
    parentIsMulti?: boolean;
    parentAutoSelectIndex?: number;
    parentAttributeQueryOptions?: Partial<IValidElementsOptions>;
    parentIsHidden?: boolean;
    childValues: IAttributeFilterValue[];
    childValuesUnsaved?: IAttributeFilterValue[];
    childAttributeIdentifier: string;
    childAttributeDisplayFormIdentifier: string;
    childPlaceholder: string;
    childPreset?: AttributeFilterPreset;
    childIsMulti?: boolean;
    childAutoSelectIndex?: number;
    childAttributeQueryOptions?: Partial<IValidElementsOptions>;
    childIsHidden?: boolean;
    commonAncestorAttributeIdentifier: string;
    clearChildOnParentChange?: boolean;
}

export type AttributeFilter = IBasicAttributeFilter | IParentChildAttributeFilter;

export interface INormalizedAttributeFilter {
    id: string;
    selectedValues: IAttributeFilterValue[];
    selectedValuesUnsaved?: IAttributeFilterValue[];
    placeholder: string;
    displayFormIdentifier: string;
    preset?: AttributeFilterPreset;
    attributeQueryOptions?: Partial<IValidElementsOptions>;
    isMulti?: boolean;
    autoSelectIndex?: number;
    isHidden?: boolean;
    onChange: (values: any, isUnsaved?: boolean) => void;
}

export const isBasicAttributeFilter = (filter: AttributeFilter): filter is IBasicAttributeFilter =>
    filter.type === "basicAttributeFilter";

export const isParentChildAttributeFilter = (
    filter: AttributeFilter,
): filter is IParentChildAttributeFilter => filter.type === "parentChildAttributeFilter";

export interface IFilterCollection {
    [filterId: string]: AttributeFilter;
}
