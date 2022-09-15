// (C) 2007-2019 GoodData Corporation
import React from "react";
import { css, cx } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import Button, { IButtonProps } from "./Button";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        boxSizing: "content-box",
    },
    solid: {
        padding: styleGuide.spacing(1),
        borderRadius: "50%",
    },
    outline: {
        padding: styleGuide.spacingUnit - 1,
    },
    text: {},
    icon: {
        display: "block",
    },
});

type IconButtonProps = Omit<IButtonProps, "startIcon" | "endIcon" | "children"> & {
    Icon: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    iconSize?: number | string;
};

const IconButton: React.FC<IconButtonProps> = ({
    className = null,
    variant,
    Icon,
    iconSize = 16,
    ...restProps
}) => {
    const classes = useStyles({});
    return (
        <Button
            className={cx(
                css({
                    width: iconSize,
                    height: iconSize,
                }),
                classes.root,
                classes[variant],
                className,
            )}
            variant={variant}
            {...restProps}
        >
            <Icon height={iconSize} width={iconSize} className={classes.icon} />
        </Button>
    );
};

export default IconButton;
