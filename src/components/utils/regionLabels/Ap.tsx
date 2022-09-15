// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../../utils/theme";

const Ap: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
    <span style={{ color: theme.color.ap }} {...props}>
        A/P
    </span>
);

export default Ap;
