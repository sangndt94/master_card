// (C) 2007-2020 GoodData Corporation
import React, { FC } from "react";
import Page from "../components/utils/Page";
import {
    SGColor,
    SGButtons,
    SGBody,
    SGContextMenu,
    SGFilters,
    SGHeadline,
    SGInputs,
    SGIcons,
    SGNavigation,
    SGTypography,
    SGHeatmaps,
    SGCommunication,
} from "../components/styleGuide";
import CustomSwitch from "./CustomSwitch";

export const styleGuideRoutes = [
    { path: "/style-guide/typography", component: SGTypography, title: "Typography" },
    { path: "/style-guide/color", component: SGColor, title: "Colors" },
    { path: "/style-guide/buttons", component: SGButtons, title: "Buttons" },
    { path: "/style-guide/inputs", component: SGInputs, title: "Inputs" },
    { path: "/style-guide/headline", component: SGHeadline, title: "Headline" },
    { path: "/style-guide/context-menu", component: SGContextMenu, title: "Context Menu" },
    { path: "/style-guide/filters", component: SGFilters, title: "Filters" },
    { path: "/style-guide/icons", component: SGIcons, title: "Icons" },
    { path: "/style-guide/heatmaps", component: SGHeatmaps, title: "Heatmaps" },
    { path: "/style-guide/communication", component: SGCommunication, title: "Communication" },
];

export const StyleGuideRoutes: FC = () => (
    <Page>
        <SGNavigation routes={styleGuideRoutes} />
        <SGBody>
            <CustomSwitch routes={styleGuideRoutes} />
        </SGBody>
    </Page>
);

export default StyleGuideRoutes;
