// (C) 2019 GoodData Corporation
import React, { useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import cx from "classnames";
import css from "styled-jsx/css";
import Select from "react-select";
import HeaderLinks from "./HeaderLinks";
import Link from "./Link";
import theme from "../../utils/theme";
import Input from "./Input";
import { ACQUIRER_VIEW, ISSUER_VIEW } from "../../constants";
import ButtonLink from "./ButtonLink";
import CustomLoading from "./CustomLoading";
import { useAuth } from "../../contexts/AuthContext";
import Heading from "./Heading";
import appIcon from "../../static/app-icon.svg";
import { IconTip } from "../icon";
import Feature from "../../featureFlags/Feature";
import { IAppMeta } from "../../types";
import Typography from "./Typography";
import { css as cssEmotion } from "emotion";
import { InfoBanner } from "./infoBanner";
import styleGuide from "../styleGuide/styleGuide";

export interface ITileProps extends Pick<IAppMeta, "imagePath"> {
    projectIdentifier: string;
    label: string;
    title: string;
    href: string;
    callToAction?: string;
}

const classes = {
    title: cssEmotion({
        minHeight: "2.3em",
        margin: "0px",
        padding: `${theme.spacing}px 0px ${theme.spacing}px ${theme.spacing / 2}px`,
        fontWeight: "bold",
    }),
    label: cssEmotion({
        color: `${theme.color.label}`,
        padding: "16px 0px 10px 16px",
    }),
    callToAction: cssEmotion({
        padding: `${theme.spacing}px 0px ${theme.spacing}px 0px`,
        color: `${theme.color.primaryLighter}`,
        textAlign: "center",
    }),
    infoBanner: cssEmotion({
        marginBottom: `${styleGuide.spacing(3)}`,
    }),
};

const infoBannerCookie = {
    name: "dashboardsInfoBannerClosed",
    expirationTime: 16 / 24, // 16 hours
};

export const Tile: React.FC<ITileProps> = ({
    projectIdentifier,
    title,
    href,
    callToAction = "View",
    imagePath,
}) => {
    const { className, styles } = css.resolve`
        a {
            background: transparent;
            color: inherit;
            font-family: inherit;
            font-weight: normal;
            text-decoration: none;
            border: 0;
            padding: 0;
            cursor: pointer;
        }
        a:hover {
            color: inherit;
            text-decoration: none;
        }
    `;

    return (
        <li className="wrapper">
            {/* language=CSS */}
            <style jsx>{`
                .wrapper {
                    position: relative;
                    width: 180px;
                    height: 250px;
                    margin: ${theme.spacing / 2}px;
                }
                .Tile {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    bottom: 0px;
                    left: 0px;
                    background-color: ${theme.color.paperLight};
                    color: ${theme.color.text};
                    border-radius: ${theme.borderRadius}px;
                    border-top: 8px solid ${theme.color.secondary};
                    box-shadow: ${theme.shadowLow};
                    transition: top ${theme.transformationFast}, bottom ${theme.transformationFast},
                        box-shadow ${theme.transformationFast}, background-size ${theme.transformationFast};
                }
                .Tile:hover {
                    top: -${theme.spacing / 2}px;
                    bottom: -${theme.spacing / 2}px;
                    box-shadow: ${theme.shadowHigh};
                }
                .Tile:hover .image {
                    background-size: contain;
                }
                .tileContent {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                }
                .image {
                    flex: 1 1 auto;
                    padding: ${theme.spacing}px;
                    background-attachment: scroll;
                    background-color: ${imagePath ? theme.color.newPaperDark : theme.color.paperDark};
                    background-image: url(${imagePath ? imagePath : appIcon});
                    background-origin: content-box;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    box-sizing: content-box;
                    transition: background-size ${theme.transformationFast};
                    box-shadow: ${theme.shadowLow};
                    height: 110px;
                }
                .default-image {
                    flex: 1 1 auto;
                    padding: ${theme.spacing * 1.5}px;
                    background-attachment: scroll;
                    background-color: #f2edea;
                    background-image: url(${appIcon});
                    background-origin: content-box;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    transition: background-size ${theme.transformationFast};
                    box-shadow: ${theme.shadowLow};
                }
            `}</style>
            {styles}
            <div className={cx("Tile", `s-${projectIdentifier}`)}>
                <Link to={href} href={href} className={className}>
                    <div className="tileContent">
                        <Typography variant="label" Component="h2" className={classes.title}>
                            {title}
                        </Typography>
                        <Feature flag="newAppPickerIcons" value={true}>
                            <div className="image" />
                        </Feature>
                        <Feature flag="newAppPickerIcons" value={false}>
                            <div className="default-image" />
                        </Feature>
                        <Typography variant="button" Component="div" className={classes.callToAction}>
                            {callToAction}
                        </Typography>
                    </div>
                </Link>
            </div>
        </li>
    );
};

export const filterTiles = (tileDefinitions = [], projects = [], selectedViewOption, textFilter = "") => {
    return tileDefinitions.filter(
        (tile) =>
            tile.isShown(projects) &&
            tile.types.includes(selectedViewOption.value) &&
            (textFilter.trim() === "" || tile.title.toLowerCase().includes(textFilter.toLowerCase())),
    );
};

export const findBestOption = (tileDefinitions = [], projects = [], options, textFilter = "") => {
    const best = { count: -1, option: null };
    options.forEach((option) => {
        const availableTiles = tileDefinitions.filter(
            (tile) =>
                tile.isShown(projects) &&
                tile.types.includes(option.value) &&
                (textFilter.trim() === "" || tile.title.toLowerCase().includes(textFilter.toLowerCase())),
        );
        if (availableTiles.length > best.count) {
            best.count = availableTiles.length;
            best.option = option;
        }
    });
    return best.option;
};

const AppPickerBody = ({
    authState,
    viewOptions,
    selectedViewOption,
    setSelectedViewOption,
    textFilter,
    setTextFilter,
    availableTiles,
}) => {
    const [, forceRerender] = useState();
    const onInfoBannerClose = useCallback(() => {
        Cookie.set(infoBannerCookie.name, "true", {
            expires: infoBannerCookie.expirationTime,
        });
        forceRerender(null);
    }, []);
    const loginLink = (
        <Link to="/login" href="/login">
            Login
        </Link>
    );
    const logoutButton = <ButtonLink onClick={authState.logout}>Logout</ButtonLink>;
    const loading = <CustomLoading imageHeight="1em" inline />;

    const hasNoPermission = availableTiles.length === 0 && textFilter.trim() === "";
    const isNotFound = availableTiles.length === 0 && textFilter.trim() !== "";
    const hasTiles = availableTiles.length > 0;

    return (
        <div className="AppPicker">
            {/* language=CSS */}
            <style jsx>{`
                .AppPicker {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    position: relative;
                    height: 40px;
                    flex: 0 0 auto;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: ${theme.spacing}px;
                    background-color: ${theme.color.box};
                    box-shadow: ${theme.shadowLow};
                    margin: 0;
                    z-index: 1;
                }
                .header :global(.link) {
                    color: ${theme.color.textLighter};
                    font-weight: bold;
                    text-decoration: none;
                }
                .header :global(.link:hover, .link:active) {
                    color: ${theme.color.primary};
                }
                .controls {
                    margin-left: ${theme.spacing}px;
                    white-space: nowrap;
                }
                .controls > :global(.homeLink) {
                    background-color: ${theme.color.link};
                    color: #fff;
                    padding: ${theme.spacing / 4}px ${theme.spacing / 2}px;
                    border-radius: ${theme.borderRadius}px;
                }
                .body {
                    display: flex;
                    flex-direction: row;
                    flex: 1 1 auto;
                    padding: ${theme.spacing * 2}px ${theme.spacing * 1.5}px;
                    overflow: auto;
                }
                .body :global(.textFilter) {
                    margin-top: ${theme.spacing}px;
                }
                h1 {
                    font-weight: 600;
                    margin: 0 0 ${theme.spacing}px 0;
                    line-height: 1.5;
                }
                .filters {
                    width: 220px;
                    flex: 0 0 auto;
                    margin-top: ${theme.spacing / 2}px;
                }
                .filters > :global(.FilterHeading) {
                    line-height: 1.15;
                    text-transform: uppercase;
                    color: ${theme.color.text};
                    font-size: ${theme.fontSize.h5}px;
                    margin: 0 0 ${theme.spacing / 2}px;
                }
                .rule {
                    width: 2px;
                    background-color: ${theme.color.borderLight};
                    margin: 0 ${theme.spacing * 1.5}px;
                }
                .tiles {
                    flex: 1 1 auto;
                    height: 100%;
                    padding: ${theme.spacing * 2}px ${theme.spacing * 1.5}px;
                    margin: ${-theme.spacing * 2}px ${-theme.spacing * 1.5}px;
                    overflow: auto;
                }
                .tileList {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    list-style-type: none;
                    padding: 0;
                    margin: ${-theme.spacing / 2}px;
                }
                .tileMessage {
                    flex: 1 1 auto;
                    margin: ${theme.spacing}px;
                    color: ${theme.color.textLightest};
                }
                .tip {
                    flex: 1 1 auto;
                    display: flex;
                    flex-direction: row;
                    padding: ${theme.spacing}px;
                    margin: ${theme.spacing}px;
                    color: ${theme.color.textLightest};
                    align-items: center;
                    box-shadow: ${theme.shadowLow};
                    border-radius: ${theme.borderRadius}px;
                    background-color: rgba(255, 255, 255, 0.5);
                    box-sizing: border-box;
                    margin: ${theme.spacing * 2}px 0 0 0;
                    max-width: ${281 * 2 + theme.spacing * 2}px;
                }
                .tip svg {
                    flex: 0 0 auto;
                    height: 50px;
                }
                .tip p {
                    flex: 1 1 auto;
                    margin-left: ${theme.spacing}px;
                }
            `}</style>
            <div className="header">
                <Heading>My Insights</Heading>
                <HeaderLinks showSwitchDashboard={false} />
                <div className="controls">
                    {authState.isLoading && loading}
                    {/* Login and logout only available in development to circumvent problem with local cookies */}
                    {!authState.isLoading &&
                        authState.data &&
                        process.env.NODE_ENV !== "production" &&
                        logoutButton}
                    {!authState.isLoading &&
                        !authState.data &&
                        process.env.NODE_ENV !== "production" &&
                        loginLink}
                </div>
            </div>

            <div className="body">
                <div className="filters">
                    <Heading className="FilterHeading" level={2}>
                        Role
                    </Heading>
                    <Select
                        className="s-role"
                        options={viewOptions}
                        value={selectedViewOption}
                        onChange={(value) => setSelectedViewOption(value)}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                borderColor: theme.color.borderLight,
                            }),
                        }}
                    />
                    <Input
                        className="textFilter"
                        value={textFilter}
                        onChange={setTextFilter}
                        placeholder="Search"
                    />
                </div>
                <div className="rule" />
                <div className="tiles">
                    <h1>Dashboards</h1>
                    {!Cookie.get(infoBannerCookie.name) && (
                        <InfoBanner className={classes.infoBanner} onClose={onInfoBannerClose}>
                            Credential on File – This new dashboard available to Premium customers will
                            highlight high level monthly trends and analysis for the performance of Credential
                            on file at the point of sale.
                        </InfoBanner>
                    )}
                    <ul className="tileList">
                        {hasNoPermission && (
                            <li className="tileMessage">
                                <p>
                                    There are no Dashboards in the selected category &quot;
                                    {selectedViewOption && selectedViewOption.label}&quot;. Permission needed.
                                </p>
                            </li>
                        )}
                        {isNotFound && (
                            <li className="tileMessage">
                                <p>There are no Dashboards matching your search &quot;{textFilter}&quot;.</p>
                            </li>
                        )}
                        {availableTiles.map((tile) => (
                            <Tile
                                projectIdentifier={tile.projectIdentifier}
                                key={tile.route}
                                href={tile.route}
                                label="dashboard"
                                title={tile.title}
                                imagePath={tile.imagePath}
                            />
                        ))}
                    </ul>
                    {hasTiles && (
                        <div className="tileMessage tip">
                            <IconTip />{" "}
                            <p>
                                You can click on an interactive chart legend in order to get a more focused
                                view.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const viewOptions = [
    { label: "Issuer View", value: ISSUER_VIEW },
    { label: "Acquirer View", value: ACQUIRER_VIEW },
];

const AppPicker = ({ projects, tileDefinitions, selectedViewOption = null, setSelectedViewOption }) => {
    const [textFilter, setTextFilter] = useState("");
    const authState = useAuth();

    useEffect(() => {
        if (selectedViewOption === null && tileDefinitions.length > 0) {
            const bestOption = findBestOption(tileDefinitions, projects, viewOptions);
            setSelectedViewOption(bestOption);
        }
    }, [tileDefinitions, selectedViewOption]);

    const availableTiles = selectedViewOption
        ? filterTiles(tileDefinitions, projects, selectedViewOption, textFilter)
        : [];

    return (
        <AppPickerBody
            authState={authState}
            viewOptions={viewOptions}
            selectedViewOption={selectedViewOption}
            setSelectedViewOption={setSelectedViewOption}
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            availableTiles={availableTiles}
        />
    );
};

export default AppPicker;
