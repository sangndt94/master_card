// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../../utils/project";
import { IAppProjectMeta } from "../../../types";

const projectRegexp = /^\s*(DI|\[DIN_I_P\])\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "issuerDecisionIntelligencePremium",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
