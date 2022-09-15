// (C) 2020 GoodData Corporation
import React, { useState, createContext } from "react";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { AttributeFilter, IFilterCollection } from "../../../types";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";

export type FilterId = "cidAndIca" | "country" | "productGroup";

export type NormalizedFilterId = "cidAndIca_parent" | "cidAndIca_child" | "country" | "productGroup";

export const filterList: NormalizedFilterId[] = [
    "cidAndIca_parent",
    "cidAndIca_child",
    "country",
    "productGroup",
];

const filtersConfig: { [key in FilterId]: AttributeFilter } = {
    country: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Country",
        displayFormIdentifier: "label.issuerbenchmarking.country",
        preset: "M",
        isMulti: false,
        autoSelectIndex: 0,
    },
    cidAndIca: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.customer.cid",
        parentAttributeDisplayFormIdentifier: "label.customer.cid.name",
        parentPlaceholder: "CID",
        parentPreset: "MAIN",
        parentAutoSelectIndex: 0,
        parentIsMulti: false,
        childValues: [],
        childAttributeIdentifier: "attr.issuerbenchmarking.issuerica",
        childAttributeDisplayFormIdentifier: "label.issuerbenchmarking.issuerica.icaname",
        childPlaceholder: "ICA",
        childPreset: "L",
        commonAncestorAttributeIdentifier: "attr.issuerbenchmarking.factsof",
        clearChildOnParentChange: true,
        childAutoSelectIndex: 0,
        childIsMulti: false,
    },
    productGroup: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Product Group",
        displayFormIdentifier: "label.issuerbenchmarking.productgroup",
        preset: "M",
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
