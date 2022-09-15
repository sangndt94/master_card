// (C) 2019 GoodData Corporation
import React from "react";
import { useFeatureFlags } from "./FeatureFlagContext";

const Feature: React.FC<{ flag: string; value?: any }> = ({ children, flag, value = true }) => {
    const featureFlags = useFeatureFlags();
    const relevantFlag = featureFlags[flag];

    return relevantFlag === value ? <React.Fragment>{children}</React.Fragment> : null;
};

export default Feature;
