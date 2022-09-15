// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import { css } from "emotion";
import ContextMenu, { MenuItem, MenuList, MenuDropdown } from "../controls/ContextMenu";
import ExportMenu, { getMenuItems } from "../controls/ExportMenu";
import VisualizationBlock from "../dashboardBlocks/VisualizationBlock";
import ContextDescription from "../controls/ContextDescription";

const classes = {
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
    }),
    exportsList: css({
        display: "grid",
        gridTemplateColumns: "400px repeat(auto-fill, minmax(200px, 1fr))",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
    dropdownWrapper: css({
        position: "relative",
        height: 80,
        width: 170,
    }),
    contextMenuWrapperLeft: css({
        position: "relative",
        height: 120,
        width: 170,
    }),
    contextMenuWrapperRight: css({
        position: "relative",
        textAlign: "right",
        height: 120,
        width: 170,
    }),
    contextMenuWrapperCenter: css({
        position: "relative",
        textAlign: "center",
        height: 120,
    }),
};
// tslint:disable-next-line: no-console
const onExport = (format: string) => console.log(`MenuItem onClick fired: ${format}`);
const sampleItems = getMenuItems(onExport);

export const SGContextMenu: FC = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Context Menu
            </Typography>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        Context Menu with align to fit parent
                    </Typography>
                    <Typography variant="caption" className={classes.contextMenuWrapperCenter}>
                        <ContextMenu items={sampleItems} align="fit-parent" initialIsOpen />
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Context Menu with align bottom left
                    </Typography>
                    <Typography variant="caption" className={classes.contextMenuWrapperRight}>
                        <ContextMenu items={sampleItems} align="bottom-left" initialIsOpen />
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Context Menu with align bottom right
                    </Typography>
                    <Typography variant="caption" className={classes.contextMenuWrapperLeft}>
                        <ContextMenu items={sampleItems} align="bottom-right" initialIsOpen />
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Menu Dropdown
                    </Typography>
                    <div className={classes.dropdownWrapper}>
                        <MenuDropdown items={sampleItems} />
                    </div>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Menu List
                    </Typography>
                    <MenuList items={sampleItems} />
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Menu Item
                    </Typography>
                    <MenuItem onClick={sampleItems[0].onClick}>{sampleItems[0].label}</MenuItem>
                </div>
            </div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Export use case
            </Typography>
            <div className={classes.exportsList}>
                <div>
                    <VisualizationBlock
                        header="With exports"
                        enableExports
                        projectId="lh5ubnebyxw2oyal2zhzbhfx16olnv7b"
                        identifier="aaHjw5goica0"
                        height={300}
                    />
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Export Menu
                    </Typography>
                    <Typography variant="caption" className={classes.contextMenuWrapperRight}>
                        <ExportMenu onExport={onExport} />
                    </Typography>
                </div>
            </div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Context help use case
            </Typography>
            <div className={classes.exportsList}>
                <div>
                    <VisualizationBlock
                        header="With context help"
                        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        projectId="lh5ubnebyxw2oyal2zhzbhfx16olnv7b"
                        identifier="aaHjw5goica0"
                        height={300}
                    />
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Context Description
                    </Typography>
                    <div style={{ position: "relative" }}>
                        <ContextDescription>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book
                        </ContextDescription>
                    </div>
                </div>
            </div>
        </div>
    );
};
