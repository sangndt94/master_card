// (C) 2019 GoodData Corporation
import React, { useState, useEffect, useCallback, createContext, useContext, useMemo } from "react";

import sdk from "../sdk";
import { useAuth } from "./AuthContext";
import { defaultSourceState } from "../utils/helpers";

import projectMetas from "../apps/projectMetas";
import { IProject, ILoadingState } from "../types";

export type ILoadingProjectsState = ILoadingState<IProjects>;

const ProjectsDataContext: React.Context<ILoadingProjectsState> = createContext(defaultSourceState);
const ProjectsManipulatorsContext: React.Context<{
    [project: string]: (project: IProject) => void;
}> = createContext({});

export interface IProjects {
    projects?: IProject[];
    appMetaProjects?: {
        [key: string]: IProject;
    };
}

export const ProjectsProvider = ({ children }) => {
    const [projectsState, setProjectsState] = useState<ILoadingProjectsState>({ ...defaultSourceState });
    const auth = useAuth();
    const user = auth.data;

    useEffect(() => {
        const body = async () => {
            if (!user) {
                return;
            }

            try {
                const projects: IProject[] = await sdk.project.getProjects(user.loginMD5);

                const appMetaProjects: { [key: string]: IProject } = projectMetas.reduce(
                    (acc, appProjectMeta) => {
                        const validProjects = appProjectMeta.getValidProjects(projects);
                        if (validProjects && validProjects.length > 0) {
                            acc[appProjectMeta.projectIdentifier] = validProjects[0];
                        }
                        return acc;
                    },
                    {},
                );

                setProjectsState({
                    isLoading: false,
                    error: null,
                    data: {
                        projects,
                        appMetaProjects,
                    },
                });
            } catch (error) {
                setProjectsState({
                    ...defaultSourceState,
                    error,
                });
            }
        };

        body();
    }, [user]);

    const setProject = useCallback((projectKey: string, project: IProject) => {
        setProjectsState((state) => ({
            ...state,
            data: {
                ...state.data,
                appMetaProjects: {
                    ...(state.data.appMetaProjects || {}),
                    [projectKey]: project,
                },
            },
        }));
    }, []);

    const projectSetters = useMemo(
        () =>
            projectMetas.reduce((acc, projectMeta) => {
                acc[projectMeta.projectIdentifier] = (project: IProject) =>
                    setProject(projectMeta.projectIdentifier, project);
                return acc;
            }, {}),
        [setProject],
    );

    return (
        <ProjectsDataContext.Provider value={projectsState}>
            <ProjectsManipulatorsContext.Provider value={projectSetters}>
                {children}
            </ProjectsManipulatorsContext.Provider>
        </ProjectsDataContext.Provider>
    );
};

export const useProjectsState = (): ILoadingProjectsState => {
    const projectsState = useContext(ProjectsDataContext);
    return projectsState || defaultSourceState;
};

export const useProjectsManipulators = () => {
    return useContext(ProjectsManipulatorsContext);
};

export const MockProjectsProvider: React.FC<{
    projectsState: ILoadingProjectsState;
    projectSetters?: { [key: string]: () => void };
}> = ({ projectsState, projectSetters = {}, children }) => {
    return (
        <ProjectsDataContext.Provider value={projectsState}>
            <ProjectsManipulatorsContext.Provider value={projectSetters}>
                {children}
            </ProjectsManipulatorsContext.Provider>
        </ProjectsDataContext.Provider>
    );
};
