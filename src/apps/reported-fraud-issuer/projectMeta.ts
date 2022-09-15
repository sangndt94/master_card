// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../utils/project";
import { IAppProjectMeta } from "../../types";

const projectRegexp = /^\s*\[RFR_I_S\]\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "reported-fraud-issuer",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
