// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconMissing: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 100 100" {...props}>
            <path fill="currentcolor" d="M0 0v100h100V0H0zm95 95H5V5h90v90z" />
            <path
                fill="currentcolor"
                d="M70.264 35.022L64.977 29.736 50 44.713 35.022 29.736 29.736 35.022 44.713 50 29.736 64.977 35.022 70.264 50 55.286 64.977 70.264 70.264 64.977 55.286 50z"
            />
        </Icon>
    );
};
IconMissing.displayName = "IconMissing";
