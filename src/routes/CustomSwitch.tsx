// (C) 2007-2019 GoodData Corporation
import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import Route404 from "./Route404";
import RouteMapper from "../components/utils/RouteMapper";
import { IRouteDefinition } from "../types";

export const CustomSwitch = ({
    NoMatchComponent = Route404,
    routes = [],
}: {
    routes: IRouteDefinition[];
    NoMatchComponent?: React.ComponentType;
}): JSX.Element => {
    const location = useLocation();
    const willMatch = routes.some(({ path, exact = false }) => {
        return matchPath(location.pathname, { path, exact });
    });
    if (willMatch) {
        return <>{routes.map(RouteMapper)}</>;
    }
    return <NoMatchComponent />;
};

export default CustomSwitch;
