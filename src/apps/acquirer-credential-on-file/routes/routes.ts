// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Overview from "./Overview";
import EntryModes from "./EntryModes";
import Merchant from "./Merchant";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/overview",
        title: "Overview",
        component: Overview,
    },
    {
        path: "/entry-modes",
        title: "COF / PAN Entry Modes",
        component: EntryModes,
    },
    {
        path: "/merchant",
        title: "Merchant",
        component: Merchant,
    },
];
