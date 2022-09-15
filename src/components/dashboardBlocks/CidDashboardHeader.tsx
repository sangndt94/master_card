// (C) 2019 GoodData Corporation
import React from "react";

import Header from "../utils/Header";
import AttributeFilter from "../filters/AttributeFilter";
import theme from "../../utils/theme";
import CustomLoading from "../utils/CustomLoading";
import { INormalizedAttributeFilter, IAttributeFilterValue } from "../../types";

const textStyles = {
    fontFamily: theme.font.heading,
    fontSize: theme.fontSize.h4,
    lineHeight: 1.15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    color: theme.color.text,
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
        ...textStyles,
        position: "relative",
        flex: "1 1 auto",
        maxWidth: "auto",
        top: "auto",
        transform: "none",
        WebkitTransform: "none",
        MsTransform: "none",
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

interface ICidDashboardHeaderProps {
    filter: INormalizedAttributeFilter;
    updateFilter: (values: IAttributeFilterValue[]) => void;
    projectId: string;
}

const CidDashboardHeader: React.FC<ICidDashboardHeaderProps> = ({ filter, updateFilter, projectId }) => {
    return (
        <Header>
            <div className="CidDashboardHeader">
                {/* language=CSS */}
                <style jsx>{`
                    .CidDashboardHeader {
                        z-index: 30;
                        flex: 0 1 auto;
                        max-width: calc(100% - 112px);
                    }
                    .CidDashboardHeader :global(.Select) {
                        margin: 0;
                        min-width: 10em;
                    }
                `}</style>
                <AttributeFilter
                    filterId={filter.id}
                    className="Select"
                    attributeQueryOptions={filter.attributeQueryOptions}
                    displayFormIdentifier={filter.displayFormIdentifier}
                    preset="MAIN"
                    onChange={(value) => updateFilter([value])}
                    projectId={projectId}
                    placeholder={<CustomLoading inline height={theme.fontSize.h4} />}
                    clearable={false}
                    autoSelectIndex={0}
                    selectedValues={filter.selectedValues}
                    styles={headerFilterStyles}
                    isMulti={false}
                />
            </div>
        </Header>
    );
};

export default CidDashboardHeader;
