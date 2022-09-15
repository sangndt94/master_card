// (C) 2020 GoodData Corporation
import React, { useState, createContext } from "react";
import createUseFilters, { IFilterContext } from "../../../hooks/createUseFilters";
import { IFilterCollection, isBasicAttributeFilter } from "../../../types";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../constants";
import { defaultFilterQueryOptions } from "../../../components/filters/constants";
import { getLimitingMeasureOptions } from "../../../components/filters/utils";

const filtersConfig: IFilterCollection = {
    fraudType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Fraud Type",
        displayFormIdentifier: "label.transaction.fraudtype.fraudtypeidanddesc",
        preset: "M",
        isMulti: true,
    },
    merchantName: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Merchant Name",
        displayFormIdentifier: "label.transaction.merchantname",
        preset: "M",
        isMulti: true,
    },
    acquirer: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Acquirer",
        displayFormIdentifier: "label.acquirer.memberidacquirer.memberidandname",
        preset: "M",
        isMulti: true,
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
    },
    issuer: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Issuer",
        displayFormIdentifier: "label.issuer.memberidissuer.memberidandname",
        preset: "M",
        isMulti: true,
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
    },
    mcc: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "MCC",
        displayFormIdentifier: "label.mcc.mcc.mccidanddescription",
        preset: "M",
        isMulti: true,
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
    },
    usTransAmountBucket: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "US Trans Amount Bucket",
        displayFormIdentifier: "label.ustransamountbucket.ustransamountbucket",
        preset: "M",
        isMulti: true,
    },
    errorCode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Error Code",
        displayFormIdentifier: "label.errorcode.errorcode",
        preset: "M",
        isMulti: true,
    },
    submissionType: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Submission Type",
        displayFormIdentifier: "label.transaction.submissiontype",
        preset: "M",
        isMulti: true,
    },
    cardProduct: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Product",
        displayFormIdentifier: "label.transaction.cardproductcode",
        preset: "M",
        isMulti: true,
    },
    securityCode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Security Code",
        displayFormIdentifier: "label.transaction.securitycode.seciritycodeidanddesc",
        preset: "M",
        isMulti: true,
    },
    cardholderPresence: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Cardholder Presence",
        displayFormIdentifier: "label.transaction.cardholderpresencecode.cardholderpresenceidanddesc",
        preset: "M",
        isMulti: true,
    },
    posEntryMode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "POS Entry Mode",
        displayFormIdentifier: "label.transaction.posentrymodecode.posentrymodeidanddesc",
        preset: "M",
        isMulti: true,
    },
    // parent child
    transactionMonthAndDate: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "transactiondate.month",
        parentAttributeDisplayFormIdentifier: "transactiondate.act81lMifn6q",
        parentPlaceholder: "Transaction Month",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "transactiondate.date",
        childAttributeDisplayFormIdentifier: "transactiondate.date.mmddyyyy",
        childPlaceholder: "Transaction Date",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.transaction.transactionid",
        parentAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
        childAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    enteredMonthAndDate: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "submissiondate.month",
        parentAttributeDisplayFormIdentifier: "submissiondate.act81lMifn6q",
        parentPlaceholder: "Entered Month",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "submissiondate.date",
        childAttributeDisplayFormIdentifier: "submissiondate.date.mmddyyyy",
        childPlaceholder: "Entered Date",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.transaction.transactionid",
        parentAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
        childAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    statusAndCardPresence: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.status.statusid",
        parentAttributeDisplayFormIdentifier: "label.status.statusid.statusname",
        parentPlaceholder: "Status",
        parentPreset: "M",
        parentIsHidden: true,
        childValues: [],
        childAttributeIdentifier: "attr.transaction.cardpresenttypecode",
        childAttributeDisplayFormIdentifier: "label.transaction.cardpresenttypecode.cardpresenttypeidanddesc",
        childPlaceholder: "Card Presence",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.transaction.transactionid",
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

export const getFilterDisplayFormIdentifiers = (filterName: string) => {
    const filter = filtersConfig[filterName];
    return isBasicAttributeFilter(filter)
        ? [filter.displayFormIdentifier]
        : [filter.parentAttributeDisplayFormIdentifier, filter.childAttributeDisplayFormIdentifier];
};

export const getFilterAttributeQueryOptions = (filterName: string) => {
    const filter = filtersConfig[filterName];
    return isBasicAttributeFilter(filter)
        ? [filter.attributeQueryOptions]
        : [filter.parentAttributeQueryOptions, filter.childAttributeQueryOptions];
};
