// (C) 2020 GoodData Corporation
import React, { createContext, FC, useState } from "react";
import { css } from "emotion";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import VisualizationBlockBase from "../dashboardBlocks/VisualizationBlockBase";
import { HeatmapVerticalAttribute } from "../dashboardBlocks/HeatmapVerticalAttribute";
import sdk from "../../sdk";
import { HeatmapHorizontalAttribute } from "../dashboardBlocks/HeatmapHorizontalAttribute";
import { HeatmapAttributes } from "../dashboardBlocks/HeatmapAttributes";
import { HeatmapTable } from "../dashboardBlocks/HeatmapTable";
import { AttributeFilter, IFilterCollection } from "../../types";
import createUseFilters, { IFilterContext } from "../../hooks/createUseFilters";
import { BASIC_ATTRIBUTE_FILTER } from "../../constants";
import FilterBar from "../filters/FilterBar";

const classes = {
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
};

type FilterId = "dti" | "discore" | "totalspendrankamount" | "segmentname";

const filtersConfig: { [key in FilterId]: AttributeFilter } = {
    dti: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "DTI",
        displayFormIdentifier: "label.di.dti",
        isMulti: true,
        preset: "S",
    },
    discore: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "DI score",
        displayFormIdentifier: "label.di.discore200",
        isMulti: true,
        preset: "S",
    },
    totalspendrankamount: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Total spend rank amount",
        displayFormIdentifier: "label.di.totalspendrankamount",
        isMulti: true,
        preset: "S",
    },
    segmentname: {
        type: BASIC_ATTRIBUTE_FILTER,
        selectedValues: [],
        placeholder: "Segment name",
        displayFormIdentifier: "label.di.segmentname",
        isMulti: true,
        preset: "S",
    },
};

const FilterStateContext = createContext<IFilterContext>({} as any);

const FilterStateProvider: React.FC = ({ children }) => {
    const [filterState, setFilterState] = useState(filtersConfig as IFilterCollection);

    return (
        <FilterStateContext.Provider
            value={{
                filterState,
                setFilterState,
            }}
        >
            {children}
        </FilterStateContext.Provider>
    );
};

const selectedFilterIds: FilterId[] = ["dti", "discore", "totalspendrankamount", "segmentname"];

const useFilters = createUseFilters<FilterId>(FilterStateContext);

const SGHeatmapsPure: React.FC<{}> = () => {
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        ...selectedFilterIds,
    );

    // TODO: Keep this during development to track unnecessary re-renders
    // tslint:disable-next-line: no-console
    console.log("SGHeatmaps rerender");

    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Heatmaps
            </Typography>

            <FilterBar
                filters={filters}
                projectId="rk6vk3lskg6gz01185ks3ci6o55i8xoo"
                clearFilters={clearFilters}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
            />

            <VisualizationBlockBase height="auto">
                <HeatmapVerticalAttribute
                    sdk={sdk}
                    projectId="rk6vk3lskg6gz01185ks3ci6o55i8xoo"
                    attribute="label.di.dti"
                    metrics={["acabVXtTfeUw", "abo6uCpqdkRf", "abwcoTTWbiLN", "aay7mJrqfwrh", "abbbZKHCagwo"]}
                    filters={visFilters}
                    normalizedFilters={filters}
                    applyFilters={applyFilters}
                />
                <HeatmapHorizontalAttribute
                    sdk={sdk}
                    projectId="rk6vk3lskg6gz01185ks3ci6o55i8xoo"
                    attribute="label.di.discore200"
                    metrics={["aay7mJrqfwrh", "adg7TDhXimBI", "abo70WnIaQAK"]}
                    filters={visFilters}
                    normalizedFilters={filters}
                    applyFilters={applyFilters}
                />
                <HeatmapAttributes
                    sdk={sdk}
                    projectId="rk6vk3lskg6gz01185ks3ci6o55i8xoo"
                    attributes={["label.di.totalspendrankamount", "label.di.segmentname"]}
                    metric="abo70WnIaQAK"
                    filters={visFilters}
                    normalizedFilters={filters}
                    applyFilters={applyFilters}
                />

                <HeatmapTable
                    data={[
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                        [null, null, null, null, null, null, null, null, null, null],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                        [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
                        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    ]}
                    maxMinType="global"
                    xLabels={["x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"]}
                    yLabels={[
                        "y0",
                        "y1",
                        "y2",
                        "y3",
                        "y4",
                        "y5",
                        "y6",
                        "y7",
                        "y8",
                        "y9",
                        "y10",
                        "y11",
                        "y12",
                    ]}
                    xHeader={<Typography variant="subtitle">xHeader</Typography>}
                    yHeader={<Typography variant="section">yHeader</Typography>}
                />
            </VisualizationBlockBase>
        </div>
    );
};

export const SGHeatmaps: FC = () => (
    <FilterStateProvider>
        <SGHeatmapsPure />
    </FilterStateProvider>
);
