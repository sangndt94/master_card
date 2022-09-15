// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Successful from "./Successful";
import Geography from "./Geography";
import Pos from "./Pos";
import Deleted from "./Deleted";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/successful",
        title: "Successful Transactions",
        component: Successful,
    },
    {
        path: "/deleted",
        title: "Deleted Transactions",
        component: Deleted,
    },
    {
        path: "/geography",
        title: "Geography",
        component: Geography,
    },
    {
        path: "/pos",
        title: "POS",
        component: Pos,
    },
];
