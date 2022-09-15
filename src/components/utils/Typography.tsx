// (C) 2007-2019 GoodData Corporation
import React from "react";
import { css, cx, Interpolation } from "emotion";
import styleGuide from "../styleGuide/styleGuide";

export interface ITypographyProps {
    className?: string;
    Component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    variant?: keyof typeof styleGuide.typography.variant;
    children: React.ReactNode;
}

const classes = Object.entries(styleGuide.typography.variant).reduce((accumulator, [variant, style]) => {
    accumulator[variant] = css(style as Interpolation);
    return accumulator;
}, {});

const Typography = <T extends {}>(props: ITypographyProps & T) => {
    const { className, children, Component = "div", variant = "body", ...restProps } = props;
    return (
        <Component className={cx(css(classes[variant]), className)} {...restProps}>
            {children}
        </Component>
    );
};

export default Typography;
