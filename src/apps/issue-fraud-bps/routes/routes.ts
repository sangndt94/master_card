// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Overview from "./Overview";
import DetailByIca from "./DetailByIca";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/overview",
        title: "Overview",
        component: Overview,
    },
    {
        path: "/detail-by-ica",
        title: "Detail by ICA",
        component: DetailByIca,
    },
];
