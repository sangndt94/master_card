// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../../utils/project";
import { IAppProjectMeta } from "../../../types";

const projectRegexp = /^\s*(DI|\[DIN_I_S\])\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "issuerDecisionIntelligenceStandard",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
