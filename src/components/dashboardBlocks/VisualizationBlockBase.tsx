// (C) 2019-2020 GoodData Corporation
import React from "react";
import { Col } from "react-grid-system";
import { css, cx } from "emotion";

import DashboardBlock from "./DashboardBlock";

export const customHeadlineRowHeight = 105;
export const headlineRowHeight = 155;
export const headlineHeight = 110;
export const headlineInnerHeight = 75;
export const headlineWithoutTitleInnerHeight = 50;
export const microHeight = 100;
export const tinyHeight = 150;
export const bubbleChartHeight = tinyHeight;
export const normalHeight = 200;
export const tallerHeight = 250;
export const tallHeight = 300;
export const moreTallHeight = 350;
export const extraTallHeight = 500;

const classes = {
    childrenWrapper: css({
        position: "relative",
    }),
};

export const defaultHeights: {
    [key: number]: string | number;
} = {
    1: normalHeight,
    2: normalHeight,
    3: normalHeight,
    4: normalHeight,
    5: normalHeight,
    6: tallHeight,
    7: tallHeight,
    8: tallHeight,
    9: tallHeight,
    10: tallHeight,
    11: tallHeight,
    12: tallHeight,
};

export interface IVisualizationBlockBaseProps {
    size?: number;
    height?: number | string;
    className?: string;
    boxShadow?: boolean;
    header?: React.ReactNode;
    description?: React.ReactNode;
    toolBar?: React.ReactElement;
    alignCenter?: boolean;
    alignContent?: boolean;
}

const VisualizationBlockBase: React.FC<IVisualizationBlockBaseProps> = ({
    size = 12,
    height = defaultHeights[size] || "auto",
    className,
    boxShadow = true,
    header,
    description,
    toolBar,
    children,
    alignCenter,
    alignContent,
}) => {
    const normalizedHeight = isNaN(Number(height)) ? height : `${height}px`;
    const heightClassName = css({ height: normalizedHeight, flex: `0 0 ${normalizedHeight}` });
    const alignContentClassName = css({
        height: normalizedHeight,
        flex: `1 0 100px`,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    });
    return (
        <Col lg={size}>
            <DashboardBlock
                className={className}
                boxShadow={boxShadow}
                header={header}
                description={description}
                toolBar={toolBar}
                alignCenter={alignCenter}
            >
                <div
                    className={cx(
                        classes.childrenWrapper,
                        alignContent ? alignContentClassName : heightClassName,
                    )}
                >
                    {children}
                </div>
            </DashboardBlock>
        </Col>
    );
};

export default VisualizationBlockBase;
