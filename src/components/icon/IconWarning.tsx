// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconWarning: FC<IIconProps> = (props) => {
    return (
        <Icon viewBox="0 0 156.689 144.62" {...props}>
            <path
                fill="currentcolor"
                d="M71.5,10.488,4.806,132.21a11.448,11.448,0,0,0,10.206,16.91H148.447a11.473,11.473,0,0,0,10.206-16.91L91.917,10.488A11.692,11.692,0,0,0,71.5,10.488Zm16.835,50.5-1.356,45.947H76.438L75.083,60.992Zm-6.628,70.954a6.935,6.935,0,1,1,7.193-6.93A7,7,0,0,1,81.711,131.946Z"
                transform="translate(-3.375 -4.5)"
            />
        </Icon>
    );
};
IconWarning.displayName = "IconWarning";
