// (C) 2019 GoodData Corporation
import React from "react";
import { Col } from "react-grid-system";

import DashboardBlock from "./DashboardBlock";
import KpiContent from "./KpiContent";
import sdk from "../../sdk";

interface IHeadlineBlockProps {
    projectId: string;
    header: string;
    measureIdentifier: string;
}

const HeadlineBlock: React.FC<IHeadlineBlockProps> = ({ projectId, header, measureIdentifier }) => {
    return (
        <Col xl={2}>
            <DashboardBlock>
                <KpiContent
                    sdk={sdk}
                    projectId={projectId}
                    header={header}
                    measureIdentifier={measureIdentifier}
                />
            </DashboardBlock>
        </Col>
    );
};

export default HeadlineBlock;
