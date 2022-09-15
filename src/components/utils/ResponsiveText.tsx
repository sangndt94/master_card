// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Textfit } from "react-textfit";

const ResponsiveText: React.FC<any> = ({ children, ...restProps }) => (
    <Textfit mode="single" forceSingleModeWidth={false} {...restProps}>
        {children}
    </Textfit>
);

export default ResponsiveText;
