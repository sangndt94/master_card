// (C) 2020 GoodData Corporation

export interface IProps {
    className?: string;
    disabled?: boolean;
    checked: boolean;
    onChange: (newValue: boolean) => void;
}
