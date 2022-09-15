// (C) 2007-2019 GoodData Corporation
import React from "react";
import Typography, { ITypographyProps } from "../utils/Typography";
import { cx } from "emotion";
import { makeStyles } from "@material-ui/styles";

import styleGuide from "../styleGuide/styleGuide";

export interface IButtonProps {
    className?: string;
    variant?: "solid" | "outline" | "text";
    disabled?: boolean;
    active?: boolean;
    textVariant?: ITypographyProps["variant"];
    Component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    color?: keyof typeof styleGuide.color;
    colorActive?: keyof typeof styleGuide.color;
    [key: string]: any;
}

const outlineBorderSize = 1;

const useStyles = makeStyles<typeof styleGuide, IButtonProps>({
    root: {
        borderRadius: styleGuide.borderRadius,
        verticalAlign: "baseline",
        boxSizing: "border-box",
        cursor: "pointer",
        userSelect: "none",
    },
    solid: ({ color, colorActive, active, disabled }) => {
        const dynamic = {
            backgroundColor: styleGuide.color[color],
            hoverBackgroundColor: styleGuide.color[colorActive],
            color: styleGuide.color.white,
        };
        if (active) {
            dynamic.backgroundColor = styleGuide.color[colorActive];
        }
        if (disabled) {
            dynamic.backgroundColor = styleGuide.color.textMuted;
            dynamic.hoverBackgroundColor = styleGuide.color.textMuted;
        }
        return {
            border: 0,
            padding: styleGuide.spacing(1, 3),
            backgroundColor: dynamic.backgroundColor,
            color: dynamic.color,
            transition: "background-color 0.2s ease",
            "&:hover, &:active, &:focus": {
                backgroundColor: dynamic.hoverBackgroundColor,
            },
        };
    },
    outline: ({ color, colorActive, active, disabled }) => {
        const dynamic = {
            borderColor: styleGuide.color[color],
            hoverBorderColor: styleGuide.color[colorActive],
            color: styleGuide.color[color],
            hoverColor: styleGuide.color[colorActive],
        };
        if (active) {
            dynamic.borderColor = styleGuide.color[colorActive];
            dynamic.color = styleGuide.color[colorActive];
        }
        if (disabled) {
            dynamic.color = styleGuide.color.textMuted;
            dynamic.borderColor = styleGuide.color.textMuted;
            dynamic.hoverBorderColor = styleGuide.color.textMuted;
            dynamic.hoverColor = styleGuide.color.textMuted;
        }
        return {
            borderSize: outlineBorderSize,
            borderStyle: "solid",
            borderColor: dynamic.borderColor,
            padding: `${styleGuide.spacingUnit - outlineBorderSize}px ${
                styleGuide.spacingUnit * 3 - outlineBorderSize
            }px`,
            color: dynamic.color,
            transition: "border-color 0.2s ease, color 0.2s ease",
            backgroundColor: "transparent",
            "&:hover, &:active, &:focus": {
                borderColor: dynamic.hoverBorderColor,
                color: dynamic.hoverColor,
            },
        };
    },
    text: ({ color, colorActive, active, disabled }) => {
        const dynamic = {
            color: styleGuide.color[color],
            hoverColor: styleGuide.color[colorActive],
        };
        if (active) {
            dynamic.color = styleGuide.color[colorActive];
        }
        if (disabled) {
            dynamic.color = styleGuide.color.textMuted;
            dynamic.hoverColor = styleGuide.color.textMuted;
        }
        return {
            border: 0,
            padding: 0,
            color: dynamic.color,
            fontSize: "inherit",
            transition: "color 0.2s ease",
            backgroundColor: "transparent",
            "&:hover, &:active, &:focus": {
                color: dynamic.hoverColor,
            },
        };
    },
    startIcon: {
        position: "relative",
        display: "inline-block",
        marginBlockStart: styleGuide.spacing(-1),
        marginBlockEnd: styleGuide.spacing(-1),
        marginInlineEnd: styleGuide.spacing(1),
        verticalAlign: "middle",
    },
    endIcon: {
        position: "relative",
        display: "inline-block",
        marginBlockStart: styleGuide.spacing(-1),
        marginBlockEnd: styleGuide.spacing(-1),
        marginInlineStart: styleGuide.spacing(1),
        verticalAlign: "middle",
    },
});

const colorActiveMap: { [key in keyof typeof styleGuide.color]?: keyof typeof styleGuide.color } = {
    main: "hover",
};

const Button: React.FC<IButtonProps> = ({
    className = null,
    Component = "button",
    color = "main",
    colorActive = colorActiveMap[color] || "hover",
    active = false,
    disabled = false,
    variant = "solid",
    textVariant = "button",
    startIcon = null,
    endIcon = null,
    children,
    ...restProps
}) => {
    const classes = useStyles({ color, colorActive, active, disabled });
    return (
        <Typography
            variant={textVariant}
            className={cx(classes.root, classes[variant], className)}
            Component={Component}
            {...restProps}
        >
            {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
            {children}
            {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
        </Typography>
    );
};

export default Button;
