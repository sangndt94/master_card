// (C) 2007-2019 GoodData Corporation
import React from "react";
import "@babel/polyfill";
import { ScreenClassProvider, setConfiguration } from "react-grid-system";
import "@gooddata/react-components/styles/css/main.css";
import "@gooddata/goodstrap/lib/styles.scss";

import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { FeatureFlagProvider } from "./featureFlags/FeatureFlagContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import theme from "./utils/theme";

setConfiguration({
    gutterWidth: theme.spacing,
});

const App = () => {
    return (
        <FeatureFlagProvider>
            <AuthProvider>
                <ProjectsProvider>
                    <ScreenClassProvider>
                        <MessagesProvider>
                            <AppRouter />
                        </MessagesProvider>
                    </ScreenClassProvider>
                </ProjectsProvider>
            </AuthProvider>
        </FeatureFlagProvider>
    );
};

export default App;
