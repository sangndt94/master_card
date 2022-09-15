// (C) 2020 GoodData Corporation
import React from "react";
import ContextMenu from "./ContextMenu";
import { cx, css } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import { IconInfo } from "../icon";
import { IVisualizationBlockBaseProps } from "../dashboardBlocks/VisualizationBlockBase";

export interface IContextDescriptionProps {
    children: IVisualizationBlockBaseProps["description"];
    className?: string;
    icon?: React.ReactNode;
}

const classes = {
    ContextDescription: css({
        display: "inline-block",
    }),
};

export const contextDescriptionIcon = (
    <IconInfo height={styleGuide.typography.fontSize.caption * 1.2} verticalAlign="bottom" />
);

const ContextDescription: React.FC<IContextDescriptionProps> = (props) => {
    const { className, children, icon = contextDescriptionIcon } = props;

    return (
        <ContextMenu
            items={[{ label: children }]}
            className={cx(classes.ContextDescription, className)}
            triggerColor="info"
            triggerColorActive="infoActive"
            align="fit-parent"
        >
            {icon}
        </ContextMenu>
    );
};

export default ContextDescription;
