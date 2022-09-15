// (C) 2020 GoodData Corporation
import React from "react";
import { IContentGroup } from "../GlossaryContent";

import { mount } from "enzyme";
import SearchResult, { testingInterface } from "../SearchResult";

const glossaryContent: IContentGroup[] = [
    {
        title: "Card 1",
        content: [
            {
                title: "Section 1",
                content: [
                    {
                        htmlCode: "Subsection test 1",
                        plainText: "Subsection test 1",
                    },
                    {
                        htmlCode: "Subsection 2",
                        plainText: "Subsection 2",
                    },
                ],
            },
            {
                htmlCode: "test Subsection 3",
                plainText: "test Subsection 3",
            },
            {
                title: "Section 2 test",
                content: [
                    {
                        htmlCode: "Subsection 4",
                        plainText: "Subsection 4",
                    },
                    {
                        htmlCode: "Subsection 5",
                        plainText: "Subsection 5",
                    },
                ],
            },
            {
                title: "Section 3",
                content: [
                    {
                        htmlCode: "Subsection 6",
                        plainText: "Subsection 6",
                    },
                    {
                        htmlCode: "Subsection 7",
                        plainText: "Subsection 7",
                    },
                ],
            },
        ],
    },
    {
        title: "Card 2 test",
        content: [
            {
                title: "Section 4",
                content: [
                    {
                        htmlCode: "Subsection 8",
                        plainText: "Subsection 8",
                    },
                ],
            },
        ],
    },
];

const filteredContent: IContentGroup[] = [
    {
        title: "Card 1",
        content: [
            {
                title: "Section 1",
                content: [
                    {
                        htmlCode: "Subsection test 1",
                        plainText: "Subsection test 1",
                    },
                ],
            },
            {
                htmlCode: "test Subsection 3",
                plainText: "test Subsection 3",
            },
            {
                title: "Section 2 test",
                content: [
                    {
                        htmlCode: "Subsection 4",
                        plainText: "Subsection 4",
                    },
                    {
                        htmlCode: "Subsection 5",
                        plainText: "Subsection 5",
                    },
                ],
            },
        ],
    },
    {
        title: "Card 2 test",
        content: [
            {
                title: "Section 4",
                content: [
                    {
                        htmlCode: "Subsection 8",
                        plainText: "Subsection 8",
                    },
                ],
            },
        ],
    },
];

describe("SearchResult", () => {
    describe("filterContent", () => {
        it("should return filtered content", () => {
            const result = testingInterface.filterContent(glossaryContent, "test");

            expect(result).toEqual(filteredContent);
        });

        it("should return [] if no result was found", () => {
            const result = testingInterface.filterContent(glossaryContent, "wrong request");

            expect(result).toEqual([]);
        });
    });

    describe("render", () => {
        const resetSearchQuery = jest.fn();
        it("should render search result when there are results", () => {
            const result = mount(
                <SearchResult
                    glossaryContent={glossaryContent}
                    searchQuery={"test"}
                    resetSearchQuery={resetSearchQuery}
                />,
            );

            expect(result.find("Typography.s-search-result").text()).toContain("test");
        });

        it("should render search result when there are no results", () => {
            const result = mount(
                <SearchResult
                    glossaryContent={glossaryContent}
                    searchQuery={"wrong request"}
                    resetSearchQuery={resetSearchQuery}
                />,
            );

            expect(result.find("Typography.s-no-result").text()).toContain("wrong");
        });
    });
});
