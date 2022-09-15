// (C) 2019 GoodData Corporation
import { AFM, Execution } from "@gooddata/typings";
import { INormalizedAttributeFilter, IAttributeFilterValue } from "../../types";
import { IValidElementsResponse, IElement } from "@gooddata/gooddata-js";

type HiddenValueDefinition = string | RegExp;

const hiddenValuesByIdentifierMap: { [displayFormIdentifier: string]: HiddenValueDefinition[] } = {
    "date.act81lMifn6q": [""],
    "label.accounthistoryreason.reason": ["Unknown Value"],
    "label.acquirerbenchmarking.cardtype": ["UNKNOWN"],
    "label.acquirerbenchmarking.channel2": ["Unclassified"],
    "label.acquirerbenchmarking.channeldetail": ["Unclassified"],
    "label.acquirerbenchmarking.creditdebit": ["UNKNOWN"],
    "label.acquirerbenchmarking.country": ["Unknown Country"],
    "label.acquirerbenchmarking.productgroup": ["PRODUCT GROUP UNDEFINED"],
    "label.acquirerbenchmarking.region": [/^Unknown Business[.]*/],
    "label.customer.cid.name": ["", "UNKNOWN"],
    "label.ica.cid.name": ["", "UNKNOWN"],
    "label.issuerbenchmarking.cardtype": ["UNKNOWN"],
    "label.issuerbenchmarking.channel2": ["Unclassified"],
    "label.issuerbenchmarking.channeldetail": ["Unclassified"],
    "label.issuerbenchmarking.country": ["Unknown Country"],
    "label.issuerbenchmarking.creditdebit": ["UNKNOWN"],
    "label.issuerbenchmarking.productgroup": ["PRODUCT GROUP UNDEFINED"],
    "label.issuerbenchmarking.region": [/^Unknown Business[.]*/],
    "label.mdes.merchantregion": ["Unknown Value"],
    "label.wallet.wallet": ["Unknown Value"],
    "label.fi2.issregion": [/^Unknown Business Region/i],
    "label.fi2.acqregion": [/^Unknown Business Region/i],
    "label.fi2.issregion.issregionshort": [/^Unknown Business Region/i],
    "label.fi2.acqregion.acqregionshort": [/^Unknown Business Region/i],
    "label.fi2.cpcnp": [/^Unclassified/i],
    "label.fi2.drdnrname": [/^Unclassified/i],
    "label.fi2.panentryname": [/^Unknown/i],
    "label.fi2.crossborder3values": [/^Unknown/i],
    "label.fi2.cardprodtype": [/^Other/i],
    "label.fi2.cardprodgroup": [/^Other/i],
};

const getHiddenItemFilter = (hiddenValues: HiddenValueDefinition[]) => ({ label }) => {
    if (hiddenValues.length === 0) {
        return true;
    }
    const matchesHiddenValue = hiddenValues.some((hiddenValue) => {
        return typeof hiddenValue === "string" ? hiddenValue === label : hiddenValue.test(label);
    });
    return !matchesHiddenValue;
};

export const sanitizeValidElementsResponse = (
    displayFormIdentifier: string,
    validElementsResponse: IValidElementsResponse,
    hiddenValues: any[] = hiddenValuesByIdentifierMap[displayFormIdentifier] || [],
): IValidElementsResponse => {
    return {
        validElements: {
            ...validElementsResponse.validElements,
            items: validElementsResponse.validElements.items.filter((item) =>
                getHiddenItemFilter(hiddenValues)({ label: item.element.title }),
            ),
        },
    };
};

export const getValidSanitizedFilterValues = (
    displayFormIdentifier: string,
    rawValues: IElement[],
    hiddenValues: any[] = hiddenValuesByIdentifierMap[displayFormIdentifier] || [],
): IAttributeFilterValue[] =>
    rawValues
        .map(({ element }) => ({
            label: element.title || "(empty value)",
            value: element.uri,
        }))
        .filter(getHiddenItemFilter(hiddenValues || []));

const getPagingInformation = (response: IValidElementsResponse) => {
    const { paging } = response.validElements;
    const { count } = paging;
    const total = Number.parseInt(paging.total, 10);
    const offset = Number.parseInt(paging.offset, 10);

    return {
        count,
        total,
        offset,
    };
};

export const getHasMore = (response: IValidElementsResponse) => {
    const { count, offset, total } = getPagingInformation(response);
    return offset + count < total;
};

export const canAutoSelectIndex = (
    index: number,
    response: IValidElementsResponse,
    selectedValues: any[],
    availableValues: any[],
) => {
    const { offset } = getPagingInformation(response);
    return selectedValues.length === 0 && offset === 0 && availableValues.length >= index + 1;
};

export const getLimitingMeasureOptions = (measureIdentifier: string): { afm: AFM.IAfm } => {
    return {
        afm: {
            measures: [
                {
                    localIdentifier: "limiting_measure",
                    definition: {
                        measure: {
                            item: {
                                identifier: measureIdentifier,
                            },
                        },
                    },
                },
            ],
        },
    };
};

export const isFilterFinished = (filter: INormalizedAttributeFilter): boolean =>
    filter.autoSelectIndex === undefined || filter.selectedValues.length > 0;

export const areFiltersFinished = (filters: INormalizedAttributeFilter[]): boolean => {
    return filters.every(isFilterFinished);
};

// Returns true if the filter is finished or the first pending
export const isFilterReady = (filters: INormalizedAttributeFilter[], filterIndex: number): boolean => {
    const filter = filters[filterIndex];
    return isFilterFinished(filter) || filter === getFirstPendingFilter(filters);
};

// Returns all finished filters and the first pending filter
export const getNextFiltersSequence = (
    filters: INormalizedAttributeFilter[],
): INormalizedAttributeFilter[] => {
    return filters.filter((_filter, filterIndex) => isFilterReady(filters, filterIndex));
};

export const getFirstPendingFilter = (
    filters: INormalizedAttributeFilter[],
): INormalizedAttributeFilter | undefined => {
    return filters.find((filter) => {
        return !isFilterFinished(filter);
    });
};

export const getFilterIdentifier = (filter: AFM.ExtendedFilter): string => {
    if (
        AFM.isPositiveAttributeFilter(filter) &&
        AFM.isObjIdentifierQualifier(filter.positiveAttributeFilter.displayForm)
    ) {
        return filter.positiveAttributeFilter.displayForm.identifier;
    }

    if (
        AFM.isNegativeAttributeFilter(filter) &&
        AFM.isObjIdentifierQualifier(filter.negativeAttributeFilter.displayForm)
    ) {
        return filter.negativeAttributeFilter.displayForm.identifier;
    }

    return undefined;
};

export const generateFilterArray = (
    headers: Execution.IResultHeaderItem[],
    filters: AFM.ExtendedFilter[],
) => {
    return headers
        .map((item) =>
            Execution.isAttributeHeaderItem(item) && item.attributeHeaderItem
                ? item.attributeHeaderItem.uri
                : "",
        )
        .map(
            (item) =>
                !filters
                    .map((filter) => {
                        if (AFM.isPositiveAttributeFilter(filter)) {
                            return filter.positiveAttributeFilter.in.includes(item);
                        }

                        if (AFM.isNegativeAttributeFilter(filter)) {
                            return !filter.negativeAttributeFilter.notIn.includes(item);
                        }

                        return false;
                    })
                    .includes(true),
        );
};
