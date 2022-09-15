// (C) 2019 GoodData Corporation
import React, { useState, useCallback, useRef, useMemo } from "react";
import tinycolor from "tinycolor2";
import throttle from "lodash/throttle";
import { numberFormat } from "@gooddata/numberjs";
import getBounds from "svg-path-bounds";

import cx from "classnames";
import theme from "../../utils/theme";
import { CountryCode, defaultPaths } from "./mapConstants";
import Tooltip from "../utils/Tooltip";

export interface IMapProps {
    className?: string;
    colorFrom?: string;
    colorTo?: string;
    defaultColor?: string;
    defaultWidth?: number;
    defaultHeight?: number;
    measureFormat?: string;
    overrideMinimum?: number;
    overrideMaximum?: number;
    paths?: { [key in CountryCode]?: string };
    data: { [key in CountryCode]?: number };
    tooltipData?: { [key in CountryCode]?: any };
    hoverTimeoutDelay?: number;
}

const getColorFromGradient = (percent, colorFrom: string, colorTo: string): string => {
    return tinycolor.mix(colorFrom, colorTo, percent * 100).toHexString();
};
const getFill = (
    value: number | null = null,
    minimum: number = 0,
    maximum: number = 1,
    colorFrom: string,
    colorTo: string,
    defaultColor: string,
) => {
    if (value === null) {
        return defaultColor;
    }
    if (minimum === maximum) {
        return getColorFromGradient(0.5, colorFrom, colorTo);
    }
    const safeValue = Math.min(Math.max(value, minimum), maximum);
    const percent = (safeValue - minimum) / (maximum - minimum);
    return getColorFromGradient(percent, colorFrom, colorTo);
};

const getLimits = (data, paths, width, height) => {
    const limits = Object.keys(data).reduce(
        (limits, key) => {
            const path = paths[key];
            if (!path) {
                return limits;
            }
            const [left, top, right, bottom] = getBounds(path);
            const topLeft = [left, top];
            const bottomRight = [right, bottom];

            limits.topLeft = limits.topLeft.map((minValue, dimension) => {
                return Math.min(minValue, Math.floor(topLeft[dimension]));
            });
            limits.bottomRight = limits.bottomRight.map((maxValue, dimension) => {
                return Math.max(maxValue, Math.floor(bottomRight[dimension]));
            });
            return limits;
        },
        { topLeft: [width, height], bottomRight: [0, 0] },
    );
    return limits;
};

const Map: React.FC<IMapProps> = (props) => {
    const {
        className,
        data,
        colorFrom = theme.color.geoGradientLow,
        colorTo = theme.color.geoGradientHigh,
        defaultColor = theme.color.geoNeutral,
        paths = defaultPaths,
        defaultWidth = 1000,
        defaultHeight = 650,
        tooltipData = {},
        measureFormat = "#,##0.0 %",
        overrideMinimum = null,
        overrideMaximum = null,
        hoverTimeoutDelay = 2000,
        ...restProps
    } = props;
    const [hoverOn, setHoverOn] = useState(null);
    const [tooltipVisibility, setTooltipVisibility] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ clientX: null, clientY: null });
    const hoverTimeout = useRef(null);

    const throttledMouseMove = useRef(
        throttle<(key: CountryCode, clientX: number, clientY: number) => void>(
            (key: CountryCode, clientX: number, clientY: number) => {
                clearTimeout(hoverTimeout.current);
                setHoverOn(key);
                setCursorPosition({ clientX, clientY });
                setTooltipVisibility(true);
                hoverTimeout.current = setTimeout(() => {
                    setTooltipVisibility(false);
                }, hoverTimeoutDelay);
            },
            10,
        ),
    );

    const onMouseMove = useCallback(throttledMouseMove.current, [tooltipData]);

    const getHoverProps = useCallback(
        (key) => {
            return tooltipData[key]
                ? {
                      onMouseMove: ({ clientX, clientY }) => {
                          onMouseMove(key, clientX, clientY);
                      },
                  }
                : {};
        },
        [tooltipData],
    );

    const showTooltip = Object.keys(tooltipData).length > 0 && hoverOn && cursorPosition.clientX !== null;

    const minimum = overrideMinimum !== null ? overrideMinimum : Math.min(...Object.values(data));
    const minimumFormatted = numberFormat(minimum, measureFormat);
    const maximum = overrideMaximum !== null ? overrideMaximum : Math.max(...Object.values(data));
    const maximumFormatted = numberFormat(maximum, measureFormat);

    const limits = useMemo(() => getLimits(data, paths, defaultWidth, defaultHeight), [
        data,
        paths,
        defaultWidth,
        defaultHeight,
    ]);

    const viewBox = `${limits.topLeft.join(" ")} ${limits.bottomRight
        .map((maxCoor, dimension) => maxCoor - limits.topLeft[dimension])
        .join(" ")}`;

    return (
        <div className="Map" {...restProps}>
            {showTooltip && (
                <Tooltip
                    {...cursorPosition}
                    isVisible={Boolean(tooltipVisibility)}
                    textData={tooltipData[hoverOn]}
                />
            )}
            {/* language=CSS */}
            <style jsx>
                {`
                    .Map {
                        position: relative;
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: stretch;
                        align-items: stretch;
                        max-height: 100%;
                    }
                    .Map :global(svg) {
                        flex: 1 1 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .Scale {
                        display: flex;
                        flex-direction: row;
                        align-items: stretch;
                        height: 1.5em;
                        margin-top: ${theme.spacing / 2}px;
                    }
                    .ScaleGradient {
                        margin: 0 ${theme.spacing}px;
                        flex: 1 1 auto;
                        background: linear-gradient(90deg, ${colorFrom} 0%, ${colorTo} 100%);
                    }
                `}
            </style>
            <svg viewBox={viewBox} {...restProps}>
                <defs>
                    <style type="text/css">{`
                        .land {
                            fill-opacity: 1;
                            stroke:white;
                            stroke-opacity: 1;
                            stroke-width:0.5;
                        }
                        .land:hover {
                            stroke: black;
                        }
                    `}</style>
                </defs>

                <g>
                    {Object.entries(paths).map(([key, path]) => {
                        const value = data[key];
                        const hoverProps = getHoverProps(key);
                        return (
                            <path
                                key={key}
                                className={cx("land", `s-${key}`)}
                                fill={getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor)}
                                d={path}
                                {...hoverProps}
                            />
                        );
                    })}
                </g>
            </svg>
            <div className="Scale">
                <div className="ScaleValue s-minimum">{minimumFormatted}</div>
                <div className="ScaleGradient" />
                <div className="ScaleValue s-maximum">{maximumFormatted}</div>
            </div>
        </div>
    );
};

export const testingInterface = {
    getFill,
    getLimits,
    Map,
};

export default Map;
