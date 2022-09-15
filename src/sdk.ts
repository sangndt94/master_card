// (C) 2019 GoodData Corporation
import { factory } from "@gooddata/gooddata-js";

// provided by webpack; Caution! They will not be available in Jest, so always check for undefined.
declare const ACTUAL_BACKEND_URL: string; // Actual backend url
declare const BACKEND_URL: string; // null on localhost, or actual backend url

export const backendDomain = typeof ACTUAL_BACKEND_URL !== "undefined" ? ACTUAL_BACKEND_URL : "";

const sdk = factory();

const domainsWithCustomRouting = [
    "staging3-lcm-dev.intgdc.com",
    "staging2-lcm-dev.intgdc.com",
    "staging-lcm-dev.intgdc.com",
    "isolated1-staging3.intgdc.com",
    "isolated1-staging2.intgdc.com",
    "isolated1-staging.intgdc.com",
    "isolated2-staging3.intgdc.com",
    "isolated2-staging2.intgdc.com",
    "isolated2-staging.intgdc.com",
];

const needsCustomDomain = domainsWithCustomRouting.includes(window.location.hostname);

// redirect sdk to the backend URL explicitly in production
if (needsCustomDomain && typeof BACKEND_URL !== "undefined" && BACKEND_URL) {
    sdk.config.setCustomDomain(BACKEND_URL);
}

export default sdk;
