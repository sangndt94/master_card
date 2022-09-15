// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";
import styleGuide from "../styleGuide/styleGuide";
import { css } from "emotion";
import Hr from "./Hr";
import Typography from "./Typography";

interface IHrTextProps {
    text: React.ReactNode;
    className?: string;
    color?: string;
}

const classes = {
    divider: css({
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        margin: styleGuide.spacing(2, 0, 2, 0),
    }),
    dividerRule: css({
        flex: "1 1 auto",
    }),
    dividerLabel: css({
        color: styleGuide.color.textSecondary,
        margin: styleGuide.spacing(0, 2),
    }),
};

const HrText: React.FC<IHrTextProps> = ({ text, className, color = theme.color.primary, ...restProps }) => (
    <div className={cx(classes.divider, className)} {...restProps}>
        <Hr color={color} className={cx(classes.dividerRule, className)} />
        <Typography variant="productTitle" className={classes.dividerLabel}>
            {text}
        </Typography>
        <Hr color={color} className={cx(classes.dividerRule, className)} />
    </div>
);

export default HrText;
