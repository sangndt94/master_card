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
        displayFormIdentifier: "label.issuerbenchmarking.channel2",
        preset: "S",
    },
    channelDetail: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel Detail",
        displayFormIdentifier: "label.issuerbenchmarking.channeldetail",
        preset: "S",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor (Domestic/Cross-border)",
        displayFormIdentifier: "label.issuerbenchmarking.crossborder2",
        preset: "M",
    },
    cardType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Type",
        displayFormIdentifier: "label.issuerbenchmarking.cardtype",
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
    cidAndIssuerIca: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.customer.cid",
        parentAttributeDisplayFormIdentifier: "label.customer.cid.name",
        parentPlaceholder: "CID",
        parentPreset: "MAIN",
        childValues: [],
        childAttributeIdentifier: "attr.issuerbenchmarking.issuerica",
        childAttributeDisplayFormIdentifier: "label.issuerbenchmarking.issuerica.icaname",
        childPlaceholder: "Issuer ICA",
        childPreset: "L",
        commonAncestorAttributeIdentifier: "attr.issuerbenchmarking.factsof",
        clearChildOnParentChange: true,
    },
    regionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.issuerbenchmarking.region",
        parentAttributeDisplayFormIdentifier: "label.issuerbenchmarking.region",
        parentPlaceholder: "Region",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.issuerbenchmarking.country",
        childAttributeDisplayFormIdentifier: "label.issuerbenchmarking.country",
        childPlaceholder: "Country",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.issuerbenchmarking.factsof",
    },
    creditOrDebitAndProductGroup: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.issuerbenchmarking.creditdebit",
        parentAttributeDisplayFormIdentifier: "label.issuerbenchmarking.creditdebit",
        parentPlaceholder: "Credit or Debit",
        parentPreset: "S",
        childValues: [],
        childAttributeIdentifier: "attr.issuerbenchmarking.productgroup",
        childAttributeDisplayFormIdentifier: "label.issuerbenchmarking.productgroup",
        childPlaceholder: "Product Type",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.issuerbenchmarking.factsof",
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
