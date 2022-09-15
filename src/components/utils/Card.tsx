// (C) 2020 GoodData Corporation
import React from "react";
import { css, cx } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import { CSSPropertiesWithMultiValues } from "@emotion/serialize";

export interface ICardProps {
    className?: string;
    Component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    color?: keyof typeof styleGuide.color;
    padding?: number | number[];
}

const baseClassName = css({
    borderRadius: styleGuide.borderRadius,
    boxShadow: styleGuide.shadow.low,
});

const Card: React.FC<ICardProps> = ({
    className,
    children,
    Component = "div",
    color = "white",
    padding,
    ...restProps
}) => {
    const styles: CSSPropertiesWithMultiValues = {
        backgroundColor: styleGuide.color[color],
    };
    if (padding) {
        styles.padding = styleGuide.spacing(...(Array.isArray(padding) ? padding : [padding]));
    }
    const colorClassName = css(styles);
    return (
        <Component className={cx(baseClassName, colorClassName, className)} {...restProps}>
            {children}
        </Component>
    );
};

export default Card;
