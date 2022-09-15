// (C) 2020 GoodData Corporation
import { ReactNode } from "react";
import styleGuide from "../../../styleGuide/styleGuide";

const { color } = styleGuide;

export interface IProps {
    className?: string;
    afterContent?: ReactNode;
    borderColor?: keyof typeof color;
    messageColor?: keyof typeof color;
}
