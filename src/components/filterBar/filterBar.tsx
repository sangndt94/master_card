// (C) 2020 GoodData Corporation
import React, { useState, FC } from "react";
import cx from "classnames";
import { css } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import { areFiltersPending } from "../../complexFilters/filterUtils";
import { RadioFilter } from "./radioFilter";
import { CheckboxFilter } from "./checkboxFilter";
import { SingleOptionFilter } from "./singleOptionFilter";
import { MultiOptionFilter } from "./multiOptionFilter";
import { IProps } from "./interface";
import { SliderFilter } from "./sliderFilter";

const classes = {
    filterBar: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
    }),
};

const filterComponentMap = {
    default: RadioFilter,
    radioFilter: RadioFilter,
    checkboxFilter: CheckboxFilter,
    singleOptionFilter: SingleOptionFilter,
    multiOptionFilter: MultiOptionFilter,
    sliderFilter: SliderFilter,
};

export const FilterBar: FC<IProps> = ({ className, useFiltersState, useFilterElements, usedFilterIds }) => {
    const {
        filtersState,
        applyFilters,
        clearFilters,
        resetFilters,
        updateFilterSelectedItems,
        setAttributeFilter,
    } = useFiltersState(usedFilterIds);

    const areFiltersReady = !areFiltersPending(filtersState);
    const [openFilter, setOpenFilter] = useState("");

    return (
        <div className={cx(classes.filterBar, className)}>
            {filtersState.map((filterState) => {
                const Component =
                    filterComponentMap[filterState.Component] ||
                    filterComponentMap[filterState.filterType] ||
                    filterComponentMap.default;
                return (
                    <Component
                        key={filterState.id}
                        useFilterElements={useFilterElements}
                        updateFilterSelectedItems={updateFilterSelectedItems}
                        clearFilters={clearFilters}
                        resetFilters={resetFilters}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setAttributeFilter={setAttributeFilter}
                        {...filterState}
                    />
                );
            })}
            <button disabled={!areFiltersReady} onClick={() => applyFilters()}>
                Apply All{!areFiltersReady && " (filters not ready yet)"}
            </button>
            <button onClick={() => resetFilters()}>Reset All</button>
            <button onClick={() => clearFilters()}>Clear All</button>
        </div>
    );
};
