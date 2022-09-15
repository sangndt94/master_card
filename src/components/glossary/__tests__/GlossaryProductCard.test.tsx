// (C) 2020 GoodData Corporation
import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import GlossaryProductCard, { testingInterface, ITableOfContentsItem } from "../GlossaryProductCard";

const tableOfContents: ITableOfContentsItem[] = [
    {
        title: "Title 1",
    },
    {
        title: "Title 2",
        sections: [
            {
                title: "Title 3",
                sections: [
                    {
                        title: "Title 4",
                    },
                    {
                        title: "Title 5",
                    },
                ],
            },
            {
                title: "Title 6",
            },
        ],
    },
];

describe("GlossaryProductCard", () => {
    describe("getCurrentSectionIndex", () => {
        it("should return the correct section index for a section with no parent", () => {
            const currentSectionIndex = testingInterface.getCurrentSectionIndex("", 2);

            expect(currentSectionIndex).toBe("2.");
        });

        it("should return the correct section index for a section with one ancestor", () => {
            const currentSectionIndex = testingInterface.getCurrentSectionIndex("2.", 1);

            expect(currentSectionIndex).toBe("2.1");
        });

        it("should return the correct section index for a section with multiple ancestors", () => {
            const currentSectionIndex = testingInterface.getCurrentSectionIndex("2.1", 4);

            expect(currentSectionIndex).toBe("2.1.4");
        });
    });

    describe("renderTable", () => {
        const setCollapseState = jest.fn();

        it("should correctly render a table of contents item without section", () => {
            const item: ITableOfContentsItem = {
                title: "Item Title",
            };

            const result = testingInterface.renderTable([item], 1, {}, setCollapseState);
            const renderedResult = mount(<MemoryRouter>{result}</MemoryRouter>);

            const navLinks = renderedResult.find("NavLink");
            expect(navLinks).toExist();
            expect(navLinks.length).toBe(1);
            expect(navLinks.first().prop("to")).toBe("#toc1-");
            expect(navLinks.first().text()).toContain("1.");
            expect(navLinks.first().text()).toContain("Item Title");

            expect(renderedResult.find(".s-glossary-chevron")).not.toExist();
        });

        it("should correctly render a table of contents", () => {
            const result = testingInterface.renderTable(tableOfContents, 1, {}, setCollapseState);
            const renderedResult = mount(<MemoryRouter>{result}</MemoryRouter>);

            const navLinks = renderedResult.find("NavLink");
            expect(navLinks).toExist();
            expect(navLinks.length).toBe(6);
            expect(navLinks.at(0).prop("to")).toBe("#toc1-");
            expect(navLinks.at(0).text()).toContain("1.");
            expect(navLinks.at(0).text()).toContain("Title 1");
            expect(navLinks.at(1).prop("to")).toBe("#toc2-");
            expect(navLinks.at(1).text()).toContain("2.");
            expect(navLinks.at(1).text()).toContain("Title 2");
            expect(navLinks.at(2).prop("to")).toBe("#toc2-1");
            expect(navLinks.at(2).text()).toContain("2.1");
            expect(navLinks.at(2).text()).toContain("Title 3");
            expect(navLinks.at(3).prop("to")).toBe("#toc2-1-1");
            expect(navLinks.at(3).text()).toContain("2.1.1");
            expect(navLinks.at(3).text()).toContain("Title 4");
            expect(navLinks.at(4).prop("to")).toBe("#toc2-1-2");
            expect(navLinks.at(4).text()).toContain("2.1.2");
            expect(navLinks.at(4).text()).toContain("Title 5");
            expect(navLinks.at(5).prop("to")).toBe("#toc2-2");
            expect(navLinks.at(5).text()).toContain("2.2");
            expect(navLinks.at(5).text()).toContain("Title 6");

            expect(renderedResult.find(".s-glossary-chevron").length).toBe(2);
        });

        it("should change collapse state on chevron click", () => {
            const result = testingInterface.renderTable(tableOfContents, 1, {}, setCollapseState);
            const renderedResult = mount(<MemoryRouter>{result}</MemoryRouter>);

            renderedResult.find(".s-glossary-chevron").first().simulate("click");
            expect(setCollapseState).toBeCalledTimes(1);
            expect(setCollapseState).toBeCalledWith({ "2.": true });
        });

        it("should render only the expanded sections", () => {
            const result = testingInterface.renderTable(tableOfContents, 1, { "2.": true }, setCollapseState);
            const renderedResult = mount(<MemoryRouter>{result}</MemoryRouter>);

            const navLinks = renderedResult.find("NavLink");
            expect(navLinks).toExist();
            expect(navLinks.length).toBe(2);
            expect(navLinks.at(0).prop("to")).toBe("#toc1-");
            expect(navLinks.at(0).text()).toContain("1.");
            expect(navLinks.at(0).text()).toContain("Title 1");
            expect(navLinks.at(1).prop("to")).toBe("#toc2-");
            expect(navLinks.at(1).text()).toContain("2.");
            expect(navLinks.at(1).text()).toContain("Title 2");
        });
    });

    describe("render", () => {
        const mountWithRouter = (children) =>
            mount(
                <MemoryRouter initialEntries={["glossary/product"]}>
                    <Route path="glossary/product">{children}</Route>
                </MemoryRouter>,
            );

        it("should render glossary product card", () => {
            const observe = jest.fn();
            const unobserve = jest.fn();
            window.IntersectionObserver = jest.fn(() => ({
                observe,
                unobserve,
            })) as any;

            const renderContent = jest.fn();
            const result = mountWithRouter(
                <GlossaryProductCard
                    title="Product Card title"
                    renderContent={renderContent}
                    tableOfContents={tableOfContents}
                />,
            );

            expect(result.find(".s-glossary-product-card")).toExist();
            expect(renderContent).toBeCalledTimes(1);
        });
    });
});
