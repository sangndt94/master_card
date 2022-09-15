// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import { css } from "emotion";
import cx from "classnames";
import styleGuide from "../../styleGuide/styleGuide";
import Button from "../../controls/Button";
import Typography from "../Typography";
import { IconInfo } from "../../icon";
import { IProps } from "./interface";

const { color, spacing, shadow, borderRadius } = styleGuide;

export const InfoBanner: FC<IProps> = ({
    mainColor = "main",
    secondaryColor = "white",
    className = null,
    onClose,
    children,
}) => {
    const classes = {
        infoBanner: css({
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: `${spacing(1)} ${spacing(2)}`,
            boxSizing: "border-box",
            boxShadow: shadow.low,
            backgroundColor: color[mainColor],
            borderRadius,
        }),
        icon: css({
            width: 25,
            height: 25,
            flexShrink: 0,
            marginRight: spacing(2),

            path: {
                fill: color[mainColor],
            },
        }),
        content: css({
            flexGrow: 1,
            color: color[secondaryColor],
        }),
        button: css({
            flexShrink: 0,
            color: `${color[mainColor]} !important`,
            marginLeft: spacing(2),
            border: `2px solid ${color[secondaryColor]} !important`,
            boxSizing: "border-box",

            "&:hover, &:active, &:focus": {
                color: `${color[secondaryColor]} !important`,
                backgroundColor: `${color[mainColor]} !important`,
            },
        }),
    };

    return (
        <div className={cx(classes.infoBanner, className)}>
            <IconInfo color={color[secondaryColor]} className={classes.icon} />
            <Typography variant="label" className={classes.content}>
                {children}
            </Typography>
            {onClose && (
                <Button variant="solid" color={secondaryColor} className={classes.button} onClick={onClose}>
                    Close
                </Button>
            )}
        </div>
    );
};
