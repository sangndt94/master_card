// (C) 2020 GoodData Corporation
import React from "react";
import ReactHtmlParser, { convertNodeToElement, Transform } from "react-html-parser";
import { css, cx } from "emotion";
import { IconGlossary, IconLightBulb, IconSettings, IconProduct, IconCalculator } from "../icon";
import DashboardBlock from "../dashboardBlocks/DashboardBlock";
import styleGuide from "../styleGuide/styleGuide";
import Hr from "../utils/Hr";
import Typography from "../utils/Typography";
import { IContentGroup, IContentItem, isIContentGroup } from "./GlossaryContent";
import Button from "../controls/Button";
import Link from "../controls/Link";

const iconMap = {
    glossary: (
        <IconGlossary height="1em" width="1.26em" verticalAlign="text-bottom" color={styleGuide.color.main} />
    ),
    calculator: (
        <IconCalculator
            height="1em"
            width="0.875em"
            verticalAlign="text-bottom"
            color={styleGuide.color.main}
        />
    ),
    settings: (
        <IconSettings height="1em" width="1em" verticalAlign="text-bottom" color={styleGuide.color.main} />
    ),
    product: (
        <IconProduct height="1em" width="1em" verticalAlign="text-bottom" color={styleGuide.color.main} />
    ),
    default: null,
};

const classes = {
    card: css({
        margin: styleGuide.spacing(1),
    }),
    cardContent: css({
        columns: 2,
    }),
    cardSection: css({
        padding: styleGuide.spacing(3, 0, 0, 0),
        pageBreakInside: "avoid",
        overflow: "hidden",
    }),
    multipleSection: css({
        margin: styleGuide.spacing(0, 0, 0, 2),
    }),
    cardSubsection: css({
        margin: styleGuide.spacing(1, 0, 1, 0),
        fontSize: 16,
        display: "inline-block",
    }),
    image: css({
        display: "block",
        marginTop: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
        marginRight: "auto",
        maxWidth: "100%",
    }),
};

interface IGlossaryCard {
    contentGroup: IContentGroup;
    resetSearchQuery?: () => void;
    render?: (node: IContentItem | IContentGroup) => JSX.Element;
}

const transform = (resetSearchQuery: () => void): Transform => (node, index) => {
    if (node.name === "learnmore") {
        return (
            <a href={node.children[0].data} target="_blank" key={node.children[0].data}>
                <Button variant="text">
                    Learn more&ensp;
                    <IconLightBulb height="1em" width="0.7em" verticalAlign="text-bottom" />
                </Button>
            </a>
        );
    }
    if (node.name === "productdetails") {
        return (
            <Link
                to={node.children[0].data}
                variant="text"
                onClick={resetSearchQuery}
                key={node.children[0].data}
                className="s-product-details"
            >
                Learn more&ensp;
                <IconLightBulb height="1em" width="0.7em" verticalAlign="text-bottom" />
            </Link>
        );
    }
    if (node.name === "image") {
        return (
            <img
                src={require(`./routes/images/${node.children[0].data}`)}
                key={node.children[0].data}
                className={classes.image}
            />
        );
    }
    return convertNodeToElement(node, index, transform(resetSearchQuery));
};

const renderContent = (node: IContentGroup | IContentItem, resetSearchQuery: () => void) => {
    if (isIContentGroup(node)) {
        return (
            <div key={node.title} className={classes.cardSection}>
                <Typography variant="section">{node.title}</Typography>
                <div className={cx(node.content.length > 1 && classes.multipleSection)}>
                    {node.content.map((subnode) => renderContent(subnode, resetSearchQuery))}
                </div>
            </div>
        );
    }
    return (
        <Typography variant="label" key={node.plainText} className={classes.cardSubsection}>
            {ReactHtmlParser(node.htmlCode, { transform: transform(resetSearchQuery) })}
        </Typography>
    );
};

const GlossaryCard: React.FC<IGlossaryCard> = ({
    contentGroup,
    resetSearchQuery,
    render = renderContent,
}) => {
    return (
        <DashboardBlock
            className={cx(classes.card, "s-glossary-card")}
            height="auto"
            header={
                <Typography variant="menuGroupTitle">
                    {iconMap[contentGroup.icon]}&ensp;
                    <span>{contentGroup.title}</span>
                </Typography>
            }
        >
            <Hr color={styleGuide.color.border} />
            <div className={classes.cardContent}>
                {contentGroup.content.map((node) => render(node, resetSearchQuery))}
            </div>
        </DashboardBlock>
    );
};

export const testingInterface = {
    transform,
    renderContent,
};

export default GlossaryCard;
