// (C) 2019 GoodData Corporation
import React from "react";
import { Route } from "react-router-dom";
import { IRouteDefinition } from "../../types";

const RouteMapper = ({ path, exact = false, component }: IRouteDefinition) => {
    return <Route key={path} path={path} exact={exact} component={component} />;
};

export default RouteMapper;
