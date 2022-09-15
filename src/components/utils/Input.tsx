// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";

import theme from "../../utils/theme";

const Input = ({
    type = "text",
    className = "",
    onChange,
    borderColor = theme.color.grey3,
    ...restProps
}) => {
    return (
        <div className={cx("Input", className)}>
            <style jsx>{`
                .Input {
                    display: relative;
                }
                .Input .input {
                    box-sizing: border-box;
                    width: 100%;
                    background: ${theme.color.box};
                    color: ${theme.color.textLighter};
                    font-family: inherit;
                    font-weight: normal;
                    text-decoration: none;
                    line-height: 1.9;
                    border: 1px solid ${theme.color.borderLight};
                    padding: ${theme.spacing / 4}px ${theme.spacing / 2}px;
                    border-radius: ${theme.borderRadius}px;
                }
                .Input .input:focus {
                    border-color: ${borderColor};
                }
                .Input .input::placeholder {
                    color: ${theme.color.placeholderText};
                }
            `}</style>
            <input
                type={type}
                className="input"
                {...restProps}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
};

export default Input;
