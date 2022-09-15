// (C) 2007-2019 GoodData Corporation
import React from "react";
import DashboardHeaderSelect from "./DashboardHeaderSelect";
import Header from "../utils/Header";

const DashboardHeader = ({ options = [], selectedOption = null, onChange, ...restProps }) => {
    return (
        <Header {...restProps}>
            <DashboardHeaderSelect
                options={options}
                selectedOption={selectedOption}
                onChange={(option) => onChange(option ? option.value : null)}
            />
        </Header>
    );
};

export default DashboardHeader;
