// (C) 2019 GoodData Corporation
import { Role } from "testcafe";

export default (name, version, page = "") =>
    fixture(name).meta({ version }).beforeEach(loginUserAndNavigate(regularUser, page));

export const autoTestingUser = Role(`${process.env.TEST_BACKEND}#/login`, async (t) => {
    await t
        .typeText(".s-login-input-email", "mastercard.testing+automated@gooddata.com", {
            paste: true,
            replace: true,
        })
        .typeText(".s-login-input-password", process.env.TEST_PASSWORD, { paste: true, replace: true })
        .click(".s-login-submit");
});

export const regularUser = Role(`${process.env.TEST_BACKEND}#/login`, async (t) => {
    await t
        .typeText(".s-login-input-email", process.env.TEST_USERNAME, { paste: true, replace: true })
        .typeText(".s-login-input-password", process.env.TEST_PASSWORD, { paste: true, replace: true })
        .click(".s-login-submit");
});

export const loginUserAndNavigate = (role, page) => async (t) => {
    await t.useRole(role).navigateTo(`${process.env.TEST_BACKEND}#/${page}`);
};

export const loginAutoTestUserAndNavigate = (name, version, page = "") =>
    fixture(name).meta({ version }).beforeEach(loginUserAndNavigate(autoTestingUser, page));

export const loginIsolatedTestAndNavigate = (name, version, page = "") =>
    fixture(name)
        .meta({ version })
        .page(`${process.env.TEST_BACKEND}/#/login`)
        .beforeEach(async t => {
        await t
            .typeText(".s-login-input-email", "fakeUser@gooddata.com", { paste: true, replace: true })
            .typeText(".s-login-input-password", "fakePassword", { paste: true, replace: true })
            .click(".s-login-submit");
        await t.navigateTo(`${process.env.TEST_BACKEND}/#/${page}`);
    });
