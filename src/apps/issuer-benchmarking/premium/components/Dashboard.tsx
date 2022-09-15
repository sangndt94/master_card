// (C) 2019 GoodData Corporation
import React from "react";

import { useFilters } from "../contexts/FilterStateContext";
import useProjectId from "../hooks/useProjectId";
import CustomLoading from "../../../../components/utils/CustomLoading";
import CidDashboardHeader from "../../../../components/dashboardBlocks/CidDashboardHeader";
import DashboardContent from "../../../../components/dashboardBlocks/DashboardContent";
import Glossary from "../../../../components/glossary/Glossary";

interface IDashboardProps {
    filterBar?: React.ReactNode;
}

const Dashboard: React.FC<IDashboardProps> = ({ children, filterBar = null }) => {
    const projectId = useProjectId();
    const { filters } = useFilters("cidAndIssuerIca_parent");

    const cidFilter = filters[0];
    const selectedIca = cidFilter.selectedValues[0];

    return (
        <React.Fragment>
            <CidDashboardHeader
                filter={cidFilter}
                projectId={projectId}
                updateFilter={(values) => cidFilter.onChange(values)}
            />
            {filterBar}
            <DashboardContent>
                {selectedIca ? children : <CustomLoading className="s-dashboard-loading" />}
            </DashboardContent>
            <Glossary />
        </React.Fragment>
    );
};

export default Dashboard;
