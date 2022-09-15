// (C) 2020 GoodData Corporation
import React from "react";
import { Icon, IIconProps } from "./Icon";

export const IconThickInfo: React.FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 20.773 49.34" {...props}>
            <path
                d="M46.563,20.966a7.79,7.79,0,1,1-7.79,7.79A7.79,7.79,0,0,1,46.563,20.966ZM56.95,68.079A2.226,2.226,0,0,1,54.724,70.3H38.4a2.226,2.226,0,0,1-2.226-2.226V63.627A2.226,2.226,0,0,1,38.4,61.4h2.226V49.53H38.4A2.226,2.226,0,0,1,36.175,47.3V42.853A2.226,2.226,0,0,1,38.4,40.627H50.272A2.226,2.226,0,0,1,52.5,42.853V61.4h2.226a2.226,2.226,0,0,1,2.226,2.226Z"
                transform="translate(-36.176 -20.965)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconThickInfo.displayName = "IconThickInfo";
