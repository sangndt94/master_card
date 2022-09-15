// (C) 2020 GoodData Corporation
import { IFilterState, IUseFiltersState, UseFilterElements } from "../../../complexFilters/filterTypes";

export interface IProps
    extends IFilterState,
        Pick<IUseFiltersState, "clearFilters" | "resetFilters" | "updateFilterSelectedItems"> {
    className?: string;
    useFilterElements: UseFilterElements;
}
