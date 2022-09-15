// (C) 2020 GoodData Corporation
import React, { useState, createContext } from "react";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { AttributeFilter, IFilterCollection } from "../../../types";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";
import { getLimitingMeasureOptions } from "../../../components/filters/utils";
import { defaultFilterQueryOptions } from "../../../components/filters/constants";
export type FilterId =
    | "quarter"
    | "ica"
    | "3ds"
    | "corridor"
    | "creditOrDebit"
    | "productGroup"
    | "channelSummaryAndChannelDetail"
    | "regionAndCountry";

export type NormalizedFilterId =
    | "quarter"
    | "ica"
    | "3ds"
    | "corridor"
    | "creditOrDebit"
    | "productGroup"
    | "channelSummaryAndChannelDetail_parent"
    | "channelSummaryAndChannelDetail_child"
    | "regionAndCountry_parent"
    | "regionAndCountry_child";

export const filterList: NormalizedFilterId[] = [
    "quarter",
    "ica",
    "3ds",
    "corridor",
    "creditOrDebit",
    "productGroup",
    "channelSummaryAndChannelDetail_parent",
    "channelSummaryAndChannelDetail_child",
    "regionAndCountry_parent",
    "regionAndCountry_child",
];

const filtersConfig: { [key in FilterId]: AttributeFilter } = {
    quarter: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Quarter",
        displayFormIdentifier: "period.aci81lMifn6q",
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
    },
    "3ds": {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "3DS",
        displayFormIdentifier: "label.fraudbps.securecode",
        preset: "S",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor",
        displayFormIdentifier: "label.corridor.crossborder3",
        preset: "S",
    },
    creditOrDebit: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Credit or Debit",
        displayFormIdentifier: "label.fraudbps.creditdebit",
        preset: "S",
    },
    productGroup: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Product Group",
        displayFormIdentifier: "label.fraudbps.productgroup",
        preset: "M",
    },
    channelSummaryAndChannelDetail: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.channel.channel",
        parentAttributeDisplayFormIdentifier: "label.channel.channel",
        parentPlaceholder: "Channel Summary",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.channel.channeldetail",
        childAttributeDisplayFormIdentifier: "label.channel.channeldetail",
        childPlaceholder: "Channel Detail",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.fraudbps.factsof",
    },
    regionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.country.region",
        parentAttributeDisplayFormIdentifier: "label.country.region",
        parentPlaceholder: "Region",
        parentPreset: "S",
        childValues: [],
        childAttributeIdentifier: "attr.country.country",
        childAttributeDisplayFormIdentifier: "label.country.country",
        childPlaceholder: "Country",
        childPreset: "S",
        commonAncestorAttributeIdentifier: "attr.fraudbps.factsof",
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
