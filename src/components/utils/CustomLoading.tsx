// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";

import "@gooddata/react-components/styles/css/main.css";

const baseAnimationDuration = 1.8;

export interface ICustomLoadingProps {
    color?: string;
    speed?: number;
    inline?: boolean;
    height?: number | string;
    width?: number | string;
    imageHeight?: number | string;
    imageWidth?: number | string;
    label?: string;
    className?: string;
}

export const InlineLoading: React.FC<ICustomLoadingProps> = (props) => {
    return <CustomLoading imageHeight="1em" {...props} />;
};

export const CustomLoading: React.FC<ICustomLoadingProps> = ({
    color = "#14b2e2",
    speed = 1,
    inline = false,
    height = "100%",
    width,
    imageHeight = 38,
    imageWidth = "",
    label,
    className,
}) => {
    const wrapperStyle: React.CSSProperties = {
        textAlign: "center",
        display: inline ? "inline-flex" : "flex",
        flexDirection: inline ? "row" : "column",
        alignContent: "center",
        justifyContent: "center",
        height,
        width,
    };

    const svgStyle = {
        maxHeight: "100%",
        maxWidth: "100%",
        flex: "0 1 auto",
        height: imageHeight,
        width: imageWidth,
    };

    const barStyle = {
        transformOrigin: "0 100%",
        animation: `GDC-pump ${baseAnimationDuration / speed}s infinite`,
        fill: color,
    };

    const barStyle1 = {
        ...barStyle,
        animationDelay: `${(baseAnimationDuration / speed) * (-2 / 3)}s`,
    };

    const barStyle2 = {
        ...barStyle,
        animationDelay: `${baseAnimationDuration / speed / -3}s`,
    };

    const barStyle3 = barStyle;

    return (
        <div className={cx("s-loading", className)} style={wrapperStyle}>
            {/* language=CSS */}
            <style jsx>{`
                .label {
                    color: #464e56;
                    font-weight: bold;
                }
            `}</style>
            <svg style={svgStyle} x="0px" y="0px" viewBox="0 0 38 38">
                <style scoped>
                    {`
                    @keyframes GDC-pump {
                        0%   {transform: scaleY(0.33)}
                        33%  {transform: scaleY(0.66)}
                        66%  {transform: scaleY(1)}
                        100% {transform: scaleY(0.33)}
                    }
                `}
                </style>
                <rect style={barStyle1} x="0" y="0" width="10" height="38" />
                <rect style={barStyle2} x="14" y="0" width="10" height="38" />
                <rect style={barStyle3} x="28" y="0" width="10" height="38" />
            </svg>
            {label ? <span className="label">{label}</span> : null}
        </div>
    );
};

export default CustomLoading;
