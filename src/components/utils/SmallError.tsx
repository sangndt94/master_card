// (C) 2020 GoodData Corporation
import React from "react";
import { css, cx } from "emotion";
import styleGuide from "../../components/styleGuide/styleGuide";
import Typography from "../../components/utils/Typography";

const classes = {
    root: css({
        textAlign: "center",
    }),
    icon: css({
        fontSize: styleGuide.typography.fontSize.menuGroupTitle,
        display: "inline-block",
        marginRight: styleGuide.spacing(1),
        color: styleGuide.color.goodDataErrorColor,
        verticalAlign: "text-bottom",
    }),
    text: css({
        color: styleGuide.color.goodDataErrorColor,
    }),
};

const sorryRegex = /sorry/i;

const replaceMessage = (message: string): string => {
    if (sorryRegex.test(message)) {
        return "Insight cannot be displayed";
    }
    return message;
};

export const SmallError: React.SFC<{
    className?: string;
    message?: string;
    icon?: string;
}> = ({ className, message, icon = "icon-warning" }) => {
    return (
        <div className={cx(classes.root, className)}>
            <span className={cx(`info-label-icon ${icon}`, classes.icon)} />
            <Typography variant="caption" className={classes.text} Component="span">
                {replaceMessage(message)}
            </Typography>
        </div>
    );
};

export default SmallError;
