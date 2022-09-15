// (C) 2020 GoodData Corporation
import React from "react";

import { useFilters } from "../contexts/FilterStateContext";
import DashboardContent from "../../../../components/dashboardBlocks/DashboardContent";
import Glossary from "../../../../components/glossary/Glossary";
import projectMeta from "../projectMeta";
import DashboardHeader from "../../../../components/dashboardBlocks/DashboardHeader";
import { useProjectsState, useProjectsManipulators } from "../../../../contexts/ProjectsContext";

const Dashboard: React.FC<{ filterBar?: React.ReactNode }> = ({ children, filterBar }) => {
    const projectsState = useProjectsState();
    const projectsManipulators = useProjectsManipulators();
    const { clearFilters } = useFilters();

    const projects =
        !projectsState.isLoading && projectsState.data
            ? projectMeta.getValidProjects(projectsState.data.projects).map((project) => ({
                  value: project,
                  label: projectMeta.getProjectTitle(project),
              }))
            : [];

    const selectedProject =
        (projectsState.data &&
            projectsState.data.appMetaProjects &&
            projectsState.data.appMetaProjects[projectMeta.projectIdentifier] &&
            projects.find(
                (project) =>
                    project.value === projectsState.data.appMetaProjects[projectMeta.projectIdentifier],
            )) ||
        projects[0] ||
        null;

    const onProjectChange = (project) => {
        projectsManipulators[projectMeta.projectIdentifier](project);
        clearFilters(); // clear all filters to prevent invalid attribute filter values (MC-187)
    };
    return (
        <>
            <DashboardHeader options={projects} selectedOption={selectedProject} onChange={onProjectChange} />
            {filterBar}
            <DashboardContent>{children}</DashboardContent>
            <Glossary />
        </>
    );
};

export default Dashboard;
