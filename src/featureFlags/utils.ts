// (C) 2019 GoodData Corporation
import { IVersionList } from "./types";

// these two functions abstract the logic away from what the version ID looks like
const versionComparer = (a: string, b: string) => a.localeCompare(b);
const isVersionRelevant = (candidateVersion: string, targetVersion: string) =>
    versionComparer(candidateVersion, targetVersion) <= 0;

export const getEffectiveFeatureFlags = (versions: IVersionList, selectedVersion: string) =>
    Object.keys(versions)
        .sort(versionComparer)
        .filter((versionNumber) => isVersionRelevant(versionNumber, selectedVersion))
        .map((versionNumber) => versions[versionNumber])
        .reduce((featureFlags, versionFlags) => {
            Object.assign(featureFlags, versionFlags);
            return featureFlags;
        }, {});
