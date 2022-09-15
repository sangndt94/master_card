// (C) 2020 GoodData Corporation
import { findProjectByTitleRegexp } from "../../utils/project";
import { IAppProjectMeta } from "../../types";

const projectRegexp = /^\s*\[BPS_I_S\]\s*/;

interface IDateMeta {
    measureIdentifiers?: string[];
}

const projectMeta: IAppProjectMeta & IDateMeta = {
    projectRegexp,
    projectIdentifier: "issuer-fraud-bps-standard",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
};

export default projectMeta;
