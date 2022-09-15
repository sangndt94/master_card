// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import camelCase from "lodash/camelCase";
import credentialOnFile from "../../static/Credential_on_File.svg";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Credential on File Acquirer";
const featureFlag = `${camelCase(name)}App`;
export const performanceAnalyticsAppFeatureFlag = featureFlag;
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
    relevantFor: [ACQUIRER_VIEW],
    imagePath: credentialOnFile,
};

export default meta;
