// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconChevronUp: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 30.703 18.633" {...props}>
            <path
                id="Icon_awesome-chevron-up"
                data-name="Icon awesome-chevron-up"
                d="M16.943,9.177,30.608,22.842a1.687,1.687,0,0,1,0,2.386l-1.594,1.594a1.687,1.687,0,0,1-2.384,0L15.75,16,4.869,26.825a1.687,1.687,0,0,1-2.384,0L.892,25.229a1.687,1.687,0,0,1,0-2.386L14.557,9.178A1.687,1.687,0,0,1,16.943,9.177Z"
                transform="translate(-0.398 -8.684)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconChevronUp.displayName = "IconChevronUp";
