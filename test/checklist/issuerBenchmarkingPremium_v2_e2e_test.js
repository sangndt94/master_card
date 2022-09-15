import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import fs from "fs";
import { navigate } from "../helpers/pageUtils";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel } from "../helpers/exportUtils";

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium v2 - e2e", 1,
    "issuer-benchmarking-premium/fraud-deep-dive");

const navGroups = [
    {
        title: "FRAUD DEEP DIVE",
        visualizationIds: ["aaHoRYWtbls8", "adZpe50Hg6qW"]
    },
    {
        title: "GENERAL OVERVIEW",
        visualizationIds: ["aaHoRYWtbls8", "abTScKhFhS3X"]
    },
    {
        title: "CHANNEL OVERVIEW",
        visualizationIds: ["acnScQBJaVLW", "aafSjkyvgv5t"]
    },
    {
        title: "CHANNEL AND CORRIDOR OVERVIEW",
        visualizationIds: ["aaFSjKk2bPJn", "actSgB7fdaqK"]
    },
    {
        title: "AUTHORIZATION DECLINE RATES",
        visualizationIds: ["adZpe50Hg6qW", "adzSgaLcfoQn"]
    },
    {
        title: "E-COMMERCE / 3DS DEEP DIVE",
        visualizationIds: ["abnM2fLleBy1", "abwRjPnTewPn"]
    },
    {
        title: "CARD PRESENT / EMV DEEP DIVE",
        visualizationIds: ["aabR6doKgzam", "aa8R6F5bbUeH"]
    }
];

navGroups.forEach(navGroup => {
    if(process.env.MASTERCARD_FI_REPOSITORY_BRANCH === "develop") {
        test(`should export file at ${navGroup.title}`, async t => {
            await enableDownloadForHeadlessChrome(t);
            await navigate(navGroup.title);
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
