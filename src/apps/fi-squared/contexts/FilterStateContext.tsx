// (C) 2019 GoodData Corporation
import React, { useState, createContext } from "react";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../types";

const filtersConfig: IFilterCollection = {
    // basic
    channel: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Channel",
        displayFormIdentifier: "label.fi2.drdnrname",
        preset: "S",
    },
    cpCnpAndChannel: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.fi2.cpcnp",
        parentAttributeDisplayFormIdentifier: "label.fi2.cpcnp",
        parentPlaceholder: "CP/CNP",
        parentPreset: "S",
        childValues: [],
        childAttributeIdentifier: "attr.fi2.drdnrname",
        childAttributeDisplayFormIdentifier: "label.fi2.drdnrname",
        childPlaceholder: "Channel",
        childPreset: "S",
        commonAncestorAttributeIdentifier: "attr.fi2.factsof",
    },
    cardProductType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Product Type",
        displayFormIdentifier: "label.fi2.cardprodtype",
        preset: "S",
    },
    cardProductGroup: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Product Group",
        displayFormIdentifier: "label.fi2.cardprodgroup",
        preset: "S",
    },
    corridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Corridor",
        displayFormIdentifier: "label.fi2.crossborder3values",
        preset: "S",
    },
    creditOrDebit: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Credit or Debit",
        displayFormIdentifier: "label.fi2.creditordebit",
        preset: "S",
    },
    PANEntryMode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "PAN Entry Mode",
        displayFormIdentifier: "label.fi2.panentryname",
        preset: "S",
    },
    issuerRegion: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Region",
        displayFormIdentifier: "label.fi2.issregion.issregionshort",
        isMulti: false,
        autoSelectIndex: 5,
        preset: "S",
    },
    acquirerRegion: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Region",
        displayFormIdentifier: "label.fi2.acqregion.acqregionshort",
        isMulti: false,
        autoSelectIndex: 5,
        preset: "S",
    },
    issuerMultiRegion: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Region",
        displayFormIdentifier: "label.fi2.issregion.issregionshort",
        isMulti: true,
        preset: "S",
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
