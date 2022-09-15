// (C) 2020 GoodData Corporation
import React from "react";
import { css, cx } from "emotion";
import { IContentGroup, isIContentGroup, IContentItem, isIContentItem } from "./GlossaryContent";
import GlossaryCard from "./GlossaryCard";
import Typography from "../utils/Typography";
import { IconSearch } from "../icon";
import styleGuide from "../styleGuide/styleGuide";

interface ISearchResultProps {
    glossaryContent: IContentGroup[];
    searchQuery: string;
    resetSearchQuery: () => void;
}

const classes = {
    searchResult: css({
        margin: styleGuide.spacing(1, 1, 3, 3),
    }),
};

const filterContent = <T extends IContentItem | IContentGroup>(
    glossaryContent: T[],
    searchQuery: string,
): T[] => {
    return glossaryContent.reduce((nodes: T[], node) => {
        if (isIContentGroup(node)) {
            if (node.title.toLowerCase().includes(searchQuery)) {
                nodes.push(node);
            } else {
                const filteredContent = filterContent(node.content, searchQuery);
                if (filteredContent.length > 0) {
                    const filteredNode = { ...node, content: filteredContent };
                    nodes.push(filteredNode);
                }
            }
        } else {
            if (isIContentItem(node) && node.plainText.toLowerCase().includes(searchQuery)) {
                nodes.push(node);
            }
        }
        return nodes;
    }, []);
};

const SearchResult: React.FC<ISearchResultProps> = ({ glossaryContent, searchQuery, resetSearchQuery }) => {
    const filteredContent = filterContent(glossaryContent, searchQuery);

    return filteredContent.length > 0 ? (
        <div>
            <Typography variant="label" className={cx(classes.searchResult, "s-search-result")}>
                <IconSearch height="1.25em" verticalAlign="text-bottom" />
                &ensp;We found <b>{searchQuery}</b> in the following categories.
            </Typography>
            {filteredContent.map((card) => (
                <GlossaryCard contentGroup={card} resetSearchQuery={resetSearchQuery} key={card.title} />
            ))}
        </div>
    ) : (
        <div>
            <Typography variant="label" className={cx(classes.searchResult, "s-no-result")}>
                <IconSearch height="1.25em" verticalAlign="text-bottom" />
                &ensp;No result found for <b>{searchQuery}</b>.
            </Typography>
        </div>
    );
};

export const testingInterface = {
    filterContent,
};

export default SearchResult;
