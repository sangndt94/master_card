// (C) 2020 GoodData Corporation
import React, { useState, createContext } from "react";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../types";
import { PARENT_CHILD_ATTRIBUTE_FILTER, BASIC_ATTRIBUTE_FILTER } from "../../../constants";

const filtersConfig: IFilterCollection = {
    country: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Country",
        displayFormIdentifier: "label.country.country.name",
        preset: "M",
        isMulti: false,
        autoSelectIndex: 0,
    },
    cidAndIca: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.ica.cid",
        parentAttributeDisplayFormIdentifier: "label.ica.cid.name",
        parentPlaceholder: "CID",
        parentPreset: "MAIN",
        parentAutoSelectIndex: 0,
        parentIsMulti: false,
        childValues: [],
        childAttributeIdentifier: "attr.ica.childicaid",
        childAttributeDisplayFormIdentifier: "label.ica.childicaid.icaname",
        childPlaceholder: "ICA",
        childPreset: "L",
        commonAncestorAttributeIdentifier: "attr.ica.childicaid",
        clearChildOnParentChange: true,
        childAutoSelectIndex: 0,
        childIsMulti: false,
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

export const useFilters = createUseFilters<"country" | "cidAndIca_child" | "cidAndIca_parent">(
    FilterStateContext,
);
