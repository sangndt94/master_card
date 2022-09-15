// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { routeDefinitions } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import reportedFraudIconPath from "../../static/Reported_Fraud_ISS-ACQ.svg";
import { UseTransactionDateContextProvider } from "./contexts/UseTransactionDateContext";

const routeBase = `/${projectMeta.projectIdentifier}`;
const name = "Reported Fraud Acquirer";
const featureFlag = "reportedFraudAcquirerApp";
export const reportedFraudAcquirerAppFeatureFlag = featureFlag;

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
    relevantFor: [ACQUIRER_VIEW],
    imagePath: reportedFraudIconPath,
};

export default meta;
