// (C) 2019 GoodData Corporation
import React, { useState, createContext } from "react";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";
import { defaultFilterQueryOptions } from "../../../components/filters/constants";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { IFilterCollection } from "../../../types";
import { getLimitingMeasureOptions } from "../../../components/filters/utils";

const filtersConfig: IFilterCollection = {
    // basic
    issuerIca: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Issuer ICA",
        displayFormIdentifier: "label.ica.issuername",
        preset: "S",
        // TODO the autoSelectIndex behaves strangely when CID changes, disabling for now as a hotfix (see MC-253)
        // autoSelectIndex: 0,
    },
    wallet: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Wallet",
        displayFormIdentifier: "label.wallet.walletname",
        preset: "M",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_available_wallets"),
        },
    },
    tokenRequestor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Token requestor",
        displayFormIdentifier: "label.tokenrequestor.tokenrequestorname",
        preset: "L",
    },
    valueBand: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Value band",
        displayFormIdentifier: "label.mdes.valueband",
        preset: "S",
    },
    month: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Month",
        displayFormIdentifier: "date.act81lMifn6q",
        preset: "S",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    productType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Product type",
        displayFormIdentifier: "label.mdes.producttype",
        preset: "S",
    },
    reasonType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Reason Code",
        displayFormIdentifier: "label.accounthistoryreason.reason",
        preset: "S",
    },
    // parent child
    issuerRegionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.ica.issuerregion",
        parentAttributeDisplayFormIdentifier: "label.ica.issuerregion",
        parentPlaceholder: "Issuer region",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.ica.issuercountry",
        childAttributeDisplayFormIdentifier: "label.ica.issuercountry",
        childPlaceholder: "Issuer country",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.ica.ica",
    },
    merchantRegionAndName: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.mdes.merchantregion",
        parentAttributeDisplayFormIdentifier: "label.mdes.merchantregion",
        parentPlaceholder: "Merchant region",
        parentPreset: "S",
        childValues: [],
        childAttributeIdentifier: "attr.mdes.merchantname",
        childAttributeDisplayFormIdentifier: "label.mdes.merchantname",
        childPlaceholder: "Merchant name",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.mdes.factsof",
    },
    transactionTypeAndDetail: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.mdes.transactiontype",
        parentAttributeDisplayFormIdentifier: "label.mdes.transactiontype",
        parentPlaceholder: "Transaction type",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.mdes.transactiontypedetail",
        childAttributeDisplayFormIdentifier: "label.mdes.transactiontypedetail",
        childPlaceholder: "Transaction type detail",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.mdes.factsof",
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
