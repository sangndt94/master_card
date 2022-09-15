// (C) 2019 GoodData Corporation
import React from "react";
import cx from "classnames";

import theme from "../../utils/theme";

interface IDashboardContentProps {
    className?: string;
}

// tooltipSafetyMargin is needed so that the tooltip is not hidden under the filter bar
export const tooltipSafetyMargin = 200;

const DashboardContent: React.FC<IDashboardContentProps> = ({ className = "", children }) => {
    return (
        <div className={cx("DashboardContent", className)}>
            {/* language=CSS */}
            <style jsx>
                {`
                    .DashboardContent {
                        flex: 1 1 auto;
                        overflow: auto;
                        padding: ${theme.spacing + tooltipSafetyMargin}px ${theme.spacing / 2}px 0
                            ${theme.spacing / 2}px;
                        margin-top: ${-tooltipSafetyMargin}px;
                    }
                `}
            </style>
            {children}
        </div>
    );
};

export default DashboardContent;
