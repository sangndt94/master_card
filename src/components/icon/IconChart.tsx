// (C) 2020 GoodData Corporation
import React from "react";
import { Icon, IIconProps } from "./Icon";

export const IconChart: React.FC<IIconProps> = (props) => {
    return (
        <Icon x="0" y="0" viewBox="0 0 50 37.5" {...props}>
            <path
                d="M48.438,35.75H6.25V6.063A1.562,1.562,0,0,0,4.688,4.5H1.563A1.562,1.562,0,0,0,0,6.063V38.875A3.125,3.125,0,0,0,3.125,42H48.438A1.562,1.562,0,0,0,50,40.438V37.313A1.562,1.562,0,0,0,48.438,35.75ZM45.313,7.625H33.783a2.344,2.344,0,0,0-1.657,4L35.29,14.79l-7.165,7.166L20.96,14.791a3.124,3.124,0,0,0-4.419,0L9.833,21.5a1.563,1.563,0,0,0,0,2.21l2.209,2.209a1.563,1.563,0,0,0,2.21,0l4.5-4.5,7.165,7.165a3.124,3.124,0,0,0,4.419,0l9.375-9.375,3.164,3.164a2.344,2.344,0,0,0,4-1.657V9.188A1.561,1.561,0,0,0,45.313,7.625Z"
                transform="translate(0 -4.5)"
                fill="currentcolor"
            />
        </Icon>
    );
};
IconChart.displayName = "IconChart";
