// (C) 2020 GoodData Corporation
import React, { useCallback, FC } from "react";
import { css } from "emotion";
import styleGuide from "../../styleGuide/styleGuide";
import { FilterMessage } from "../common/filterMessage";
import { defaultElementsLimit } from "../../../complexFilters/filterElements";
import usePromise from "../../../hooks/usePromise";
import { RadioInput } from "../../utils/inputs";
import { InlineLoading } from "../../utils/CustomLoading";
import { IProps } from "./interface";
import { sortBy } from "lodash";
import { FilterHeader } from "../common/filterHeader";
import { FilterError } from "../common/filterError";

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

export const RadioFilter: FC<IProps> = ({
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

            <div className={classes.items}>
                {!error && !isLoading && (
                    <div className={classes.items}>
                        {elementsValue && (
                            <>
                                {elementsValue.validElements.items.map(({ element: { title } }) => {
                                    return (
                                        <RadioInput
                                            key={title}
                                            value={title}
                                            className={classes.item}
                                            onChange={(newValue) => {
                                                updateFilterSelectedItems(id, [newValue]);
                                            }}
                                            selected={selectedItems.includes(title)}
                                        >
                                            {title}
                                        </RadioInput>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
