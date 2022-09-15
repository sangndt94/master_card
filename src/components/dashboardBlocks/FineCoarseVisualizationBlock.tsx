// (C) 2019 GoodData Corporation
import React, { useState } from "react";
import cx from "classnames";

import VisualizationBlockBase, { extraTallHeight } from "./VisualizationBlockBase";
import GranularitySwitch from "./GranularitySwitch";
import CustomLoading from "../utils/CustomLoading";
import VisualizationWrapper from "../visualization/VisualizationWrapper";

interface IFineCoarseVisualizationBlockProps {
    fineGranularityVisualization: string;
    coarseGranularityVisualization: string;
    projectId: string;
    header?: string;
    size?: number;
    height?: number;
    className?: string;
    withPeers?: boolean;
    [key: string]: any; // IVisualizationProps are not properly exported from react-components
    enableExports?: boolean;
}

const FineCoarseVisualizationBlock: React.FC<IFineCoarseVisualizationBlockProps> = ({
    fineGranularityVisualization,
    coarseGranularityVisualization,
    header,
    size,
    height = extraTallHeight,
    className,
    withPeers = false,
    enableExports,
    ...visualizationProps
}) => {
    const [useFineGranularity, setUseFineGranularity] = useState(true);
    const visualizationUsed = useFineGranularity
        ? fineGranularityVisualization
        : coarseGranularityVisualization;
    return (
        <VisualizationBlockBase
            className={cx(
                className,
                "s-visualization-block",
                "s-visualization-block-fine-coarse",
                `s-visualization-block-${visualizationUsed}`,
            )}
            height="auto"
            size={size}
        >
            <VisualizationWrapper
                header={header}
                switchTab={
                    <GranularitySwitch
                        useFineGranularity={useFineGranularity}
                        setUseFineGranularity={setUseFineGranularity}
                    />
                }
                height={height}
                identifier={visualizationUsed}
                LoadingComponent={CustomLoading}
                withPeers={withPeers}
                {...visualizationProps}
                enableExports={enableExports}
            />
        </VisualizationBlockBase>
    );
};

export default FineCoarseVisualizationBlock;
