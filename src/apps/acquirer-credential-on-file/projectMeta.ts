// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../utils/project";
import { IAppProjectMeta } from "../../types";

const projectRegexp = /^\s*\[COF_A_P\]\s*/;

interface IDateMeta {
    measureIdentifiers?: string[];
}

const projectMeta: IAppProjectMeta & IDateMeta = {
    projectRegexp,
    projectIdentifier: "acquirer-credential-on-file",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
