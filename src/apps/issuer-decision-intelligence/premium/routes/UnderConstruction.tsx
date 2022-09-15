// (C) 2020 GoodData Corporation
import React from "react";
import { Container } from "react-grid-system";
import Dashboard from "../components/Dashboard";
import { InfoBanner } from "../../../../components/utils";

const UnderConstruction: React.FC = () => {
    return (
        <Dashboard>
            <Container fluid className="s-dashboard-content">
                <InfoBanner mainColor="main">This section is under development. Come back soon.</InfoBanner>
            </Container>
        </Dashboard>
    );
};

export default UnderConstruction;
