// (C) 2019 GoodData Corporation
import { findProjectByTitleRegexp } from "../../../utils/project";
import { IAppProjectMeta } from "../../../types";

const projectRegexp = /^\[BMK_A_P\]\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "acquirerBenchmarkingPremium",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
    isDateRange: true,
};

export default projectMeta;
