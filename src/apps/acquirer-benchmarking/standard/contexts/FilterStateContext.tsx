// (C) 2019 GoodData Corporation
import React, { useState, createContext } from "react";
import { PARENT_CHILD_ATTRIBUTE_FILTER, BASIC_ATTRIBUTE_FILTER } from "../../../../constants";
import { defaultFilterQueryOptions } from "../../../../components/filters/constants";
import createUseFilters, { IFilterContext } from "../../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../../types";
import { getLimitingMeasureOptions } from "../../../../components/filters/utils";

const filtersConfig: IFilterCollection = {
    // basic
    quarterYear: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Quarter",
        displayFormIdentifier: "period.aci81lMifn6q",
        preset: "S",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
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
