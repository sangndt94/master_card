// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import KeyInsights from "./KeyInsights";
import CardNotPresent from "./CardNotPresent";
import CardPresent from "./CardPresent";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/key-insights",
        title: "Key Insights",
        component: KeyInsights,
    },
    {
        path: "/card-not-present",
        title: "Card Not Present",
        component: CardNotPresent,
    },
    {
        path: "/card-present",
        title: "Card Present",
        component: CardPresent,
    },
];
