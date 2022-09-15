// (C) 2019-2020 GoodData Corporation
import React from "react";
import cx from "classnames";

import theme from "../../utils/theme";
import Heading from "../utils/Heading";

interface IDashboardBlockProps {
    className?: string;
    boxShadow?: boolean;
    header?: string | React.ReactNode;
    description?: string | React.ReactNode;
    toolBar?: React.ReactNode;
    height?: React.CSSProperties["height"];
    alignCenter?: boolean;
}

const DashboardBlock: React.FC<IDashboardBlockProps> = ({
    className,
    boxShadow = true,
    children,
    header,
    description,
    toolBar,
    height = "100%",
    alignCenter,
}) => {
    return (
        <div className={cx("box", className)}>
            {/* language=CSS */}
            <style jsx>
                {`
                    .box {
                        display: flex;
                        height: ${height};
                        flex-direction: column;
                    }
                    .box :global(.Heading) {
                        font-weight: bold;
                        text-transform: uppercase;
                        margin: 0 0 ${theme.spacing / 2}px 0;
                    }
                    .boxContent {
                        padding: ${theme.spacing}px;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        flex: 1 1 auto;
                        background-color: ${theme.color.box};
                        margin-bottom: ${theme.spacing}px;
                        border-radius: ${theme.borderRadius}px;
                        box-shadow: ${boxShadow ? theme.shadowLow : "none"};
                    }
                    .boxHeading {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                    .Description {
                        font-size: ${theme.fontSize.body};
                        margin-top: ${-theme.spacing / 2}px;
                        margin-bottom: ${theme.spacing / 2}px;
                        color: ${theme.color.grey};
                    }
                    .alignCenter {
                        justify-content: center;
                    }
                `}
            </style>
            <div className="boxContent">
                {(header || toolBar) && (
                    <div className={`boxHeading ${alignCenter && "alignCenter"}`}>
                        {header && (
                            <Heading level={4} className="Heading" center={alignCenter}>
                                {header}
                            </Heading>
                        )}
                        {toolBar}
                    </div>
                )}
                {description && <p className="Description">{description}</p>}
                {children}
            </div>
        </div>
    );
};

export default DashboardBlock;
