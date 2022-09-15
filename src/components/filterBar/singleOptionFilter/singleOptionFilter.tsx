// (C) 2019 GoodData Corporation
import React, { useCallback, useState, useEffect, FC } from "react";
import cx from "classnames";
import stringify from "json-stable-stringify";
import { defaultElementsLimit } from "../../../complexFilters/filterElements";
import { css } from "emotion";
import usePromise from "../../../hooks/usePromise";
import { InlineLoading } from "../../utils/CustomLoading";
import Button from "../../controls/Button";
import { IconChevronDown, IconChevronUp } from "../../icon";
import { sortBy } from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
import { IProps } from "./interface";
import { FilterHeader } from "../common/filterHeader";
import { FilterError } from "../common/filterError";
import { Options } from "../common/options";
import styleGuide from "../../styleGuide/styleGuide";

const { color, typography } = styleGuide;

const classes = {
    singleOptionFilter: css({
        position: "relative",
    }),
    opener: css({
        width: "100%",
        justifyContent: "space-between",
        display: "flex",
        border: `1px solid ${color.textMain} !important`,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        alignItems: "center",
        padding: `10px !important`,
        color: `${color.black} !important`,
        backgroundColor: `${color.white} !important`,

        "&:hover, &:focus, &:active": {
            color: `${color.black} !important`,
        },
    }),
    openerText: css({
        minHeight: "1em",
        flexGrow: 1,
        textAlign: "left",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    }),
    squareBottomCorners: css({
        borderBottomRightRadius: `0 !important`,
        borderBottomLeftRadius: `0 !important`,
    }),
    containerButton: css({
        position: "relative",
    }),
};

const initialPaging = { count: 0, offset: 0, total: 0 };

export const SingleOptionFilter: FC<IProps> = ({
    className,
    useFilterElements,
    updateFilterSelectedItems,
    clearFilters,
    resetFilters,
    openFilter,
    setOpenFilter,
    isPendingDependency,
    label,
    id,
    selectedItems,
    selectedItemsApplied,
    autoSelect,
    error,
}) => {
    const [options, setOptions] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [paging, setPaging] = useState(initialPaging);

    const isClearable = selectedItems.length && !autoSelect;

    const isResettable = sortBy(selectedItems).toString() !== sortBy(selectedItemsApplied).toString();

    const isOpen = openFilter === id;

    const IconChevron = isOpen ? IconChevronUp : IconChevronDown;

    const { getFilterElements } = useFilterElements(id);

    const onClickOpener = useCallback(() => {
        if (!isPendingDependency) {
            isOpen ? toDefaultState() : setOpenFilter(id);
        }
    }, [isPendingDependency, isOpen]);

    const toDefaultState = useCallback(() => {
        setPaging(initialPaging);
        setOpenFilter("");
        setSearchQuery("");
    }, []);

    const changeSelectedItems = useCallback((changedOption) => {
        updateFilterSelectedItems(id, [changedOption]);
    }, []);

    const elements = usePromise(
        useCallback(
            () =>
                error
                    ? Promise.reject(error)
                    : getFilterElements(paging.offset, defaultElementsLimit, searchQuery),
            [paging.offset, error, getFilterElements, searchQuery],
        ),
    );

    const getOpenerText = useCallback(() => {
        if (isPendingDependency) {
            return "Waiting for a dependent filter";
        }

        if (selectedItems.length) {
            return selectedItems[0];
        }

        return "All";
    }, [isPendingDependency, selectedItems]);

    const loadMoreOptions = useCallback(() => {
        if (paging.offset < paging.total - defaultElementsLimit) {
            setPaging({ ...paging, offset: paging.offset + defaultElementsLimit });
        }
    }, [paging.total, paging.offset]);

    const onSearch = (query) => {
        setSearchQuery(query);
        setPaging(initialPaging);
        setOptions([]);
    };

    useEffect(() => {
        if (elements.value) {
            const {
                value: {
                    validElements: {
                        items,
                        paging: { count, total, offset },
                    },
                },
            } = elements;

            const newOptions = items.map(({ element: { title } }) => ({ id: title, label: title }));

            setPaging({ count, total: +total, offset: +offset });
            // Extend current options list in case of lazy load.
            setOptions(!!+offset ? options.concat(newOptions) : newOptions);
        }
    }, [stringify(elements.value)]);

    return (
        <div className={cx(classes.singleOptionFilter, className)}>
            <FilterHeader
                id={id}
                label={label}
                clearFilters={isClearable ? clearFilters : null}
                resetFilters={isResettable ? resetFilters : null}
            />

            {error ? (
                <FilterError clearFilters={clearFilters} error={error} id={id} />
            ) : (
                <OutsideClickHandler onOutsideClick={toDefaultState} disabled={!isOpen}>
                    <div className={cx(classes.containerButton)}>
                        <Button
                            variant="text"
                            color="info"
                            colorActive="infoActive"
                            className={cx(classes.opener, { [classes.squareBottomCorners]: isOpen })}
                            endIcon={<IconChevron height="0.5em" width="0.8em" />}
                            startIcon={
                                isPendingDependency ? (
                                    <InlineLoading height={typography.variant.label.lineHeight} />
                                ) : null
                            }
                            disabled={isPendingDependency}
                            onClick={onClickOpener}
                        >
                            <span className={classes.openerText}>{getOpenerText()}</span>
                        </Button>

                        {isOpen && (
                            <Options
                                selectedOptions={selectedItems}
                                options={options}
                                onOptionChange={changeSelectedItems}
                                onSearch={onSearch}
                                searchQuery={searchQuery}
                                isLoading={elements.isPending}
                                loadMoreOptions={loadMoreOptions}
                            />
                        )}
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};
