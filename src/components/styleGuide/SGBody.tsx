// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import cx from "classnames";
import styleGuide from "./styleGuide";
import { css } from "emotion";

export const SGBody: FC<{
    className?: string;
}> = ({ className, children, ...restProps }) => {
    return (
        <div
            className={cx(
                css({
                    padding: styleGuide.spacing(4),
                    backgroundColor: styleGuide.color.mainBackground,
                    overflow: "auto",
                }),
                className,
                "s-sg-body",
            )}
            {...restProps}
        >
            {children}
        </div>
    );
};
