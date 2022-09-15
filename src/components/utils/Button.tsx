// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";

const Button: React.FC<React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>> = ({ className, children, ...restProps }) => {
    return (
        <button className={cx("Button", className)} {...restProps}>
            {/* language=CSS */}
            <style jsx>{`
                .Button {
                    background-color: ${theme.color.link};
                    color: ${theme.color.textInverseLighter};
                    padding: ${theme.spacing / 4}px ${theme.spacing / 2}px;
                    border-radius: ${theme.borderRadius}px;
                    border: 2px solid transparent;
                    white-space: nowrap;
                    cursor: pointer;
                    user-select: none;
                }
                .Button:hover {
                    text-decoration: underline;
                }
                .Button[disabled],
                .Button[disabled]:hover {
                    cursor: auto;
                    color: ${theme.color.grey};
                    border: 2px solid ${theme.color.greyLighter};
                    background: transparent;
                    text-decoration: none;
                    pointer-events: none;
                }
            `}</style>
            {children}
        </button>
    );
};

export default Button;
