// (C) 2020 GoodData Corporation
import React, { useCallback, useState, useEffect, FC } from "react";
import cx from "classnames";
import stringify from "json-stable-stringify";
import { defaultElementsLimit } from "../../../complexFilters/filterElements";
import { css } from "emotion";
import usePromise from "../../../hooks/usePromise";
import { InlineLoading } from "../../utils/CustomLoading";
import Button from "../../controls/Button";
import { IconChevronDown, IconChevronUp, IconInterActivity, IconUndo } from "../../icon";
import { isEqual, maxBy, minBy, sortBy } from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
import { IProps } from "./interface";
import { FilterError } from "../common/filterError";
import styleGuide from "../../styleGuide/styleGuide";
import { IValidElementsResponse } from "@gooddata/gooddata-js";
import Slider from "../../../../node_modules/rc-slider/dist/rc-slider";
import GranularitySwitch from "../../dashboardBlocks/GranularitySwitch";
import Typography from "../../utils/Typography";
import "rc-slider/assets/index.css";

const { color, typography } = styleGuide;

const classes = {
    sliderFilter: css({
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
    header: css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: styleGuide.spacing(0, 0.75, 0, 0.75),
        marginLeft: 1,
    }),
    label: css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        flex: "1 1 auto",
    }),
    reset: css({
        marginLeft: styleGuide.spacing(2),
    }),
    clear: css({
        marginLeft: styleGuide.spacing(2),
    }),
    clearCharacter: css({
        fontSize: "2em",
    }),
    items: css({
        borderRadius: styleGuide.borderRadius,
        backgroundColor: styleGuide.color.bodyBackground,
    }),
    item: css({
        margin: styleGuide.spacing(1, 0.75),
    }),
    pendingIndicator: css({
        margin: styleGuide.spacing(1, 1),
        // makeStyles has always lower specificity than styled jsx. !important could be removed when InlineLoading is rewritten to use makeStyles.
        display: "inline-flex !important",
    }),
    containerFromTo: css({
        height: 35,
        border: `1px solid ${styleGuide.color.black}`,
        padding: styleGuide.spacing(0, 1),
        display: "flex",
        alignItems: "center",
        borderRadius: styleGuide.borderRadius,
    }),
    containerContentSlider: css({
        padding: styleGuide.spacing(0, 1),
        boxShadow: styleGuide.shadow.low,
    }),
    containerChangeSlider: css({
        paddingTop: styleGuide.spacing(2),
        paddingBottom: styleGuide.spacing(1),
        display: "flex",
        alignItems: "center",
    }),
    wrapSlider: css({
        padding: styleGuide.spacing(0, 5),
        background: "#e6fbff",
    }),
    wrapItemSlider: css({
        height: "50px",
        background: "#e6fbff",
        alignItems: "center",
        display: "flex",
    }),
    railStyle: css({
        "& .rc-slider-rail": {
            height: 5,
        },
    }),
    trackStyle: css({
        "& .rc-slider-track": {
            backgroundColor: "#dbeef4",
            height: 5,
        },
    }),
    handleStyle: css({
        cursor: "pointer",
        "& .rc-slider-handle": {
            height: 20,
            width: 20,
            marginLeft: -0,
            marginTop: styleGuide.spacing(-1),
            boxShadow: styleGuide.shadow.low,
            borderRadius: "50%",
            border: 0,
            zIndex: 1,
        },
    }),
    minTitle: css({
        left: "-38px",
        position: "absolute",
        top: "-20px",
        textAlign: "center",
        color: "black",
        pointerEvents: "none",
    }),
    maxTitle: css({
        right: "-38px",
        position: "absolute",
        top: "-20px",
        textAlign: "center",
        color: "black",
        pointerEvents: "none",
    }),
    footerSliderFilter: css({
        margin: styleGuide.spacing(1, 0),
        display: "flex",
        alignItems: "center",
    }),
    footerIcon: css({
        margin: styleGuide.spacing(1, 2, 0, 0),
    }),
    titleSwitch: css({
        fontWeight: styleGuide.typography.fontWeight.bold,
    }),
    tooltip: css({
        position: "absolute",
        transform: "translateX(-50%)",
        right: "auto",
        top: "5px",
        backgroundColor: "deepskyblue",
        width: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }),
    textTooltip: css({
        paddingTop: 10,
        color: "white",
        fontSize: 12,
        textAlign: "center",
    }),
    wrapHandle: css({
        position: "relative",
    }),
    groupEmptyValue: css({
        paddingTop: styleGuide.spacing(2),
        display: "flex",
    }),
};

const initialPaging = { count: 0, offset: 0, total: 0 };

export const SliderFilter: FC<IProps> = ({
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

    const [minMax, setMinMax] = useState([0, 500]);

    const [onlyMax, setOnlyMax] = useState(-1);

    const [useFineGranularity, setUseFineGranularity] = useState(true);

    const [emptyValue, setEmptyValue] = useState(false);

    const { getFilterElements } = useFilterElements(id);

    const elementsResponse = useCallback(() => {
        if (!error) {
            return getFilterElements(0, defaultElementsLimit);
        }
        const rejectedPromise: Promise<IValidElementsResponse> = Promise.reject(error);
        return rejectedPromise;
    }, [error, getFilterElements]);

    const elementsState = usePromise(elementsResponse);

    const arrayItem = elementsState?.value?.validElements?.items.reduce((acc, item) => {
        if (item.element.title.indexOf("below") === -1) {
            const itemSplit = item.element.title.split("$").join("").replace("+", "").split("-");
            if (item.element.title.indexOf("+") !== -1) {
                acc = [...acc, { ...item, min: Number(itemSplit[0]), max: Number(itemSplit[0]) }];
                acc = [...acc, { ...item, min: Number(itemSplit[0]) + 1, max: Number(itemSplit[0]) + 1 }];
                return acc;
            }
            acc = [...acc, { ...item, min: Number(itemSplit[0]), max: Number(itemSplit[1]) }];
            return acc;
        } else {
            acc = [...acc, { ...item, min: -1, max: -1 }];
            return acc;
        }
    }, []);
    const indexUnknown = arrayItem?.findIndex((item) => item.element.title.indexOf("unknown") !== -1);
    const unknown = arrayItem?.splice(indexUnknown, 1);

    const itemMin = minBy(arrayItem, "min");
    const itemMax = maxBy(arrayItem, "max");

    const MyHandle = (props) => {
        const { value, dragging, index, ...rest } = props;
        const renderValue = () => {
            if (value < 0) {
                return <div className={classes.textTooltip}>Low</div>;
            } else if (value === itemMax?.max) {
                return <div className={classes.textTooltip}>High</div>;
            }
            return <div className={classes.textTooltip}>{value}</div>;
        };
        return (
            <div className={classes.wrapHandle} key={index}>
                <Slider.Handle value={value} {...rest} />
                <div className={classes.tooltip} style={{ left: `${(value / itemMax?.max) * 100}%` }}>
                    {renderValue()}
                </div>
            </div>
        );
    };
    const getRangeValueWhenSelected = (minIndex, maxIndex) => {
        let obj = [];
        arrayItem?.forEach((item) => {
            if (
                arrayItem[minIndex]?.min <= item.min &&
                arrayItem[maxIndex]?.min >= item.min &&
                item.max < arrayItem[maxIndex]?.max
            ) {
                obj = [...obj, item.element.title];
            }
        });
        return obj;
    };
    useEffect(() => {
        if (emptyValue) {
            return updateFilterSelectedItems(id, [unknown[0]?.element.title]);
        }
        if (isEqual(minMax[0], minMax[1])) {
            return;
        }
        // calculate single slider
        if (useFineGranularity) {
            const indexMax = arrayItem?.findIndex((item) => onlyMax >= item.min && onlyMax <= item.max);
            let obj = getRangeValueWhenSelected(0, indexMax);
            if (obj) {
                return updateFilterSelectedItems(id, obj);
            }
        }
        // calculate multiple slider
        let minIndex = arrayItem?.findIndex((item) => minMax[0] >= item.min && minMax[0] <= item.max);
        let maxIndex = arrayItem?.findIndex((item) => minMax[1] >= item.min && minMax[1] <= item.max);

        let obj = getRangeValueWhenSelected(minIndex, maxIndex);
        if (obj) {
            return updateFilterSelectedItems(id, obj);
        }
    }, [onlyMax, emptyValue, minMax, useFineGranularity]);

    useEffect(() => {
        if (selectedItemsApplied.length === 0) {
            setMinMax([0, 500]);
            setOnlyMax(0);
        }
    }, [selectedItemsApplied]);
    useEffect(() => {
        // when click all reset
        if (useFineGranularity) {
            if (isEqual(selectedItems, selectedItemsApplied)) {
                const obj = arrayItem?.find((item) => isEqual(selectedItemsApplied[0], item.element.title));
                setOnlyMax(obj?.min || -1);
            }
        } else {
            if (isEqual(selectedItems, selectedItemsApplied)) {
                const obj = dataValueStringToObj();
                const getValueOldWhenReset = arrayItem.findIndex(
                    (item) => item.min === obj[obj.length - 1]?.min,
                );
                setMinMax([obj[0]?.min, arrayItem[getValueOldWhenReset + 1]?.min]);
            }
        }
    }, [selectedItems]);

    let marks = {};
    arrayItem?.forEach((item) => {
        if (Number.isNaN(item.max) || Number.isNaN(item.min)) {
            return null;
        }
        marks = { ...marks, [item.min]: "" };
    });
    const dataValueStringToObj = () => {
        let obj: any = [];
        selectedItemsApplied?.forEach((item) => {
            arrayItem?.forEach((itemArrayItem) => {
                if (isEqual(itemArrayItem.element.title, item)) {
                    obj = [...obj, itemArrayItem];
                }
            });
        });
        return obj;
    };

    const isClearable = selectedItems.length && !autoSelect;

    const isResettable = sortBy(selectedItems).toString() !== sortBy(selectedItemsApplied).toString();

    const isOpen = openFilter === id;

    const IconChevron = isOpen ? IconChevronUp : IconChevronDown;

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
            return (
                <div>
                    <span>From:</span>&ensp;
                    <span>
                        {(selectedItemsApplied[0]?.indexOf("unknown") !== -1 && "empty") ||
                            selectedItemsApplied[0]}
                    </span>
                    &ensp;
                    <span>To:</span>&ensp;
                    <span>
                        {(selectedItemsApplied[0]?.indexOf("unknown") !== -1 && "empty") ||
                            selectedItemsApplied[selectedItemsApplied.length - 1]}
                    </span>
                </div>
            );
        }

        return "All";
    }, [isPendingDependency, selectedItemsApplied]);

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
        <div className={cx(classes.sliderFilter, className)}>
            <div className={classes.header}>
                <Typography variant="body" className={classes.label}>
                    {label}
                </Typography>

                {isResettable ? (
                    <Button
                        variant="text"
                        color="info"
                        colorActive="infoActive"
                        className={cx("s-reset", classes.reset)}
                        endIcon={<IconUndo />}
                        onClick={async () => {
                            if (useFineGranularity) {
                                const obj = arrayItem.find((item) =>
                                    isEqual(selectedItemsApplied[0], item.element.title),
                                );
                                await setOnlyMax(obj?.min || -1);
                            } else {
                                const obj = dataValueStringToObj();
                                await setMinMax([obj[0].min, obj[obj.length - 1].min]);
                            }
                            return resetFilters([id]);
                        }}
                    >
                        Reset
                    </Button>
                ) : null}

                {isClearable ? (
                    <Button
                        variant="text"
                        color="info"
                        colorActive="infoActive"
                        className={cx("s-clear", classes.clear)}
                        endIcon={<span className={classes.clearCharacter}>&times;</span>}
                        onClick={async () => {
                            if (useFineGranularity) {
                                await setOnlyMax(-1);
                            } else {
                                await setMinMax([0, 500]);
                            }
                            return clearFilters([id]);
                        }}
                    >
                        Clear
                    </Button>
                ) : null}
            </div>
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
                            <>
                                <div className={classes.containerContentSlider}>
                                    <div className={classes.containerChangeSlider}>
                                        <span className={classes.titleSwitch}>Change</span>:
                                        <GranularitySwitch
                                            firstItemName="Only Max"
                                            secondItemName="Min & Max"
                                            useFineGranularity={useFineGranularity}
                                            setUseFineGranularity={setUseFineGranularity}
                                        />
                                    </div>
                                    <div className={classes.wrapSlider}>
                                        <div className={classes.wrapItemSlider}>
                                            {useFineGranularity ? (
                                                <Slider
                                                    className={cx(
                                                        classes.railStyle,
                                                        classes.trackStyle,
                                                        classes.handleStyle,
                                                    )}
                                                    min={itemMin?.min}
                                                    max={itemMax?.max}
                                                    value={onlyMax}
                                                    step={null}
                                                    dots
                                                    marks={marks}
                                                    onChange={(value) => setOnlyMax(value)}
                                                    handle={MyHandle}
                                                />
                                            ) : (
                                                <Slider.Range
                                                    handle={MyHandle}
                                                    className={cx(
                                                        classes.railStyle,
                                                        classes.trackStyle,
                                                        classes.handleStyle,
                                                    )}
                                                    step={null}
                                                    dots
                                                    marks={marks}
                                                    value={minMax}
                                                    onChange={(value) => setMinMax(value)}
                                                    defaultValue={[10, 50]}
                                                    min={itemMin?.min}
                                                    max={itemMax?.max}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className={classes.groupEmptyValue}
                                            onClick={() => setEmptyValue(!emptyValue)}
                                        >
                                            <input type="checkbox" checked={emptyValue} onChange={() => {}} />
                                            <div>Empty value</div>
                                        </div>
                                    </div>
                                    <div className={classes.footerSliderFilter}>
                                        <div className={classes.footerIcon}>
                                            <IconInterActivity />
                                        </div>
                                        <div>Click and drag in order to change filter criteria</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};
