// (C) 2007-2020 GoodData Corporation
import React from "react";

import theme from "../../utils/theme";
import { makeStyles } from "@material-ui/styles";
import styleGuide from "../styleGuide/styleGuide";
import HeaderLinks from "./HeaderLinks";

interface IHeaderProps {
    hasFilterBar?: boolean;
    children?: JSX.Element;
}

const useStyles = makeStyles<typeof styleGuide, IHeaderProps>({
    header: {
        position: "relative",
        boxSizing: "border-box",
        width: "calc(100vw - 250px)",
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${theme.spacing / 2}px ${theme.spacing}px`,
        backgroundColor: theme.color.box,
        margin: 0,
        zIndex: 30,
        boxShadow: ({ hasFilterBar }) => (hasFilterBar ? "none" : theme.shadowLow),
    },
    glossaryLink: {
        marginLeft: styleGuide.spacing(1),
        marginRight: styleGuide.spacing(1),
    },
    switchApp: {
        backgroundColor: styleGuide.color.main,
        color: "#fff",
        borderRadius: styleGuide.borderRadius,
        whiteSpace: "nowrap",
    },
});

const Header: React.FC<IHeaderProps> = (props) => {
    const { children = null } = props;
    const classes = useStyles(props);
    return (
        <div className={classes.header}>
            {children}
            <HeaderLinks />
        </div>
    );
};

export default Header;
