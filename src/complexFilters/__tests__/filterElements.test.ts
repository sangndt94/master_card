// (C) 2019-2020 GoodData Corporation
import {
    getFilterElementsContext,
    getFilterElementsWithPagingContext,
    getElementsOptions,
    getCachedElements,
    IElementsPromiseCache,
} from "../filterElements";
import { initializeFilter } from "../filterUtils";
import { IValidElementsResponse } from "@gooddata/gooddata-js";

const sampleFilterDefinition = {
    id: "a",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.customer.cid.name",
    label: "CID",
};
const sampleFilterState = initializeFilter(sampleFilterDefinition);

describe("getFilterElementsContext", () => {
    it("should return a context for a filter elements request", () => {
        const actual = getFilterElementsContext("a", [sampleFilterState]);
        expect(actual).toEqual({
            filter: {
                attributeDisplayFormIdentifier: "label.customer.cid.name",
                projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                restrictedByMeasureIdentifiers: [],
            },
        });
    });
    it("should include restricting filters with selected elements", () => {
        const actual = getFilterElementsContext("a", [
            { ...sampleFilterState, id: "a", restrictedByFilterIds: ["b"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"] },
        ]);
        expect(actual).toEqual({
            filter: {
                attributeDisplayFormIdentifier: "label.customer.cid.name",
                projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                restrictedByMeasureIdentifiers: [],
            },
            restrictingFilters: [
                {
                    attributeDisplayFormIdentifier: "label.customer.cid.name",
                    filterType: "positiveAttributeFilter",
                    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                    selectedItems: ["123"],
                },
            ],
        });
    });
    it("should ignore restricting filters without selected elements", () => {
        const actual = getFilterElementsContext("a", [
            { ...sampleFilterState, id: "a", restrictedByFilterIds: ["b"] },
            { ...sampleFilterState, id: "b", selectedItems: [] },
        ]);
        expect(actual).toEqual({
            filter: {
                attributeDisplayFormIdentifier: "label.customer.cid.name",
                projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
                restrictedByMeasureIdentifiers: [],
            },
        });
    });
});

describe("getFilterElementsWithPagingContext", () => {
    it("should create a context string with paging", () => {
        const actual = getFilterElementsWithPagingContext("a", [sampleFilterState], 10, 20, "search");
        expect(actual).toBe(
            '{"filter":{"attributeDisplayFormIdentifier":"label.customer.cid.name","projectId":"hwmgtf5okuxmaj4dis462nmhc0i18rkg","restrictedByMeasureIdentifiers":[]},"limit":20,"offset":10,"search":"search"}',
        );
    });
});

describe("getElementsOptions", () => {
    it("should generate an empty options object for non restricted filters", () => {
        const actual = getElementsOptions("a", [sampleFilterState]);
        expect(actual).toEqual({});
    });
    it("should generate options for filters restricted by a measure", () => {
        const actual = getElementsOptions("a", [
            { ...sampleFilterState, restrictedByMeasureIdentifiers: ["measureIdentifier"] },
        ]);
        expect(actual).toEqual({
            afm: {
                attributes: [],
                filters: [],
                measures: [
                    {
                        definition: {
                            measure: {
                                item: {
                                    identifier: "measureIdentifier",
                                },
                            },
                        },
                        localIdentifier: "measureIdentifier",
                    },
                ],
            },
        });
    });
    it("should pass order, restrictiveDefinition and restrictiveDefinitionContent and afm to options", () => {
        const actual = getElementsOptions("a", [
            {
                ...sampleFilterState,
                restrictiveDefinition: "???",
                restrictiveDefinitionContent: { a: 1 },
                order: "desc",
                afm: { measures: [] },
            },
        ]);
        expect(actual).toEqual({
            restrictiveDefinition: "???",
            restrictiveDefinitionContent: { a: 1 },
            order: "desc",
            afm: { measures: [] },
        });
    });
    it("should add restrictedByMeasureIdentifiers to afm", () => {
        const actual = getElementsOptions("a", [
            { ...sampleFilterState, restrictedByMeasureIdentifiers: ["measureIdentifier"] },
        ]);
        expect(actual).toEqual({
            afm: {
                attributes: [],
                filters: [],
                measures: [
                    {
                        definition: {
                            measure: {
                                item: {
                                    identifier: "measureIdentifier",
                                },
                            },
                        },
                        localIdentifier: "measureIdentifier",
                    },
                ],
            },
        });
    });
    it("should not override existing afm options with restrictedByMeasureIdentifiers", () => {
        const actual = getElementsOptions("a", [
            {
                ...sampleFilterState,
                restrictedByMeasureIdentifiers: ["measureIdentifier"],
                afm: {
                    measures: [
                        {
                            definition: {
                                measure: {
                                    item: {
                                        identifier: "existingMeasureIdentifier",
                                    },
                                },
                            },
                            localIdentifier: "existingMeasureIdentifier",
                        },
                    ],
                },
            },
        ]);
        expect(actual).toEqual({
            afm: {
                measures: [
                    {
                        definition: {
                            measure: {
                                item: {
                                    identifier: "existingMeasureIdentifier",
                                },
                            },
                        },
                        localIdentifier: "existingMeasureIdentifier",
                    },
                    {
                        definition: {
                            measure: {
                                item: {
                                    identifier: "measureIdentifier",
                                },
                            },
                        },
                        localIdentifier: "measureIdentifier",
                    },
                ],
            },
        });
    });

    it("should add restrictedByFilterIds to afm", () => {
        const actual = getElementsOptions("a", [
            { ...sampleFilterState, restrictedByFilterIds: ["b"] },
            { ...sampleFilterState, id: "b", selectedItems: ["123"] },
        ]);
        expect(actual).toEqual({
            afm: {
                attributes: [
                    {
                        displayForm: {
                            identifier: "label.customer.cid.name",
                        },
                        localIdentifier: "label.customer.cid.name",
                    },
                ],
                filters: [
                    {
                        positiveAttributeFilter: {
                            displayForm: {
                                identifier: "label.customer.cid.name",
                            },
                            in: ["123"],
                            textFilter: true,
                        },
                    },
                ],
                measures: [],
            },
        });
    });
});

jest.mock("../../utils/getElements", () => {
    const actualGetElements = jest.requireActual("../../utils/getElements");
    const originalImplementation = actualGetElements;
    return jest.fn().mockImplementation(originalImplementation);
});

// tslint:disable-next-line: no-var-requires
const getElements = require("../../utils/getElements");

afterEach(() => {
    jest.clearAllMocks();
});

describe("getCachedElements", () => {
    it("should call getElements return the response and save it to cache with current timestamp", (done) => {
        const mockValidElements: IValidElementsResponse = {
            validElements: {
                items: [{ element: { title: "test", uri: "/test" } }],
                paging: { count: 1, offset: "0", total: "1" },
                elementsMeta: { attribute: "test", attributeDisplayForm: "test", filter: "", order: "asc" },
            },
        };
        const mockElementsPromise = Promise.resolve(mockValidElements);
        getElements.mockReturnValueOnce(mockElementsPromise);
        const cache: IElementsPromiseCache = {};

        const returnedPromise = getCachedElements(cache, "a", [sampleFilterState], 0, 1, "");

        expect(getElements).toHaveBeenCalledTimes(1);

        const cacheKey = getFilterElementsWithPagingContext("a", [sampleFilterState], 0, 1, "");

        const cacheEntry = cache[cacheKey];

        expect(cacheEntry.promise).toBe(returnedPromise);
        const executionTimeBuffer = 100; // 100ms
        expect(new Date().getTime() - cacheEntry.timestamp < executionTimeBuffer).toBe(true);

        returnedPromise.then((returnedValue) => {
            expect(returnedValue).toEqual(mockValidElements);
            done();
        });
    });

    it("should not call getElements if there is a fresh cached response", (done) => {
        const mockValidElements: IValidElementsResponse = {
            validElements: {
                items: [{ element: { title: "test", uri: "/test" } }],
                paging: { count: 1, offset: "0", total: "1" },
                elementsMeta: { attribute: "test", attributeDisplayForm: "test", filter: "", order: "asc" },
            },
        };
        const mockElementsPromise = Promise.resolve(mockValidElements);

        const cacheKey = getFilterElementsWithPagingContext("a", [sampleFilterState], 0, 1, "");
        const cache: IElementsPromiseCache = {
            [cacheKey]: {
                promise: mockElementsPromise,
                timestamp: new Date().getTime(),
            },
        };

        const returnedPromise = getCachedElements(cache, "a", [sampleFilterState], 0, 1, "");

        expect(getElements).toHaveBeenCalledTimes(0);

        returnedPromise.then((returnedValue) => {
            expect(returnedValue).toEqual(mockValidElements);
            done();
        });
    });

    it("should not cache the request if matching cache entry is stale", (done) => {
        const mockValidElements: IValidElementsResponse = {
            validElements: {
                items: [{ element: { title: "test", uri: "/test" } }],
                paging: { count: 1, offset: "0", total: "1" },
                elementsMeta: { attribute: "test", attributeDisplayForm: "test", filter: "", order: "asc" },
            },
        };
        const mockElementsPromise = Promise.resolve(mockValidElements);
        const cacheKey = getFilterElementsWithPagingContext("a", [sampleFilterState], 0, 1, "");
        const cache: IElementsPromiseCache = {
            [cacheKey]: {
                promise: mockElementsPromise,
                timestamp: 0,
            },
        };
        getElements.mockReturnValueOnce(mockElementsPromise);

        const returnedPromise = getCachedElements(cache, "a", [sampleFilterState], 0, 1, "");

        expect(getElements).toHaveBeenCalledTimes(1);

        returnedPromise.then((returnedValue) => {
            expect(returnedValue).toEqual(mockValidElements);
            done();
        });
    });

    it("should remove an entry from cache if the request was rejected", (done) => {
        const simulatedError = "Simulated error";
        const mockElementsPromise = Promise.reject(simulatedError);
        getElements.mockReturnValueOnce(mockElementsPromise);

        const cache: IElementsPromiseCache = {};

        const returnedPromise = getCachedElements(cache, "a", [sampleFilterState], 0, 1, "");
        const cacheKey = getFilterElementsWithPagingContext("a", [sampleFilterState], 0, 1, "");

        expect(getElements).toHaveBeenCalledTimes(1);

        returnedPromise.catch((error) => {
            expect(error).toBe(simulatedError);
            expect(cache[cacheKey]).toBeUndefined();
            done();
        });
    });
});
