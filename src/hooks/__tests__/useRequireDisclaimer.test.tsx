// (C) 2019 GoodData Corporation
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { IProject } from "../../types";
import useRequireDisclaimer from "../useRequireDisclaimer";
import { ILoadingProjectsState } from "../../contexts/ProjectsContext";
import Cookie from "js-cookie";
import { MockAuthProvider } from "../../contexts/AuthContext";

jest.mock("js-cookie");

const getMockProjectsState = (
    projects: IProject[] = [{ links: { self: "internal" }, meta: { title: "[INTERNAL] DISCLAIMER" } }],
): ILoadingProjectsState => ({
    data: {
        projects,
        appMetaProjects: {},
    },
    error: null,
    isLoading: false,
});
const mockProjectsStateWithInternalProject = getMockProjectsState();
const mockProjectsStateWithoutInternalProject = getMockProjectsState([
    { links: { self: "someotherproject" }, meta: { title: "[TEST] SOME OTHER PROJECT" } },
]);

afterEach(() => {
    jest.clearAllMocks();
});

describe("useRequireDisclaimer", () => {
    it("should return IState matching ProjectsState with value: true if internal project is present and mcDisclaimerAgreed cookie is NOT set to TRUE", () => {
        const test = jest.fn();
        Cookie.get.mockImplementation(() => undefined);
        const MockComponent = () => {
            // omit confirmDisclaimer in this test
            const { confirmDisclaimer, ...props } = useRequireDisclaimer(
                mockProjectsStateWithInternalProject,
            );
            test(props);
            return null;
        };
        mount(<MockComponent />);
        expect(test).toHaveBeenLastCalledWith({
            isPending: false,
            error: null,
            value: true,
        });
    });
    it("should return IState matching ProjectsState with value: false if internal project is NOT present and mcDisclaimerAgreed cookie is NOT set to TRUE", () => {
        const test = jest.fn();
        Cookie.get.mockImplementation(() => undefined);
        const MockComponent = () => {
            // omit confirmDisclaimer in this test
            const { confirmDisclaimer, ...props } = useRequireDisclaimer(
                mockProjectsStateWithoutInternalProject,
            );
            test(props);
            return null;
        };
        mount(<MockComponent />);
        expect(test).toHaveBeenLastCalledWith({
            isPending: false,
            error: null,
            value: false,
        });
    });
    it("should return IState matching ProjectsState with value: false if internal project is present and mcDisclaimerAgreed cookie is set to TRUE", () => {
        const test = jest.fn();
        Cookie.get.mockImplementation(
            jest.fn((key) => {
                return { mcDisclaimerAgreed: "TRUE" }[key];
            }),
        );

        const MockComponent = () => {
            // omit confirmDisclaimer in this test
            const { confirmDisclaimer, ...props } = useRequireDisclaimer(
                mockProjectsStateWithInternalProject,
            );
            test(props);
            return null;
        };
        mount(<MockComponent />);
        expect(Cookie.get).toHaveBeenCalledTimes(1);
        expect(Cookie.get).toHaveBeenCalledWith("mcDisclaimerAgreed");
        expect(test).toHaveBeenLastCalledWith({
            isPending: false,
            error: null,
            value: false,
        });
    });
    it("should return confirmDisclaimer function and set mcDisclaimerAgreed cookie when it is called", () => {
        Cookie.set.mockImplementation(jest.fn());
        Cookie.get.mockImplementation(jest.fn(() => undefined));

        let confirmDisclaimer = null;

        const MockComponent = () => {
            confirmDisclaimer = useRequireDisclaimer(mockProjectsStateWithInternalProject).confirmDisclaimer;
            return null;
        };
        mount(
            <MockAuthProvider
                userState={{
                    isLoading: false,
                    error: null,
                    data: {
                        firstName: "Test",
                        lastName: "User",
                        login: "test@gooddata.com",
                        loginMD5: "test",
                        organizationName: "test",
                        profileUri: "/gdc/account/profile/test",
                    },
                }}
            >
                <MockComponent />
            </MockAuthProvider>,
        );
        expect(typeof confirmDisclaimer).toBe("function");
        act(() => {
            confirmDisclaimer();
        });
        expect(Cookie.set).toHaveBeenCalledTimes(1);
        expect(Cookie.set).toHaveBeenCalledWith("mcDisclaimerAgreed", "TRUE", { expires: 16 / 24 });
        expect(window[`dataLayer`].pop()).toStrictEqual({
            eventCategory: "button",
            eventAction: "click",
            eventLabel: "disclaimer agree",
            event: "trackEvent",
            isGoodData: "yes",
            userStatusData: {
                userId: "test",
            },
        });
    });
});
