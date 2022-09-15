// (C) 2020 GoodData Corporation
import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { debounce } from "lodash";
import { IProps } from "./interface";
import Input from "../../../controls/Input";
import { IconClose, IconSearch } from "../../../icon";
import { CheckboxInput, RadioInput } from "../../../utils/inputs";
import styleGuide from "../../../styleGuide/styleGuide";
import { InlineLoading } from "../../../utils/CustomLoading";

const { color, spacing, typography } = styleGuide;

const classes = {
    options: css({
        position: "absolute",
        top: "100%",
        width: "100%",
        boxSizing: "border-box",
        border: `1px solid ${color.textMain}`,
        borderTop: 0,
        backgroundColor: color.white,
        zIndex: 1,
    }),
    customControlsBlock: css({
        position: "relative",
        width: "100%",
        padding: spacing(1, 1, 0),
        boxSizing: "border-box",
    }),
    searchInput: css({
        margin: spacing(1),
    }),
    clearSearch: css({
        width: "1em !important",
        height: "1em !important",
        color: `${color.textSecondary} !important`,
        cursor: "pointer !important",
    }),
    optionsContainer: css({
        position: "relative",
        width: "100%",
        maxHeight: 200,
        overflowX: "hidden",
        overflowY: "scroll",
    }),
    option: css({
        width: "100%",
        padding: spacing(1),
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        boxSizing: "border-box",
    }),
    messageBlock: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: spacing(1),
        boxSizing: "border-box",
        color: color.textMuted,
    }),
    preloader: css({
        marginRight: spacing(1),
    }),
};

export const Options: FC<IProps> = ({
    searchQuery,
    onSearch,
    selectedOptions,
    options,
    onOptionChange,
    multi = false,
    isLoading = false,
    loadMoreOptions,
    customControls,
}) => {
    // Additional state required because we need to set input value without debouncing.
    const [searchInputValue, setSearchInputValue] = useState("");

    const onSearchDebounced = debounce(onSearch, 400);

    const handleScroll = (e) => {
        const bottomReached = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        loadMoreOptions && bottomReached && !isLoading && loadMoreOptions();
    };
    return (
        <div className={classes.options}>
            {customControls && <div className={classes.customControlsBlock}>{customControls}</div>}

            {onSearch && (
                <Input
                    onChange={(event) => {
                        setSearchInputValue(event.target.value);
                        onSearchDebounced(event.target.value);
                    }}
                    value={searchInputValue}
                    placeholder="Search"
                    className={classes.searchInput}
                    Icon={
                        searchQuery
                            ? (props) => (
                                  <IconClose
                                      {...props}
                                      className={cx(props.className, classes.clearSearch)}
                                      onIconClick={() => {
                                          setSearchInputValue("");
                                          onSearch("");
                                      }}
                                  />
                              )
                            : IconSearch
                    }
                />
            )}

            <div className={classes.optionsContainer} onScroll={handleScroll}>
                {options.length
                    ? options.map(({ id, label }) =>
                          multi ? (
                              <CheckboxInput
                                  key={id}
                                  onChange={(newValue) => {
                                      onOptionChange(id, newValue);
                                  }}
                                  checked={selectedOptions.includes(id)}
                                  className={classes.option}
                              >
                                  {label}
                              </CheckboxInput>
                          ) : (
                              <RadioInput
                                  className={classes.option}
                                  key={id}
                                  value={id}
                                  onChange={onOptionChange}
                                  selected={selectedOptions.includes(id)}
                              >
                                  {label}
                              </RadioInput>
                          ),
                      )
                    : !isLoading && <div className={classes.messageBlock}>There are no options</div>}
            </div>

            {isLoading && (
                <div className={classes.messageBlock}>
                    <InlineLoading
                        className={classes.preloader}
                        height={typography.variant.label.lineHeight}
                    />
                    Waiting for elements
                </div>
            )}
        </div>
    );
};
