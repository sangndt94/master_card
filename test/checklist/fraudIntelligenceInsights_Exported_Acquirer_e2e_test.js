import fixtureWithLogin from "../helpers/fixtureWithLogin";
import fs from "fs";
import { navigateTo } from "../helpers/pageUtils";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel } from "../helpers/exportUtils";

fixtureWithLogin("Fraud Intelligence Insights.Exported Acquirer - e2e", 1, "fii/acquirer-global-fraud-overview");

const navGroups = [
    {
        title: "GLOBAL FRAUD OVERVIEW",
        path:"fii/acquirer-global-fraud-overview",
        visualizationIds: ["ae3VTKMYcvEe", "abtV15MubXQL", "abBV32Hygb02"]
    },
    {
        title: "GROSS FRAUD BPS",
        path:"fii/acquirer-gross-fraud-bps",
        visualizationIds: ["abE2019Hguyx", "acq20NhPcKV9"]
    },
    {
        title: "NET FRAUD BPS",
        path:"fii/acquirer-net-fraud-bps",
        visualizationIds: ["abT6d4gFdxSz", "aaJ6lukSh0IB"]
    },
    {
        title: "CORRIDORS",
        path:"fii/acquirer-corridor",
        visualizationIds: ["aaE27OZlfqe8", "aaz3e7i7cJJp", "aaC3fKlZinlO"]
    },
    {
        title: "PRODUCTS",
        path:"fii/acquirer-products",
        visualizationIds: ["aaq28mcFgQzr", "adt25mjyirgv", "aaq3co4Mg6nJ"]
    },
    {
        title: "CHANNELS",
        path:"fii/acquirer-channels",
        visualizationIds: ["abX247WselWB", "acE26ZdMgyFC", "acV249LkeHCc"]
    },
    {
        title: "POS EMV CHIP",
        path:"fii/pos-emv-chip",
        visualizationIds: ["aaE7aV3We2YP"]
    },
    {
        title: "CONTACTLESS ANALYSIS",
        path:"fii/contactless-analysis",
        visualizationIds: ["aaioF3Jzei7r", "adaoR6lFanbu"]
    },
    {
        title: "AUTOMATIC FUEL DISPENSER - ISSUER REGION",
        path:"fii/automatic-fuel-dispenser-issuer-region",
        visualizationIds: ["abWoWi1Se6vD", "aaDTiClBc5KK", "afcoWduRe54A"]
    },
    {
        title: "AUTOMATIC FUEL DISPENSER - ACQUIRER REGION",
        path:"fii/automatic-fuel-dispenser-acquirer-region",
        visualizationIds: ["aaWvkHcwevnW", "acsvh35yezOX", "aaKo4SXlfaEK"]
    },
    {
        title: "CARDHOLDER ACTIVATED TERMINAL (NON - ATM/AFD)",
        path:"fii/cardholder-activated-terminal-non-atm-afd",
        visualizationIds: ["aaMBce6mdWnz", "aaZBanMzbcQD"]
    },
    {
        title: "ATM EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)",
        path:"fii/atm-emv-chip-fallback-to-mag-stripe-entry-mode-80",
        visualizationIds: ["acTBJN14hRHS", "aczFWnTMdFw9"]
    },
    {
        title: "POS EMV CHIP FALLBACK TO MAG STRIPE (ENTRY MODE 80)",
        path:"fii/pos-emv-chip-fallback-to-mag-stripe-entry-mode-80",
        visualizationIds: ["abLF4hp9gyjq", "abgGbDnTdCqc"]
    },
    {
        title: "POS EMV CHIP FALLBACK TO VOICE (ENTRY MODE 79)",
        path:"fii/pos-emv-chip-fallback-to-voice-entry-mode-79",
        visualizationIds: ["abyungC0gBXd", "abAAqvzYcuV8"]
    },
    {
        title: "POS PAN KEY ENTERED (ENTRY MODE 01)",
        path:"fii/pos-pan-key-entered-entry-mode-01",
        visualizationIds: ["aa1GAyHteYS9", "aa0AB6ifeSlx"]
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
