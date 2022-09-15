// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import { css } from "emotion";
import { CSSProperties } from "@emotion/serialize";
import Typography from "../utils/Typography";

const getInlineSamples = (category: string) => {
    return Object.keys(styleGuide.typography[category]).map((key) => {
        return {
            key,
            label: `${styleGuide.typography[category][key]} (${key})`,
            style: {
                [category]: styleGuide.typography[category][key],
            },
        };
    });
};

const getInlineStyleSamples = () => {
    return Object.keys(styleGuide.typography.variant).map((key) => {
        return {
            key,
            label: key,
            style: styleGuide.typography.variant[key],
        };
    });
};

const getInlineFontSamples = () => {
    return String(styleGuide.typography.fontFamily)
        .split(", ")
        .map((fontFamily) => {
            return {
                key: fontFamily,
                label: fontFamily,
                style: {
                    fontFamily,
                },
            };
        });
};

const InlineTypographySample = ({ label, style }: { label: string; style: CSSProperties }) => {
    return (
        <Typography
            variant="label"
            className={css({
                ...style,
                display: "block",
                lineHeight: 1,
                margin: styleGuide.spacing(1),
            })}
        >
            {label}
        </Typography>
    );
};

const classes = {
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
    columns: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(8),
    }),
    list: css({
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(8),
    }),
    options: css({
        margin: styleGuide.spacing(-1),
    }),
};

export const SGTypography: FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <div className={className}>
            <div className={classes.columns}>
                <div>
                    <Typography variant="menuGroupTitle" className={classes.headline} Component="h1">
                        Typography
                    </Typography>
                    <div className={classes.list}>
                        <Typography variant="label">fontFamily</Typography>
                        <div className={classes.options}>
                            {getInlineFontSamples().map((sample) => (
                                <InlineTypographySample key={sample.key} {...sample} />
                            ))}
                        </div>

                        <Typography variant="label">fontWeight</Typography>
                        <div className={classes.options}>
                            {getInlineSamples("fontWeight").map((sample) => (
                                <InlineTypographySample key={sample.key} {...sample} />
                            ))}
                        </div>

                        <Typography variant="label">fontSize</Typography>
                        <div className={classes.options}>
                            {getInlineSamples("fontSize").map((sample) => (
                                <InlineTypographySample key={sample.key} {...sample} />
                            ))}
                        </div>

                        <Typography variant="label">lineHeight</Typography>
                        <div className={classes.options}>
                            {getInlineSamples("fontSize").map((sample) => (
                                <InlineTypographySample key={sample.key} {...sample} />
                            ))}
                        </div>

                        <Typography variant="label">color</Typography>
                        <div className={classes.options}>
                            {getInlineSamples("color").map((sample) => (
                                <InlineTypographySample key={sample.key} {...sample} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Typography variant="menuGroupTitle" Component="h2" className={classes.headline}>
                        variant
                    </Typography>
                    <div className={classes.options}>
                        {getInlineStyleSamples().map((sample) => (
                            <InlineTypographySample {...sample} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
