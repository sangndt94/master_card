// (C) 2019 GoodData Corporation
import React, { useContext } from "react";
import isEqual from "lodash/isEqual";
import cx from "classnames";
import theme from "../../utils/theme";
import AttributeFilter from "./AttributeFilter";
import ButtonLink from "../utils/ButtonLink";
import Button from "../utils/Button";
import { IconUndo } from "../icon";
import { INormalizedAttributeFilter } from "../../types";
import CustomLoading from "../utils/CustomLoading";
import { getNextFiltersSequence } from "./utils";
import { MessagesContext } from "../../contexts/MessagesContext";
import MessagesBase from "@gooddata/goodstrap/lib/Messages/MessagesBase";

export interface IFilterBarProps {
    filters: INormalizedAttributeFilter[];
    projectId: string;
    clearFilters?: () => void;
    applyFilters: () => void;
    resetFilters: (exclude?: string[]) => void;
    filterSwitch?: React.ReactNode;
}

const FilterBar: React.FC<IFilterBarProps> = ({
    filters,
    projectId,
    clearFilters = null,
    applyFilters,
    resetFilters,
    filterSwitch = null,
}) => {
    const hasUnsavedFilters = Object.keys(filters).some((filterId) => {
        return Boolean(
            filters[filterId].selectedValuesUnsaved &&
                !isEqual(filters[filterId].selectedValuesUnsaved, filters[filterId].selectedValues),
        );
    });
    const filterSequence = getNextFiltersSequence(filters);
    const hasClearableFilters =
        clearFilters && filters.some((filter) => filter.autoSelectIndex === undefined);
    const { messages, removeMessage } = useContext(MessagesContext);
    const displayedMessages = messages.filter((message) => !message.isPopIn);

    return (
        <div className="FilterBar">
            {/* language=CSS */}
            <style jsx>{`
                .FilterBar {
                    display: flex;
                    flex: 0 0 auto;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    background-color: ${theme.color.box};
                    padding: ${theme.spacing / 2}px ${theme.spacing / 2}px;
                    border-top: 2px solid ${theme.color.paper};
                    box-shadow: ${theme.shadowLow};
                    z-index: 10;
                }
                .FilterBar :global(.controlLink) {
                    display: block;
                    margin-right: ${theme.spacing}px;
                    color: ${theme.color.boxLink};
                    text-decoration: none;
                    white-space: nowrap;
                }
                .FilterBar :global(.controlLink):hover {
                    color: ${theme.color.boxLinkHover};
                    text-decoration: none;
                }
                .FilterBar :global(.circle) {
                    display: inline-block;
                    vertical-align: middle;
                    position: relative;
                    top: -2px;
                }
                .FilterBar :global(.Loading) {
                    margin-left ${theme.spacing}px;
                }
                .Controls {
                    flex: 1 0 auto;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-self: stretch;
                    justify-content: flex-end;
                    margin-right: ${theme.spacing / 2}px;
                }
                .Controls :global(.linkIcon) {
                    position: relative;
                    vertical-align: middle;
                    height: 0.8em;
                    width: 0.8em;
                    top: -1px;
                }
                .Controls :global(.linkIconActive) {
                    color: ${theme.color.linkDarker};
                }
                .FilterBar :global(.undoIcon) {
                    position: relative;
                    vertical-align: middle;
                    height: 0.8em;
                    width: 0.8em;
                    top: -1px;
                    color: ${theme.color.linkDarker};
                }
                .undoButton {
                    background: transparent none;
                    border: 0;
                    cursor: pointer;
                    padding: 0;
                }
                .messagesWrapper {
                    position: relative;
                    top: 100%;
                    left: 50%;
                }
            `}</style>
            <div className="messagesWrapper">
                <MessagesBase onMessageClose={removeMessage} messages={displayedMessages} />
            </div>
            {filterSequence.map(
                ({
                    id,
                    displayFormIdentifier,
                    preset,
                    attributeQueryOptions,
                    onChange,
                    selectedValuesUnsaved,
                    selectedValues,
                    placeholder,
                    autoSelectIndex,
                    isMulti = true,
                    isHidden,
                }) =>
                    !isHidden && (
                        <AttributeFilter
                            filterId={id}
                            key={displayFormIdentifier}
                            preset={preset}
                            isMulti={isMulti}
                            autoSelectIndex={autoSelectIndex}
                            attributeQueryOptions={attributeQueryOptions}
                            displayFormIdentifier={displayFormIdentifier}
                            onChange={(value, isUnsaved = true) => onChange(value, isUnsaved)}
                            label={
                                selectedValuesUnsaved && !isEqual(selectedValuesUnsaved, selectedValues) ? (
                                    <React.Fragment>
                                        {placeholder}&ensp;
                                        <button className="undoButton" onClick={() => resetFilters([id])}>
                                            <IconUndo className="undoIcon" />
                                        </button>
                                    </React.Fragment>
                                ) : (
                                    placeholder
                                )
                            }
                            projectId={projectId}
                            selectedValues={selectedValuesUnsaved ? selectedValuesUnsaved : selectedValues}
                        />
                    ),
            )}

            {filterSwitch}

            {filterSequence.length < filters.length && (
                <CustomLoading imageHeight="1em" className="Loading" />
            )}

            <div className="Controls">
                <div>
                    <ButtonLink className="controlLink" onClick={() => resetFilters()}>
                        <IconUndo className={cx("linkIcon", hasUnsavedFilters && "linkIconActive")} />
                        &ensp;Reset changes
                    </ButtonLink>
                    {hasClearableFilters && (
                        // onClick requires () => clearFilters() so that the click event is not passed into clearFilters by mistake
                        <ButtonLink className="controlLink" onClick={() => clearFilters()}>
                            ✕&ensp;Clear all
                        </ButtonLink>
                    )}
                </div>
                {/* onClick requires () => applyFilters() so that the click event is not passed into applyFilters by mistake */}
                <Button className="FilterApply" disabled={!hasUnsavedFilters} onClick={() => applyFilters()}>
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
