// (C) 2019 GoodData Corporation
import React, { useState, createContext } from "react";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../../constants";
import { defaultFilterQueryOptions } from "../../../../components/filters/constants";
import createUseFilters, { IFilterContext } from "../../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../../types";
import { getLimitingMeasureOptions } from "../../../../components/filters/utils";

const filtersConfig: IFilterCollection = {
    // basic
    monthYear: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Month",
        displayFormIdentifier: "period.act81lMifn6q", // DisplayForm Short (Jan 2010)
        preset: "S",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    channelSummaryCpCnp: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel Summary (CP/CNP)",
        displayFormIdentifier: "label.acquirerbenchmarking.channel2",
        preset: "S",
    },
    channelDetail: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel Detail",
        displayFormIdentifier: "label.acquirerbenchmarking.channeldetail",
        preset: "L",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor (Domestic/Cross-border)",
        displayFormIdentifier: "label.acquirerbenchmarking.crossborder2",
        preset: "S",
    },
    creditOrDebit: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Credit or Debit",
        displayFormIdentifier: "label.acquirerbenchmarking.creditdebit",
        preset: "S",
    },
    cardType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Type",
        displayFormIdentifier: "label.acquirerbenchmarking.cardtype",
        preset: "M",
    },
    merchantClassification: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Merchant Classification",
        displayFormIdentifier: "label.acquirerbenchmarking.merchantclassification.name",
        preset: "M",
    },
    productGroup: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Product Group",
        displayFormIdentifier: "label.acquirerbenchmarking.productgroup",
        preset: "M",
    },
    acquirerIca: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Acquirer ICA",
        displayFormIdentifier: "label.acquirerbenchmarking.acquirerica.icaname",
        preset: "L",
    },
    // parent child
    cidAndAcquirerIca: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.customer.cid",
        parentAttributeDisplayFormIdentifier: "label.customer.cid.name",
        parentPlaceholder: "CID",
        parentPreset: "MAIN",
        childValues: [],
        childAttributeIdentifier: "attr.acquirerbenchmarking.acquirerica",
        childAttributeDisplayFormIdentifier: "label.acquirerbenchmarking.acquirerica.icaname",
        childPlaceholder: "Acquirer ICA",
        childPreset: "L",
        commonAncestorAttributeIdentifier: "attr.acquirerbenchmarking.factsof",
        clearChildOnParentChange: true,
    },
    regionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.acquirerbenchmarking.region",
        parentAttributeDisplayFormIdentifier: "label.acquirerbenchmarking.region",
        parentPlaceholder: "Region",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.acquirerbenchmarking.country",
        childAttributeDisplayFormIdentifier: "label.acquirerbenchmarking.country",
        childPlaceholder: "Country",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.acquirerbenchmarking.factsof",
    },
};

const FilterStateContext = createContext<IFilterContext>({} as any);

export const FilterStateProvider: React.FC = ({ children }) => {
    const [filterState, setFilterState] = useState(filtersConfig);

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

export const useFilters = createUseFilters(FilterStateContext);
