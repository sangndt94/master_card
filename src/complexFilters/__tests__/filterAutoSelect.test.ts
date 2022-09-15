// (C) 2019-2020 GoodData Corporation
import { initiateAutoSelect, getAutoSelectPaging } from "../filterAutoSelect";
import { initializeFilter } from "../filterUtils";
import { SetStateAction } from "react";
import { IAutoSelectContextCache, IElementsPromiseCache } from "../filterElements";
import { IValidElementsResponse } from "@gooddata/gooddata-js";
import { IFilterState } from "../filterTypes";
import noop from "lodash/noop";
import { delay } from "../../utils/helpers";

// tslint:disable-next-line: no-var-requires
const filterElements = require("../filterElements");

jest.mock("../filterElements", () => {
    const actualFilterElements = jest.requireActual("../filterElements");
    const originalImplementation = actualFilterElements;
    return {
        ...actualFilterElements,
        getCachedElements: jest.fn().mockImplementation(originalImplementation.getCachedElements),
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

const sampleFilterDefinition = {
    id: "a",
    projectId: "hwmgtf5okuxmaj4dis462nmhc0i18rkg",
    attributeDisplayFormIdentifier: "label.customer.cid.name",
    label: "CID",
};
const sampleFilterState: IFilterState = {
    ...initializeFilter(sampleFilterDefinition),
    autoSelect: {
        index: 0,
    },
};

describe("getAutoSelectPaging", () => {
    it("should return paging for an index auto select filter and not call updateFilterError", () => {
        const updateFilterError = jest.fn();
        const actual = getAutoSelectPaging(sampleFilterState, updateFilterError);
        expect(actual).toEqual({
            limit: 50,
            offset: 0,
            search: undefined,
        });
        expect(updateFilterError).not.toHaveBeenCalled();
    });
    it("should return paging for a value auto select filter and not call updateFilterError", () => {
        const updateFilterError = jest.fn();
        const actual = getAutoSelectPaging(
            { ...sampleFilterState, autoSelect: { value: "123" } },
            updateFilterError,
        );
        expect(actual).toEqual({
            limit: 50,
            offset: 0,
            search: "123",
        });
        expect(updateFilterError).not.toHaveBeenCalled();
    });
    it("should call updateFilterError if autoSelect is unsupported", () => {
        const updateFilterError = jest.fn();
        const actual = getAutoSelectPaging(
            { ...sampleFilterState, autoSelect: { unsupported: "123" } } as any,
            updateFilterError,
        );
        expect(actual).toBe(undefined);
        expect(updateFilterError).toHaveBeenCalled();
    });
    it("should call updateFilterError if autoSelect is undefined", () => {
        const updateFilterError = jest.fn();
        const actual = getAutoSelectPaging(
            { ...sampleFilterState, autoSelect: undefined } as any,
            updateFilterError,
        );
        expect(actual).toBe(undefined);
        expect(updateFilterError).toHaveBeenCalled();
    });
});

describe("initiateAutoSelect", () => {
    it("should call getCachedElements, when the returned promise resolves call updateFilterSelectedItems and cleanup autoSelectContextCache", (done) => {
        const mockValidElements: IValidElementsResponse = {
            validElements: {
                items: [{ element: { title: "test", uri: "/test" } }],
                paging: { count: 1, offset: "0", total: "1" },
                elementsMeta: { attribute: "test", attributeDisplayForm: "test", filter: "", order: "asc" },
            },
        };
        const mockElementsPromise = Promise.resolve(mockValidElements);
        filterElements.getCachedElements.mockReturnValueOnce(mockElementsPromise);

        const selectedItemsValueMock = jest.fn();
        const updateFilterSelectedItems = jest.fn<void, [string, SetStateAction<string[]>]>(
            (_filterId: string, selectedItemsDispatch: SetStateAction<string[]>) => {
                selectedItemsValueMock((selectedItemsDispatch as any)());
            },
        );

        const updateFilterError = jest.fn();

        const elementsCache: IElementsPromiseCache = {};
        const autoSelectContextCache: IAutoSelectContextCache = {};

        const filtersState = [sampleFilterState];
        const filtersReadyToAutoselect = [sampleFilterState];

        initiateAutoSelect(
            filtersState,
            filtersReadyToAutoselect,
            updateFilterSelectedItems,
            updateFilterError,
            elementsCache,
            autoSelectContextCache,
        );

        expect(filterElements.getCachedElements).toHaveBeenLastCalledWith(
            elementsCache,
            "a",
            filtersState,
            0,
            50,
            undefined,
        );

        mockElementsPromise.finally(() => {
            expect(updateFilterSelectedItems).toHaveBeenCalled();
            const updateCalls = updateFilterSelectedItems.mock.calls;
            const lastUpdateCall = updateCalls[updateCalls.length - 1];
            expect(lastUpdateCall[0]).toBe("a");
            expect(selectedItemsValueMock).toHaveBeenLastCalledWith(["test"]);
            expect(updateFilterError).not.toHaveBeenCalled();
            expect(autoSelectContextCache.a).toBe(undefined);

            done();
        });
    });

    it("should not call any callbacks if there is already an identical context in autoSelectContextCache", () => {
        const updateFilterSelectedItems = jest.fn();
        const updateFilterError = jest.fn();

        const elementsCache: IElementsPromiseCache = {};
        const autoSelectContextCache: IAutoSelectContextCache = {
            a:
                '{"filter":{"attributeDisplayFormIdentifier":"label.customer.cid.name","projectId":"hwmgtf5okuxmaj4dis462nmhc0i18rkg","restrictedByMeasureIdentifiers":[]},"limit":50,"offset":0}',
        };

        const filtersState = [sampleFilterState];
        const filtersReadyToAutoselect = [sampleFilterState];

        initiateAutoSelect(
            filtersState,
            filtersReadyToAutoselect,
            updateFilterSelectedItems,
            updateFilterError,
            elementsCache,
            autoSelectContextCache,
        );

        expect(filterElements.getCachedElements).not.toHaveBeenCalled();
        expect(updateFilterSelectedItems).not.toHaveBeenCalled();
        expect(updateFilterError).not.toHaveBeenCalled();
    });

    it("should not call updateFilterSelectedItems if the context is no longer up to date", () => {
        const mockValidElements: IValidElementsResponse = {
            validElements: {
                items: [{ element: { title: "test", uri: "/test" } }],
                paging: { count: 1, offset: "0", total: "1" },
                elementsMeta: { attribute: "test", attributeDisplayForm: "test", filter: "", order: "asc" },
            },
        };
        const mockElementsPromise = Promise.resolve(mockValidElements);
        filterElements.getCachedElements.mockReturnValueOnce(mockElementsPromise);

        const selectedItemsValueMock = jest.fn();
        const updateFilterSelectedItems = jest.fn<void, [string, SetStateAction<string[]>]>(
            (_filterId: string, selectedItemsDispatch: SetStateAction<string[]>) => {
                selectedItemsValueMock((selectedItemsDispatch as any)());
            },
        );

        const updateFilterError = jest.fn();

        const elementsCache: IElementsPromiseCache = {};
        const autoSelectContextCache: IAutoSelectContextCache = {};

        const filtersState: IFilterState[] = [sampleFilterState];
        const filtersReadyToAutoselect = filtersState;

        initiateAutoSelect(
            filtersState,
            filtersReadyToAutoselect,
            updateFilterSelectedItems,
            updateFilterError,
            elementsCache,
            autoSelectContextCache,
        );

        autoSelectContextCache.a = "new context";

        expect(updateFilterSelectedItems).not.toHaveBeenCalled();
        expect(updateFilterError).not.toHaveBeenCalled();
    });

    it("should call updateFilterError and clean cache, if the promise was rejected", async (done) => {
        const simulatedError = new Error("simulated error");
        const mockElementsPromise = Promise.reject(simulatedError);
        // All rejected promises need catch otherwise they fail the tests
        mockElementsPromise.catch(noop);
        filterElements.getCachedElements.mockReturnValueOnce(mockElementsPromise);

        const updateFilterSelectedItems = jest.fn();
        const updateFilterError = jest.fn();

        const elementsCache: IElementsPromiseCache = {};
        const autoSelectContextCache: IAutoSelectContextCache = {};

        const filtersState: IFilterState[] = [sampleFilterState];
        const filtersReadyToAutoselect = filtersState;

        initiateAutoSelect(
            filtersState,
            filtersReadyToAutoselect,
            updateFilterSelectedItems,
            updateFilterError,
            elementsCache,
            autoSelectContextCache,
        );

        // wait for next tick
        delay(0).then(() => {
            expect(updateFilterSelectedItems).not.toHaveBeenCalled();
            expect(updateFilterError).toHaveBeenLastCalledWith("a", simulatedError);
            expect(autoSelectContextCache.a).toBe(undefined);
            done();
        });
    });
});
