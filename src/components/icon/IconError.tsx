// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconError: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="5 5 15 15" {...props}>
            <path
                fill="currentcolor"
                d="M12.5,20A7.5,7.5,0,1,0,5,12.5,7.5,7.5,0,0,0,12.5,20Zm.5-6H12V9h1Zm-1,1h1v1H12Z"
            />
        </Icon>
    );
};
IconError.displayName = "IconError";
