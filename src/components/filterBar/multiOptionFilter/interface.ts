// (C) 2020 GoodData Corporation
import { IFilterState, IUseFiltersState, UseFilterElements } from "../../../complexFilters/filterTypes";

export interface IProps
    extends IFilterState,
        Pick<
            IUseFiltersState,
            "clearFilters" | "resetFilters" | "setAttributeFilter" | "updateFilterSelectedItems"
        > {
    className?: string;
    useFilterElements: UseFilterElements;
    openFilter?: string;
    setOpenFilter?: (id: any) => void;
}
