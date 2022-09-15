// (C) 2019 GoodData Corporation
import { findProjectByTitleRegexp } from "../../utils/project";
import { IAppProjectMeta } from "../../types";

const projectRegexp = /^\[DIG_I_P\]\s*/;

const projectMeta: IAppProjectMeta = {
    projectRegexp,
    projectIdentifier: "digital",
    getValidProjects: findProjectByTitleRegexp(projectRegexp),
    getProjectTitle: (project) => project.meta.title.replace(projectRegexp, ""),
    dateAttributeDFIdentifier: "date.acx81lMifn6q",
    lastMonthMeasureIdentifier: "_svc_last_month_idv",
    laggedMonthMeasureIdentifier: "_svc_last_month_mdes",
    isDateRange: true,
};

export default projectMeta;
