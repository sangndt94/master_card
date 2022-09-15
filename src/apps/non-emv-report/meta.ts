// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import camelCase from "lodash/camelCase";
import nonEMVIconPath from "../../static/Non-EMV.svg";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Non-EMV Report";
const featureFlag = `${camelCase(name)}App`;
export const nonEmvReportAppFeatureFlag = featureFlag;

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
    imagePath: nonEMVIconPath,
};

export default meta;
