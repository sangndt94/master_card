// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { acquirerBenchmarkingStandardRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ACQUIRER_VIEW } from "../../../constants";
import { IAppMeta } from "../../../types";
import benchmarkingStandardIconPath from "../../../static/Benchmarking_ISS-ACQ.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/acquirer-benchmarking-standard",
    name: "Acquirer Benchmarking",
    FilterStateProvider,
    routeDefinitions: acquirerBenchmarkingStandardRoutes,
    relevantFor: [ACQUIRER_VIEW],
    imagePath: benchmarkingStandardIconPath,
};

export default meta;
