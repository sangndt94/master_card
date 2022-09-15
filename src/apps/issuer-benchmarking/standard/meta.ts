// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { issuerBenchmarkingStandardRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";
import benchmarkingStandardIconPath from "../../../static/Benchmarking_ISS-ACQ.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/issuer-benchmarking-standard",
    name: "Issuer Benchmarking",
    FilterStateProvider,
    routeDefinitions: issuerBenchmarkingStandardRoutes,
    relevantFor: [ISSUER_VIEW],
    imagePath: benchmarkingStandardIconPath,
};

export default meta;
