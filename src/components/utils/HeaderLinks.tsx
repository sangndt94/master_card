// (C) 2020 GoodData Corporation
import React from "react";
import styleGuide from "../styleGuide/styleGuide";
import { css, cx } from "emotion";
import { IconGlossary } from "../icon";
import { useLocation } from "react-router-dom";
import Link from "../controls/Link";

const classes = {
    headerLinks: css({
        marginLeft: "auto",
    }),
    headerLink: css({
        marginLeft: styleGuide.spacing(2),
    }),
};

const HeaderLinks: React.FC<{ showSwitchDashboard?: boolean }> = ({ showSwitchDashboard = true }) => {
    const location = useLocation();
    return (
        <div className={classes.headerLinks}>
            <Link
                to={`${location.pathname === "/" ? "" : location.pathname}/glossary/glossary`}
                variant="text"
                className={cx(classes.headerLink, "s-glossary-link")}
            >
                Glossary&ensp;
                <IconGlossary height="1.25em" width="1.58em" verticalAlign="text-bottom" />
            </Link>
            {showSwitchDashboard && (
                <Link to="/" className={classes.headerLink}>
                    Switch Dashboard
                </Link>
            )}
        </div>
    );
};

export default HeaderLinks;
