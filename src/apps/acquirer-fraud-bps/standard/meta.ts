// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";
import camelCase from "lodash/camelCase";
import bakedPerformanceAnalytics from "../../../static/Fraud_BPS.svg";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Fraud BPS Acquirer";
const featureFlag = `${camelCase(name)}App`;
export const performanceAnalyticsAppFeatureFlag = featureFlag;
const meta: IAppMeta = {
    ...projectMeta,
    routeBase,
    name,
    FilterStateProvider,
    requiredFeatureFlags: [featureFlag],
    routeDefinitions: routeDefinitions.map((routeDefinition) => {
        return {
            ...routeDefinition,
            path: `${routeBase}${routeDefinition.path}`,
        };
    }),
    relevantFor: [ACQUIRER_VIEW],
    imagePath: bakedPerformanceAnalytics,
};

export default meta;
