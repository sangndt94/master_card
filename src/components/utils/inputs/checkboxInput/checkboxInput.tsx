// (C) 2020 GoodData Corporation
import React, { FC, useMemo } from "react";
import cx from "classnames";
import { css } from "emotion";
import Typography from "../../Typography";
import styleGuide from "../../../styleGuide/styleGuide";
import { IconCheck } from "../../../icon";
import { IProps } from "./interface";

const getClasses = ({ checked, disabled }) => {
    const dynamicStyles = {
        borderColor: styleGuide.color.border,
        backgroundColor: styleGuide.color.white,
    };
    if (checked) {
        dynamicStyles.backgroundColor = styleGuide.color.main;
        dynamicStyles.borderColor = styleGuide.color.main;
    }
    if (disabled) {
        dynamicStyles.backgroundColor = styleGuide.color.border;
        dynamicStyles.borderColor = styleGuide.color.border;
    }

    return {
        checkboxInput: css({
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            cursor: disabled ? "default" : "pointer",
            pointerEvents: disabled ? "none" : "all",
            "&:focus": {
                outline: 0,
                fontWeight: "bold",
                indicator: {
                    border: `2px solid ${styleGuide.color.black}`,
                },
            },
        }),
        indicator: css({
            display: "inline-block",
            position: "relative",
            boxSizing: "content-box",
            height: "1em",
            width: "1em",
            flexShrink: 0,
            marginRight: styleGuide.spacing(0.5),
            borderRadius: styleGuide.borderRadius,
            borderWidth: 1,
            borderStyle: "solid",
            verticalAlign: "middle",
            ...dynamicStyles,
        }),
        indicatorSelected: css({
            display: checked ? "block" : "none",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            color: styleGuide.color.white,
        }),
        input: css({
            position: "absolute",
            visibility: "hidden",
        }),
        content: css({
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
        }),
    };
};

export const CheckboxInput: FC<IProps> = ({ className, onChange, checked, disabled = false, children }) => {
    const classes = useMemo(() => getClasses({ checked, disabled }), [disabled, checked]);

    return (
        <Typography<{ tabIndex?: HTMLInputElement["tabIndex"]; onKeyPress?: HTMLInputElement["onkeypress"] }>
            Component="label"
            variant="label"
            className={cx(classes.checkboxInput, className)}
            tabIndex={disabled ? -1 : 0}
            onKeyPress={(event) => {
                if (!event.isComposing && event.key === " " && !disabled) {
                    onChange(!checked);
                    event.preventDefault();
                }
            }}
        >
            <span className={classes.indicator}>
                <IconCheck className={classes.indicatorSelected} />
            </span>
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => {
                    onChange(!checked);
                }}
                className={classes.input}
            />
            <div className={classes.content}>{children}</div>
        </Typography>
    );
};
