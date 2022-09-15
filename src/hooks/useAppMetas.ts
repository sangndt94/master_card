// (C) 2019 GoodData Corporation
import defaultAppMetas from "../apps/appMetas";
import { useFeatureFlags } from "../featureFlags/FeatureFlagContext";
import { IAppMeta } from "../types";

const useAppMetas = (appMetas: IAppMeta[] = defaultAppMetas) => {
    const featureFlags = useFeatureFlags();
    const supportedAppMetas = appMetas.filter((appMeta) => {
        const isSupported = (appMeta.requiredFeatureFlags || []).every((requiredFeatureFlag) =>
            Boolean(featureFlags[requiredFeatureFlag]),
        );
        return isSupported;
    });
    return supportedAppMetas;
};

export default useAppMetas;
