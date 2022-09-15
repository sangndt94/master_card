// (C) 2019 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import { testingInterface, IMapProps } from "../Map";

const { getFill, getLimits, Map } = testingInterface;

describe("getFill", () => {
    const colorFrom = "#000000";
    const colorTo = "#ffffff";
    const defaultColor = "#ff0000";
    it("should return colorFrom if percent is less than or equal to minimum", () => {
        const value = -1;
        const minimum = 0;
        const maximum = 1;
        const actual = getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor);
        expect(actual).toEqual(colorFrom);
    });
    it("should return colorTo if percent is greater than or equal to maximum", () => {
        const value = 2;
        const minimum = 0;
        const maximum = 1;
        const actual = getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor);
        expect(actual).toEqual(colorTo);
    });
    it("should return a color between colorFrom and colorTo based on the value difference between minimum and maximum", () => {
        const value = 0.5;
        const minimum = 0;
        const maximum = 1;
        const actual = getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor);
        expect(actual).toEqual("#808080");
    });
    it("should return defaultColor if percent is null", () => {
        const value = null;
        const minimum = 0;
        const maximum = 1;
        const actual = getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor);
        expect(actual).toEqual(defaultColor);
    });
    it("should return 50% gradient color if maximum and minimum are equal", () => {
        const value = 1;
        const minimum = 1;
        const maximum = 1;
        const actual = getFill(value, minimum, maximum, colorFrom, colorTo, defaultColor);
        expect(actual).toEqual("#808080");
    });
});

describe("getLimits", () => {
    const data = { CZ: 1, US: 0, INVALID: 0 };
    const paths = {
        CZ: "M10,100L20,200",
        US: "M20,200L30,300",
        SK: "M0,0L50,500",
    };
    const width = 300;
    const height = 300;
    it("should return topLeft and bottomRight points of bounding rectangle around all paths in data", () => {
        const actual = getLimits(data, paths, width, height);
        expect(actual).toEqual({ topLeft: [10, 100], bottomRight: [30, 300] });
    });
});

describe("Map", () => {
    const data = { CZ: 1, US: 0 };
    const paths = {
        CZ: "M10,100L20,200",
        US: "M20,200L30,300",
        SK: "M0,0L50,500",
    };
    const colorFrom = "#000000";
    const colorTo = "#ffffff";
    const defaultColor = "#ff0000";
    const defaultWidth = 300;
    const defaultHeight = 300;

    const createMap = (customProps: Partial<IMapProps> = {}) => {
        const props: IMapProps = {
            data,
            paths,
            colorFrom,
            colorTo,
            defaultColor,
            defaultWidth,
            defaultHeight,
            measureFormat: "0.00",
            ...customProps,
        };
        return <Map {...props} />;
    };

    it("should render an SVG with all paths", () => {
        const wrapper = shallow(createMap());
        expect(wrapper.find(".s-CZ").exists()).toBe(true);
        expect(wrapper.find(".s-US").exists()).toBe(true);
        expect(wrapper.find(".s-SK").exists()).toBe(true);
    });

    it("should highlight paths with data", () => {
        const wrapper = shallow(createMap());
        expect(wrapper.find(".s-CZ").prop("fill")).toBe(colorTo);
        expect(wrapper.find(".s-US").prop("fill")).toBe(colorFrom);
    });

    it("should render paths without data in defaultColor", () => {
        const wrapper = shallow(createMap());
        expect(wrapper.find(".s-SK").prop("fill")).toBe(defaultColor);
    });

    it("should set viewBox to a boundary around data", () => {
        const wrapper = shallow(createMap());
        expect(wrapper.find("svg").prop("viewBox")).toBe("10 100 20 200");
    });

    it("should display formatted minimum and maximum values", () => {
        const wrapper = shallow(createMap());
        expect(wrapper.find(".s-minimum").text()).toBe("0.00");
        expect(wrapper.find(".s-maximum").text()).toBe("1.00");
    });

    it("should override minimum and maximum values", () => {
        const wrapper = shallow(
            createMap({
                overrideMinimum: -1,
                overrideMaximum: 2,
            }),
        );
        expect(wrapper.find(".s-minimum").text()).toBe("-1.00");
        expect(wrapper.find(".s-maximum").text()).toBe("2.00");
    });
});
