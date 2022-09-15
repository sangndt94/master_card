// (C) 2019 GoodData Corporation
import { findProjectByTitleRegexp } from "../../utils/project";
import { IAppProjectMeta } from "../../types";

const projectRegexp = /^\s*\[FII_X_P\]\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "fii", // needs to be same as in appMetas
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
