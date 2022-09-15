// (C) 2020 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { issuerDecisionIntelligenceRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";

import diStandardIconPath from "../../../static/DI_Standard.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/issuer-decision-intelligence-standard",
    name: "Issuer Decision Intelligence",
    requiredFeatureFlags: [],
    FilterStateProvider,
    routeDefinitions: issuerDecisionIntelligenceRoutes,
    relevantFor: [ISSUER_VIEW],
    imagePath: diStandardIconPath,
};

export default meta;
