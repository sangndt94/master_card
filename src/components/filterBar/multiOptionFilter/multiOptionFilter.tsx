// (C) 2020 GoodData Corporation
import React, { FC, useCallback, useEffect, useState } from "react";
import stringify from "json-stable-stringify";
import { IProps } from "./interface";
import { FilterHeader } from "../common/filterHeader";
import { sortBy } from "lodash";
import { css } from "emotion";
import Button from "../../controls/Button";
import cx from "classnames";
import { IconChevronDown, IconChevronUp } from "../../icon";
import { InlineLoading } from "../../utils/CustomLoading";
import styleGuide from "../../styleGuide/styleGuide";
import { defaultElementsLimit } from "../../../complexFilters/filterElements";
import usePromise from "../../../hooks/usePromise";
import OutsideClickHandler from "react-outside-click-handler";
import { Options } from "../common/options";
import { ToggleInput } from "../../utils/inputs/toggleInput";
import { FilterError } from "../common/filterError";

const { color, typography } = styleGuide;

const classes = {
    multiOptionFilter: css({
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
        flexGrow: 1,
        textAlign: "left",
    }),
    squareBottomCorners: css({
        borderBottomRightRadius: `0 !important`,
        borderBottomLeftRadius: `0 !important`,
    }),
    mutedText: css({
        color: color.textMuted,
    }),
    containerButton: css({
        position: "relative",
    }),
};

const initialPaging = { count: 0, offset: 0, total: 0 };

export const MultiOptionFilter: FC<IProps> = ({
    className,
    useFilterElements,
    updateFilterSelectedItems,
    clearFilters,
    resetFilters,
    openFilter,
    setOpenFilter,
    setAttributeFilter,
    isPendingDependency,
    label,
    id,
    selectedItems,
    selectedItemsApplied,
    autoSelect,
    error,
    defaultFilterType,
    filterType,
}) => {
    const [options, setOptions] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [paging, setPaging] = useState(initialPaging);

    const isNegativeFilterType = defaultFilterType === "negativeAttributeFilter";

    const isClearable = (selectedItems.length && !autoSelect) || defaultFilterType !== filterType;

    const isResettable =
        sortBy(selectedItems).toString() !== sortBy(selectedItemsApplied).toString() ||
        defaultFilterType !== filterType;

    const isOpen = openFilter === id;

    const IconChevron = isOpen ? IconChevronUp : IconChevronDown;

    const { getFilterElements } = useFilterElements(id);

    const onClickOpener = useCallback(() => {
        if (!isPendingDependency) {
            isOpen ? toDefaultState() : setOpenFilter(id);
        }
    }, [isPendingDependency, isOpen]);

    const getOpenerText = useCallback(() => {
        if (isPendingDependency) {
            return "Waiting for a dependent filter";
        }

        if (selectedItems.length) {
            const itemsToDisplay = isNegativeFilterType ? 2 : 3;
            return `${selectedItems.slice(0, itemsToDisplay).join(", ")}${
                selectedItems.length > itemsToDisplay ? ` ...(${selectedItems.length - itemsToDisplay})` : ""
            }`;
        }

        return "All";
    }, [isPendingDependency, selectedItems, isNegativeFilterType]);

    const toDefaultState = useCallback(() => {
        setPaging(initialPaging);
        setOpenFilter("");
        setSearchQuery("");
    }, []);

    const changeSelectedItems = useCallback(
        (changedOption, newValue) => {
            updateFilterSelectedItems(
                id,
                newValue
                    ? [...selectedItems, changedOption]
                    : selectedItems.filter((selectedItem) => selectedItem !== changedOption),
            );
        },
        [String(selectedItems)],
    );

    const elements = usePromise(
        useCallback(
            () =>
                error
                    ? Promise.reject(error)
                    : getFilterElements(paging.offset, defaultElementsLimit, searchQuery),
            [paging.offset, error, getFilterElements, searchQuery],
        ),
    );

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
        <div className={cx(classes.multiOptionFilter, className)}>
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
                            <span className={classes.openerText}>
                                {isNegativeFilterType && selectedItems.length ? (
                                    <span className={classes.mutedText}>All except: </span>
                                ) : null}
                                {getOpenerText()}
                            </span>
                        </Button>

                        {isOpen && (
                            <Options
                                customControls={
                                    <ToggleInput
                                        checked={isNegativeFilterType}
                                        onChange={() => {
                                            setAttributeFilter(id);
                                        }}
                                    >
                                        All Except
                                    </ToggleInput>
                                }
                                selectedOptions={selectedItems}
                                options={options}
                                onOptionChange={changeSelectedItems}
                                searchQuery={searchQuery}
                                onSearch={onSearch}
                                isLoading={elements.isPending}
                                loadMoreOptions={loadMoreOptions}
                                multi
                            />
                        )}
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};
