// (C) 2020 GoodData Corporation
import React, { useMemo } from "react";
import ContextMenu, { IContextMenuProps, IMenuItem } from "./ContextMenu";
import { cx, css } from "emotion";
import { IconExport, IconExcel, IconCsv } from "../icon";
import styleGuide from "../styleGuide/styleGuide";
import Typography from "../utils/Typography";
import { IExportConfig } from "@gooddata/gooddata-js";

export interface IExportMenuProps extends Partial<IContextMenuProps> {
    onExport: (exportFormat: IExportConfig["format"]) => void;
}

const classes = {
    ExportMenu: css({
        position: "relative",
        display: "inline-block",
    }),
};

export const exportExcelLabel = (
    <Typography variant="label">
        <IconExcel height="1.25em" verticalAlign="text-bottom" />
        &emsp;Export to Excel
    </Typography>
);
export const exportCsvLabel = (
    <Typography variant="label">
        <IconCsv height="1.25em" verticalAlign="text-bottom" />
        &emsp;Export to CSV
    </Typography>
);
export const exportIcon = (
    <IconExport
        height={styleGuide.typography.fontSize.caption * 1.15}
        width={styleGuide.typography.fontSize.caption * 1.15 * 1.125}
        verticalAlign="text-bottom"
    />
);

export const getMenuItems: (onClick: IExportMenuProps["onExport"]) => IMenuItem[] = (onClick) => [
    {
        id: "xlsx",
        label: exportExcelLabel,
        onClick: () => onClick("xlsx"),
    },
    {
        id: "csv",
        label: exportCsvLabel,
        onClick: () => onClick("csv"),
    },
];

const ExportMenu: React.FC<IExportMenuProps> = (props) => {
    const {
        className,
        onExport,
        items = useMemo(() => getMenuItems(onExport), [onExport]),
        children = exportIcon,
    } = props;

    return (
        <ContextMenu items={items} className={cx(classes.ExportMenu, className)}>
            {children}
        </ContextMenu>
    );
};

export default ExportMenu;
