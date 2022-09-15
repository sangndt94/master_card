// (C) 2020 GoodData Corporation
import path from "path";
import {t} from "testcafe";
import fs from "fs";
import {
    getVisualizationBlockByIdentifier,
    getVisualizationBlockTitleByIdentifier, getVisualizationByIdentifier,
    waitForLoading
} from "./pageUtils";

export const DOWNLOAD_PATH = "downloads";
export const FileType = {
    EXCEL: 1,
    CSV: 2,
    properties: {
        1: {name: "Excel", code: "xlsx"},
        2: {name: "CSV", code: "csv"}
    }
};

export async function enableDownloadForHeadlessChrome (t) {
    const browserConnection = t.testRun.browserConnection;
    const client = browserConnection.provider.plugin.openedBrowsers[browserConnection.id].client;
    const { Page } = client;

    await Promise.all([
        Page.enable()
    ]);

    await Page.setDownloadBehavior({
        behavior: "allow",
        downloadPath: path.resolve(DOWNLOAD_PATH)
    });
}

export const exportToExcel = async (identifier, tabName) => {
    return await exportTo(FileType.EXCEL, identifier, tabName);
};

export const exportToCSV = async (identifier, tabName) => {
    return await exportTo(FileType.CSV, identifier, tabName);
};

export const exportTo = async (type ,identifier, tabName) => {
    const visualization = await getVisualizationByIdentifier(identifier);
    await waitForLoading(visualization);
    const triggerButton = visualization.find(".s-TriggerButton");
    const excelTrigger = visualization.find(".s-MenuItem").withText(` Export to ${FileType.properties[type].name}`);

    const title = await getVisualizationByIdentifier(identifier).find(".Heading").textContent;
    let path;
    // Filter some apps exported file contains tab name and title chart. For example : Transaction Details - Successful Transactions
    if (tabName !== "") {
        // max length of title is 50
        // return title contains special characters.So remove them by regex. For example : space , tab , newline, slash..
        path = `${DOWNLOAD_PATH}/${title.replace(new RegExp('\/|\\n.*\\n.*\\n.*'), "").substring(0, 50) + " - " + tabName}.${FileType.properties[type].code}`;
    }else {
        path = `${DOWNLOAD_PATH}/${title.replace(new RegExp('\/|\\n.*\\n.*\\n.*'), "").substring(0, 50)}.${FileType.properties[type].code}`;
    }
    await t
        .click(triggerButton)
        .wait(1000)
        .click(excelTrigger);
    // Wait 60*500 ms or less
    for (let i = 0; i < 120; i++) {
        if (fs.existsSync(path))
            break;
        await t.wait(500);
    }
    return path;
};
