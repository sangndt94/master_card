// (C) 2020 GoodData Corporation
import React from "react";

import { useFilters } from "../contexts/FilterStateContext";
import DashboardContent from "../../../../components/dashboardBlocks/DashboardContent";
import Glossary from "../../../../components/glossary/Glossary";
import CidDashboardHeader from "../../../../components/dashboardBlocks/CidDashboardHeader";
import useProjectId from "../../../issuer-decision-intelligence/premium/hooks/useProjectId";
import CustomLoading from "../../../../components/utils/CustomLoading";

const Dashboard: React.FC<{ filterBar?: React.ReactNode }> = ({ children, filterBar }) => {
    const projectId = useProjectId();
    const { filters } = useFilters("cidAndIssuingIca_parent");

    const cidFilter = filters[0];
    const selectedCid = cidFilter.selectedValues[0];

    return (
        <>
            <CidDashboardHeader
                filter={cidFilter}
                projectId={projectId}
                updateFilter={(values) => cidFilter.onChange(values)}
            />
            {filterBar}
            <DashboardContent>
                {selectedCid ? children : <CustomLoading className="s-dashboard-loading" />}
            </DashboardContent>
            <Glossary />
        </>
    );
};

export default Dashboard;
