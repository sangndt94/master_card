// (C) 2019 GoodData Corporation
import React from "react";

import Page from "../components/utils/Page";
import AppPickerComponent from "../components/utils/AppPicker";
import useAppMetas from "../hooks/useAppMetas";

const getTileDefinition = (appMeta) => ({
    projectIdentifier: appMeta.projectIdentifier,
    isShown: (projects) => appMeta.getValidProjects(projects).length > 0,
    types: appMeta.relevantFor,
    route: appMeta.routeDefinitions[0].path,
    title: appMeta.name,
    imagePath: appMeta.imagePath,
});

const AppPicker = ({ projects, selectedViewOption, setSelectedViewOption }) => {
    const appMetas = useAppMetas();
    const tileDefinitions = appMetas.map(getTileDefinition);

    return (
        <Page>
            <AppPickerComponent
                projects={projects}
                selectedViewOption={selectedViewOption}
                setSelectedViewOption={setSelectedViewOption}
                tileDefinitions={tileDefinitions}
            />
        </Page>
    );
};

export default AppPicker;
