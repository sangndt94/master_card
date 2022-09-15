// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import cx from "classnames";
import styleGuide from "../../../styleGuide/styleGuide";
import Typography from "../../../utils/Typography";
import { IProps } from "./interface";
import { css } from "emotion";

const { spacing, color, borderRadius } = styleGuide;

const getClasses = ({ borderColor, messageColor }) => ({
    filterMessage: css({
        border: `1px solid ${color[borderColor]}`,
        display: "grid",
        gridGap: spacing(0.5),
        gridTemplateColumns: "1fr",
        gridAutoColumns: "minmax(32px, auto)",
        gridAutoFlow: "column",
        alignItems: "center",
        borderRadius,
        justifyItems: "center",
    }),
    message: css({
        justifySelf: "start",
        padding: spacing(1),
        color: color[messageColor],
    }),
});

export const FilterMessage: FC<IProps> = ({
    className,
    children,
    afterContent,
    borderColor = "border",
    messageColor = "main",
}) => {
    const classes = getClasses({ borderColor, messageColor });
    return (
        <div className={cx(classes.filterMessage, className)}>
            <Typography variant="label" Component="span" className={classes.message}>
                {children}
            </Typography>
            {afterContent}
        </div>
    );
};
