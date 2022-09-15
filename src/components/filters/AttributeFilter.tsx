// (C) 2019 GoodData Corporation
import React, { useCallback } from "react";
import AsyncPaginate from "react-select-async-paginate";
import { components, mergeStyles } from "react-select";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { LoadingIconProps } from "react-select/src/components/indicators";
import { OptionProps } from "react-select/src/components/Option";
import cx from "classnames";

// the approach is heavily inspired by AttributeElements component from @gooddata/react-components

import { defaultFilterQueryOptions } from "./constants";
import theme from "../../utils/theme";
import getElements from "../../utils/getElements";
import { getValidSanitizedFilterValues, getHasMore, canAutoSelectIndex } from "./utils";
import { AttributeFilterPreset, IAttributeFilterValue } from "../../types";
import { IValidElementsOptions } from "@gooddata/gooddata-js/lib/metadata";

const textStyles = {
    fontFamily: theme.font.heading,
    fontSize: theme.fontSize.body * 0.8,
    lineHeight: 1.15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    color: theme.color.text,
};

const defaultStyles = {
    option: (provided) => ({
        ...provided,
        ...textStyles,
        padding: `${theme.spacing / 4}px ${theme.spacing / 2}px `,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        cursor: "pointer",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        transition: "transform 200ms",
        transform: provided.isFocused ? "rotate(180deg)" : "rotate(0deg)",
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        ...textStyles,
        position: "relative",
        flex: "1 1 auto",
        maxWidth: "auto",
        margin: "0 0 0 2px",
    }),
    multiValue: (provided) => ({
        ...provided,
        ...textStyles,
        borderRadius: "12.5px",
        padding: "0 3px 0 5px",
        maxWidth: "100%",
    }),
    input: (provided) => ({
        ...provided,
        ...textStyles,
        margin: "0 0 0 2px",
        padding: 0,
        transform: "none",
    }),
    placeholder: (provided) => ({
        ...provided,
        ...textStyles,
        color: theme.color.textLighter,
        margin: "0 0 0 2px",
        padding: 0,
        position: "relative",
        transform: "none",
        top: 0,
        left: 0,
    }),
    control: (provided) => ({
        ...provided,
        cursor: "pointer",
        border: 0,
        boxShadow: "none",
        alignItems: "stretch",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        minHeight: "1em",
        background: "transparent",
        ">div": {
            padding: 0,
            margin: "0 0 0 -2px",
            flexWrap: "wrap",
            alignContent: "center",
            maxWidth: 615,
        },
        "&:hover": {
            border: 0,
            borderColor: "transparent",
        },
    }),
};

const MultiValueContainer = (props) => {
    return (
        <div
            title={(props.data && props.data.label) || null}
            className="multiValueWrapper s-filter-multi-value"
        >
            <components.MultiValueContainer {...props} />
        </div>
    );
};

interface IOptionProps extends OptionProps<any> {}

const Option: React.FC<IOptionProps> = (props) => {
    return (
        <span title={(props.data && props.data.label) || null}>
            <components.Option {...props} className={cx(props.className, "s-filter-option")} />
        </span>
    );
};

interface ILoadingIndicatorProps extends LoadingIconProps<any> {}

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = (props) => {
    return <components.LoadingIndicator {...props} className={cx(props.className, "s-filter-loading")} />;
};

interface IPlaceholderProps extends PlaceholderProps<any> {
    isFocused?: boolean;
}

const Placeholder: React.FC<IPlaceholderProps> = ({ isFocused, children, ...props }) => {
    return (
        <components.Placeholder {...props}>{isFocused ? "Type to search" : children}</components.Placeholder>
    );
};

const MultiValueRemove: React.FC<{ data: IAttributeFilterValue; innerProps: { className: string } }> = ({
    data,
    innerProps,
    ...props
}) => {
    return (
        <components.MultiValueRemove
            {...props}
            data-value={data.label}
            innerProps={{
                ...innerProps,
                className: cx(innerProps.className, "s-clear-value"),
            }}
        />
    );
};

const nonMainFilterStyle = `
    padding: 0 ${theme.spacing / 2}px;
    margin: ${theme.spacing / 4}px 0;
    border-right: 2px solid ${theme.color.paper};
`;

const presets: { [P in AttributeFilterPreset]: any } = {
    S: {
        Filter: `
            ${nonMainFilterStyle}
            min-width: 8.1em;
            max-width: 16.1em;
        `,
    },
    M: {
        Filter: `
            ${nonMainFilterStyle}
            min-width: 12.1em;
            max-width: 24.1em;
        `,
    },
    L: {
        Filter: `
            ${nonMainFilterStyle}
            min-width: 16.1em;
            max-width: 32.1em;
        `,
    },
    MAIN: {
        Filter: "",
    },
};

interface IAttributeFilterProps {
    filterId: string;
    projectId: string;
    selectedValues: IAttributeFilterValue[];
    className?: string;
    onChange: (value: IAttributeFilterValue, isUnsaved?: boolean) => void;
    placeholder?: string | React.ReactElement;
    label?: string | React.ReactElement;
    displayFormIdentifier: string;
    preset?: AttributeFilterPreset;
    attributeQueryOptions?: Partial<IValidElementsOptions>;
    isMulti: boolean;
    clearable?: boolean;
    autoSelectIndex?: number;
    styles?: Parameters<typeof mergeStyles>[0];
}

const AttributeFilter: React.FC<IAttributeFilterProps> = ({
    filterId,
    selectedValues,
    className,
    onChange,
    placeholder = "All",
    label,
    displayFormIdentifier,
    preset,
    projectId,
    attributeQueryOptions = defaultFilterQueryOptions,
    isMulti,
    clearable = true,
    styles = defaultStyles,
    autoSelectIndex = null,
}) => {
    const loadOptions = useCallback(
        (query: string, _loaded, additional: { offset: number }) => {
            const loader = async () => {
                const queryOptionsWithUpdatedPaging = {
                    ...attributeQueryOptions,
                    offset: additional.offset, // this is here because filtering of items messes up the offset and causes duplicate items MC-228
                    filter: query,
                };

                const elementsResponse = await getElements(
                    projectId,
                    displayFormIdentifier,
                    queryOptionsWithUpdatedPaging,
                );

                const validReceivedFilters = getValidSanitizedFilterValues(
                    displayFormIdentifier,
                    elementsResponse.validElements.items,
                );

                // Auto-select first value only when nothing is selected on first page
                if (
                    autoSelectIndex !== null &&
                    canAutoSelectIndex(
                        autoSelectIndex,
                        elementsResponse,
                        selectedValues,
                        validReceivedFilters,
                    )
                ) {
                    // always autoSelect a value both saved and unsaved
                    onChange(validReceivedFilters[autoSelectIndex], false);
                }

                // the object shape is dictated by react-select-async-paginate API
                return {
                    options: validReceivedFilters,
                    hasMore: getHasMore(elementsResponse),
                    additional: {
                        // this is here because filtering of items messes up the offset and causes duplicate items MC-228
                        offset:
                            Number(elementsResponse.validElements.paging.offset) +
                            elementsResponse.validElements.paging.count,
                    },
                };
            };
            return loader();
        },
        [autoSelectIndex, attributeQueryOptions, selectedValues, projectId, displayFormIdentifier, onChange],
    );

    const presetStyle = preset ? presets[preset] : presets.S;

    return (
        <div className={cx("Filter", className, "s-filter", `s-filter-${filterId}`)}>
            <style jsx>{`
                .Filter {
                    ${presetStyle ? presetStyle.Filter : ""};
                    vertical-align: middle;
                }
                .Filter :global(.multiValueWrapper) {
                    max-width: 100%;
                }
                .label {
                    font-family: ${theme.font.heading};
                    font-size: ${theme.fontSize.body}px;
                    line-height: ${theme.lineHeight.body};
                    font-weight: normal;
                    font-style: normal;
                    font-stretch: normal;
                    color: ${theme.color.filterLabel};
                }
            `}</style>
            <div className="label">{label}</div>
            <AsyncPaginate<IAttributeFilterValue, { offset: number }>
                styles={styles}
                onChange={(value) => onChange(value as IAttributeFilterValue, true)}
                isMulti={isMulti}
                components={{ MultiValueContainer, MultiValueRemove, Option, LoadingIndicator, Placeholder }}
                placeholder={placeholder}
                value={selectedValues}
                loadOptions={loadOptions}
                clearable={clearable}
                debounceTimeout={500}
                additional={{ offset: 0 }}
                defaultOptions // make sure the first batch of options is loaded ASAP, not after the user opens the select
                cacheUniq={`${projectId}_${JSON.stringify(attributeQueryOptions)}`} // make sure to drop options whenever queryOptions change (this is needed by parent-child filters)
            />
        </div>
    );
};

export default AttributeFilter;
