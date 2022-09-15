// (C) 2020 GoodData Corporation
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";

import { IContentGroup, IContentItem } from "../GlossaryContent";
import GlossaryCard, { testingInterface } from "../GlossaryCard";
import Typography from "../../utils/Typography";

const glossaryContentGroup: IContentGroup = {
    title: "Card 1",
    content: [
        {
            title: "Section 1",
            content: [
                {
                    htmlCode: "Subsection 1",
                    plainText: "Subsection 1",
                },
                {
                    htmlCode: "Subsection 2",
                    plainText: "Subsection 2",
                },
            ],
        },
        {
            htmlCode: "Subsection 3",
            plainText: "Subsection 3",
        },
    ],
};

const resetSearchQuery = jest.fn();

describe("GlossaryCard", () => {
    describe("transform", () => {
        const parse = (htmlCode: string) =>
            ReactHtmlParser(htmlCode, { transform: testingInterface.transform(resetSearchQuery) });

        it("should return the node when a generic node is passed", () => {
            const result = parse("<b>test</b>");
            const renderedResult = shallow(result[0]);

            expect(renderedResult.html()).toBe("<b>test</b>");
        });

        it("should return a link when a learnmore node is passed", () => {
            const result = parse("<learnmore>url</learnmore>");
            const renderedResult = mount(result[0]);

            expect(renderedResult.find("a")).toExist();
            expect(renderedResult.find("a").prop("href")).toBe("url");
            expect(renderedResult.find("Button")).toExist();
            expect(renderedResult.find("Button").text()).toContain("Learn more");
        });

        it("should return a link when a productdetails node is passed", () => {
            const result = parse("<productdetails>productpath</productdetails>");
            const renderedResult = mount(<MemoryRouter>{result[0]}</MemoryRouter>);

            expect(renderedResult.find("Link")).toExist();
            expect(renderedResult.find("Link").first().prop("to")).toBe("productpath");
            expect(renderedResult.find("Link").first().text()).toContain("Learn more");
        });
    });

    describe("renderContent", () => {
        it("should render content items", () => {
            const item: IContentItem = {
                htmlCode: "<b>Title</b> - Content",
                plainText: "Title - Content",
            };
            const result = testingInterface.renderContent(item, resetSearchQuery);
            const renderedResult = mount(<div>{result}</div>);

            expect(renderedResult.find(Typography)).toExist();
            expect(renderedResult.find(Typography).prop("variant")).toBe("label");
            expect(renderedResult.find(Typography).text()).toBe("Title - Content");
        });

        it("should render content groups", () => {
            const result = testingInterface.renderContent(glossaryContentGroup, resetSearchQuery);
            const renderedResult = mount(<div>{result}</div>);

            const typographies = renderedResult.find(Typography);

            expect(typographies.length).toBe(5);

            expect(typographies.at(0).text()).toBe("Card 1");
            expect(typographies.at(0).prop("variant")).toBe("section");
            expect(typographies.at(1).text()).toBe("Section 1");
            expect(typographies.at(1).prop("variant")).toBe("section");
            expect(typographies.at(2).text()).toBe("Subsection 1");
            expect(typographies.at(2).prop("variant")).toBe("label");
            expect(typographies.at(3).text()).toBe("Subsection 2");
            expect(typographies.at(3).prop("variant")).toBe("label");
            expect(typographies.at(4).text()).toBe("Subsection 3");
            expect(typographies.at(4).prop("variant")).toBe("label");
        });
    });

    describe("render", () => {
        it("should render glossary card", () => {
            const renderContent = jest.fn();
            const result = mount(<GlossaryCard contentGroup={glossaryContentGroup} render={renderContent} />);

            expect(result.find(".s-glossary-card")).toExist();
            expect(renderContent).toBeCalledTimes(2);
        });
    });
});
