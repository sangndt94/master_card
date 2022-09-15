// (C) 2019 GoodData Corporation
import memoize from "lodash/memoize";
import sdk from "../sdk";
import memoizePromise from "./memoizePromise";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";
import { IValidElementsResponse } from "@gooddata/gooddata-js";

// if you update params, make sure to also update memoizedResolveIdentifier resolver
const resolveIdentifier = async (projectId: string, identifier: string) => {
    const result = await sdk.md.getUrisFromIdentifiers(projectId, [identifier]);
    return result.map((item: { uri: string }) => item.uri);
};
const memoizedResolveIdentifier = memoize(
    resolveIdentifier,
    (projectId, identifier) => `${projectId} ${identifier}`,
);

const getUrisFromIdentifiers = (projectId: string, identifiers: string[]) => {
    const promises = identifiers.map((identifier) => memoizedResolveIdentifier(projectId, identifier));
    return Promise.all(promises);
};

const getObjectIdFromUri = (uri: string) => {
    const match = /\/obj\/([^$/?]*)/.exec(uri);
    return match ? match[1] : null;
};

// if you update params, make sure to also update memoizedGetValidElements resolver
const getValidElements = (projectId: string, objectId: string, options: IValidElementsOptions = {}) => {
    // filter must be set to "" not undefined. Otherwise request fails.
    // Lets maintain reference in case sdk.md.getValidElements ever starts caching things.
    let newOptions: IValidElementsOptions = options;
    if (!options.filter && options.filter !== "") {
        newOptions = {
            ...options,
            filter: "",
        };
    }
    return sdk.md.getValidElements(
        projectId,
        objectId, // This is misdocumented as identifier, but is in fact objectId
        newOptions,
    );
};

const memoizedGetValidElements = memoizePromise<
    (projectId: string, objectId: string, IValidElementsOptions) => Promise<IValidElementsResponse>
>(
    getValidElements,
    (projectId: string, objectId: string, options?: IValidElementsOptions) => {
        return `${projectId} ${objectId} ${JSON.stringify(options)}`;
    },
    {
        clearCacheOnPromiseTimeout: 10000,
        timeout: 1000 * 60 * 10, // 10min
        clearCacheOnPromiseError: false,
    },
);

const getElements = async (
    projectId: string,
    attributeIdentifier: string,
    options?: IValidElementsOptions,
): Promise<IValidElementsResponse> => {
    const attributeUri = (await getUrisFromIdentifiers(projectId, [attributeIdentifier]))[0][0];
    const objectId = getObjectIdFromUri(attributeUri);
    return memoizedGetValidElements(projectId, objectId, options);
};

export default getElements;
