// (C) 2020 GoodData Corporation
import { IFilterDeclaration, IUseFiltersState } from "../../../../complexFilters/filterTypes";

export interface IProps
    extends Partial<Pick<IUseFiltersState, "clearFilters" | "resetFilters">>,
        Pick<IFilterDeclaration, "label" | "id"> {}
