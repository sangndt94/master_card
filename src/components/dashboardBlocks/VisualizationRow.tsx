// (C) 2019 GoodData Corporation
import React from "react";
import VisualizationBlockBase from "./VisualizationBlockBase";
import theme from "../../utils/theme";
import CustomLoading from "../utils/CustomLoading";
import Heading from "../utils/Heading";
import { OnLoadingChanged } from "@gooddata/react-components/dist/interfaces/Events";
import useVisualizationsAreLoading from "../../hooks/useVisualizationsAreLoading";

interface IVisualizationRowProps {
    size?: number;
    height?: number | string;
    minHeight?: number | string;
    className?: string;
    boxShadow?: boolean;
    children: (props: { onLoadingChanged: OnLoadingChanged }) => JSX.Element;
    header?: any;
    [key: string]: any; // IVisualizationProps are not properly exported from react-components
}

const borderShift = 2;

const VisualizationRowContent: React.FC<{
    minHeight: IVisualizationRowProps["minHeight"];
    header?: any;
    isLoading: boolean;
}> = ({ children, isLoading, minHeight, header }) => {
    const minHeightValue = typeof minHeight === "number" ? `${minHeight}px` : minHeight;
    return (
        <>
            {header && (
                <Heading level={4} className="Heading" center>
                    {header}
                </Heading>
            )}
            {isLoading && (
                <div className="VisualizationRowLoading">
                    {/* language=CSS */}
                    <style jsx>{`
                        .VisualizationRowLoading {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                    `}</style>
                    <CustomLoading />
                </div>
            )}
            <div className="VisualizationRow">
                {/* language=CSS */}
                <style jsx>{`
                    .VisualizationRow {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        margin-left: ${-theme.spacing - borderShift}px;
                        margin-right: ${-theme.spacing + borderShift}px;
                        height: 100%;
                        min-height: ${minHeightValue};
                        visibility: ${isLoading ? "hidden" : "visible"};
                    }
                    @supports (display: grid) {
                        .VisualizationRow {
                            display: grid;
                            grid-gap: ${theme.spacing}px 0;
                            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        }
                    }
                    .VisualizationRow :global(> *) {
                        flex: 1 1 auto;
                        text-align: center;
                        border-left: 4px solid ${theme.color.paper};
                        padding-left: ${theme.spacing}px;
                        padding-right: ${theme.spacing}px;
                        box-sizing: border-box;
                    }
                    .VisualizationRow :global(> *:first-child) {
                        border-left: 0;
                    }
                `}</style>
                {children}
            </div>
        </>
    );
};

const VisualizationRow: React.FC<IVisualizationRowProps> = ({
    size = 12,
    count,
    height,
    minHeight,
    className = "",
    boxShadow = true,
    children,
    header,
    ...restProps
}) => {
    const [onLoadingChanged, isLoading] = useVisualizationsAreLoading(count);

    return (
        <VisualizationBlockBase
            size={size}
            height={height}
            className={className}
            boxShadow={boxShadow}
            {...restProps}
        >
            <VisualizationRowContent minHeight={minHeight} isLoading={isLoading} header={header}>
                {children({ onLoadingChanged })}
            </VisualizationRowContent>
        </VisualizationBlockBase>
    );
};

export default VisualizationRow;
