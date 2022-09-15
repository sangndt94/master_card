// (C) 2019-2020 GoodData Corporation
import { useState, useRef, useEffect } from "react";
import Cookie from "js-cookie";
import { ILoadingProjectsState } from "../contexts/ProjectsContext";
import { IState } from "./usePromise";
import { dataLayer, userData } from "../components/utils/GoogleTagManager";
import { useAuth } from "../contexts/AuthContext";

const internalProjectTitleRegex = /\[INTERNAL\]/;
const cookieExpirationInDays = 16 / 24; // 16 hours
const disclaimerAgreedCookie = "mcDisclaimerAgreed";
const disclaimerAgreedCookieAgreed = "TRUE";

const getDisclaimerAlreadyAgreed = () => {
    const cookieValue = Cookie.get(disclaimerAgreedCookie);
    return cookieValue === disclaimerAgreedCookieAgreed;
};

const useRequireDisclaimer = (
    projectsState: ILoadingProjectsState,
): IState<boolean> & { confirmDisclaimer: () => void } => {
    const { isLoading, error, data: projectData } = projectsState;
    const projects = (projectData && projectData.projects) || [];
    // Disclaimer is not required by default. We want to display it only when we know the user is internal and did not already agreed.
    // This shouldn't be a problem because no data are shown before projects are loaded which is when the useEffect is triggered.
    const [requireDisclaimer, setRequireDisclaimer] = useState(false);
    const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
    const authState = useAuth();
    const user = authState.data;

    useEffect(() => {
        if (projects.length > 0) {
            const isInternalUser = projects.some((project) =>
                internalProjectTitleRegex.test(project.meta.title),
            );
            const didAlreadyAgree = getDisclaimerAlreadyAgreed();
            setRequireDisclaimer(isInternalUser && !didAlreadyAgree);
        }
    }, [projects]);

    const confirmDisclaimer = useRef(() => {
        Cookie.set(disclaimerAgreedCookie, disclaimerAgreedCookieAgreed, { expires: cookieExpirationInDays });
        setRequireDisclaimer(false);
        setDisclaimerAgreed(true);
    });

    useEffect(() => {
        if (disclaimerAgreed) {
            dataLayer({
                ...userData(user),
                eventCategory: "button",
                eventAction: "click",
                eventLabel: "disclaimer agree",
                event: "trackEvent",
            });
        }
    }, [disclaimerAgreed]);

    return {
        isPending: isLoading,
        error,
        value: requireDisclaimer,
        confirmDisclaimer: confirmDisclaimer.current,
    };
};

export default useRequireDisclaimer;
