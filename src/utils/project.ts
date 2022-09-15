// (C) 2007-2019 GoodData Corporation
import { IProject } from "../types";

export const getProjectId = (project: IProject) => project && project.links.self.split("/").slice(-1)[0];

export const findProjectByTitleRegexp = (regexp: RegExp) => (projects: IProject[] = []) => {
    return projects.filter((project) => regexp.test(project.meta.title));
};
