// (C) 2020 GoodData Corporation
import { ReactNode } from "react";

interface IOption {
    id: string;
    label: ReactNode;
}

export interface IProps {
    options: IOption[];
    selectedOptions: string[];
    onOptionChange: (id: string, newValue?: boolean) => void;
    loadMoreOptions?: () => void;
    multi?: boolean;
    isLoading?: boolean;
    customControls?: ReactNode;
    searchQuery?: string;
    onSearch?: (query: string) => void;
}
