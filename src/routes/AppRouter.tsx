// (C) 2019 GoodData Corporation
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useProjectsState } from "../contexts/ProjectsContext";
import { userRoutes } from "./routes";
import Glossary from "../components/glossary/Glossary";
import CustomLoading from "../components/utils/CustomLoading";
import Page from "../components/utils/Page";
import RouteMapper from "../components/utils/RouteMapper";
import AppSubRoute from "./AppSubRoute";
import AppPicker from "./AppPicker";
import Route404 from "./Route404";
import useAppMetas from "../hooks/useAppMetas";
import DisclaimerPage from "./DisclaimerPage";
import useRequireDisclaimer from "../hooks/useRequireDisclaimer";
import { dataLayer, userData } from "../components/utils/GoogleTagManager";

const LoadingPage = ({ label }: { label: string }) => (
    <Route key="loading">
        <Page>
            <CustomLoading height="100%" label={label} />
        </Page>
    </Route>
);

const AppRouter = () => {
    const authState = useAuth();
    const projectsState = useProjectsState();
    const [selectedViewOption, setSelectedViewOption] = useState(null);
    const appMetas = useAppMetas();
    const user = authState.data;

    const noUserLoggedIn = !authState.isLoading && !user;

    const userRouteElements = userRoutes.map(RouteMapper);

    useEffect(() => {
        selectedViewOption &&
            dataLayer({
                ...userData(user),
                event: "pageview",
                page: {
                    path: location.pathname,
                    title: "Dashboards",
                    type: selectedViewOption.value.toLowerCase() + " view",
                },
            });
    }, [selectedViewOption]);

    const appRoutes =
        projectsState.data &&
        appMetas.map((app) => {
            // Do not extract. See Switch.
            return (
                <Route path={app.routeBase} key={app.routeBase}>
                    {(app.customProviders || []).reduce(
                        (child, Provider) => {
                            return <Provider>{child}</Provider>;
                        },
                        <app.FilterStateProvider>
                            <AppSubRoute
                                routes={app.routeDefinitions}
                                activeProject={projectsState.data.appMetaProjects[app.projectIdentifier]}
                                appName={app.name}
                                viewOption={selectedViewOption ? selectedViewOption.value : ""}
                            />
                        </app.FilterStateProvider>,
                    )}
                </Route>
            );
        });

    const appPickerRoute = projectsState.data && (
        <Route key="appPicker" path="/" exact>
            <AppPicker
                projects={projectsState.data.projects}
                selectedViewOption={selectedViewOption}
                setSelectedViewOption={setSelectedViewOption}
            />
        </Route>
    );

    const { value: isDisclaimerAgreementRequired, confirmDisclaimer } = useRequireDisclaimer(projectsState);

    return (
        <Router>
            <Switch>
                {/* Routes must not be extracted into a standalone component. It would break the Switch */}
                {/* The order of routes matters */}
                {/* User routes (Styleguide and Login) are accessible without authState */}
                {userRouteElements}
                {authState.isLoading && <LoadingPage label="Authenticating&hellip;" />}
                {noUserLoggedIn && (
                    <Route key="noUserLoggedIn">
                        <Redirect to="/login" />
                    </Route>
                )}
                {projectsState.isLoading && <LoadingPage label="Loading projects&hellip;" />}
                {isDisclaimerAgreementRequired && (
                    <Route key="DisclaimerPage">
                        <DisclaimerPage onConfirm={confirmDisclaimer} />
                    </Route>
                )}
                {appPickerRoute}
                {appRoutes}
                <Glossary showBackLink={false} />
                <Route key="404" path="*">
                    <Route404 />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
