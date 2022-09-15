// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import reportedFraudIconPath from "../../static/Reported_Fraud_ISS-ACQ.svg";
import { UseTransactionDateContextProvider } from "./contexts/UseTransactionDateContext";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Reported Fraud Issuer";
const featureFlag = "reportedFraudIssuerApp";
export const reportedFraudIssuerAppFeatureFlag = featureFlag;

const meta: IAppMeta = {
    ...projectMeta,
    routeBase,
    name,
    requiredFeatureFlags: [featureFlag],
    FilterStateProvider,
    customProviders: [UseTransactionDateContextProvider],
    routeDefinitions: routeDefinitions.map((routeDefinition) => {
        return {
            ...routeDefinition,
            path: `${routeBase}${routeDefinition.path}`,
        };
    }),
    relevantFor: [ISSUER_VIEW],
    imagePath: reportedFraudIconPath,
};

export default meta;
