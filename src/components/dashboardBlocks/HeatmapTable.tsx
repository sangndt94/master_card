// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";

import styleGuide from "../styleGuide/styleGuide";
import { css } from "emotion";
import Typography from "../utils/Typography";

const classes = {
    colorscaleBlock: css({
        display: "inline-block",
        width: styleGuide.spacing(3),
        height: styleGuide.spacing(3),
        marginLeft: styleGuide.spacing(0.1),
        marginRight: styleGuide.spacing(0.1),
    }),
    colorscaleBegin: css({
        borderRadius: "50% 0 0 50%",
        marginLeft: styleGuide.spacing(2),
    }),
    colorscaleEnd: css({
        borderRadius: "0 50% 50% 0",
        marginRight: styleGuide.spacing(2),
    }),
    scale: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: styleGuide.spacing(2),
    }),
    label: css({
        backgroundColor: styleGuide.color.icons,
    }),
    tableWidth: css({
        tableLayout: "fixed",
        width: "100%",
    }),
    filtered: css({
        filter: "opacity(0.25)",
    }),
};

const colorScale = (bucketColors: string[]) => (
    <div className={classes.scale}>
        <Typography Component="span" variant="label">
            Low
        </Typography>
        {bucketColors.map((color, index) => (
            <span
                key={index}
                className={cx(
                    classes.colorscaleBlock,
                    index === 0 && classes.colorscaleBegin,
                    index === bucketColors.length - 1 && classes.colorscaleEnd,
                )}
                style={{ backgroundColor: color }}
            >
                &nbsp;
            </span>
        ))}
        <Typography Component="span" variant="label">
            High
        </Typography>
    </div>
);

type MaxMinType = "row" | "column" | "global";
type ClickHandler = (xIndex, yIndex) => void;

interface IHeatmapTableProps {
    data: number[][];
    maxMinType: MaxMinType;
    xLabels: string[];
    yLabels: string[];
    xHeader?: React.ReactNode | string | undefined;
    yHeader?: React.ReactNode | string | undefined;
    bucketColors?: string[];
    className?: string;
    filtered?: boolean[] | boolean[][];
    onClick?: ClickHandler;
}

const transpose = (a) => Object.keys(a[0]).map((c) => a.map((r) => r[c]));

const rowSteps = (data: number[][], buckets: number): number[] => {
    return data.map(
        (row) =>
            (Math.max(...row.filter((x) => isNumber(x))) - Math.min(...row.filter((x) => isNumber(x)))) /
            buckets,
    );
};

const computeSteps = (data: number[][], buckets: number, maxMinType: MaxMinType): number[] => {
    if (maxMinType === "row") {
        return rowSteps(data, buckets);
    } else if (maxMinType === "column") {
        return rowSteps(transpose(data), buckets);
    } else {
        // global by default
        return [
            (Math.max(...[].concat(...data).filter((x) => isNumber(x))) -
                Math.min(...[].concat(...data).filter((x) => isNumber(x)))) /
                buckets,
        ];
    }
};

const computeMinValue = (data: number[][], maxMinType: MaxMinType): number[] => {
    if (maxMinType === "row") {
        return data.map((row) => Math.min(...row.filter((x) => isNumber(x))));
    } else if (maxMinType === "column") {
        return transpose(data).map((row) => Math.min(...row.filter((x) => isNumber(x))));
    } else {
        // global by default
        return [Math.min(...[].concat(...data).filter((x) => isNumber(x)))];
    }
};

const isNumber = (value: number): boolean => !(isNaN(value) || value === null);

const selectSingleColor = (value: number, bucketColors: string[], minValue: number, step: number) => {
    if (step === 0) {
        return bucketColors[0];
    }

    return bucketColors[
        Math.floor(Math.min(Math.max((value - minValue) / step, 0), bucketColors.length - 1))
    ];
};

const selectColor = (
    value: number,
    row: number,
    column: number,
    steps: number[],
    minValues: number[],
    bucketColors: string[],
    maxMinType: MaxMinType,
): string => {
    if (!isNumber(value)) {
        return null;
    } else {
        if (maxMinType === "row") {
            return selectSingleColor(value, bucketColors, minValues[row], steps[row]);
        } else if (maxMinType === "column") {
            return selectSingleColor(value, bucketColors, minValues[column], steps[column]);
        } else {
            // global by default
            return selectSingleColor(value, bucketColors, minValues[0], steps[0]);
        }
    }
};

const filterStyle = (
    maxMinType: MaxMinType,
    filtered: boolean[] | boolean[][] | undefined,
    x: number,
    y: number,
): string | undefined => {
    if (filtered) {
        if (maxMinType === "row") {
            if (y > -1 && filtered[y]) {
                return classes.filtered;
            }
        } else if (maxMinType === "column") {
            if (x > -1 && filtered[x]) {
                return classes.filtered;
            }
        } else {
            if (x > -1 && y > -1 && filtered[x][y]) {
                return classes.filtered;
            }
        }
    }

    return undefined;
};

export const HeatmapTable: React.FC<IHeatmapTableProps> = ({
    data,
    maxMinType,
    xLabels,
    yLabels,
    xHeader,
    yHeader,
    className,
    onClick,
    filtered,
    bucketColors = [
        styleGuide.colorGradient.teal["2"],
        styleGuide.colorGradient.teal["1"],
        styleGuide.colorGradient.teal["0"],
        styleGuide.colorGradient.yellow["0"],
        styleGuide.colorGradient.yellow["1"],
        styleGuide.colorGradient.gold["1"],
        styleGuide.colorGradient.gold["2"],
        styleGuide.colorGradient.gold["3"],
        styleGuide.colorGradient.orange["2"],
        styleGuide.colorGradient.orange["3"],
    ],
}) => {
    const steps = computeSteps(data, bucketColors.length, maxMinType);
    const minValue = computeMinValue(data, maxMinType);
    const transformed: string[][] = data.map((row, rowIndex) =>
        row.map((value, colIndex) =>
            selectColor(value, rowIndex, colIndex, steps, minValue, bucketColors, maxMinType),
        ),
    );

    return (
        <div className={className}>
            <table className={classes.tableWidth}>
                <tbody>
                    {xHeader && (
                        <tr>
                            <th />
                            <th colSpan={xLabels.length}>{xHeader}</th>
                        </tr>
                    )}
                    <tr>
                        {yHeader ? <th className={classes.label}>{yHeader}</th> : <th />}
                        {xLabels.map((label, index) => (
                            <th
                                key={index}
                                className={cx(classes.label, filterStyle(maxMinType, filtered, -1, index))}
                                onClick={() => onClick && onClick(-1, index)}
                            >
                                <Typography variant="kpiCaption" Component="span">
                                    {label}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    {yLabels.map((label, index) => (
                        <tr key={index}>
                            <th
                                className={cx(classes.label, filterStyle(maxMinType, filtered, index, -1))}
                                onClick={() => onClick && onClick(index, -1)}
                            >
                                <Typography Component="span" variant="label">
                                    {label}
                                </Typography>
                            </th>
                            {transformed[index].map((color, rindex) =>
                                color ? (
                                    <td
                                        key={rindex}
                                        className={filterStyle(maxMinType, filtered, index, rindex)}
                                        style={{ backgroundColor: color }}
                                        onClick={() => onClick && onClick(index, rindex)}
                                    >
                                        &nbsp;
                                    </td>
                                ) : (
                                    <td
                                        key={rindex}
                                        className={filterStyle(maxMinType, filtered, index, rindex)}
                                        onClick={() => onClick && onClick(index, rindex)}
                                    >
                                        &nbsp;
                                    </td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {colorScale(bucketColors)}
        </div>
    );
};
