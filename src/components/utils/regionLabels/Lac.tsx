// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../../utils/theme";

const Lac: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
    <span style={{ color: theme.color.lac }} {...props}>
        LA/C
    </span>
);

export default Lac;
