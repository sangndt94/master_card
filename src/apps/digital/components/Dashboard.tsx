// (C) 2019 GoodData Corporation
import React from "react";
import DashboardHeader from "../../../components/dashboardBlocks/DashboardHeader";
import { useProjectsState, useProjectsManipulators } from "../../../contexts/ProjectsContext";
import DashboardContent from "../../../components/dashboardBlocks/DashboardContent";
import projectMeta from "../projectMeta";
import { useFilters } from "../contexts/FilterStateContext";
import Glossary from "../../../components/glossary/Glossary";

interface IDashboardProps {
    filterBar?: React.ReactNode;
}

const Dashboard: React.FC<IDashboardProps> = ({ children, filterBar = null }) => {
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
        <React.Fragment>
            <DashboardHeader options={projects} selectedOption={selectedProject} onChange={onProjectChange} />
            {filterBar}
            <DashboardContent>{children}</DashboardContent>
            <Glossary />
        </React.Fragment>
    );
};

export default Dashboard;
