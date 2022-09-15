// (C) 2020 GoodData Corporation
import React, { useState } from "react";
import { css, cx } from "emotion";
import { Route, useRouteMatch } from "react-router-dom";
import { IconGlossary, IconSearch, IconClose } from "../icon";
import Heading from "../utils/Heading";
import theme from "../../utils/theme";
import { glossaryRoutes } from "./routes/routes";
import MenuItem from "../utils/MenuItem";
import CustomSwitch from "../../routes/CustomSwitch";
import Link from "../controls/Link";
import styleGuide from "../styleGuide/styleGuide";
import SearchResult from "./SearchResult";
import { glossaryContent } from "./GlossaryContent";
import DashboardContent from "../dashboardBlocks/DashboardContent";
import Input from "../controls/Input";

const classes = {
    navWrapper: css({
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: `${theme.menuWidth}px`,
        margin: 0,
        padding: 0,
        background: theme.color.box,
        color: theme.color.text,
        zIndex: 40,
        boxShadow: theme.shadowLow,
    }),
    heading: css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minHeight: "40px",
        lineHeight: 1.15,
        padding: `${theme.spacing}px`,
        borderBottom: `2px solid ${theme.color.paper}`,
        textTransform: "uppercase",
        color: `${theme.color.text}`,
    }),
    headingText: css({
        verticalAlign: "center",
        marginLeft: `${theme.spacing / 2}px`,
        fontWeight: "bold",
    }),
    navGroup: css({
        flex: "1 1 auto",
        display: "block",
        overflow: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
    }),
    glossary: css({
        position: "absolute",
        left: 0,
        width: "100vw",
        top: 0,
        height: "100vh",
        backgroundColor: styleGuide.color.bodyBackground,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "stretch",
    }),
    content: css({
        width: "100vw",
        height: "100vh",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
    }),
    header: css({
        position: "relative",
        boxSizing: "border-box",
        width: `calc(100vw - 250px)`,
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: `${theme.spacing / 2}px ${theme.spacing}px`,
        backgroundColor: theme.color.box,
        margin: 0,
        zIndex: 30,
        boxShadow: styleGuide.shadow.low,
    }),
    searchInput: css({
        margin: styleGuide.spacing(1),
    }),
    searchInputActive: css({
        // we are using !important here because of mixing makeStyles and emotion
        borderColor: `${styleGuide.color.main} !important`,
    }),
    searchCloseIcon: css({
        height: "1em !important",
        width: "1em !important",
    }),
    control: css({
        marginLeft: styleGuide.spacing(2),
    }),
};

const Glossary: React.FC<{ showBackLink?: boolean }> = ({ showBackLink = true }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { url } = useRouteMatch();

    const normalizedUrl = url === "/" ? "" : url;

    const currentGlossaryRoutes = glossaryRoutes.map((route) => ({
        ...route,
        path: `${normalizedUrl}${route.path}`,
    }));

    const scrollToTop = () => (document.querySelector(".glossary-content").scrollTop = 0);

    const resetSearchQuery = () => {
        setSearchQuery("");
        scrollToTop();
    };

    return (
        <Route path={`${normalizedUrl}/glossary`}>
            <div className={cx(classes.glossary, "s-glossary")}>
                <div className={classes.navWrapper}>
                    <Heading className={classes.heading} level={5}>
                        <IconGlossary
                            height="1.25em"
                            width="1.58em"
                            verticalAlign="text-bottom"
                            color={styleGuide.color.main}
                        />
                        <span className={classes.headingText}>Glossary</span>
                    </Heading>
                    <Input
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            scrollToTop();
                        }}
                        placeholder="Search"
                        className={classes.searchInput}
                        inputClassName={cx(searchQuery && classes.searchInputActive, "s-search-input")}
                        Icon={searchQuery ? IconClose : IconSearch}
                        onIconClick={searchQuery ? () => setSearchQuery("") : undefined}
                        iconClassName={searchQuery && classes.searchCloseIcon}
                    />
                    <ul className={cx(classes.navGroup, "s-glossary-menu")}>
                        {currentGlossaryRoutes
                            .filter((route) => route.omitFromMenu !== true)
                            .map((route) => (
                                <MenuItem onClick={() => resetSearchQuery()} key={route.path} {...route} />
                            ))}
                    </ul>
                </div>
                <main className={classes.content}>
                    <div className={classes.header}>
                        <Link
                            to="/"
                            variant={showBackLink ? "text" : "solid"}
                            textVariant={showBackLink ? "link" : "button"}
                            className={cx(classes.control, "s-switch-dashboard")}
                        >
                            {`${showBackLink ? "Switch" : "Pick"} Dashboard`}
                        </Link>
                        {showBackLink && (
                            <Link
                                to={url}
                                textVariant="button"
                                className={cx(classes.control, "s-back-dashboard")}
                            >
                                Back to Dashboard
                            </Link>
                        )}
                    </div>
                    <DashboardContent className="glossary-content">
                        {searchQuery ? (
                            <SearchResult
                                glossaryContent={glossaryContent}
                                searchQuery={searchQuery.toLowerCase()}
                                resetSearchQuery={resetSearchQuery}
                            />
                        ) : (
                            <CustomSwitch routes={currentGlossaryRoutes} />
                        )}
                    </DashboardContent>
                </main>
            </div>
        </Route>
    );
};

export default Glossary;
