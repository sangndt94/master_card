// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { acquirerBenchmarkingPremiumRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";
import benchmarkingPremiumIconPath from "../../../static/Benchmarking_Premium_ISS-ACQ.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/acquirer-benchmarking-premium",
    name: "Acquirer Benchmarking Premium",
    FilterStateProvider,
    routeDefinitions: acquirerBenchmarkingPremiumRoutes,
    relevantFor: [ACQUIRER_VIEW],
    imagePath: benchmarkingPremiumIconPath,
};

export default meta;
