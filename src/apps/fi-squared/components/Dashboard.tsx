// (C) 2019 GoodData Corporation
import React from "react";
import DashboardContent from "../../../components/dashboardBlocks/DashboardContent";
import Header from "../../../components/utils/Header";
import Glossary from "../../../components/glossary/Glossary";

interface IDashboardProps {
    filterBar?: React.ReactNode;
}

const Dashboard: React.FC<IDashboardProps> = ({ children, filterBar = null }) => {
    return (
        <React.Fragment>
            <Header hasFilterBar={Boolean(filterBar)} />
            {filterBar}
            <DashboardContent>{children}</DashboardContent>
            <Glossary />
        </React.Fragment>
    );
};

export default Dashboard;
