// (C) 2019 GoodData Corporation
import { FilterStateProvider } from "./contexts/FilterStateContext";
import { digitalRoutes } from "./routes/routes";
import projectMeta from "./projectMeta";
import { ISSUER_VIEW } from "../../constants";
import { IAppMeta } from "../../types";
import digitalIconPath from "../../static/Digital.svg";

const meta: IAppMeta = {
    ...projectMeta,
    routeBase: "/digital",
    name: "Digital",
    FilterStateProvider,
    routeDefinitions: digitalRoutes,
    relevantFor: [ISSUER_VIEW],
    imagePath: digitalIconPath,
};

export default meta;
