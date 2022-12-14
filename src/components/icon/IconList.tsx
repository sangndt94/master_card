// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconList: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 36 31.5" {...props}>
            <path
                id="Icon_awesome-list-alt"
                data-name="Icon awesome-list-alt"
                d="M32.625,33.75H3.375A3.375,3.375,0,0,1,0,30.375V5.625A3.375,3.375,0,0,1,3.375,2.25h29.25A3.375,3.375,0,0,1,36,5.625v24.75A3.375,3.375,0,0,1,32.625,33.75ZM9,8.438a2.813,2.813,0,1,0,2.813,2.813A2.813,2.813,0,0,0,9,8.438Zm0,6.75A2.813,2.813,0,1,0,11.813,18,2.813,2.813,0,0,0,9,15.188Zm0,6.75a2.813,2.813,0,1,0,2.813,2.813A2.813,2.813,0,0,0,9,21.938Zm20.25-9.562v-2.25a.844.844,0,0,0-.844-.844H14.344a.844.844,0,0,0-.844.844v2.25a.844.844,0,0,0,.844.844H28.406A.844.844,0,0,0,29.25,12.375Zm0,6.75v-2.25a.844.844,0,0,0-.844-.844H14.344a.844.844,0,0,0-.844.844v2.25a.844.844,0,0,0,.844.844H28.406A.844.844,0,0,0,29.25,19.125Zm0,6.75v-2.25a.844.844,0,0,0-.844-.844H14.344a.844.844,0,0,0-.844.844v2.25a.844.844,0,0,0,.844.844H28.406A.844.844,0,0,0,29.25,25.875Z"
                transform="translate(0 -2.25)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconList.displayName = "IconList";
