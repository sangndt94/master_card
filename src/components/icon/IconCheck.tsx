// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconCheck: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 100 100" {...props}>
            <g transform="translate(0,-952.36218)">
                <path
                    d="m 86.531251,971.12783 -51.624999,48.81237 -21.5625,-19.7812 -6.7500005,7.3438 25.0000005,22.9374 3.4375,3.1563 3.375,-3.1875 54.999997,-51.99997 -6.874998,-7.2812 z"
                    fill="currentcolor"
                    stroke="none"
                />
            </g>
        </Icon>
    );
};
IconCheck.displayName = "IconCheck";
