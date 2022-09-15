// (C) 2020 GoodData Corporation
import { IFilterState, IUseFiltersState } from "../../../../complexFilters/filterTypes";

export interface IProps extends Pick<IUseFiltersState, "clearFilters">, Pick<IFilterState, "id" | "error"> {}
