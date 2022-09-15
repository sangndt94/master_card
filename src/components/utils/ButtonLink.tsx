// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";

import theme from "../../utils/theme";

const ButtonLink: React.FC<React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>> = ({ children, className = "", ...restProps }) => {
    return (
        <button className={cx("link", className)} {...restProps}>
            <style jsx>{`
                .link {
                    background: transparent;
                    color: ${theme.color.accent};
                    font-family: inherit;
                    font-weight: normal;
                    text-decoration: underline;
                    border: 0;
                    padding: 0;
                    cursor: pointer;
                }
                .link:hover {
                    color: ${theme.color.accent};
                    text-decoration: none;
                }
                .link[disabled] {
                    cursor: auto;
                }
            `}</style>
            {children}
        </button>
    );
};

export default ButtonLink;
