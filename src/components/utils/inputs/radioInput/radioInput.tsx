// (C) 2020 GoodData Corporation
import React, { FC, useMemo } from "react";
import cx from "classnames";
import { css } from "emotion";
import Typography from "../../Typography";
import styleGuide from "../../../styleGuide/styleGuide";
import { IProps } from "./interface";

const { color, spacing } = styleGuide;

const getClasses = ({ selected }) => ({
    radioInput: css({
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        cursor: selected ? "default" : "pointer",
        "&:focus": {
            outline: 0,
            fontWeight: "bold",
            indicator: {
                border: `2px solid ${color.black}`,
            },
        },
        verticalAlign: "top",
    }),
    indicator: css({
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        boxSizing: "content-box",
        height: "1em",
        width: "1em",
        flexShrink: 0,
        marginRight: spacing(0.5),
        borderRadius: "50%",
        border: `1px solid ${color.border}`,
        backgroundColor: color.white,
    }),
    indicatorSelected: css({
        display: selected ? "block" : "none",
        height: "70%",
        width: "70%",
        borderRadius: "50%",
        backgroundColor: color.main,
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
});

export const RadioInput: FC<IProps> = ({ selected, value, onChange, children, disabled, className }) => {
    const classes = useMemo(() => getClasses({ selected }), [selected]);
    return (
        <Typography<{ tabIndex?: HTMLInputElement["tabIndex"]; onKeyPress?: HTMLInputElement["onkeypress"] }>
            Component="label"
            variant="label"
            className={cx(classes.radioInput, className)}
            tabIndex={0}
            onKeyPress={(event) => {
                if (!event.isComposing && event.key === " ") {
                    onChange(value);
                    event.preventDefault();
                }
            }}
        >
            <span className={classes.indicator}>
                <span className={classes.indicatorSelected} />
            </span>
            <input
                type="radio"
                checked={selected}
                name={`group-${value}`}
                value={value}
                disabled={disabled}
                onChange={() => {
                    onChange(value);
                }}
                className={classes.input}
            />

            <div className={classes.content}>{children}</div>
        </Typography>
    );
};
