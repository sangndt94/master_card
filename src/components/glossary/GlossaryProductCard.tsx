// (C) 2020 GoodData Corporation
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { css, cx } from "emotion";
import { NavHashLink } from "react-router-hash-link";
import DashboardBlock from "../dashboardBlocks/DashboardBlock";
import styleGuide from "../styleGuide/styleGuide";
import Hr from "../utils/Hr";
import Typography from "../utils/Typography";
import { IconChevronUp, IconChevronDown } from "../icon";

const headerHeight = "46px";

const classes = {
    productCard: css({
        display: "flex",
    }),
    card: css({
        margin: styleGuide.spacing(1),
        width: "75%",
        zIndex: 1,
    }),
    toc: css({
        position: "sticky",
        top: "0px",
        backgroundColor: styleGuide.color.headerBackground,
        height: "fit-content",
        width: "20%",
        borderRadius: `${styleGuide.borderRadius}px`,
        boxShadow: `${styleGuide.shadow.low}`,
        marginLeft: styleGuide.spacing(-1),
        marginTop: "60px",
        padding: styleGuide.spacing(2),
    }),
    tocIE: css({
        position: "fixed",
    }),
    tocSection: css({
        marginLeft: styleGuide.spacing(2),
    }),
    tocActiveSection: css({
        color: `${styleGuide.color.main} !important`,
    }),
    tocTitle: css({
        marginTop: styleGuide.spacing(1),
    }),
    tocLink: css({
        display: "inline-block",
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
    }),
    chevron: css({
        marginLeft: "5px",
        verticalAlign: "text-bottom",
        cursor: "pointer",
    }),
};

export interface ITableOfContentsItem {
    title: string;
    sections?: ITableOfContentsItem[];
}

const variantMap = {
    1: "section",
    2: "label",
    default: "subtitle",
};

const getCurrentSectionIndex = (sectionIndex: string, index: number) => {
    if (sectionIndex === "") {
        return `${index}.`;
    }
    return sectionIndex.endsWith(".") ? `${sectionIndex}${index}` : `${sectionIndex}.${index}`;
};

const renderTable = (
    tableOfContents: ITableOfContentsItem[],
    sectionLevel: number,
    collapseState: object,
    setCollapseState: React.Dispatch<React.SetStateAction<{}>>,
    sectionIndex: string = "",
) => {
    const isMainTitle = sectionIndex === "";
    return tableOfContents.map((tableItem, index) => {
        const currentSectionIndex = getCurrentSectionIndex(sectionIndex, index + 1);
        return (
            <div key={tableItem.title} className={cx(classes.tocSection, isMainTitle && classes.tocTitle)}>
                <NavHashLink smooth to={`#toc${currentSectionIndex.replace(/\./g, "-")}`}>
                    <Typography variant={variantMap[sectionLevel]} className={classes.tocLink}>
                        {currentSectionIndex}&ensp;{tableItem.title}
                    </Typography>
                </NavHashLink>
                {tableItem.sections && (
                    <span
                        className={cx(classes.chevron, "s-glossary-chevron")}
                        onClick={() => {
                            setCollapseState({
                                ...collapseState,
                                [currentSectionIndex]: !collapseState[currentSectionIndex],
                            });
                        }}
                    >
                        {!collapseState[currentSectionIndex] ? (
                            <IconChevronUp height="0.5em" width="0.8em" color={styleGuide.color.info} />
                        ) : (
                            <IconChevronDown height="0.5em" width="0.8em" color={styleGuide.color.info} />
                        )}
                    </span>
                )}
                {tableItem.sections &&
                    !collapseState[currentSectionIndex] &&
                    renderTable(
                        tableItem.sections,
                        sectionLevel + 1,
                        collapseState,
                        setCollapseState,
                        currentSectionIndex,
                    )}
            </div>
        );
    });
};

interface IGlossaryProductCard {
    title: string;
    renderContent: () => JSX.Element;
    tableOfContents: ITableOfContentsItem[];
}

const GlossaryProductCard: React.FC<IGlossaryProductCard> = ({ title, renderContent, tableOfContents }) => {
    const { url } = useRouteMatch();
    const [collapseState, setCollapseState] = useState({});

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("id");
                    if (document.querySelector(`a[href="#${url}#${id}"]`)) {
                        if (entry.intersectionRatio > 0) {
                            document
                                .querySelector(`a[href="#${url}#${id}"]`)
                                .firstElementChild.classList.add(classes.tocActiveSection);
                        } else {
                            document
                                .querySelector(`a[href="#${url}#${id}"]`)
                                .firstElementChild.classList.remove(classes.tocActiveSection);
                        }
                    }
                });
            },
            { root: document.querySelector("s-glossary-card"), rootMargin: `-${headerHeight} 0px 0px 0px` },
        );

        // Track all sections that have an `id` applied
        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    });

    return (
        <div className={classes.productCard}>
            <DashboardBlock
                className={cx(classes.card, "s-glossary-product-card")}
                height="auto"
                header={
                    <Typography variant="menuGroupTitle">
                        <span>{title}</span>
                    </Typography>
                }
            >
                <Hr color={styleGuide.color.border} />
                <div>{renderContent()}</div>
            </DashboardBlock>
            <div className={cx(classes.tocIE, classes.toc)}>
                {renderTable(tableOfContents, 1, collapseState, setCollapseState)}
            </div>
        </div>
    );
};

export const testingInterface = {
    getCurrentSectionIndex,
    renderTable,
};

export default GlossaryProductCard;
