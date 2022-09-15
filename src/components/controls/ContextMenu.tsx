// (C) 2020 GoodData Corporation
import React, { useState, useMemo } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import Button, { IButtonProps } from "./Button";
import { cx, css } from "emotion";

import styleGuide from "../styleGuide/styleGuide";
import Typography from "../utils/Typography";
import { IconExport } from "../icon";

const hypotenuseSizeModifier = 1.414;
const arrowSize = styleGuide.spacingUnit * 1.5;
const arrowMargin = styleGuide.spacingUnit;
const arrowClipSafetyMargin = styleGuide.spacingUnit;

const classes = {
    ContextMenu: css({
        display: "inline-block",
        position: "relative",
    }),
    "ContextMenu-fit-parent": css({
        position: "static",
    }),
    ContextMenuDropdown: css({
        position: "absolute",
    }),
    "ContextMenuDropdown-fit-parent": css({
        left: 0,
        right: 0,
    }),
    "ContextMenuDropdown-bottom-left": css({
        right: `calc(50% - ${arrowSize / 2}px - ${arrowMargin}px)`,
        left: "auto",
        top: "100%",
        minWidth: 180,
    }),
    "ContextMenuDropdown-bottom-right": css({
        left: `calc(50% - ${arrowSize / 2}px - ${arrowMargin}px)`,
        right: "auto",
        top: "100%",
        minWidth: 180,
    }),
    ContextMenuTrigger: css({
        position: "relative",
    }),
    MenuItem: css({
        textAlign: "left",
        padding: styleGuide.spacing(0.5, 1),
        borderRadius: 0,
        border: 0,
        color: styleGuide.color.textMain,
    }),
    MenuItemClickable: css({
        cursor: "pointer",
        ":hover": {
            backgroundColor: styleGuide.color.highlight,
            color: styleGuide.color.textMain,
        },
    }),
    MenuList: css({
        display: "flex",
        textAlign: "left",
        flexDirection: "column",
        alignItems: "stretch",
    }),
    MenuDropdown: css({
        paddingTop: (arrowSize * hypotenuseSizeModifier) / 2, // space for arrow
        zIndex: 1000,
    }),
    TriggerButton: css({
        position: "relative",
    }),
    TriggerButtonArrowClip: css({
        display: "block",
        position: "absolute",
        left: "50%",
        top: "100%",
        marginLeft: (arrowSize * hypotenuseSizeModifier + arrowClipSafetyMargin) / -2,
        zIndex: 1001,
        height: (arrowSize * hypotenuseSizeModifier) / 2,
        width: arrowSize * hypotenuseSizeModifier + arrowClipSafetyMargin,
        overflow: "hidden",
    }),
    TriggerButtonArrow: css({
        display: "block",
        position: "relative",
        top: ((hypotenuseSizeModifier - 1) / 2) * arrowSize,
        left: ((hypotenuseSizeModifier - 1) / 2) * arrowSize + arrowClipSafetyMargin / 2,
        width: arrowSize,
        height: arrowSize,
        background: styleGuide.color.white,
        transform: "rotate(45deg)",
        boxShadow: styleGuide.shadow.low,
    }),
    MenuDropdownContent: css({
        position: "relative",
        background: styleGuide.color.white,
        boxShadow: styleGuide.shadow.low,
    }),
};

export interface IMenuItem {
    id?: string;
    label: React.ReactNode;
    onClick?: () => void;
}

export interface ITriggerButtonProps extends IButtonProps {
    colorActive?: IButtonProps["color"];
}

export const TriggerButton: React.FC<ITriggerButtonProps> = ({
    className,
    variant = "text",
    active = false,
    color = "textMain",
    colorActive = "main",
    children,
    ...restProps
}) => (
    <Button
        className={cx(classes.TriggerButton, className, "s-TriggerButton")}
        {...restProps}
        variant={variant}
        textVariant="label"
        color={color}
        colorActive={colorActive}
        active={active}
    >
        {children}
        {active && (
            <span className={classes.TriggerButtonArrowClip}>
                <span className={classes.TriggerButtonArrow} />
            </span>
        )}
    </Button>
);

export interface IMenuItemProps {
    onClick?: IMenuItem["onClick"];
    className?: string;
}

export const MenuItem: React.FC<IMenuItemProps> = ({ className, children, onClick, ...restProps }) => (
    <Typography<{ onClick: IMenuItemProps["onClick"] }>
        variant="body"
        Component="button"
        onClick={onClick}
        {...restProps}
        className={cx(classes.MenuItem, onClick && classes.MenuItemClickable, className, "s-MenuItem")}
    >
        {children}
    </Typography>
);

export interface IMenuListProps {
    items: IMenuItem[];
    className?: string;
    Item?: React.ComponentType<IMenuItemProps>;
}

export const MenuList: React.FC<IMenuListProps> = ({ items = [], className, Item = MenuItem }) => {
    return (
        <div className={cx(classes.MenuList, className)}>
            {items.map(({ label, onClick, id }, itemIndex) => {
                return (
                    <Item key={id || itemIndex} onClick={onClick}>
                        {label}
                    </Item>
                );
            })}
        </div>
    );
};

export interface IMenuDropdownProps extends IMenuListProps {
    items: IMenuItem[];
    className?: string;
    List?: React.ComponentType<IMenuListProps>;
    onClick?: IMenuItem["onClick"];
}

export const MenuDropdown: React.FC<IMenuDropdownProps> = ({ List = MenuList, className, items }) => {
    return (
        <div className={cx(classes.MenuDropdown, className)}>
            <List items={items} className={classes.MenuDropdownContent} />
        </div>
    );
};

export interface IContextMenuProps {
    items: IMenuListProps["items"];
    className?: string;
    Trigger?: React.ComponentType<{ onClick: () => void }>;
    Dropdown?: React.ComponentType<IMenuListProps>;
    initialIsOpen?: boolean;
    triggerColor?: ITriggerButtonProps["color"];
    triggerColorActive?: ITriggerButtonProps["colorActive"];
    align?: "fit-parent" | "bottom-left" | "bottom-right";
}

export const exportIcon = (
    <IconExport height={styleGuide.typography.fontSize.caption * 1.5} verticalAlign="text-bottom" />
);

const ContextMenu: React.FC<IContextMenuProps> = (props) => {
    const {
        className = null,
        items,
        Trigger = TriggerButton,
        Dropdown = MenuDropdown,
        initialIsOpen = false,
        children = exportIcon,
        triggerColor,
        triggerColorActive,
        align = "bottom-left",
    } = props;
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const itemsWithOnClick = useMemo(
        () =>
            items.map((item) => ({
                ...item,
                onClick: item.onClick
                    ? () => {
                          setIsOpen(false);
                          item.onClick();
                      }
                    : undefined,
            })),
        [items],
    );
    return (
        <div className={cx(classes.ContextMenu, classes[`ContextMenu-${align}`], className)}>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setIsOpen(false);
                }}
            >
                <Trigger
                    className={classes.ContextMenuTrigger}
                    active={isOpen}
                    color={triggerColor}
                    colorActive={triggerColorActive}
                    onClick={() => {
                        setIsOpen((isOpen) => !isOpen);
                    }}
                >
                    {children}
                </Trigger>
                {isOpen && (
                    <Dropdown
                        items={itemsWithOnClick}
                        className={cx(classes.ContextMenuDropdown, classes[`ContextMenuDropdown-${align}`])}
                    />
                )}
            </OutsideClickHandler>
        </div>
    );
};

export default ContextMenu;
