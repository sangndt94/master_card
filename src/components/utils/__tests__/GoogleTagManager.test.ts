// (C) 2020 GoodData Corporation
import { initialize, dataLayer } from "../GoogleTagManager";

// test order is important !
describe("GoogleTagManager", () => {
    it("should initialize push", () => {
        dataLayer({
            event: "test",
            isGoodData: "yes",
            userStatusData: {
                userId: "test",
            },
        });

        const expectedHead = document.createElement("script");
        expectedHead.insertAdjacentHTML(
            "beforeend",
            `window.dataLayer = window.dataLayer || [];
                          window.dataLayer.push({"event":"test","isGoodData":"yes","userStatusData":{"userId":"test"}});`,
        );

        expect(document.head.lastChild).toStrictEqual(expectedHead);
        expect(window[`dataLayer`].pop()).toStrictEqual({
            event: "test",
            isGoodData: "yes",
            userStatusData: {
                userId: "test",
            },
        });
    });

    it("should initialize GTM", () => {
        initialize("GTM-TEST");

        const expectedHead = document.createElement("script");
        expectedHead.src = "https://www.googletagmanager.com/gtm.js?id=GTM-TEST";

        const expectedBody = document.createElement("noscript");
        expectedBody.insertAdjacentHTML(
            "beforeend",
            `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TEST" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        );

        expect(document.head.firstChild).toStrictEqual(expectedHead);
        expect(document.body.firstChild).toStrictEqual(expectedBody);
    });

    it("should push event", () => {
        dataLayer({
            event: "test1",
            isGoodData: "yes",
            userStatusData: {
                userId: "test1",
            },
        });

        expect(window[`dataLayer`].pop()).toStrictEqual({
            event: "test1",
            isGoodData: "yes",
            userStatusData: {
                userId: "test1",
            },
        });
    });
});
