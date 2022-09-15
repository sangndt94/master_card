// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { useScreenClass } from "react-grid-system";
import { CSSProperties } from "@material-ui/styles";
import { css } from "emotion";

import styleGuide from "../styleGuide/styleGuide";

type ScreenClass = "xs" | "sm" | "md" | "lg" | "xl";
type Columns = "auto-fit" | "auto-fill" | number;

type ColumnClasses = Partial<{ [key in ScreenClass]: Columns }>;
type CSSWidthType = CSSProperties["width"];

interface IMinMaxSpanClasses {
    xsMinWidth?: CSSWidthType;
    smMinWidth?: CSSWidthType;
    mdMinWidth?: CSSWidthType;
    lgMinWidth?: CSSWidthType;
    xlMinWidth?: CSSWidthType;

    xsMaxWidth?: CSSWidthType;
    smMaxWidth?: CSSWidthType;
    mdMaxWidth?: CSSWidthType;
    lgMaxWidth?: CSSWidthType;
    xlMaxWidth?: CSSWidthType;

    xsSpan?: number;
    smSpan?: number;
    mdSpan?: number;
    lgSpan?: number;
    xlSpan?: number;
}

type GridClasses = ColumnClasses & IMinMaxSpanClasses;

interface IGridProps extends GridClasses, React.CSSProperties {
    className?: string;
    gap?: CSSProperties["gridGap"];
    gridGap?: never;
}

const compileTemplate = (
    columns: Columns = null,
    min: CSSWidthType = null,
    max: CSSWidthType = null,
): CSSProperties["gridTemplateColumns"] => {
    if (!columns) {
        return "1fr";
    }
    if (min === null && max === null) {
        return `repeat(${columns}, 1fr)`;
    }
    const size = min !== null && max !== null ? `minmax(${min}, ${max})` : min || max || 0;
    return `repeat(${columns}, ${size})`;
};

const screenClasses: ScreenClass[] = ["xs", "sm", "md", "lg", "xl"];
const defaultColumnMatch = 1;

const matchAvailableScreenClass = (screenClass: ScreenClass, classes: ColumnClasses): ScreenClass => {
    const startIndex = screenClasses.indexOf(screenClass);
    if (startIndex === -1) {
        return null;
    }

    for (let classIndex = startIndex; classIndex >= 0; classIndex--) {
        const possibleMatch = classes[screenClasses[classIndex]];
        if (possibleMatch) {
            return screenClasses[classIndex];
        }
    }

    return null;
};

const getPostfixedScreenClassProps = (props: IMinMaxSpanClasses, postfix: string = "") => {
    const output = {};
    screenClasses.forEach((key) => {
        output[key] = props[`${key}${postfix}`] || null;
    });
    return output;
};

const getAvailableClassOption = <V extends {}>(
    props: IMinMaxSpanClasses,
    screenClass: ScreenClass,
    postfix: string = "",
): V => {
    const classes = getPostfixedScreenClassProps(props, postfix);
    const classMatch = matchAvailableScreenClass(screenClass, classes);
    const option = classes[classMatch];
    return option;
};

const extractClassProps = (props: Partial<IGridProps>): [GridClasses, Partial<IGridProps>] => {
    const {
        xs,
        sm,
        md,
        lg,
        xl,

        xsMinWidth,
        smMinWidth,
        mdMinWidth,
        lgMinWidth,
        xlMinWidth,

        xsMaxWidth,
        smMaxWidth,
        mdMaxWidth,
        lgMaxWidth,
        xlMaxWidth,

        xsSpan,
        smSpan,
        mdSpan,
        lgSpan,
        xlSpan,
        ...restProps
    } = props;

    const gridClasses: GridClasses = {
        xs,
        sm,
        md,
        lg,
        xl,

        xsMinWidth,
        smMinWidth,
        mdMinWidth,
        lgMinWidth,
        xlMinWidth,

        xsMaxWidth,
        smMaxWidth,
        mdMaxWidth,
        lgMaxWidth,
        xlMaxWidth,

        xsSpan,
        smSpan,
        mdSpan,
        lgSpan,
        xlSpan,
    };
    return [gridClasses, restProps];
};

const compileGridClassStyles = (screenClass: ScreenClass, props: IMinMaxSpanClasses): React.CSSProperties => {
    const columnOption = getAvailableClassOption<Columns>(props, screenClass) || defaultColumnMatch;
    const minOption = getAvailableClassOption<CSSWidthType>(props, screenClass, "MinWidth");
    const maxOption = getAvailableClassOption<CSSWidthType>(props, screenClass, "MaxWidth");
    const gridTemplate = compileTemplate(columnOption, minOption, maxOption);

    const spanOption = getAvailableClassOption<string | number>(props, screenClass, "Span");
    const spanProps: React.CSSProperties =
        spanOption !== null
            ? {
                  gridColumn: `span ${spanOption}`,
              }
            : {};

    return {
        gridTemplateColumns: gridTemplate,
        ...spanProps,
    };
};

const Grid: React.FC<IGridProps> = ({
    children,
    className,
    gap = styleGuide.spacing(2),
    justifyContent,
    justifyItems,
    alignContent,
    ...restProps
}) => {
    const [gridProps, restStyleProps] = extractClassProps(restProps);
    const screenClass = (useScreenClass() as ScreenClass) || screenClasses[0];

    const gridClassStyles = compileGridClassStyles(screenClass, gridProps);

    const { lg } = restProps;

    const rootClassName = css({
        // fallback without full grid support (I am looking at you IE11)
        display: "flex",
        flexDirection: "row",
        flexWrap: lg > 1 ? "nowrap" : "wrap",
        "& > *": {
            flex: lg > 1 ? "1 1 0px !important" : "1 1 auto",
            minWidth: 100,
            marginRight: lg > 1 ? "16px" : "0",
        },
        marginRight: lg > 1 ? "-16px" : "0",
        "@supports (display: grid)": {
            display: "grid",
            margin: "0",
            "& > *": {
                margin: "0",
            },
            gap,
            gridGap: gap,
            justifyContent,
            justifyItems,
            alignContent,
            ...gridClassStyles,
        },
        ...restStyleProps,
    });

    return <div className={cx(rootClassName, className)}>{children}</div>;
};

export default Grid;
