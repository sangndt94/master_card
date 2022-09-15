// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../../utils/theme";

const Us: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
    <span style={{ color: theme.color.us }} {...props}>
        US
    </span>
);

export default Us;
