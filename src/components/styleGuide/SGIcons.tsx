// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import * as Icons from "../icon";
import { css } from "emotion";

const iconsArray = Object.values(Icons);

const classes = {
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
    section: css({
        position: "relative",
        display: "inline-block",
        width: "50%",
        verticalAlign: "top",
    }),
    item: css({
        display: "flex",
        alignItems: "center",
        marginBottom: styleGuide.spacing(3),

        "& svg": {
            marginRight: styleGuide.spacing(1),
        },
    }),
    colorSquare: css({
        width: 30,
        height: 30,
        marginRight: styleGuide.spacing(1),
    }),
};

const iconProps = {
    width: "20px",
    height: "20px",
};

const applicableColors = [
    {
        code: styleGuide.color.textMain,
        name: "TEXTMAIN (Active state)",
    },
    {
        code: styleGuide.color.textSecondary,
        name: "TEXTSECONDARY (Muted state)",
    },
    {
        code: styleGuide.color.main,
        name: "ORANGE",
    },
    {
        code: styleGuide.color.info,
        name: "INFO",
    },
    {
        code: styleGuide.color.infoActive,
        name: "INFOACTIVE",
    },
];

export const SGIcons: FC = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Icons
            </Typography>

            <div className={classes.section}>
                {iconsArray.map((IconElement) => {
                    return (
                        <Typography
                            key={IconElement.name}
                            variant="label"
                            Component="h4"
                            className={classes.item}
                        >
                            <IconElement {...iconProps} />
                            {IconElement.displayName}
                        </Typography>
                    );
                })}
            </div>

            <div className={classes.section}>
                <Typography variant="caption" Component="h4">
                    Applicable colors:
                </Typography>
                {applicableColors.map(({ name, code }) => {
                    return (
                        <Typography key={name} className={classes.item}>
                            <div className={classes.colorSquare} style={{ backgroundColor: code }} />
                            <div>
                                <Typography variant="caption">{name}</Typography>
                                <Typography variant="label">{code}</Typography>
                            </div>
                        </Typography>
                    );
                })}
            </div>
        </div>
    );
};
