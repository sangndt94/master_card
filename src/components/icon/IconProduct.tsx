// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import { Icon, IIconProps } from "./Icon";

export const IconProduct: FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 34 34" {...props}>
            <path
                id="Product_Icon"
                data-name="Product Icon"
                d="M4.5,23.389H19.611V4.5H4.5ZM4.5,38.5H19.611V27.167H4.5Zm18.889,0H38.5V19.611H23.389Zm0-34V15.833H38.5V4.5Z"
                transform="translate(-4.5 -4.5)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconProduct.displayName = "IconProduct";
