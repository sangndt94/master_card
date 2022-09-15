import fixtureWithLogin from "../helpers/fixtureWithLogin";
import fs from "fs";
import { navigateTo } from "../helpers/pageUtils";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel } from "../helpers/exportUtils";

fixtureWithLogin("Fraud Intelligence Insights.Exported Issuer - e2e", 1, "fii/global-fraud-overview");

const navGroups = [
    {
        title: "GLOBAL FRAUD OVERVIEW",
        path:"fii/global-fraud-overview",
        visualizationIds: ["abArrCKBer3Q", "aacrErGgfKYH", "abQrDp85h4Ho"]
    },
    {
        title: "GROSS FRAUD BPS",
        path:"fii/issuer-gross-fraud-bps",
        visualizationIds: ["abesOpXvaF2z", "aaWVoMF1hIdQ"]
    },
    {
        title: "NET FRAUD BPS",
        path:"fii/issuer-net-fraud-bps",
        visualizationIds: ["abbVyXnxh19K", "acPVw22lcnMA"]
    },
    {
        title: "CORRIDORS",
        path:"fii/issuer-corridors",
        visualizationIds: ["acRVxgGLcijU", "aeaVFms4f7qJ", "abaVLwavcmff"]
    },
    {
        title: "PRODUCTS",
        path:"fii/issuer-products",
        visualizationIds: ["acoVARa2g3MJ", "aaTVMa4QhLZd", "aaRVMaXMeqy6"]
    },
    {
        title: "CHANNELS",
        path:"fii/issuer-channels",
        visualizationIds: ["aafVGBvIaHxd", "aaiVOWDGbPJH", "afgVFxnQgdhk"]
    },
    {
        title: "ISSUER REGION FRAUD DEEP DIVE",
        path:"fii/issuer-region-fraud-deep-dive",
        visualizationIds: ["aaGQFftHe52m", "adwQFkHKgkXr", "aaTQLs7OcGXa"]
    },
    {
        title: "ACQUIRER REGION FRAUD DEEP DIVE",
        path:"fii/acquirer-region-fraud-deep-dive",
        visualizationIds: ["abpQM6EIdfgA", "aaTQNVA2itSL", "abXQMCEgiCQI"]
    },
    {
        title: "POS ENTRY MODE DEEP DIVE",
        path:"fii/pos-entry-mode-deep-dive",
        visualizationIds: ["aad4px9OcnKl", "abu4lZ3JdxXa", "abe39LHle8wH"]
    },
    {
        title: "CHANNEL DEEP DIVE",
        path:"fii/channel-deep-dive",
        visualizationIds: ["aaD4bio8eTqL", "aaM4aCiCfmNq", "aap6n5Tpa0PY", "abz6nN4TfCIe"]
    },
    {
        title: "CARD NOT PRESENT - ADDRESS VERIFICATION SYSTEM (AVS)",
        path:"fii/card-not-present-address-verification-system-avs",
        visualizationIds: ["abK6CNaTaJQB", "aaX6v2xPhRs8"]
    }
];

navGroups.forEach(navGroup => {
    if(process.env.MASTERCARD_FI_REPOSITORY_BRANCH === "develop") {
        test(`should export file at ${navGroup.title}`, async t => {
            await enableDownloadForHeadlessChrome(t);
            await navigateTo(navGroup.path)
            for (const identifier of navGroup.visualizationIds) {
                await t
                    .expect(fs.existsSync(await exportToExcel(identifier, "")))
                    .ok(`Excel file of visualization with id ${identifier} doesn't export`)
                    .expect(fs.existsSync(await exportToCSV(identifier, "")))
                    .ok(`CSV file of visualization with id ${identifier} doesn't export`)
            }
        });
    }
});
