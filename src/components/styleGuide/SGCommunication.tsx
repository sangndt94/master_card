// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import Typography from "../utils/Typography";
import { css } from "emotion";
import styleGuide from "./styleGuide";
import { InfoBanner } from "../utils";

const classes = {
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
};

export const SGCommunication: FC = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Communication
            </Typography>

            <Typography variant="label" Component="h4">
                InfoBanner
            </Typography>
            <InfoBanner onClose={() => null}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cumque dolore eaque esse
                exercitationem perferendis quo rerum similique tempora.
            </InfoBanner>
        </div>
    );
};
