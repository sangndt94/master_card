// (C) 2020 GoodData Corporation
import { getColorStyle, parseTextWithColorFormat, parseData } from "../format";
import styleGuide from "../../components/styleGuide/styleGuide";

describe("getColorStyle", () => {
    it("should return an empty object if color is not specified", () => {
        const actual = getColorStyle("");
        expect(actual).toEqual({});
    });
    it("should return color style for specific color", () => {
        const actual = getColorStyle("color=ff0000");
        expect(actual).toEqual({
            color: "#ff0000",
        });
    });
    it("should return color style for generic color and map it to styleGuide", () => {
        const actual = getColorStyle("red");
        expect(actual).toEqual({
            color: styleGuide.color.negative,
        });
    });
});

describe("parseTextWithColorFormat", () => {
    it("should return an object with valueFormatted and valueStyle for text without color format", () => {
        const { valueFormatted, valueStyle } = parseTextWithColorFormat("100.00%");
        expect(valueFormatted).toBe("100.00%");
        expect(valueStyle).toEqual({});
    });
    it("should return an object with valueFormatted and valueStyle for text with color format", () => {
        const { valueFormatted, valueStyle } = parseTextWithColorFormat("[red]100.00%");
        expect(valueFormatted).toBe("100.00%");
        expect(valueStyle).toEqual({ color: styleGuide.color.negative });
    });
});

describe("parseData", () => {
    it("should return the data parameter as is if data is a number", () => {
        const actual = parseData(100);
        expect(actual).toBe(100);
    });
    it("should return the data parameter parsed as number if data is a string", () => {
        const actual = parseData("100");
        expect(actual).toBe(100);
    });
    it("should otherwise return null", () => {
        const actual = parseData(null);
        expect(actual).toBe(null);
    });
});
