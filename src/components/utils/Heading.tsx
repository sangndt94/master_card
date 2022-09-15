// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";
import { css } from "emotion";

interface IHeadingProps {
    className?: string;
    level?: number;
    center?: boolean;
}

const classes = {
    Heading: css({
        margin: 0,
        fontFamily: theme.font.heading,
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        color: "#1a1513",
    }),
};

const Heading: React.FC<IHeadingProps> = ({ level = 2, children, className, center = false }) => {
    const Component = `h${level}` as any;

    const fontSize = theme.fontSize[Component];
    const lineHeight = theme.lineHeight[Component];

    const propSpecificClassName = css({
        fontSize: fontSize ? `${fontSize}px` : "inherit",
        lineHeight: lineHeight ? `${lineHeight}` : "inherit",
        textAlign: center ? "center" : "inherit",
        justifyContent: center ? "center" : "inherit",
    });
    return (
        <Component className={cx(classes.Heading, propSpecificClassName, className)}>{children}</Component>
    );
};

export default Heading;
