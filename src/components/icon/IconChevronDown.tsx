// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconChevronDown: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 30.703 18.633" {...props}>
            <path
                id="Icon_awesome-chevron-down"
                data-name="Icon awesome-chevron-down"
                d="M14.557,26.823.892,13.158a1.687,1.687,0,0,1,0-2.386L2.486,9.177a1.687,1.687,0,0,1,2.384,0L15.75,20,26.631,9.175a1.687,1.687,0,0,1,2.384,0l1.594,1.594a1.687,1.687,0,0,1,0,2.386L16.943,26.823A1.688,1.688,0,0,1,14.557,26.823Z"
                transform="translate(-0.398 -8.684)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconChevronDown.displayName = "IconChevronDown";
