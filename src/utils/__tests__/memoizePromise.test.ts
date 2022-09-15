// (C) 2019 GoodData Corporation
import memoizePromise from "../memoizePromise";

jest.useFakeTimers();

describe("memoizePromise", () => {
    const createPromiseFactory = () =>
        jest.fn((result, error, delay = 100) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }, delay);
            });
        });
    const naiveResolver = (result) => String(result);

    it("should memoize function calls", () => {
        const mockPromiseFactory = createPromiseFactory();
        const memoizedFunc = memoizePromise(mockPromiseFactory, naiveResolver);
        const promise1 = memoizedFunc("abc", null, 1);
        const promise2 = memoizedFunc("abc", null, 1);
        expect(promise1).toBe(promise2);
        expect(mockPromiseFactory).toHaveBeenCalledTimes(1);
        memoizedFunc("def", null, 1);
        expect(mockPromiseFactory).toHaveBeenCalledTimes(2);
    });

    it("should clear cache after timeout has elapsed", () => {
        const mockPromiseFactory = createPromiseFactory();
        const memoizedFunc = memoizePromise(mockPromiseFactory, naiveResolver, {
            timeout: 50,
        });
        memoizedFunc("abc");
        memoizedFunc("abc");
        expect(mockPromiseFactory).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        memoizedFunc("abc");
        expect(mockPromiseFactory).toHaveBeenCalledTimes(2);
    });

    it("should clear cache if Promise is unresolved after timeout has elapsed", () => {
        const mockPromiseFactory = createPromiseFactory();
        const memoizedFunc = memoizePromise(mockPromiseFactory, naiveResolver, {
            timeout: 100,
            clearCacheOnPromiseTimeout: 50,
        });
        memoizedFunc("abc", null, 1000);
        memoizedFunc("abc", null, 1000);
        expect(mockPromiseFactory).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(50);
        memoizedFunc("abc", null, 1000);
        expect(mockPromiseFactory).toHaveBeenCalledTimes(2);
    });

    it("should clear cache if Promise is rejected", (done) => {
        const mockPromiseFactory = createPromiseFactory();
        const memoizedFunc = memoizePromise(mockPromiseFactory, naiveResolver, {
            clearCacheOnPromiseError: true,
        });
        const promise1 = memoizedFunc("abc", "error", 50);
        memoizedFunc("abc", "error", 50);
        expect(mockPromiseFactory).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(50);
        promise1.catch(() => {
            memoizedFunc("abc", "error", 50);
            expect(mockPromiseFactory).toHaveBeenCalledTimes(2);
            done();
        });
    });
});
