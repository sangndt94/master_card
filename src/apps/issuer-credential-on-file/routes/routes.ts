// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Overview from "./Overview";
import EntryModes from "./EntryModes";
import Merchant from "./Merchant";
import DeclineReasons from "./DeclineReasons";

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
    {
        path: "/decline-reasons",
        title: "Decline Reasons",
        component: DeclineReasons,
    },
];
