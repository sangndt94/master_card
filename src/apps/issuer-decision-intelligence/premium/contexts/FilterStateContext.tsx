// (C) 2020 GoodData Corporation
import React, { useState, createContext } from "react";
import createUseFilters, { IFilterContext } from "../../../../hooks/createUseFilters";
import { IFilterCollection, isBasicAttributeFilter } from "../../../../types";
import { BASIC_ATTRIBUTE_FILTER, PARENT_CHILD_ATTRIBUTE_FILTER } from "../../../../constants";
import { defaultFilterQueryOptions } from "../../../../components/filters/constants";
import { getLimitingMeasureOptions } from "../../../../components/filters/utils";

export type NormalizedFilterId =
    | "cidAndIssuingIca_parent"
    | "cidAndIssuingIca_child"
    | "month"
    | "issuingRegion"
    | "merchantRegionAndCountry_parent"
    | "merchantRegionAndCountry_child"
    | "bankCorridor"
    | "productGroup"
    | "authIQSegments"
    | "diScore"
    | "dtiScore"
    | "source"
    | "typeOfFraud"
    | "transactionCorridor"
    | "cardPresence"
    | "approvalIndicator"
    | "authIQRanksOverallCount"
    | "authIQRanksChannelCount"
    | "authIQRanksSegmentCount"
    | "authIQRanksOverallAmount"
    | "authIQRanksChannelAmount"
    | "authIQRanksSegmentAmount"
    | "transactionCategoryCode"
    | "dsSecureCode"
    | "avsResponse"
    | "cvcResponse"
    | "mdes"
    | "wallet"
    | "posChannel"
    | "moto"
    | "recurringPayment";

export const filterList: NormalizedFilterId[] = [
    "cidAndIssuingIca_parent",
    "month",
    "issuingRegion",
    "merchantRegionAndCountry_parent",
    "merchantRegionAndCountry_child",
    "bankCorridor",
    "cidAndIssuingIca_child",
    "productGroup",
    "authIQSegments",
    "diScore",
    "dtiScore",
    "source",
    "typeOfFraud",
    "transactionCorridor",
    "cardPresence",
    "approvalIndicator",
    "authIQRanksOverallCount",
    "authIQRanksChannelCount",
    "authIQRanksSegmentCount",
    "authIQRanksOverallAmount",
    "authIQRanksChannelAmount",
    "authIQRanksSegmentAmount",
    "transactionCategoryCode",
    "dsSecureCode",
    "avsResponse",
    "cvcResponse",
    "mdes",
    "wallet",
    "posChannel",
    "moto",
    "recurringPayment",
];

export const overviewFilterList: NormalizedFilterId[] = [
    "cidAndIssuingIca_parent",
    "month",
    "issuingRegion",
    "merchantRegionAndCountry_parent",
    "merchantRegionAndCountry_child",
    "bankCorridor",
    "cidAndIssuingIca_child",
    "productGroup",
    "authIQSegments",
    "diScore",
    "dtiScore",
    "source",
    "typeOfFraud",
    "transactionCorridor",
    "cardPresence",
    "approvalIndicator",
];

const filtersConfig: IFilterCollection = {
    cidAndIssuingIca: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.di.cid",
        parentAttributeDisplayFormIdentifier: "label.di.cid.cidcodename",
        parentPlaceholder: "CID",
        parentPreset: "MAIN",
        childValues: [],
        childAttributeIdentifier: "attr.di.ica",
        childAttributeDisplayFormIdentifier: "label.di.ica.icacodename",
        childPlaceholder: "Issuing ICA",
        childPreset: "S",
        commonAncestorAttributeIdentifier: "attr.di.factsof",
        clearChildOnParentChange: true,
    },
    month: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Date range",
        displayFormIdentifier: "date.act81lMifn6q",
        preset: "M",
        attributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
            order: "desc",
        },
    },
    issuingRegion: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Issuing Region",
        displayFormIdentifier: "label.di.issuingregion",
        preset: "M",
        isMulti: true,
    },
    merchantRegionAndCountry: {
        type: PARENT_CHILD_ATTRIBUTE_FILTER,
        parentValues: [],
        parentAttributeIdentifier: "attr.di.merchantregion",
        parentAttributeDisplayFormIdentifier: "label.di.merchantregion.merchantregioncodename",
        parentPlaceholder: "Merchant Region",
        parentPreset: "M",
        childValues: [],
        childAttributeIdentifier: "attr.di.merchantcountry",
        childAttributeDisplayFormIdentifier: "label.di.merchantcountry",
        childPlaceholder: "Merchant Country",
        childPreset: "M",
        commonAncestorAttributeIdentifier: "attr.di.factsof",
        parentAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
        childAttributeQueryOptions: {
            ...defaultFilterQueryOptions,
            ...getLimitingMeasureOptions("_svc_min_date"),
        },
    },
    bankCorridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Bank Corridor",
        displayFormIdentifier: "label.di.interintra",
        preset: "M",
        isMulti: true,
    },
    productGroup: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Product Group",
        displayFormIdentifier: "label.di.productgroupname",
        preset: "M",
        isMulti: true,
    },
    authIQSegments: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Segments",
        displayFormIdentifier: "label.di.segmentname",
        preset: "M",
        isMulti: true,
    },
    diScore: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "DI Score",
        displayFormIdentifier: "label.di.discore100",
        preset: "M",
        isMulti: true,
    },
    dtiScore: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "DTI Score",
        displayFormIdentifier: "label.di.dti",
        preset: "M",
        isMulti: true,
    },
    source: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Source",
        displayFormIdentifier: "label.di.sourceindicator",
        preset: "M",
        isMulti: true,
    },
    typeOfFraud: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Type of Fraud",
        displayFormIdentifier: "label.di.isfraud.typeoffraud",
        preset: "M",
        isMulti: true,
    },
    transactionCorridor: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Transaction Corridor",
        displayFormIdentifier: "label.di.merchantgeo",
        preset: "M",
        isMulti: true,
    },
    cardPresence: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Card Presence",
        displayFormIdentifier: "label.di.iscp.cardpresence",
        preset: "M",
        isMulti: true,
    },
    approvalIndicator: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Approval Indicator",
        displayFormIdentifier: "label.di.response.approvalindicator",
        preset: "M",
        isMulti: true,
    },
    // additional collapsible filters
    authIQRanksOverallCount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Overall #",
        displayFormIdentifier: "label.di.totalspendrankcount",
        preset: "M",
        isMulti: true,
    },
    authIQRanksChannelCount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Channel #",
        displayFormIdentifier: "label.di.channelrankcount",
        preset: "M",
        isMulti: true,
    },
    authIQRanksSegmentCount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Segment #",
        displayFormIdentifier: "label.di.segmentrankcount",
        preset: "M",
        isMulti: true,
    },
    authIQRanksOverallAmount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Overall $",
        displayFormIdentifier: "label.di.totalspendrankamount",
        preset: "M",
        isMulti: true,
    },
    authIQRanksChannelAmount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Channel $",
        displayFormIdentifier: "label.di.channelrankamount",
        preset: "M",
        isMulti: true,
    },
    authIQRanksSegmentAmount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AuthIQ Ranks Segment $",
        displayFormIdentifier: "label.di.segmentrankamount",
        preset: "M",
        isMulti: true,
    },
    transactionCategoryCode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "TCC",
        displayFormIdentifier: "label.di.transactioncategorycode",
        preset: "M",
        isMulti: true,
    },
    dsSecureCode: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "3DS / Secure Code",
        displayFormIdentifier: "label.di.dssecurecode",
        preset: "M",
        isMulti: true,
    },
    avsResponse: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "AVS",
        displayFormIdentifier: "label.di.avsresponse",
        preset: "M",
        isMulti: true,
    },
    cvcResponse: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "CVC",
        displayFormIdentifier: "label.di.cvcresponse",
        preset: "M",
        isMulti: true,
    },
    mdes: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "MDES",
        displayFormIdentifier: "label.di.ismdes",
        preset: "M",
        isMulti: true,
    },
    wallet: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Wallet",
        displayFormIdentifier: "label.di.wallet",
        preset: "M",
        isMulti: true,
    },
    posChannel: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "POS Channel",
        displayFormIdentifier: "label.di.poschannel",
        preset: "M",
        isMulti: true,
    },
    moto: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "MO/TO",
        displayFormIdentifier: "label.di.ismoto",
        preset: "M",
        isMulti: true,
    },
    recurringPayment: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Recurring Payment",
        displayFormIdentifier: "label.di.isrecurring",
        preset: "M",
        isMulti: true,
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
