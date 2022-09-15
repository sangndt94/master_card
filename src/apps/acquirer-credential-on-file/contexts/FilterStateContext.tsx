// (C) 2020 GoodData Corporation
import React, { createContext, useState } from "react";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { AttributeFilter, IFilterCollection } from "../../../types";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";
import { getLimitingMeasureOptions } from "../../../components/filters/utils";
import { defaultFilterQueryOptions } from "../../../components/filters/constants";
import { AFM } from "@gooddata/typings";

export type FilterId =
    | "month"
    | "ica"
    | "regionAndCountry"
    | "corridor"
    | "channel"
    | "cardType"
    | "merchantClassificationAndCategory"
    | "aggregateMerchant";

export type NormalizedFilterId =
    | "month"
    | "ica"
    | "regionAndCountry_parent"
    | "regionAndCountry_child"
    | "corridor"
    | "channel"
    | "cardType"
    | "merchantClassificationAndCategory_parent"
    | "merchantClassificationAndCategory_child"
    | "aggregateMerchant";

export const filterList: NormalizedFilterId[] = [
    "month",
    "ica",
    "regionAndCountry_parent",
    "regionAndCountry_child",
    "corridor",
    "channel",
    "cardType",
    "merchantClassificationAndCategory_parent",
    "merchantClassificationAndCategory_child",
    "aggregateMerchant",
];

export const standardFilterList: NormalizedFilterId[] = [
    "month",
    "ica",
    "regionAndCountry_parent",
    "regionAndCountry_child",
    "corridor",
    "channel",
    "cardType",
];

const filtersConfig: { [key in FilterId]: AttributeFilter } = {
    month: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Month",
        displayFormIdentifier: "period.act81lMifn6q",
        preset: "S",
        isMulti: true,
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    ica: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "ICA",
        displayFormIdentifier: "label.ica.ica.icaname",
        preset: "S",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
    },
    regionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.country.region",
        parentAttributeDisplayFormIdentifier: "label.country.region",
        parentPlaceholder: "Region",
        parentPreset: "S",
        parentAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
        childValues: [],
        childAttributeIdentifier: "attr.country.country",
        childAttributeDisplayFormIdentifier: "label.country.country",
        childPlaceholder: "Country",
        childPreset: "S",
        childAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
        commonAncestorAttributeIdentifier: "attr.country.country",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor",
        displayFormIdentifier: "label.corridor.crossborder2",
        preset: "S",
    },
    channel: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel",
        displayFormIdentifier: "label.channel.channeldetail",
        preset: "S",
    },
    cardType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Type",
        displayFormIdentifier: "label.producttype.cardproducttype",
        preset: "S",
    },
    merchantClassificationAndCategory: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.merchantcategory.merchantclassification",
        parentAttributeDisplayFormIdentifier: "label.merchantcategory.merchantclassification.name",
        parentPlaceholder: "Merchant Classification",
        parentPreset: "S",
        childValues: [],
        childAttributeIdentifier: "attr.merchantcategory.merchantcategory",
        childAttributeDisplayFormIdentifier: "label.merchantcategory.merchantcategory.name",
        childPlaceholder: "Merchant Category",
        childPreset: "S",
        commonAncestorAttributeIdentifier: "attr.merchantcategory.merchantcategory",
    },
    aggregateMerchant: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Aggregate Merchant",
        displayFormIdentifier: "label.cofmerchant.aggmerchname",
        preset: "S",
    },
};

const FilterStateContext = createContext<IFilterContext>({} as any);

export const FilterStateProvider: React.FC = ({ children }) => {
    const [filterState, setFilterState] = useState(filtersConfig as IFilterCollection);

    return (
        <FilterStateContext.Provider
            value={{
                filterState,
                setFilterState,
            }}
        >
            {children}
        </FilterStateContext.Provider>
    );
};

export const useFilters = createUseFilters<NormalizedFilterId>(FilterStateContext);

const disableVisFilter = (
    visFilters: AFM.IPositiveAttributeFilter[],
    filtered: AttributeFilter,
): AFM.IPositiveAttributeFilter[] =>
    visFilters.filter(
        (filter) =>
            (filter.positiveAttributeFilter.displayForm as AFM.IObjIdentifierQualifier).identifier !==
            filtered["displayFormIdentifier"],
    );

export const disableCorridorFilter = (
    visFilters: AFM.IPositiveAttributeFilter[],
): AFM.IPositiveAttributeFilter[] => disableVisFilter(visFilters, filtersConfig.corridor);
export const disableChannelFilter = (
    visFilters: AFM.IPositiveAttributeFilter[],
): AFM.IPositiveAttributeFilter[] => disableVisFilter(visFilters, filtersConfig.channel);
export const disableCardTypeFilter = (
    visFilters: AFM.IPositiveAttributeFilter[],
): AFM.IPositiveAttributeFilter[] => disableVisFilter(visFilters, filtersConfig.cardType);
