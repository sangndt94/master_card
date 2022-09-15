// (C) 2019 GoodData Corporation
import React, { useState, createContext } from "react";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../../constants";
import createUseFilters, { IFilterContext } from "../../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../../types";

const filtersConfig: IFilterCollection = {
    // basic
    channelSummaryCpCnp: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel Summary (CP/CNP)",
        displayFormIdentifier: "label.issuerbenchmarking.channel2",
        preset: "M",
    },
    channelDetail: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel Detail",
        displayFormIdentifier: "label.issuerbenchmarking.channeldetail",
        preset: "L",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor (Domestic/Cross-border)",
        displayFormIdentifier: "label.issuerbenchmarking.crossborder2",
        preset: "M",
    },
    creditOrDebit: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Credit or Debit",
        displayFormIdentifier: "label.issuerbenchmarking.creditdebit",
        preset: "S",
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
        childPreset: "S",
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
