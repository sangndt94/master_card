// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Link from "../../components/controls/Link";
import styleGuide from "./styleGuide";
import { IRouteDefinition } from "../../types";
import Typography from "../utils/Typography";
import { css, cx } from "emotion";

const classes = {
    active: css({
        color: styleGuide.color.hover,
    }),
    link: css({
        textTransform: "uppercase",
        margin: styleGuide.spacing(1),
    }),
    appPickerLink: css({
        flex: "1 1 auto",
        textAlign: "right",
    }),
    SGNavigation: css({
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: styleGuide.spacing(3),
        backgroundColor: styleGuide.color.headerBackground,
    }),
};

const SGLink = ({ children, className, navigate, ...restProps }) => {
    return (
        <Typography variant="link" Component="a" {...restProps} className={cx(className, classes.link)}>
            {children}
        </Typography>
    );
};
export const SGNavigation: FC<{
    routes: IRouteDefinition[];
    className?: string;
}> = ({ className, routes, ...restProps }) => {
    return (
        <div className={cx(classes.SGNavigation, className, "s-sg-navigation")} {...restProps}>
            {routes.map(({ path, title }) => (
                <NavLink
                    key={path}
                    to={path}
                    component={SGLink}
                    activeClassName={classes.active}
                    className="s-style-guide-menu-item"
                >
                    {title}
                </NavLink>
            ))}

            <div className={classes.appPickerLink}>
                <Link to="/">App Picker</Link>
            </div>
        </div>
    );
};
