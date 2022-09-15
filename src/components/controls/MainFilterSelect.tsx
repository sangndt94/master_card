// (C) 2020 GoodData Corporation
import React from "react";

import AttributeFilter from "../filters/AttributeFilter";
import theme from "../../utils/theme";
import CustomLoading from "../utils/CustomLoading";
import { INormalizedAttributeFilter, IAttributeFilterValue } from "../../types";
import styleGuide from "../styleGuide/styleGuide";
import { css } from "emotion";

const textStyles = {
    ...styleGuide.typography.variant.productTitle,
    color: styleGuide.typography.color.main,
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

const classes = {
    attributeFilter: css({
        margin: 0,
        minWidth: "10em",
    }),
};

interface IMainFilterSelectProps {
    filter: INormalizedAttributeFilter;
    updateFilter: (values: IAttributeFilterValue | IAttributeFilterValue[]) => void;
    projectId: string;
}

const MainFilterSelect: React.FC<IMainFilterSelectProps> = ({ filter, updateFilter, projectId }) => {
    const { isMulti = true, autoSelectIndex = null } = filter;
    return (
        <AttributeFilter
            filterId={filter.id}
            className={classes.attributeFilter}
            attributeQueryOptions={filter.attributeQueryOptions}
            displayFormIdentifier={filter.displayFormIdentifier}
            preset="MAIN"
            onChange={(value) => updateFilter(value)}
            projectId={projectId}
            placeholder={<CustomLoading inline height={styleGuide.typography.fontSize.productTitle} />}
            clearable={autoSelectIndex === null}
            autoSelectIndex={autoSelectIndex}
            selectedValues={filter.selectedValues}
            styles={headerFilterStyles}
            isMulti={isMulti}
        />
    );
};

export default MainFilterSelect;
