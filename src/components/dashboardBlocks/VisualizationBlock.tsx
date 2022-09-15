// (C) 2019-2020 GoodData Corporation
import React from "react";
import cx from "classnames";

import VisualizationBlockBase, {
    IVisualizationBlockBaseProps,
    defaultHeights,
} from "./VisualizationBlockBase";
import VisualizationWrapper, { IVisualizationWrapperProps } from "../visualization/VisualizationWrapper";
import { CSSProperties } from "@material-ui/styles";

interface ISortingMeasureOverride {
    sortByMeasureIndex: number;
    direction: "desc" | "asc";
}

export interface IVisualizationBlockProps extends IVisualizationWrapperProps {
    className?: string;
    header: IVisualizationBlockBaseProps["header"];
    description?: IVisualizationBlockBaseProps["description"];
    size?: IVisualizationBlockBaseProps["size"];
    height?: CSSProperties["height"];
    projectId: string;
    identifier: string;
    withPeers?: boolean;
    sortingOverride?: ISortingMeasureOverride[];
    [key: string]: any; // IVisualizationProps are not properly exported from react-components
    enableExports?: boolean;
}

const VisualizationBlock: React.FC<IVisualizationBlockProps> = ({
    size = 12,
    height = defaultHeights[size] || "auto",
    className,
    header,
    description,
    projectId,
    identifier,
    filters = [],
    sortingOverride = [],
    withPeers = false,
    enableExports,
    ...visualizationProps
}) => {
    return (
        <VisualizationBlockBase
            className={cx(className, "s-visualization-block", `s-visualization-block-${identifier}`)}
            size={size}
            height="auto"
        >
            <VisualizationWrapper
                header={header}
                description={description}
                projectId={projectId}
                identifier={identifier}
                filters={filters}
                withPeers={withPeers}
                sortingOverride={sortingOverride}
                height={height}
                enableExports={enableExports}
                {...visualizationProps}
            />
        </VisualizationBlockBase>
    );
};

export default VisualizationBlock;
