// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import tinycolor from "tinycolor2";
import styleGuide, { colorDescriptions } from "./styleGuide";
import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import Typography from "../utils/Typography";
import { css, cx } from "emotion";

const CONTRAST_THRESHOLD = 1.02;

const classes = {
    SGColorBlock: css({
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: styleGuide.spacing(1),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
    box: css({
        boxSizing: "border-box",
        width: "100px",
        height: "100px",
    }),
    colorKey: css({
        color: styleGuide.color.textMain,
        margin: 0,
    }),
    value: css({
        color: styleGuide.color.textSecondary,
        fontFamily: "monospace",
        margin: 0,
    }),
    description: css({
        color: styleGuide.color.textSecondary,
        marginTop: styleGuide.spacing(1),
        marginBottom: 0,
    }),
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gridGap: styleGuide.spacing(4),
        marginBottom: styleGuide.spacing(8),
    }),
    gradients: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gridGap: styleGuide.spacing(4),
        marginTop: styleGuide.spacing(4),
        marginBottom: styleGuide.spacing(2),
    }),
};

const SGColorBlock: FC<{
    colorKey: string;
    color: CSSPropertiesWithMultiValues["color"];
    description?: string;
    className?: string;
}> = ({ className, color, colorKey, description = null, ...restProps }) => {
    const isSimilarToBackground =
        tinycolor.readability(color, styleGuide.color.mainBackground) < CONTRAST_THRESHOLD;
    return (
        <div className={cx(classes.SGColorBlock, className)} {...restProps}>
            <div
                className={cx(
                    classes.box,
                    css({
                        backgroundColor: color,
                        border: isSimilarToBackground ? `1px solid ${styleGuide.color.black}` : "none",
                    }),
                )}
            />
            <div className="text">
                <Typography variant="caption" className={classes.colorKey}>
                    {colorKey}
                </Typography>
                <Typography variant="label" className={classes.value}>
                    {color}
                </Typography>
                {description && (
                    <Typography variant="label" className={classes.description}>
                        {description}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export const SGColor: FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <div className={className}>
            <Typography variant="menuGroupTitle" className={classes.headline}>
                color
            </Typography>
            <div className={classes.list}>
                {Object.keys(styleGuide.color).map((colorKey) => {
                    return (
                        <SGColorBlock
                            key={colorKey}
                            colorKey={colorKey}
                            color={styleGuide.color[colorKey]}
                            description={colorDescriptions[colorKey]}
                        />
                    );
                })}
            </div>

            <Typography variant="menuGroupTitle" className={classes.headline}>
                VisualizationColor
            </Typography>
            <div className={classes.list}>
                {styleGuide.visualizationColor.map((color, colorIndex) => {
                    const description =
                        colorIndex === 0
                            ? "Default color. Use this color when only one color is needed in the chart."
                            : `Color #${colorIndex + 1}`;
                    return (
                        <SGColorBlock
                            key={colorIndex}
                            colorKey={String(colorIndex)}
                            color={color}
                            description={description}
                        />
                    );
                })}
            </div>
            <div className={classes.list}>
                {Object.keys({
                    positive: styleGuide.color.positive,
                    negative: styleGuide.color.negative,
                }).map((colorKey) => {
                    return (
                        <SGColorBlock
                            key={colorKey}
                            colorKey={colorKey}
                            color={styleGuide.color[colorKey]}
                            description={colorDescriptions[colorKey]}
                        />
                    );
                })}
            </div>

            <Typography variant="menuGroupTitle" Component="h2" className={classes.headline}>
                colorGradient
            </Typography>
            <ul>
                <Typography variant="body" Component="li">
                    Core colors are represented by color #3.
                </Typography>
                <Typography variant="body" Component="li">
                    In case you have 4 or less data points of the same gradient hue, make sure to space out
                    the color lightness, like so: 4 values 0, 2, 4, 6 or 3 values: 0, 3, 6.
                </Typography>
            </ul>

            <div className={classes.gradients}>
                {Object.keys(styleGuide.colorGradient).map((colorKey) => {
                    const { main, ...gradient } = styleGuide.colorGradient[colorKey];
                    return (
                        <div key={colorKey}>
                            <Typography variant="menuGroupTitle" Component="h3" className={classes.headline}>
                                {colorKey}
                            </Typography>

                            <div>
                                <SGColorBlock
                                    key="main"
                                    colorKey="main"
                                    color={styleGuide.colorGradient[colorKey].main}
                                    description={`Equal to #3`}
                                />
                                {Object.keys(gradient).map((gradientKey) => {
                                    return (
                                        <SGColorBlock
                                            key={gradientKey}
                                            colorKey={gradientKey}
                                            color={styleGuide.colorGradient[colorKey][gradientKey]}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
