// (C) 2019 GoodData Corporation
import React from "react";
import defaultSdk from "../../sdk";
import HeadlineVisualization, { IHeadlineVisualizationProps } from "./HeadlineVisualization";
import VisualizationBlockBase, {
    IVisualizationBlockBaseProps,
} from "../dashboardBlocks/VisualizationBlockBase";

export interface IHeadlineVisualizationBlockProps
    extends IHeadlineVisualizationProps,
        IVisualizationBlockBaseProps {}

// Consider rewriting to use VisualizationBlock with HeadlineVisualization override for VisualizationWrapper
export const HeadlineVisualizationBlock = ({
    size,
    header,
    identifier,
    projectId,
    filters = [],
    sdk = defaultSdk,
    onLoadingChanged,
    alignCenter = true,
    alignContent = false,
}: IHeadlineVisualizationBlockProps): JSX.Element => {
    return (
        <VisualizationBlockBase
            size={size}
            header={header}
            alignCenter={alignCenter}
            alignContent={alignContent}
        >
            <HeadlineVisualization {...{ identifier, projectId, filters, sdk, onLoadingChanged }} />
        </VisualizationBlockBase>
    );
};

export default HeadlineVisualizationBlock;
