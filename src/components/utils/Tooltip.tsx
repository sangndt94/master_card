// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";

interface ITooltipProps {
    className?: string;
    isVisible?: boolean;
    clientX?: number;
    clientY?: number;
    textData: string[][];
    maxTooltipContentWidth?: number;
}

const Tooltip: React.FC<ITooltipProps> = ({
    clientX = null,
    clientY = null,
    isVisible = true,
    className,
    textData,
    maxTooltipContentWidth = 200,
    ...restProps
}): JSX.Element => {
    const maxItemWidth = maxTooltipContentWidth - theme.spacing * 2;
    const titleMaxWidth = maxItemWidth;
    const multiLineTruncationSupported = true;
    const threeDotsWidth = 16;
    const valueMaxWidth = multiLineTruncationSupported ? maxItemWidth : maxItemWidth - threeDotsWidth;
    const titleStyle = { maxWidth: `${titleMaxWidth}px` };
    const valueStyle = { maxWidth: `${valueMaxWidth}px` };
    const itemClass = cx("gd-viz-tooltip-item", {
        "multiline-supported": multiLineTruncationSupported,
    });
    const valueClass = cx("gd-viz-tooltip-value", {
        "clamp-two-line": multiLineTruncationSupported,
    });

    return (
        <div
            className={cx("Tooltip", clientX !== null && clientY !== null && "isFollowing", className)}
            {...restProps}
        >
            {/* language=CSS */}
            <style jsx>
                {`
                    .Tooltip {
                        z-index: 100;
                        background: rgba(255, 255, 255, 0.9);
                        padding: ${theme.spacing / 2}px;
                        border-radius: ${theme.borderRadius}px;
                        border-top: 3px solid ${theme.color.geoGradientHigh};
                        box-shadow: ${theme.shadowLow};
                        pointer-events: none;
                    }
                `}
            </style>
            {/* language=CSS */}
            <style jsx>
                {`
                    .isFollowing {
                        left: ${clientX}px;
                        top: ${clientY}px;
                        opacity: ${isVisible ? 1 : 0};
                        transition: top ease 0.2s, left ease 0.2s, opacity ease 0.6s;
                        position: fixed;
                        transform: translate(-50%, calc(-100% - ${theme.spacing}px));
                    }
                `}
            </style>
            {textData.map((item: string[], index) => {
                // the third span is hidden, that help to have tooltip work with max-width
                return (
                    <div key={index} className={itemClass}>
                        <span className="gd-viz-tooltip-title s-title" style={titleStyle}>
                            {item[0]}
                        </span>
                        <div className="gd-viz-tooltip-value-wraper s-value" style={titleStyle}>
                            <span className={valueClass} style={valueStyle}>
                                {item[1]}
                            </span>
                        </div>
                        <div className="gd-viz-tooltip-value-wraper" style={titleStyle}>
                            <span className="gd-viz-tooltip-value-max-content" style={valueStyle}>
                                {item[1]}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Tooltip;
