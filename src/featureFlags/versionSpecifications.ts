// (C) 2019-2020 GoodData Corporation
import { IVersionList } from "./types";

// this is where the feature flags should be specified
export const activeVersions: IVersionList = {
    1: {
        fiiApp: true,
        newAppPickerIcons: false,
    },
    2: {
        newAppPickerIcons: true,
        enableExportFeature: true,
    },
    3: {
        motoIssuerApp: true,
        motoAcquirerApp: true,
        nonEmvReportApp: true,
        performanceAnalyticsApp: true,
        fraudBpsAcquirerApp: true,
        fraudBpsIssuerApp: true,
        reportedFraudIssuerApp: true,
        reportedFraudAcquirerApp: true,
        credentialOnFileIssuerApp: true,
        credentialOnFileAcquirerApp: true,
        issuerDecisionIntelligence: true,
    },
};

// this is the version used if user has no platform setting value
export const baselineVersion = "0";
