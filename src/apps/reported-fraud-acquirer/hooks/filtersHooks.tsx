// (C) 2020 GoodData Corporation
import { useEffect } from "react";
import { AFM } from "@gooddata/typings";
import {
    getFilterDisplayFormIdentifiers,
    getFilterAttributeQueryOptions,
} from "../contexts/FilterStateContext";
import getElements from "../../../utils/getElements";
import { INormalizedAttributeFilter } from "../../../types";
import { getValidSanitizedFilterValues } from "../../../components/filters/utils";

export const SUCCESS_STATUS = "Success";
export const REJECTED_STATUS = "Rejected";
export const SUSPENDED_STATUS = "Suspended";
export const DELETED_STATUS = "Deleted";

export const addHiddenStatusFilter = async (
    projectId: string,
    visFilters: AFM.IPositiveAttributeFilter[],
    status: string,
) => {
    const elementsState = await getElements(projectId, "label.status.statusid.statusname");
    const statusNameFilteredItem = elementsState.validElements.items.find(
        (item) => item.element.title === status,
    );
    const statusNameFilteredUri = statusNameFilteredItem.element.uri;
    const statusNameFilter = {
        positiveAttributeFilter: {
            displayForm: {
                identifier: "label.status.statusid.statusname",
            },
            in: [statusNameFilteredUri],
        },
    };
    return [...visFilters, statusNameFilter];
};

const getStatusFilterItems = async (projectId: string, statusNames: string[]) => {
    const displayFormIdentifier = getFilterDisplayFormIdentifiers("statusAndCardPresence")[0];
    const elements = await getElements(projectId, displayFormIdentifier);
    const filteredElements = elements.validElements.items.filter((item) =>
        statusNames.some((statusName) => item.element.title === statusName),
    );
    return getValidSanitizedFilterValues(displayFormIdentifier, filteredElements);
};

const setStatusFilter = async (
    projectId: string,
    statusNames: string[],
    filters: INormalizedAttributeFilter[],
    setIsStatusLoading: (isLoading: boolean) => void,
) => {
    setIsStatusLoading(true);
    const statusFilterItems = await getStatusFilterItems(projectId, statusNames);
    filters.find((filter) => filter.id === "statusAndCardPresence_parent").onChange(statusFilterItems);
    setIsStatusLoading(false);
};

export const useInitializeStatusFilter = (
    projectId: string,
    statusNames: string[],
    filters: INormalizedAttributeFilter[],
    setIsStatusLoading: (isLoading: boolean) => void,
) =>
    useEffect(() => {
        setStatusFilter(projectId, statusNames, filters, setIsStatusLoading);
    }, [projectId]);

const getCurrentYearFilterItems = async (projectId: string, dateFilter: string) => {
    const displayFormIdentifier = getFilterDisplayFormIdentifiers(dateFilter)[0];
    const attributeQueryOptions = getFilterAttributeQueryOptions(dateFilter)[0];
    const elements = await getElements(projectId, displayFormIdentifier, attributeQueryOptions);
    const currentYear = new Date().getFullYear();
    const currentYearElements = elements.validElements.items.filter((item) =>
        item.element.title.includes(currentYear.toString()),
    );
    return getValidSanitizedFilterValues(displayFormIdentifier, currentYearElements);
};

const getIsDateFilterCurrentYear = async (
    projectId: string,
    dateFilter: string,
    visFilters: AFM.IPositiveAttributeFilter[],
) => {
    const [monthDisplayFormIdentifier, dayDisplayFormIdentifier] = getFilterDisplayFormIdentifiers(
        dateFilter,
    );
    const currentYearFilterItems = await getCurrentYearFilterItems(projectId, dateFilter);

    if (currentYearFilterItems.length === 0) {
        return false;
    }

    const monthFilter = visFilters.find(
        (filter) =>
            AFM.isObjIdentifierQualifier(filter.positiveAttributeFilter.displayForm) &&
            filter.positiveAttributeFilter.displayForm.identifier === monthDisplayFormIdentifier,
    );

    if (!monthFilter) {
        return false;
    }

    const selectedMonthFilterItems = monthFilter.positiveAttributeFilter.in;

    return (
        selectedMonthFilterItems.length === currentYearFilterItems.length &&
        currentYearFilterItems.every((item) => selectedMonthFilterItems.includes(item.value)) &&
        !visFilters.some(
            (filter) =>
                AFM.isObjIdentifierQualifier(filter.positiveAttributeFilter.displayForm) &&
                filter.positiveAttributeFilter.displayForm.identifier === dayDisplayFormIdentifier,
        )
    );
};

export const useIsDateFilterCurrentYear = (
    projectId: string,
    dateFilter: string,
    visFilters: AFM.IPositiveAttributeFilter[],
    setIsDateFilterCurrentYear: (isDateFilterCurrentYear: boolean) => void,
) =>
    useEffect(() => {
        const checkIsDateFilterCurrentYear = async () => {
            setIsDateFilterCurrentYear(await getIsDateFilterCurrentYear(projectId, dateFilter, visFilters));
        };
        checkIsDateFilterCurrentYear();
    }, [visFilters, projectId]);

export const getClearAndReinitializeFilters = (
    clearFilters: (ignoredFilterIds?: string[]) => void,
    projectId: string,
    statusNames: string[],
    filters: INormalizedAttributeFilter[],
    setIsStatusLoading: (isLoading: boolean) => void,
) => () => {
    clearFilters();
    setStatusFilter(projectId, statusNames, filters, setIsStatusLoading);
};
