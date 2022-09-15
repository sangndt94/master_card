// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import motoIconPath from "../../static/MoTo_ISS-ACQ.svg";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "MO/TO Acquirer";
const featureFlag = "motoAcquirerApp";
export const motoAcquirerAppFeatureFlag = featureFlag;

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
    imagePath: motoIconPath,
};

export default meta;
