// (C) 2019 GoodData Corporation
import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import fixtureWithLogin from "../helpers/fixtureWithLogin";

const selectRole = (role) => {
    const roleSelectInput = ".s-role";
    return t
        .click(roleSelectInput)
        .typeText(roleSelectInput, role)
        .pressKey("enter")
};

loginAutoTestUserAndNavigate("Digital.App Picker (Landing page)", 1);

test("should open Digital App", async t => {
    await selectRole("issuer");
    const link = ".s-digital";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});

loginAutoTestUserAndNavigate("Issuer Benchmarking.App Picker (Landing page)", 1);

test("should open Issuer Benchmarking Standard App", async t => {
    await selectRole("issuer");
    const link = ".s-issuerBenchmarkingStandard";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});

loginAutoTestUserAndNavigate("Issuer Benchmarking Premium.App Picker (Landing page)", 1);

test("should open Issuer Benchmarking Premium App", async t => {
    await selectRole("issuer");
    const link = ".s-issuerBenchmarkingPremium";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});

loginAutoTestUserAndNavigate("Acquirer Benchmarking.App Picker (Landing page)", 1);

test("should open Acquirer Benchmarking Standard App", async t => {
    await selectRole("acquirer");
    const link = ".s-acquirerBenchmarkingStandard";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});

loginAutoTestUserAndNavigate("Acquirer Benchmarking Premium.App Picker (Landing page)", 1);

test("should open Acquirer Benchmarking Premium App", async t => {
    await selectRole("acquirer");
    const link = ".s-acquirerBenchmarkingPremium";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});

loginAutoTestUserAndNavigate("Fraud Intelligence Insights.App Picker (Landing page)", 1);

test("should open FII App", async t => {
    await selectRole("acquirer");
    const link = ".s-fii";
    const appTile = Selector(link);
    const dashboardContent = Selector(".s-dashboard-content");
    await t
        .expect(appTile.exists).eql(true)
        .click(link)
        .expect(dashboardContent.exists).eql(true);
});
