// (C) 2020 GoodData Corporation
import React from "react";

import Typography, { ITypographyProps } from "../utils/Typography";
import styleGuide from "../styleGuide/styleGuide";
import { cx, css } from "emotion";

interface IBlockHeadingProps extends React.CSSProperties {
    className?: string;
    variant?: keyof typeof styleGuide.typography.variant;
    typographyComponent?: ITypographyProps["Component"];
}

const BlockHeading: React.FC<IBlockHeadingProps> = ({
    className,
    variant = "caption",
    children,
    flex = "1 1 100%",
    gridColumn = "1 / -1",
    typographyComponent = "span",
    ...restProps
}) => {
    return (
        <Typography
            variant={variant}
            className={cx(className, css({ flex, gridColumn, ...restProps }))}
            Component={typographyComponent}
        >
            {children}
        </Typography>
    );
};

export default BlockHeading;
