// (C) 2019 GoodData Corporation
import {
    getValidSanitizedFilterValues,
    getHasMore,
    canAutoSelectIndex,
    areFiltersFinished,
    isFilterFinished,
    getFirstPendingFilter,
    isFilterReady,
    getNextFiltersSequence,
} from "../utils";
import noop from "lodash/noop";
import { IValidElementsResponse } from "@gooddata/gooddata-js";

describe("getValidSanitizedFilterValues", () => {
    it("should return empty array for empty input", () => {
        const input = [];
        const expected = [];
        const actual = getValidSanitizedFilterValues("foo", input);

        expect(actual).toEqual(expected);
    });

    it("should map input items to label/value objects", () => {
        const input = [{ element: { title: "foo", uri: "/gdc/md/foo" } }];
        const expected = [{ label: "foo", value: "/gdc/md/foo" }];
        const actual = getValidSanitizedFilterValues("foo", input);

        expect(actual).toEqual(expected);
    });

    it("should filter out items according to blacklist", () => {
        const input = [
            { element: { title: "foo", uri: "/gdc/md/foo" } },
            { element: { title: "bar", uri: "/gdc/md/bar" } },
        ];
        const expected = [{ label: "foo", value: "/gdc/md/foo" }];
        const actual = getValidSanitizedFilterValues("foo", input, ["bar"]);

        expect(actual).toEqual(expected);
    });
});

const common: {
    items: IValidElementsResponse["validElements"]["items"];
    elementsMeta: IValidElementsResponse["validElements"]["elementsMeta"];
} = {
    items: [],
    elementsMeta: {
        attribute: "attributeIdentifier",
        attributeDisplayForm: "attributeDisplayFormIdentifier",
        filter: null,
        order: null,
    },
};

describe("getHasMore", () => {
    it("should return false for offset 0 and count === total", () => {
        const response: IValidElementsResponse = {
            validElements: { paging: { count: 20, offset: "0", total: "20" }, ...common },
        };
        const actual = getHasMore(response);
        expect(actual).toEqual(false);
    });

    it("should return false for offset 5 and count === total - 5", () => {
        const response: IValidElementsResponse = {
            validElements: { paging: { count: 15, offset: "5", total: "20" }, ...common },
        };
        const actual = getHasMore(response);
        expect(actual).toEqual(false);
    });

    it("should return true for offset 0 and count < total", () => {
        const response: IValidElementsResponse = {
            validElements: { paging: { count: 10, offset: "0", total: "20" }, ...common },
        };
        const actual = getHasMore(response);
        expect(actual).toEqual(true);
    });

    it("should return true for offset 5 and count + 5 < total", () => {
        const response = { validElements: { paging: { count: 10, offset: "5", total: "20" }, ...common } };
        const actual = getHasMore(response);
        expect(actual).toEqual(true);
    });
});

describe("canAutoSelectIndex", () => {
    it("should return false if some items are already selected", () => {
        const actual = canAutoSelectIndex(
            0,
            { validElements: { paging: { count: 20, offset: "0", total: "20" }, ...common } },
            [{ label: "foo", value: "foo" }],
            [{ label: "bar", value: "bar" }],
        );

        expect(actual).toEqual(false);
    });

    it("should return false if option at index is not available", () => {
        const actual = canAutoSelectIndex(
            1,
            { validElements: { paging: { count: 20, offset: "0", total: "20" }, ...common } },
            [],
            [{ label: "foo", value: "foo" }],
        );

        expect(actual).toEqual(false);
    });

    it("should return false if there is and offset", () => {
        const actual = canAutoSelectIndex(
            0,
            { validElements: { paging: { count: 10, offset: "10", total: "20" }, ...common } },
            [],
            [{ label: "foo", value: "foo" }],
        );

        expect(actual).toEqual(false);
    });

    it("should return true if there is no offset, no selected values and options are available", () => {
        const actual = canAutoSelectIndex(
            0,
            { validElements: { paging: { count: 10, offset: "0", total: "20" }, ...common } },
            [],
            [{ label: "foo", value: "foo" }],
        );

        expect(actual).toEqual(true);
    });
});

describe("isFilterFinished", () => {
    it("should return true if a filter is NOT auto select", () => {
        const actual = isFilterFinished({
            id: "test",
            displayFormIdentifier: "test",
            onChange: noop,
            placeholder: "test",
            selectedValues: [],
        });

        expect(actual).toEqual(true);
    });
    it("should return true if a filter is auto select and already selected", () => {
        const actual = isFilterFinished({
            id: "test2",
            displayFormIdentifier: "test2",
            onChange: noop,
            placeholder: "test2",
            autoSelectIndex: 0,
            selectedValues: [
                {
                    label: "testLabel",
                    value: "testValue",
                },
            ],
        });

        expect(actual).toEqual(true);
    });
    it("should return false if a filter has autoSelectIndex and has no value selected", () => {
        const actual = isFilterFinished({
            id: "test2",
            displayFormIdentifier: "test2",
            onChange: noop,
            placeholder: "test2",
            autoSelectIndex: 0,
            selectedValues: [],
        });

        expect(actual).toEqual(false);
    });
});

const filterWithoutValueWithoutAutoSelect = {
    id: "test",
    displayFormIdentifier: "test",
    onChange: noop,
    placeholder: "test",
    selectedValues: [],
};

const filterWithoutValueWithAutoSelect = {
    id: "test3",
    displayFormIdentifier: "test3",
    onChange: noop,
    placeholder: "test3",
    autoSelectIndex: 0,
    selectedValues: [],
};

const filterWithValueWithAutoSelect = {
    id: "test2",
    displayFormIdentifier: "test2",
    onChange: noop,
    placeholder: "test2",
    autoSelectIndex: 0,
    selectedValues: [
        {
            label: "testLabel",
            value: "testValue",
        },
    ],
};

describe("areFiltersFinished", () => {
    it("should return true if no filters are available", () => {
        const actual = areFiltersFinished([]);

        expect(actual).toEqual(true);
    });
    it("should return true if all filters are either not auto select filters or are already selected", () => {
        const actual = areFiltersFinished([
            filterWithoutValueWithoutAutoSelect,
            filterWithValueWithAutoSelect,
        ]);

        expect(actual).toEqual(true);
    });
    it("should return false if a filter has autoSelectIndex and has no value selected", () => {
        const actual = areFiltersFinished([filterWithoutValueWithAutoSelect]);

        expect(actual).toEqual(false);
    });
});

describe("getFirstPendingFilter", () => {
    it("should return undefined if there are no filters", () => {
        const actual = getFirstPendingFilter([]);

        expect(actual).toBe(undefined);
    });
    it("should return undefined if there is no pending filter", () => {
        const actual = getFirstPendingFilter([filterWithoutValueWithoutAutoSelect]);

        expect(actual).toBe(undefined);
    });
    it("should return first pending filter", () => {
        const actual = getFirstPendingFilter([
            filterWithValueWithAutoSelect,
            filterWithoutValueWithAutoSelect,
            {
                ...filterWithoutValueWithAutoSelect,
                id: "test4",
            },
        ]);

        expect(actual).toBe(filterWithoutValueWithAutoSelect);
    });
});

describe("isFilterReady", () => {
    it("should return true if the filter at filterIndex is finished", () => {
        const actual = isFilterReady(
            [filterWithoutValueWithAutoSelect, filterWithoutValueWithoutAutoSelect],
            1,
        );

        expect(actual).toEqual(true);
    });
    it("should return true if the filter at filterIndex is the first NOT finished filter", () => {
        const actual = isFilterReady(
            [filterWithoutValueWithoutAutoSelect, filterWithoutValueWithAutoSelect],
            1,
        );

        expect(actual).toEqual(true);
    });
    it("should return false if the filter at filterIndex is NOT finished and when there are other NOT finished filters on lower indexes", () => {
        const actual = isFilterReady(
            [
                filterWithoutValueWithAutoSelect,
                filterWithoutValueWithoutAutoSelect,
                {
                    ...filterWithoutValueWithAutoSelect,
                    id: "test4",
                },
            ],
            2,
        );

        expect(actual).toEqual(false);
    });
});

describe("getNextFiltersSequence", () => {
    it("should return all ready filters", () => {
        const actual = getNextFiltersSequence([
            filterWithoutValueWithAutoSelect,
            {
                ...filterWithoutValueWithAutoSelect,
                id: "test4",
            },
            filterWithoutValueWithoutAutoSelect,
        ]);

        expect(actual).toEqual([filterWithoutValueWithAutoSelect, filterWithoutValueWithoutAutoSelect]);
    });
});
