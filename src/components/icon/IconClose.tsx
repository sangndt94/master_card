// (C) 2020 GoodData Corporation
import React from "react";
import { Icon, IIconProps } from "./Icon";

export const IconClose: React.FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 11.268 11.273" {...props}>
            <g transform="translate(-12.359 -12.354)" fill="currentcolor">
                <path d="M23.295,21.705,19.589,18l3.705-3.705a1.124,1.124,0,0,0-1.589-1.589L18,16.411l-3.705-3.705a1.124,1.124,0,0,0-1.589,1.589L16.411,18l-3.705,3.705a1.086,1.086,0,0,0,0,1.589,1.116,1.116,0,0,0,1.589,0L18,19.589l3.705,3.705a1.129,1.129,0,0,0,1.589,0A1.116,1.116,0,0,0,23.295,21.705Z" />
            </g>
        </Icon>
    );
};
IconClose.displayName = "IconClose";
