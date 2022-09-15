// (C) 2020 GoodData Corporation
import { CSSProperties } from "react";
import styleGuide from "../components/styleGuide/styleGuide";

export interface IColorFormatStyle {
    color?: CSSProperties["color"];
}

// This maps numberFormats color names to styleGuide colors
const colorMap = {
    black: styleGuide.color.black,
    red: styleGuide.color.negative,
    green: styleGuide.color.positive,
    blue: styleGuide.visualizationColor[6],
    white: styleGuide.color.white,
    cyan: styleGuide.visualizationColor[0],
    magenta: styleGuide.visualizationColor[5],
    yellow: styleGuide.visualizationColor[3],
};

export const getColorStyle = (color?: string): IColorFormatStyle => {
    if (!color) {
        return {};
    }
    return {
        color: colorMap[color] || `#${color.replace("color=", "")}`,
    };
};

export const parseTextWithColorFormat = (textWithColorFormat: string) => {
    const [, color, valueFormatted] = (/(?:\[([^\]]+)\]\s*)?(.+)$/.exec(textWithColorFormat) as unknown) as [
        any,
        keyof typeof colorMap | string,
        string,
    ];
    const valueStyle = getColorStyle(color);
    return {
        valueFormatted,
        valueStyle,
    };
};

export const parseData = (data: number | string | null): number | null => {
    if (typeof data === "number") {
        return data;
    }
    if (typeof data === "string") {
        const parsed = parseFloat(data);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    return null;
};
