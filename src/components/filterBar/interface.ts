// (C) 2020 GoodData Corporation
import { FilterId, UseFilterElements, UseFiltersState } from "../../complexFilters/filterTypes";

export interface IProps {
    className?: string;
    useFiltersState: UseFiltersState;
    useFilterElements: UseFilterElements;
    usedFilterIds: FilterId[];
}
