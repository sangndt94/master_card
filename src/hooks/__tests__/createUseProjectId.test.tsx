// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { MockAuthProvider } from "../../contexts/AuthContext";
import createUseProjectId from "../createUseProjectId";
import { MockProjectsProvider } from "../../contexts/ProjectsContext";

describe("createUseProjectId", () => {
    const testProject = {
        meta: {
            title: "[test] Test project",
            projectIdentifier: "testId",
        },
        links: {
            self: "/gdc/projects/testId",
        },
    };
    it("should return a hook that returns a projectId", () => {
        const MockComponent = () => {
            const projectKey = "test";
            const useProjectId = createUseProjectId(projectKey);
            const projectId = useProjectId();
            expect(projectId).toBe("testId");
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
                <MockProjectsProvider
                    projectsState={{
                        isLoading: false,
                        error: null,
                        data: {
                            projects: [],
                            appMetaProjects: {
                                test: testProject,
                            },
                        },
                    }}
                >
                    <MockComponent />
                </MockProjectsProvider>
            </MockAuthProvider>,
        );
    });
});
