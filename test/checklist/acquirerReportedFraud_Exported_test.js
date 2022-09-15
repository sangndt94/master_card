import fixtureWithLogin from "../helpers/fixtureWithLogin";
import fs from "fs";
import { navigateTo } from "../helpers/pageUtils";
import { enableDownloadForHeadlessChrome, exportToCSV, exportToExcel } from "../helpers/exportUtils";

fixtureWithLogin("Reported Fraud.Exported Acquirer", 1, "reported-fraud-acquirer/successful");

const navGroups = [
    {
        title: "SUCCESSFUL TRANSACTIONS",
        path:"reported-fraud-acquirer/successful",
        visualizationIds: ["aadO1Dngix8V"]
    }
];

navGroups.forEach(navGroup => {
    if(process.env.MASTERCARD_FI_REPOSITORY_BRANCH === "develop") {
        test(`should export file at ${navGroup.title}`, async t => {
            await enableDownloadForHeadlessChrome(t);
            await navigateTo(navGroup.path)
            for (const identifier of navGroup.visualizationIds) {
                await t
                    .expect(fs.existsSync(await exportToExcel(identifier, "Successful Transactions")))
                    .ok(`Excel file of visualization with id ${identifier} doesn't export`)
                    .expect(fs.existsSync(await exportToCSV(identifier, "Successful Transactions")))
                    .ok(`CSV file of visualization with id ${identifier} doesn't export`)
            }
        });
    }
});
