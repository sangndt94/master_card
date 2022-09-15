// (C) 2020 GoodData Corporation
import { IRouteDefinition } from "../../../types";
import Successful from "./Successful";
import Rejected from "./Rejected";
import Suspended from "./Suspended";
import Geography from "./Geography";
import Pos from "./Pos";
import ErroredDeleted from "./ErroredDeleted";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/successful",
        title: "Successful Transactions",
        component: Successful,
    },
    {
        path: "/rejected",
        title: "Rejected Transactions",
        component: Rejected,
    },
    {
        path: "/suspended",
        title: "Suspended Transactions",
        component: Suspended,
    },
    {
        path: "/errored-deleted",
        title: "Errored and Deleted Transactions",
        component: ErroredDeleted,
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
