// (C) 2007-2020 GoodData Corporation
import { IAuth } from "../../contexts/AuthContext";

export interface IUserStatusData {
    userId: string;
}

export interface IPageViewData {
    path: string;
    title: string;
    type?: string;
}

export interface IDataLayer {
    event: string;
    isGoodData: string;
    userStatusData: IUserStatusData;
    eventCategory?: string;
    eventAction?: string;
    eventLabel?: string;
    page?: IPageViewData;
}

const scriptWrapper = (content: string) => {
    const script = document.createElement("script");
    script.insertAdjacentHTML("beforeend", content);
    return script;
};

const noScriptSnippet = (gtmId: string) => {
    const noscript = document.createElement("noscript");
    noscript.insertAdjacentHTML(
        "beforeend",
        `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    );
    return noscript;
};

const initScriptSnippet = (gtmId: string, dataLayerName: string = "dataLayer") => {
    return scriptWrapper(`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','${dataLayerName}','${gtmId}');`);
};

const dataLayerSnippet = (dataLayer: IDataLayer, dataLayerName: string = "dataLayer") => {
    return scriptWrapper(`window.${dataLayerName} = window.${dataLayerName} || [];
                          window.${dataLayerName}.push(${JSON.stringify(dataLayer)});`);
};

export const initialize = (
    gtmId: string,
    dataLayer: IDataLayer | undefined = undefined,
    dataLayerName: string = "dataLayer",
) => {
    if (dataLayer) {
        document.head.appendChild(dataLayerSnippet(dataLayer, dataLayerName));
    }

    document.head.insertBefore(initScriptSnippet(gtmId, dataLayerName), document.head.childNodes[0]);
    document.body.insertBefore(noScriptSnippet(gtmId), document.body.childNodes[0]);
};

export const dataLayer = (dataLayer: IDataLayer, dataLayerName: string = "dataLayer") => {
    if (window[dataLayerName]) {
        window[dataLayerName].push(dataLayer);
    } else {
        document.head.appendChild(dataLayerSnippet(dataLayer, dataLayerName));
    }
};

export const userData = (user: IAuth) => {
    return {
        isGoodData: user.login.endsWith("@gooddata.com") ? "yes" : "no",
        userStatusData: {
            userId: user.loginMD5,
        },
    };
};
