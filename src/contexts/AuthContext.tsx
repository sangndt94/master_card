// (C) 2019 GoodData Corporation
import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { ApiResponseError } from "@gooddata/gooddata-js";

import sdk from "../sdk";
import { defaultSourceState } from "../utils/helpers";
import { useFeatureFlagsManipulation } from "../featureFlags/FeatureFlagContext";
import noop from "lodash/noop";
import { ILoadingState } from "../types";
import { dataLayer, userData } from "../components/utils/GoogleTagManager";

export interface IAuth {
    firstName: string;
    lastName: string;
    login: string;
    loginMD5: string;
    organizationName: string;
    profileUri: string;
}
export type AuthLoadingState = ILoadingState<IAuth>;

export type AuthContextType = AuthLoadingState & {
    login: (username: string, password: string) => any;
    logout: () => any;
};

const AuthContext: React.Context<AuthContextType> = createContext({
    ...defaultSourceState,
    // tslint:disable-next-line no-console
    login: (username, password) => console.log("Context not ready", username, password),
    // tslint:disable-next-line no-console
    logout: () => console.log("Context not ready"),
});

const getUser = async () => {
    const isLoggedIn = await sdk.user.isLoggedIn();
    if (!isLoggedIn) {
        throw new Error("Unauthorized");
    }
    return sdk.user.getAccountInfo();
};

const getMCFeatureFlag = ({ profileUri }) => {
    const featureFlagName = "mcfiVersion";
    const userFeatureFlagsUri = `${profileUri}/config/${featureFlagName}`;
    return sdk.xhr
        .get(userFeatureFlagsUri)
        .then(
            ({
                data: {
                    settingItem: { value },
                },
            }) => {
                return {
                    mcfiVersion: value,
                };
            },
        )
        .catch((error) => {
            // tslint:disable-next-line:no-console
            console.warn(`Unable to fetch feature flag ${featureFlagName}. Ignoring...`, error);
            return Promise.reject(error);
        });
};

export const AuthProvider: React.FC = ({ children }) => {
    const [userState, setUserState] = useState({ ...defaultSourceState });
    const setFeatureFlags = useFeatureFlagsManipulation();
    useEffect(() => {
        getUser()
            .then((account) => {
                setUserState({ isLoading: false, error: null, data: account });
            })
            .catch((error) => {
                setUserState({ isLoading: false, error, data: null });
            });
    }, []);

    useEffect(() => {
        if (userState.data) {
            // Keep this call in separate useEffect to abstract from the way user was logged in (auto/manually)
            getMCFeatureFlag(userState.data).then(setFeatureFlags);
            dataLayer({
                ...userData(userState.data),
                event: "userStatus",
            });
        }
    }, [userState.data]);

    const login = useCallback(async (username, password) => {
        setUserState({ isLoading: true, error: null, data: null });
        return sdk.user
            .login(username, password)
            .then(() => {
                return sdk.user
                    .getAccountInfo()
                    .then((account) => setUserState({ isLoading: false, error: null, data: account }));
            })
            .catch((error) => {
                setUserState({ isLoading: false, error, data: null });
                throw new ApiResponseError(error.message, error.response, error.responseBody);
            });
    }, []);

    const logout = useCallback(async () => {
        setUserState({
            isLoading: true,
            error: null,
            data: userState.data,
        });
        return sdk.user
            .logout()
            .then(() => {
                // reload the application to flush any in-memory caches we might have in place
                window.location.reload();
            })
            .catch((error) => {
                setUserState({ isLoading: false, error, data: userState.data });
                throw new ApiResponseError(error.message, error.response, error.responseBody);
            });
    }, []);

    return <AuthContext.Provider value={{ ...userState, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const MockAuthProvider: React.FC<{
    userState: AuthLoadingState;
    login?: () => void;
    logout?: () => void;
}> = ({
    userState = {
        isLoading: true,
        error: null,
        data: {
            firstName: "Test",
            lastName: "User",
            login: "test@gooddata.com",
            loginMD5: "test",
            organizationName: "test",
            profileUri: "/gdc/account/profile/test",
        },
    },
    login = noop,
    logout = noop,
    children,
}) => {
    return <AuthContext.Provider value={{ ...userState, login, logout }}>{children}</AuthContext.Provider>;
};
