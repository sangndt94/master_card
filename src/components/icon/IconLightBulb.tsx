// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconLightBulb: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 23.801 34" {...props}>
            <path
                id="LightBulb_Icon"
                data-name="LightBulb Icon"
                d="M14.3,35.3A1.7,1.7,0,0,0,16,37h6.8a1.7,1.7,0,0,0,1.7-1.7V33.6H14.3ZM19.4,3a11.895,11.895,0,0,0-6.8,21.658V28.5a1.7,1.7,0,0,0,1.7,1.7H24.5a1.7,1.7,0,0,0,1.7-1.7V24.658A11.895,11.895,0,0,0,19.4,3Zm4.845,18.87L22.8,22.89V26.8H16V22.89l-1.445-1.02a8.5,8.5,0,1,1,9.69,0Z"
                transform="translate(-7.5 -3)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconLightBulb.displayName = "IconLightBulb";
