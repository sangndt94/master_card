// (C) 2020 GoodData Corporation

export interface IProps {
    className?: string;
    value: string;
    selected: boolean;
    disabled?: boolean;
    onChange: (value: string) => void;
}
