// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../utils/theme";

const InlineError: React.FC = () => (
    <span className="InlineError s-error">
        <style jsx>{`
            .InlineError {
                padding: ${theme.spacing}px;
                font-size: inherit;
                vertical-align: middle;
                text-align: center;
                line-height: inherit;
                font-weight: 700;
                color: ${theme.color.textLighter};
            }
        `}</style>
        Error
    </span>
);

export default InlineError;
