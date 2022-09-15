// (C) 2007-2020 GoodData Corporation
import React, { FC, CSSProperties } from "react";
import { cx, css } from "emotion";

export interface IIconProps extends CSSProperties {
    className?: string;
    x?: string | number;
    y?: string | number;
    viewBox?: string;
    onIconClick?: () => void;
}

export const Icon: FC<IIconProps> = ({
    className = null,
    height,
    width,
    x = "0",
    y = "0",
    viewBox,
    onIconClick,
    children,
    ...restProps
}) => {
    const rootClassName = css({
        height,
        width,
        ...restProps,
    });
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            x={x}
            y={y}
            viewBox={viewBox}
            className={cx(rootClassName, className)}
            onClick={onIconClick}
        >
            {children}
        </svg>
    );
};
