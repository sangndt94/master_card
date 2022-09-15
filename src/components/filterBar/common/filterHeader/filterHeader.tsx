// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import { IProps } from "./interface";
import { css } from "emotion";
import Typography from "../../../utils/Typography";
import Button from "../../../controls/Button";
import { IconUndo, IconClose } from "../../../icon";
import styleGuide from "../../../styleGuide/styleGuide";

const { spacing } = styleGuide;

const classes = {
    filterHeader: css({
        position: "relative",
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: spacing(0, 1),
        marginBottom: spacing(0.5),
        boxSizing: "border-box",
    }),
    label: css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        flexGrow: 1,
    }),
    action: css({
        marginLeft: spacing(2),
    }),
};

export const FilterHeader: FC<IProps> = ({ label, clearFilters, resetFilters, id }) => {
    return (
        <div className={classes.filterHeader}>
            <Typography variant="body" className={classes.label}>
                {label}
            </Typography>
            {resetFilters && (
                <Button
                    variant="text"
                    color="info"
                    colorActive="infoActive"
                    className={classes.action}
                    endIcon={<IconUndo height="1em" />}
                    onClick={() => {
                        resetFilters([id]);
                    }}
                >
                    Reset
                </Button>
            )}
            {clearFilters && (
                <Button
                    variant="text"
                    color="info"
                    colorActive="infoActive"
                    className={classes.action}
                    endIcon={<IconClose height="1em" />}
                    onClick={() => {
                        clearFilters([id]);
                    }}
                >
                    Clear
                </Button>
            )}
        </div>
    );
};
