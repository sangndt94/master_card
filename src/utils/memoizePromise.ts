// (C) 2019 GoodData Corporation
import memoize from "lodash/memoize";

const memoizePromiseDefaultOptions = {
    clearCacheOnPromiseError: true, // Clear cache on promise error
    clearCacheOnPromiseTimeout: null, // Clear cache if the promise takes more than this ms to resolve
    timeout: null, // Clear cache after this ms
};

const memoizePromise = <T extends (...args: any) => any>(
    asyncFunction: (...args: Parameters<T>) => any,
    resolver = (...args: Parameters<T>): string => args.map((arg: any) => String(arg)).join("||||"),
    options: Partial<typeof memoizePromiseDefaultOptions> = {},
) => {
    const opts = {
        ...memoizePromiseDefaultOptions,
        ...options,
    };
    const cacheTimeoutMap = {};
    const promiseTimeoutMap = {};
    const memoizedFunc = memoize((...args) => {
        const key = resolver(...args);
        const promise = asyncFunction(...args);

        if (opts.timeout !== null && !cacheTimeoutMap[key]) {
            cacheTimeoutMap[key] = setTimeout(() => {
                memoizedFunc.cache.delete(key);
                delete cacheTimeoutMap[key];
            }, opts.timeout);
        }

        if (opts.clearCacheOnPromiseTimeout !== null && !promiseTimeoutMap[key]) {
            promiseTimeoutMap[key] = setTimeout(() => {
                memoizedFunc.cache.delete(key);
                delete promiseTimeoutMap[key];
            }, opts.clearCacheOnPromiseTimeout);
        }

        promise.then(
            () => {
                if (opts.clearCacheOnPromiseTimeout) {
                    clearTimeout(promiseTimeoutMap[key]);
                    delete promiseTimeoutMap[key];
                }
            },
            () => {
                if (opts.clearCacheOnPromiseError) {
                    memoizedFunc.cache.delete(key);
                    clearTimeout(promiseTimeoutMap[key]);
                    delete promiseTimeoutMap[key];
                }
            },
        );
        return promise;
    }, resolver);
    return memoizedFunc;
};

export default memoizePromise;
