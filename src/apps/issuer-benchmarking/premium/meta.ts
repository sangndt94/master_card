// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { issuerBenchmarkingPremiumRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";
import benchmarkingPremiumIconPath from "../../../static/Benchmarking_Premium_ISS-ACQ.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/issuer-benchmarking-premium",
    name: "Issuer Benchmarking Premium",
    FilterStateProvider,
    routeDefinitions: issuerBenchmarkingPremiumRoutes,
    relevantFor: [ISSUER_VIEW],
    imagePath: benchmarkingPremiumIconPath,
};

export default meta;
