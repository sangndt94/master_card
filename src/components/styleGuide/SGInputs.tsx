// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import Input from "../controls/Input";
import { css } from "emotion";

const classes = {
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: styleGuide.spacing(2),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
};

export const SGInputs: FC<{}> = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Inputs
            </Typography>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        Input
                    </Typography>

                    <Typography variant="label" Component="h3">
                        Default state with value
                    </Typography>
                    <div>
                        <Input defaultValue="ABC" />
                    </div>
                    <Typography variant="label" Component="h3">
                        Default state with placeholder
                    </Typography>
                    <div>
                        <Input defaultValue="" placeholder="ABC" />
                    </div>

                    <Typography variant="label" Component="h3">
                        Read-only state
                    </Typography>
                    <div>
                        <Input defaultValue="ABC" readOnly />
                    </div>

                    <Typography variant="label" Component="h3">
                        Error state
                    </Typography>
                    <div>
                        <Input defaultValue="" error="this field is required" />
                    </div>
                </div>
            </div>
        </div>
    );
};
