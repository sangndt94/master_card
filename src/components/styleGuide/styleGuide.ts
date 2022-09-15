// (C) 2007-2020 GoodData Corporation
import { CSSProperties } from "@material-ui/styles";
const spacingUnit = 8;
const spacing = (...counts) => counts.map((count) => `${count * spacingUnit}px`).join(" ");

export const borderRadius = 4;

const color = {
    main: "#E87600",
    hover: "#FFB440",
    black: "#141413",
    product: "#378F7B",
    mainBackground: "#FAF9F7",
    footerFill: "#EBE7E1",
    headerBackground: "#EBE7E1",
    notificationBanner: "#F8B966",
    icons: "#CECECE",
    highlight: "#FFC81F",
    textMain: "#555555",
    textSecondary: "#8F8F8F",
    textFieldFiller: "#BFBBB3",
    textMuted: "#C3C3C3",
    inputDisabledFill: "#F7F7F7",
    border: "#CCCCCC",
    borderMuted: "#DEDEDE",
    tableRows: "#E1DCD4",
    bodyBackground: "#F0EDE9",
    success: "#00C18D",
    alert: "#CC0000",
    positive: "#628020",
    negative: "#D7373D",
    white: "#ffffff",
    goodDataErrorColor: "#94a1ad",
    info: "#4A90E2",
    infoActive: "#69A4E9",
};

export const colorDescriptions: Partial<{ [key in keyof typeof color]: string }> = {
    main: "‘Main’ orange, all links and clickables",
    hover: "Hover or active button background",
    black: "MC Black",
    mainBackground: "Main Background",
    footerFill: "Footer Fill",
    headerBackground: "Header Background",
    notificationBanner: "descriptive name",
    icons: "icons",
    highlight: "Highlight Color",
    textMain: "Main Text",
    textSecondary: "Secondary Card Text/Secondary Table Headers",
    textFieldFiller: "Field Filler Text, Grayed Out Text",
    textMuted: "Text that is not important or disabled",
    inputDisabledFill: "Disabled input background",
    tableRows: "Table Rows",
    bodyBackground: "Dashboard background",
    alert: "Alert",
    positive: "Used in the charts to indicate positive indicators such as rains",
    negative: "Used in the charts to indicate negative indicators such as losses, declines",
};

export const visualizationColor: Array<CSSProperties["color"]> = [
    "#25836D",
    "#777470",
    "#F38B00",
    "#FFC61E",
    "#AC0BD0",
    "#D00892",
    "#0023CF",
];

export const colorGradient: {
    [key: string]: { [key in "main" | 0 | 1 | 2 | 3 | 4 | 5 | 6]: CSSProperties["color"] };
} = {
    orange: {
        main: "#CF4600",
        0: "#FFE1D1",
        1: "#FFAB82",
        2: "#F37338",
        3: "#CF4600",
        4: "#9A3A0A",
        5: "#662808",
        6: "#331505",
    },
    gold: {
        main: "#F38B00",
        0: "#FCE8CC",
        1: "#F9D199",
        2: "#F7AD4C",
        3: "#F38B00",
        4: "#995600",
        5: "#583300",
        6: "#301C00",
    },
    yellow: {
        main: "#FFC61E",
        0: "#FFF4D1",
        1: "#FFEBA5",
        2: "#FFD863",
        3: "#FFC61E",
        4: "#B28C16",
        5: "#664F0C",
        6: "#332805",
    },
    green: {
        main: "#628020",
        0: "#E6F2D2",
        1: "#B7CD7E",
        2: "#86A740",
        3: "#628020",
        4: "#496019",
        5: "#324113",
        6: "#1C2509",
    },
    red: {
        main: "#D7373D",
        0: "#FFDBDF",
        1: "#F4A79F",
        2: "#E66F65",
        3: "#D7373D",
        4: "#A92226",
        5: "#7E191D",
        6: "#541214",
    },
    teal: {
        main: "#26836D",
        0: "#DCF5EF",
        1: "#88D3BF",
        2: "#4BAB94",
        3: "#26836D",
        4: "#276455",
        5: "#23473D",
        6: "#1D2C27",
    },
};

const fontFamily: CSSProperties["fontFamily"] = "MarkForMC, Avenir, Lato, Helvetica, Arial, sans-serif";

const fontWeight: { [key: string]: CSSProperties["fontWeight"] } = {
    bold: 700,
    medium: 500,
    regular: 400,
    light: 300,
};

export type TypographyVariant =
    | "menuGroupTitle"
    | "productTitle"
    | "section"
    | "caption"
    | "kpiCaption"
    | "label"
    | "button"
    | "body"
    | "subtitle"
    | "underLine"
    | "link"
    | "kpi";

const fontSize: { [key in TypographyVariant]?: number } = {
    kpi: 40,
    menuGroupTitle: 24,
    productTitle: 18,
    section: 18,
    caption: 16,
    kpiCaption: 16,
    label: 14,
    button: 14,
    body: 14,
    subtitle: 12,
    underLine: 10,
};

const lineHeight: { [key in TypographyVariant]?: CSSProperties["lineHeight"] } = {
    kpi: "50px",
    menuGroupTitle: "28px",
    productTitle: "22px",
    section: "22px",
    caption: "20px",
    kpiCaption: "20px",
    label: "18px",
    button: "14px",
    body: "18px",
    subtitle: "14px",
    underLine: "12px",
};

type FontColor = "muted" | "main" | "secondary" | "hover" | "link" | "alert" | "product";

const fontColor: { [key in FontColor]: CSSProperties["color"] } = {
    muted: color.textMuted,
    main: color.textMain,
    secondary: color.textSecondary,
    hover: color.hover,
    link: color.main,
    alert: color.alert,
    product: color.product,
};

const shadow = {
    low: `0 3px 5px rgba(0, 0, 0, 0.2)`,
} as const;

const variant: { [key in TypographyVariant]: CSSProperties } = {
    kpi: {
        fontFamily,
        fontSize: fontSize.kpi,
        lineHeight: lineHeight.kpi,
        fontWeight: fontWeight.bold,
    },
    menuGroupTitle: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.menuGroupTitle,
        lineHeight: lineHeight.menuGroupTitle,
        fontWeight: fontWeight.medium,
    },
    productTitle: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.productTitle,
        lineHeight: lineHeight.productTitle,
        fontWeight: fontWeight.regular,
    },
    section: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.section,
        lineHeight: lineHeight.section,
        fontWeight: fontWeight.bold,
        textTransform: "uppercase",
    },
    caption: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.caption,
        lineHeight: lineHeight.caption,
        fontWeight: fontWeight.bold,
        textTransform: "uppercase",
    },
    kpiCaption: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.kpiCaption,
        lineHeight: lineHeight.kpiCaption,
        fontWeight: fontWeight.bold,
    },
    label: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.label,
        lineHeight: lineHeight.label,
        fontWeight: fontWeight.regular,
    },
    button: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.button,
        lineHeight: lineHeight.button,
        fontWeight: fontWeight.regular,
    },
    body: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.body,
        lineHeight: lineHeight.body,
        fontWeight: fontWeight.regular,
    },
    subtitle: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.subtitle,
        lineHeight: lineHeight.subtitle,
        fontWeight: fontWeight.regular,
    },
    underLine: {
        color: fontColor.main,
        fontFamily,
        fontSize: fontSize.underLine,
        lineHeight: lineHeight.underLine,
        fontWeight: fontWeight.regular,
    },
    link: {
        color: fontColor.link,
        fontWeight: fontWeight.regular,
        textDecoration: "none",
        "&:hover, &:focus": {
            color: fontColor.hover,
            textDecoration: "none",
        },
    },
};

export const typography = {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    color: fontColor,
    variant,
};

export default {
    spacing,
    spacingUnit,
    color,
    visualizationColor,
    colorGradient,
    typography,
    borderRadius,
    shadow,
};
