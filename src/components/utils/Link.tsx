// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import css from "styled-jsx/css";

import theme from "../../utils/theme";

const { className, styles } = css.resolve`
    a {
        background: transparent;
        color: ${theme.color.accent};
        font-family: inherit;
        font-weight: normal;
        text-decoration: underline;
        border: 0;
        padding: 0;
        cursor: pointer;
    }
    a:hover {
        color: ${theme.color.accent};
        text-decoration: none;
    }
`;

const Link = ({ to, children, ...restProps }) => {
    return (
        <RouterLink to={to} className={className} {...restProps}>
            {styles}
            {children}
        </RouterLink>
    );
};

export default Link;
