// (C) 2007-2019 GoodData Corporation
import React from "react";
import { NavLink } from "react-router-dom";
import theme from "../../utils/theme";
import Hr from "./Hr";
import Heading from "./Heading";

const navItemBorderWidth = 4;

interface IMenuItemProps {
    path: string;
    title: string;
    exact?: boolean;
    heading?: string;
    groupColor?: string;
    onClick?: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
    path,
    title,
    exact = false,
    heading,
    groupColor = theme.color.secondary,
    onClick,
}) => {
    return (
        <React.Fragment>
            {heading && (
                <li className="headingItem">
                    {/* language=CSS */}
                    <style jsx>{`
                        .headingItem {
                            padding: ${theme.spacing / 2}px ${theme.spacing}px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                        }
                        .headingItem :global(.heading) {
                            font-size: ${theme.fontSize.body}px;
                            margin-left: ${theme.spacing / 2}px;
                            margin-right: ${theme.spacing / 2}px;
                            font-weight: bold;
                        }
                        .headingItem :global(.rule) {
                            flex: 1 1 auto;
                        }
                    `}</style>
                    <Hr className="rule" color={groupColor} />
                    <Heading className="heading">{heading}</Heading>
                    <Hr className="rule" color={groupColor} />
                </li>
            )}
            <li key={path} className="navListItem">
                {/* language=CSS */}
                <style jsx>{`
                    .navListItem > :global(.navItem) {
                        display: block;
                        padding: ${theme.spacing / 2}px ${theme.spacing}px ${theme.spacing / 2}px
                            ${theme.spacing - navItemBorderWidth}px;
                        border-left: ${navItemBorderWidth}px solid transparent;
                        color: ${theme.color.grey};
                        font-weight: normal;
                        text-transform: uppercase;
                    }
                    .navListItem > :global(.navItem:hover) {
                        color: ${theme.color.boxLinkHover};
                        border-left-color: ${theme.color.paper};
                        text-decoration: none;
                    }
                    .navListItem > :global(.navItemActive) {
                        background-color: ${theme.color.paper};
                        border-left-color: ${groupColor};
                        color: ${theme.color.boxLinkActive};
                        text-decoration: none;
                    }
                    .navListItem > :global(.navItemActive:hover) {
                        border-left-color: ${groupColor};
                    }
                `}</style>
                <NavLink
                    to={path}
                    className="navItem s-menu-item"
                    activeClassName="navItemActive s-menu-item-active"
                    exact={exact}
                    onClick={onClick}
                >
                    {title}
                </NavLink>
            </li>
        </React.Fragment>
    );
};

export default MenuItem;
