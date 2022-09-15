// (C) 2019 GoodData Corporation
import { useProjectsState } from "../contexts/ProjectsContext";
import { getProjectId } from "../utils/project";

const createUseProjectId = (projectKey: string) => () => {
    const projectsState = useProjectsState();
    return (
        (projectsState &&
            projectsState.data &&
            projectsState.data.appMetaProjects &&
            getProjectId(projectsState.data.appMetaProjects[projectKey])) ||
        null
    );
};

export default createUseProjectId;
