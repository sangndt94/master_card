// (C) 2019 GoodData Corporation
import React from "react";
import { Col } from "react-grid-system";

import DashboardBlock from "./DashboardBlock";
import KpiContent from "./KpiContent";
import theme from "../../utils/theme";
import sdk from "../../sdk";
import Hr from "../utils/Hr";

const ruleWidth = 4;
const minimumHeadlineWidth = 195;

interface IHeadline {
    header: string;
    measureIdentifier: string;
    projectId: string;
}

interface IHeadlineGroupProps {
    header?: string;
    filters?: any[];
    headlines: IHeadline[];
    title?: string;
    description?: string;
}

const HeadlineGroup: React.FC<IHeadlineGroupProps> = ({
    filters,
    headlines = [],
    title,
    header,
    description,
    children,
}) => {
    const maxPageWidth =
        (minimumHeadlineWidth + ruleWidth) * headlines.length -
        ruleWidth +
        theme.spacing * 2 +
        theme.menuWidth;

    return (
        <Col>
            <div className="HeadlineGroup">
                {/* language=CSS */}
                <style jsx>{`
                    .HeadlineGroup {
                        position: relative;
                    }
                    .HeadlineGroupContent {
                        margin: 0 ${-theme.spacing}px;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: stretch;
                    }
                    .HeadlineGroupContent :global(.KpiContent) {
                        flex: 1 1 auto;
                        padding: 0 ${theme.spacing}px;
                    }
                    .HeadlineGroupContent :global(.Kpi) {
                        padding-bottom: ${theme.spacing}px;
                    }
                    .rule {
                        width: ${ruleWidth}px;
                        background-color: ${theme.color.paper};
                    }
                    .HeadlineGroupContent :global(.KpiContent) {
                        width: calc(100% / ${headlines.length} - ${(headlines.length - 1) * ruleWidth}px);
                    }
                    .Title {
                        text-align: center;
                        margin: 0 0 ${theme.spacing / 2}px 0;
                        color: ${theme.color.textLightest};
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    .Title :global(.Hr) {
                        flex: 1 1 auto;
                    }

                    @media (max-width: ${maxPageWidth}px) {
                        .HeadlineGroupContent {
                            flex-wrap: wrap;
                        }
                        .rule:nth-child(4n) {
                            display: none;
                        }
                        .HeadlineGroupContent :global(.KpiContent) {
                            width: calc(
                                100% / ${Math.floor(headlines.length / 2)} -
                                    ${(Math.floor(headlines.length / 2) - 1) * ruleWidth}px
                            );
                        }
                    }
                `}</style>
                <DashboardBlock className="DashboardBlock" header={header} description={description}>
                    {title && (
                        <div className="Title">
                            <Hr className="Hr" color={theme.color.paper} />
                            &emsp;{title}&emsp;
                            <Hr className="Hr" color={theme.color.paper} />
                        </div>
                    )}
                    <div className="HeadlineGroupContent">
                        {headlines.map(
                            ({ projectId, header: headlineHeader, measureIdentifier }, headlineIndex) => {
                                const headlineElement = (
                                    <KpiContent
                                        sdk={sdk}
                                        className="KpiContent"
                                        key={measureIdentifier}
                                        projectId={projectId}
                                        header={headlineHeader}
                                        measureIdentifier={measureIdentifier}
                                        filters={filters}
                                    />
                                );
                                return headlineIndex === 0 ? (
                                    headlineElement
                                ) : (
                                    <React.Fragment key={measureIdentifier}>
                                        <div className="rule" />
                                        {headlineElement}
                                    </React.Fragment>
                                );
                            },
                        )}
                    </div>
                    {children}
                </DashboardBlock>
            </div>
        </Col>
    );
};

export default HeadlineGroup;
