// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { issuerDecisionIntelligenceRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";

import diPremiumIconPath from "../../../static/DI_Premium.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/issuer-decision-intelligence-premium",
    name: "Issuer Decision Intelligence Premium",
    requiredFeatureFlags: [],
    FilterStateProvider,
    routeDefinitions: issuerDecisionIntelligenceRoutes,
    relevantFor: [ISSUER_VIEW],
    imagePath: diPremiumIconPath,
};

export default meta;
