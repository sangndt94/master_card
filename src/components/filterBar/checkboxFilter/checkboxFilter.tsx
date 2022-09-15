// (C) 2020 GoodData Corporation
import React, { FC, useCallback } from "react";
import stringify from "json-stable-stringify";
import { css } from "emotion";
import styleGuide from "../../styleGuide/styleGuide";
import { FilterMessage } from "../common/filterMessage";
import { defaultElementsLimit } from "../../../complexFilters/filterElements";
import usePromise from "../../../hooks/usePromise";
import { CheckboxInput } from "../../utils/inputs";
import { InlineLoading } from "../../utils/CustomLoading";
import { sortBy } from "lodash";
import { FilterError } from "../common/filterError";
import { FilterHeader } from "../common/filterHeader";
import { IProps } from "./interface";

const { color, spacing, borderRadius, typography } = styleGuide;

const classes = {
    items: css({
        borderRadius,
        backgroundColor: color.bodyBackground,
    }),
    item: css({
        margin: spacing(1),
    }),
    pendingIndicator: css({
        marginRight: spacing(1),
        display: "inline-flex !important",
    }),
};

export const CheckboxFilter: FC<IProps> = ({
    className,
    useFilterElements,
    updateFilterSelectedItems,
    clearFilters,
    resetFilters,
    isPendingDependency,
    label,
    id,
    selectedItems,
    selectedItemsApplied,
    autoSelect,
    error,
}) => {
    const { getFilterElements } = useFilterElements(id);

    const { value: elementsValue, isPending } = usePromise(
        useCallback(() => {
            return error ? Promise.reject(error) : getFilterElements(0, defaultElementsLimit);
        }, [error, getFilterElements]),
    );

    const isClearable = selectedItems.length > 0 && !autoSelect;

    const isResettable = sortBy(selectedItems).toString() !== sortBy(selectedItemsApplied).toString();

    const isLoading = isPendingDependency || isPending;

    const onChange = useCallback(
        (title, newValue) => {
            if (!selectedItems.length) {
                const allValuesExceptTarget = elementsValue.validElements.items
                    .map((item) => item.element.title)
                    .filter((itemTitle) => itemTitle !== title);
                updateFilterSelectedItems(id, allValuesExceptTarget);
                return;
            }
            updateFilterSelectedItems(id, (previous) => {
                const newSelectedItems = newValue
                    ? [...previous, title]
                    : previous.filter((itemTitle) => itemTitle !== title);
                // If all values are selected, return empty array to disable the filter as "all"
                if (newSelectedItems.length === elementsValue.validElements.items.length) {
                    return [];
                }
                return newSelectedItems;
            });
        },
        [stringify(elementsValue), String(selectedItems)],
    );

    return (
        <div className={className}>
            <FilterHeader
                id={id}
                label={label}
                clearFilters={isClearable ? clearFilters : null}
                resetFilters={isResettable ? resetFilters : null}
            />

            {isLoading && (
                <FilterMessage messageColor={"black"}>
                    <InlineLoading
                        className={classes.pendingIndicator}
                        height={typography.variant.label.lineHeight}
                    />
                    {isPendingDependency ? "Waiting for a dependent filter" : "Waiting for elements"}
                </FilterMessage>
            )}

            {error && <FilterError clearFilters={clearFilters} error={error} id={id} />}

            {!error && !isLoading && (
                <div className={classes.items}>
                    {elementsValue && (
                        <>
                            {elementsValue.validElements.items.map(({ element: { title } }) => {
                                const isDisabled =
                                    (selectedItems.length === 1 && selectedItems[0] === title) ||
                                    elementsValue.validElements.items.length === 1;
                                return (
                                    <CheckboxInput
                                        key={title}
                                        className={classes.item}
                                        onChange={(newValue) => {
                                            onChange(title, newValue);
                                        }}
                                        disabled={isDisabled}
                                        checked={selectedItems.includes(title) || !selectedItems.length}
                                    >
                                        {title}
                                    </CheckboxInput>
                                );
                            })}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
