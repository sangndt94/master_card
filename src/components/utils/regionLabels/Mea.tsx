// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../../utils/theme";

const Mea: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
    <span style={{ color: theme.color.mea }} {...props}>
        ME/A
    </span>
);

export default Mea;
