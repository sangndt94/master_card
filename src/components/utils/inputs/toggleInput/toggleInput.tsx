// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import { css } from "emotion";
import cx from "classnames";
import { IProps } from "./interface";
import styleGuide from "../../../styleGuide/styleGuide";

const { spacing, color } = styleGuide;

const classes = {
    toggleInput: css({
        width: "100%",
    }),
    switcher: css({
        marginRight: spacing(1),
        marginLeft: spacing(-0.5),

        "&::before": {
            width: "29px !important",
            height: "13px !important",
        },
        "&::after": {
            width: "9px !important",
            height: "9px !important",
        },
    }),
    content: css({
        cursor: "pointer",

        "&.disabled": {
            color: color.textMuted,
            cursor: "default",
        },
    }),
};

export const ToggleInput: FC<IProps> = ({ checked, onChange, disabled, children }) => {
    return (
        <label className={cx(classes.toggleInput, "input-checkbox-toggle")}>
            <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
            <span className={cx(classes.switcher, "input-label-text")} />
            <span className={cx(classes.content, { disabled })}>{children}</span>
        </label>
    );
};
