// (C) 2007-2019 GoodData Corporation
import React from "react";
import theme from "../../utils/theme";
import Heading from "./Heading";
import MenuItem from "./MenuItem";
import { IRouteDefinition } from "../../types";

interface IMenuProps {
    routes: IRouteDefinition[];
    appName?: string;
}

const Menu: React.FC<IMenuProps> = ({ routes, appName }) => {
    return (
        <div className="navWrapper">
            {/* language=CSS */}
            <style jsx>{`
                .navWrapper {
                    flex: 0 0 auto;
                    display: flex;
                    flex-direction: column;
                    width: ${theme.menuWidth}px;
                    margin: 0;
                    padding: 0;
                    background: ${theme.color.box};
                    color: ${theme.color.text};
                    z-index: 40;
                    box-shadow: ${theme.shadowLow};
                }

                .navWrapper > :global(.Heading) {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-height: 40px;
                    line-height: 1.15;
                    padding: ${theme.spacing}px;
                    border-bottom: 2px solid ${theme.color.paper};
                    text-transform: uppercase;
                    color: ${theme.color.text};
                    font-size: ${theme.fontSize.h5}px;
                }

                .circle {
                    flex: 0 0 auto;
                    display: inline-block;
                    vertical-align: text-bottom;
                    background-color: ${theme.color.primary};
                    height: ${theme.spacing}px;
                    width: ${theme.spacing}px;
                    border-radius: 50%;
                }

                .HeadingText {
                    vertical-align: center;
                    margin-left: ${theme.spacing / 2}px;
                    font-weight: bold;
                }

                .navGroup {
                    flex: 1 1 auto;
                    display: block;
                    overflow: auto;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
            `}</style>
            {appName && (
                <Heading className="Heading">
                    <span className="circle" />
                    <span className="HeadingText">{appName}</span>
                </Heading>
            )}
            <ul className="navGroup s-menu">
                {routes
                    .filter((route) => route.omitFromMenu !== true)
                    .map((route) => (
                        <MenuItem key={route.path} {...route} />
                    ))}
            </ul>
        </div>
    );
};

export default Menu;
