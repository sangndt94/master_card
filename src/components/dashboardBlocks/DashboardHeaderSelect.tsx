// (C) 2007-2019 GoodData Corporation
import React from "react";
import Select, { components } from "react-select";
import CustomLoading from "../utils/CustomLoading";
import Heading from "../utils/Heading";
import theme from "../../utils/theme";

const textStyles = {
    fontFamily: theme.font.heading,
    fontSize: theme.fontSize.h4,
    lineHeight: 1.15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    color: theme.color.text,
};

const SingleValue = (props) => {
    return (
        <span title={(props.data && props.data.label) || null}>
            <components.SingleValue {...props} />
        </span>
    );
};

const headerFilterStyles = {
    option: (provided) => ({
        ...provided,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        alignSelf: "center",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    singleValue: (provided) => ({
        ...provided,
        position: "relative",
        flex: "1 1 auto",
        maxWidth: "auto",
        transform: "none",
        top: 0,
        left: 0,
        ...textStyles,
    }),
    input: (provided) => ({
        ...provided,
        ...textStyles,
        margin: 0,
        padding: 0,
    }),
    placeholder: (provided) => ({
        ...provided,
        ...textStyles,
        color: theme.color.textLighter,
        margin: "0 0 0 2px",
        padding: 0,
        position: "relative",
        transform: "none",
        top: 0,
        left: 0,
    }),
    control: (provided) => ({
        ...provided,
        background: "transparent none",
        cursor: "pointer",
        border: 0,
        boxShadow: "none",
        alignItems: "stretch",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        minHeight: "1em",
        ">div": {
            flexWrap: "nowrap",
            alignItems: "flex-end",
            paddingLeft: 0,
            paddingRight: 0,
        },
        "&:hover": {
            border: 0,
            borderColor: "transparent",
        },
    }),
};

const DashboardHeaderSelect = ({ options = [], selectedOption = null, onChange, ...otherSelectProps }) => {
    if (!selectedOption) {
        return <CustomLoading inline />;
    }
    if (options.length === 1) {
        return <Heading level={4}>{selectedOption.label}</Heading>;
    }
    return (
        <div className="DashboardHeaderSelect">
            {/* language=CSS */}
            <style jsx>
                {`
                    .DashboardHeaderSelect {
                        min-width: 200px;
                    }
                    .DashboardHeaderSelect > :global(.select) {
                        width: 100%;
                    }
                `}
            </style>
            <Select
                className="select"
                styles={headerFilterStyles}
                onChange={onChange}
                options={options}
                value={selectedOption}
                components={{ SingleValue }}
                {...otherSelectProps}
            />
        </div>
    );
};

export default DashboardHeaderSelect;
