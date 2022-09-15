// (C) 2019 GoodData Corporation
import { findProjectByTitleRegexp } from "../../../utils/project";
import { IAppProjectMeta } from "../../../types";

const projectRegexp = /^\[BMK_A_S\]\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "acquirerBenchmarkingStandard",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
