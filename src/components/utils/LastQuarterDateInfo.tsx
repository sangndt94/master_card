// (C) 2020 GoodData Corporation
import React from "react";
import InfoBox from "../dashboardBlocks/InfoBox";
import { IconChart } from "../icon";
import styleGuide from "../styleGuide/styleGuide";

interface ILastQuarterProps {
    className?: string;
    size?: number;
    quarter: string;
}

const LastQuarterDateInfo: React.FC<ILastQuarterProps> = ({ size, className, quarter }) => {
    return (
        <InfoBox
            size={size}
            icon={<IconChart height="25px" width="25px" color={styleGuide.color.textSecondary} />}
            className={className}
        >
            Last quarter is <b>{quarter}</b>. <b>YoY</b> is the change from the same quarter of previous year
        </InfoBox>
    );
};

export default LastQuarterDateInfo;
