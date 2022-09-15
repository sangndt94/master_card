// (C) 2020 GoodData Corporation
import styleGuide from "../../styleGuide/styleGuide";

const { color } = styleGuide;

export interface IProps {
    mainColor?: keyof typeof color;
    secondaryColor?: keyof typeof color;
    className?: string;
    onClose?: () => void;
}
