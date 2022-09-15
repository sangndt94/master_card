// (C) 2019 GoodData Corporation
import React, { useEffect } from "react";
import { ErrorComponent } from "@gooddata/react-components";

import Page from "../components/utils/Page";
import { IRouteDefinition, IProject } from "../types";
import CustomSwitch from "./CustomSwitch";
import { dataLayer, userData } from "../components/utils/GoogleTagManager";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AppSubRoute: React.FC<{
    routes: IRouteDefinition[];
    activeProject: IProject;
    appName?: string;
    viewOption?: string;
}> = ({ routes, activeProject, appName, viewOption }) => {
    if (activeProject) {
        const location = useLocation();
        const authState = useAuth();
        const user = authState.data;

        useEffect(() => {
            const activeTab = routes.filter((route) => route.path === location.pathname);

            dataLayer({
                ...userData(user),
                event: "pageview",
                page: {
                    path: location.pathname,
                    title: appName + (activeTab.length > 0 ? " - " + activeTab[0].title : ""),
                    type: viewOption ? viewOption.toLowerCase() + " view" : "",
                },
            });
        }, [location]);

        return (
            <Page routes={routes} appName={appName}>
                <CustomSwitch routes={routes} />
            </Page>
        );
    }
    return (
        <ErrorComponent
            code="401"
            message="Unauthorized"
            description="You do not have access to this project."
        />
    );
};

export default AppSubRoute;
