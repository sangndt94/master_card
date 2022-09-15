// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../../utils/theme";

const Can: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
    <span style={{ color: theme.color.can }} {...props}>
        CAN
    </span>
);

export default Can;
