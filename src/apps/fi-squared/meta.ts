// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW, ACQUIRER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import FIIIconPath from "../../static/FII.svg";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Fraud Intelligence Insights (FI²)";
const featureFlag = "fiiApp";
export const fiiAppFeatureFlag = featureFlag;

const meta: IAppMeta = {
    ...projectMeta,
    routeBase,
    name,
    requiredFeatureFlags: [featureFlag],
    FilterStateProvider,
    routeDefinitions: routeDefinitions.map((routeDefinition) => {
        return {
            ...routeDefinition,
            path: `${routeBase}${routeDefinition.path}`,
        };
    }),
    relevantFor: [ISSUER_VIEW, ACQUIRER_VIEW],
    imagePath: FIIIconPath,
};

export default meta;
