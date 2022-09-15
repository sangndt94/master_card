// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../../utils/project";
import { IAppProjectMeta } from "../../../types";

const projectRegexp = /^\s*\[BPS_A_S\]\s*/;

interface IDateMeta {
    measureIdentifiers?: string[];
}

const projectMeta: IAppProjectMeta & IDateMeta = {
    projectRegexp,
    projectIdentifier: "acquirer-fraud-bps-standard",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
