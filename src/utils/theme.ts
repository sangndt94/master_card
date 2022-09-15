// (C) 2019 GoodData Corporation
const positive = "#048c67";
const negative = "#e54d42";
const error = "#e54d42";
const grey = "#919191";
const greyLighter = "#f4f0f0";
const accent = "#b19057";
const gooddataBlue = "#15B1E2";
const deepDive = "#F0CE1B";

const grey1 = "#222221";
const grey2 = "#444340";
const grey3 = "#96918B";
const grey4 = "#B1ADA6";
const grey5 = "#CEC9C3";
const grey6 = "#E8E5E1";
const grey7 = "#F3F0EE";

const geoNeutral = grey6;
const geoGradientHigh = "#23473D";
const geoGradientLow = "#88D3BF";

const border = "#535050";
const borderLight = grey5;
const paper = "#f2edea";
const paperDark = "#F2EDEA";
const paperLight = "#fff";
const label = "#35857B";

const primary = "#f38b02";
const primaryLighter = "#F09F52";
const secondary = "#25836D";
const text = "#1a1513";
const textLighter = "#2f2e2f";
const textLightest = grey;

const box = "#fff";
const boxLink = grey4;
const boxLinkActive = "#535050";
const boxLinkHover = boxLinkActive;
const link = gooddataBlue;
const linkDarker = "#0f84a9";

const placeholderText = grey4;

const paperInverse = grey2;
const paperInverseDarker = grey1;
const textInverse = grey7;
const textInverseLighter = "#ffffff";
const filterLabel = "#6d7680";

const eur = "#4F6F18";
const ap = "#9A00C4";
const lac = "#0D00C3";
const mea = "#64615C";
const us = "#CD2734";
const can = "#ED7808";

const newPaperDark = "#FBF7F7";

const color = {
    primary,
    primaryLighter,
    secondary,
    gooddataBlue,
    deepDive,
    accent,
    positive,
    negative,
    geoGradientHigh,
    geoGradientLow,
    geoNeutral,
    error,
    border,
    borderLight,
    paperDark,
    paperLight,
    paper,
    label,
    filterLabel,
    paperInverse,
    paperInverseDarker,
    box,
    boxLink,
    boxLinkActive,
    boxLinkHover,
    link,
    linkDarker,
    text,
    textLighter,
    textLightest,
    textInverse,
    textInverseLighter,
    placeholderText,
    grey,
    greyLighter,
    grey1,
    grey2,
    grey3,
    grey4,
    grey5,
    grey6,
    grey7,
    eur,
    ap,
    lac,
    mea,
    us,
    can,
    newPaperDark,
};

const spacing = 16;
const body = 14;

const fontSize = {
    body,
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 16,
    h5: 14,
    kpi: 40,
};

const lineHeight = {
    body: 1.15,
    h1: 1.34,
    h2: 1.34,
    h3: 1.34,
    h4: 1.34,
    h5: 1.34,
    kpi: 0.8,
};

const bodyFont = 'Lato, "Helvetica Neue", arial, sans-serif';
const headingFont = bodyFont;

const theme = {
    spacing,
    color,
    font: {
        body: bodyFont,
        heading: headingFont,
    },
    fontSize,
    lineHeight,
    menuWidth: 250,
    borderRadius: 4,
    shadowLow: `0 3px 5px rgba(0, 0, 0, 0.2);`,
    shadowHigh: `0px ${spacing}px ${spacing}px 0px rgba(0, 0, 0, 0.1)`,
    transformationFast: "0.2s ease-in-out 0s",
};

export default theme;
