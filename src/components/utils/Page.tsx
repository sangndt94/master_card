// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Helmet } from "react-helmet";
import Menu from "./Menu";
import theme from "../../utils/theme";
import { IRouteDefinition } from "../../types";
import { css as coreCss, Global } from "@emotion/core";
import { css } from "emotion";
import styleGuide from "../styleGuide/styleGuide";

// tslint:disable:no-var-requires
const MarkForMCEot = require("../../fonts/MarkForMC.eot");
const MarkForMCWoff2 = require("../../fonts/MarkForMC.woff2");
const MarkForMCWoff = require("../../fonts/MarkForMC.woff");
const MarkForMCTtf = require("../../fonts/MarkForMC.ttf");
const MarkForMCBoldEot = require("../../fonts/MarkForMC-Bold.eot");
const MarkForMCBoldWoff2 = require("../../fonts/MarkForMC-Bold.woff2");
const MarkForMCBoldWoff = require("../../fonts/MarkForMC-Bold.woff");
const MarkForMCBoldTtf = require("../../fonts/MarkForMC-Bold.ttf");
const MarkForMCLtEot = require("../../fonts/MarkForMC-Lt.eot");
const MarkForMCLtWoff2 = require("../../fonts/MarkForMC-Lt.woff2");
const MarkForMCLtWoff = require("../../fonts/MarkForMC-Lt.woff");
const MarkForMCLtTtf = require("../../fonts/MarkForMC-Lt.ttf");
const MarkForMCMedEot = require("../../fonts/MarkForMC-Med.eot");
const MarkForMCMedWoff2 = require("../../fonts/MarkForMC-Med.woff2");
const MarkForMCMedWoff = require("../../fonts/MarkForMC-Med.woff");
const MarkForMCMedTtf = require("../../fonts/MarkForMC-Med.ttf");
// tslint:enable:no-var-requires

const commonAppName = "FI";

interface IPageProps {
    routes?: IRouteDefinition[];
    title?: string;
    appName?: string;
}

const classes = {
    Page: css({
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "stretch",
    }),
    main: css({
        height: "100vh",
        width: "100%",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
    }),
};

const Page: React.FC<IPageProps> = ({ children, routes = [], title, appName }) => {
    const pageTitle = title ? [title, commonAppName].join(" | ") : commonAppName;

    const favicon = require("../../static/favicon.ico");

    return (
        <div className={classes.Page}>
            <Helmet>
                <title>{pageTitle}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="shortcut icon" type="image/x-icon" href={favicon} />
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap&subset=latin-ext"
                    rel="stylesheet"
                />
            </Helmet>
            <Global
                styles={coreCss`
                    @font-face {
                        font-family: "MarkForMC";
                        font-style: normal;
                        font-weight: 400;
                        src: url("${MarkForMCEot}");
                        src: url("${MarkForMCEot}")
                                format("embedded-opentype"),
                            url("${MarkForMCWoff2}")
                                format("woff2"),
                            url("${MarkForMCWoff}")
                                format("woff"),
                            url("${MarkForMCTtf}")
                                format("truetype");
                    }
                    @font-face {
                        font-family: "MarkForMC";
                        font-style: normal;
                        font-weight: 700;
                        src: url("${MarkForMCBoldEot}");
                        src: url("${MarkForMCBoldEot}")
                                format("embedded-opentype"),
                            url("${MarkForMCBoldWoff2}")
                                format("woff2"),
                            url("${MarkForMCBoldWoff}")
                                format("woff"),
                            url("${MarkForMCBoldTtf}")
                                format("truetype");
                    }

                    @font-face {
                        font-family: "MarkForMC";
                        font-style: normal;
                        font-weight: 300;
                        src: url("${MarkForMCLtEot}");
                        src: url("${MarkForMCLtEot}")
                                format("embedded-opentype"),
                            url("${MarkForMCLtWoff2}")
                                format("woff2"),
                            url("${MarkForMCLtWoff}")
                                format("woff"),
                            url("${MarkForMCLtTtf}")
                                format("truetype");
                    }

                    @font-face {
                        font-family: "MarkForMC";
                        font-style: normal;
                        font-weight: 500;
                        src: url("${MarkForMCMedEot}");
                        src: url("${MarkForMCMedEot}")
                                format("embedded-opentype"),
                            url("${MarkForMCMedWoff2}")
                                format("woff2"),
                            url("${MarkForMCMedWoff}")
                                format("woff"),
                            url("${MarkForMCMedTtf}")
                                format("truetype");
                    }

                    body {
                        overflow: hidden;
                        background-color: ${theme.color.paper};
                        min-height: 100vh;
                    }
                    body > .root {
                        min-height: 100vh;
                    }
                    body::-webkit-scrollbar {
                        display: none;
                    }
                    .gd-messages {
                        position: absolute;
                        top: 0px;
                        width: 1000px;
                    }
                    .gd-message-overlay.error {
                        background: ${styleGuide.color.alert}
                    }
                `}
            />
            {routes.length > 0 && <Menu routes={routes} appName={appName} />}
            <main className={classes.main}>{children}</main>
        </div>
    );
};

export default Page;
