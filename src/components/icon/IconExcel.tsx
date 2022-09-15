// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconExcel: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 11.998 16" {...props}>
            <path
                fill="currentcolor"
                transform="translate(0 0.1)"
                d="M11.557,2.962,8.936.341A1.5,1.5,0,0,0,7.877-.1H1.5A1.5,1.5,0,0,0,0,1.4v13a1.5,1.5,0,0,0,1.5,1.5h9A1.5,1.5,0,0,0,12,14.4V4.024a1.507,1.507,0,0,0-.441-1.062Zm-.706.709a.492.492,0,0,1,.131.231H8V.919a.492.492,0,0,1,.231.131ZM10.5,14.9h-9a.5.5,0,0,1-.5-.5V1.4A.5.5,0,0,1,1.5.9H7V4.152a.748.748,0,0,0,.75.75H11v9.5A.5.5,0,0,1,10.5,14.9ZM6.614,9.526,8.192,6.97A.375.375,0,0,0,7.87,6.4H7.742a.376.376,0,0,0-.316.172A17.627,17.627,0,0,0,6,8.9,21.359,21.359,0,0,0,4.568,6.574.376.376,0,0,0,4.252,6.4H4.124a.373.373,0,0,0-.319.569l1.6,2.556-1.847,2.8a.375.375,0,0,0,.316.578h.109a.376.376,0,0,0,.316-.172c1.162-1.812,1.415-1.953,1.7-2.578a18.48,18.48,0,0,0,1.7,2.581.372.372,0,0,0,.312.169h.112a.373.373,0,0,0,.316-.575Z"
            />
        </Icon>
    );
};
IconExcel.displayName = "IconExcel";
