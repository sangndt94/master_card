// (C) 2019 GoodData Corporation
import React, { createContext, useState, useMemo, useContext } from "react";
import noop from "lodash/noop";
import { getEffectiveFeatureFlags } from "./utils";
import { activeVersions, baselineVersion } from "./versionSpecifications";

const FeatureFlagDataContext = createContext({});
const FeatureFlagManipulationContext: React.Context<(featureFlags: {
    mcfiVersion?: string;
    [key: string]: any;
}) => void> = createContext(noop);

export const FeatureFlagProvider = ({ children, versions = activeVersions, initialVersion = "-1" }) => {
    const [selectedVersion, setSelectedVersion] = useState(initialVersion);
    const effectiveFeatureFlags = useMemo(() => getEffectiveFeatureFlags(versions, selectedVersion), [
        selectedVersion,
        versions,
    ]);

    return (
        <FeatureFlagManipulationContext.Provider
            value={(featureFlags) => {
                setSelectedVersion(featureFlags.mcfiVersion || baselineVersion);
            }}
        >
            <FeatureFlagDataContext.Provider value={effectiveFeatureFlags}>
                {children}
            </FeatureFlagDataContext.Provider>
        </FeatureFlagManipulationContext.Provider>
    );
};

export const useFeatureFlags = () => useContext(FeatureFlagDataContext);
export const useFeatureFlagsManipulation = () => useContext(FeatureFlagManipulationContext);
