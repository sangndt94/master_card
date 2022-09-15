// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";
import { numberFormat } from "@gooddata/numberjs";
import { parseTextWithColorFormat } from "../../utils/format";
import ResponsiveText from "../utils/ResponsiveText";
import styleGuide from "../styleGuide/styleGuide";
import { makeStyles } from "@material-ui/styles";

export interface ICustomHeadlineProps {
    currentValue: number;
    currentValueFormat: string;
    lastValue: number;
    className?: string;
    lastValueLabel?: string;
    rateFormat?: string;
}

export const percentFormat = "#,##0.00%";
export const arrowPercentFormat =
    "[<0][color=D7373D]⬇ -#,#.#%;[=0][color=464E56] 0%;[>=0][color=628020]⬆ #,#.#%";
export const defaultNumberFormat = "#,##0.00";

const useStyles = makeStyles<typeof styleGuide, any>({
    currentValue: ({ currentValueFormattedStyle = {} }) => ({
        height: theme.fontSize.kpi,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "stretch",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1em",
        ...currentValueFormattedStyle,
    }),
    details: {
        marginTop: styleGuide.spacing(1),
        textAlign: "center",
    },
    indicator: ({ rateIsPositive, rateIsNegative }) => ({
        color:
            (rateIsPositive && styleGuide.color.positive) ||
            (rateIsNegative && styleGuide.color.negative) ||
            "inherit",
    }),
    rate: ({ rateIsValid, rateFormattedStyle, rateIsPositive, rateIsNegative }) => ({
        display: rateIsValid ? "inline" : "none",
        fontWeight: "bold",
        fontSize: theme.fontSize.h4,
        color:
            (rateIsPositive && styleGuide.color.positive) ||
            (rateIsNegative && styleGuide.color.negative) ||
            "inherit",
        ...rateFormattedStyle,
    }),
    lastMeasure: {
        fontWeight: "bold",
        fontSize: theme.fontSize.h4,
        color: theme.color.textLightest,
    },
});

const CustomHeadline: React.FC<ICustomHeadlineProps> = ({
    currentValue,
    currentValueFormat = defaultNumberFormat,
    lastValue,
    lastValueLabel = null,
    rateFormat = percentFormat,
    className,
    ...restProps
}) => {
    const {
        valueFormatted: currentValueFormatted,
        valueStyle: currentValueFormattedStyle,
    } = parseTextWithColorFormat(numberFormat(currentValue, currentValueFormat));
    const rate = (currentValue - lastValue) / lastValue;
    const { valueFormatted: rateFormatted, valueStyle: rateFormattedStyle } = parseTextWithColorFormat(
        numberFormat(rate, rateFormat),
    );
    const rateIsValid = !isNaN(rate) && isFinite(rate);
    const rateIsNegative = rate < 0;
    const rateIsPositive = rate > 0;

    const classes = useStyles({
        currentValueFormattedStyle,
        rateIsValid,
        rateIsNegative,
        rateIsPositive,
        rateFormattedStyle,
    });
    return (
        <div className={cx(className)} {...restProps}>
            <ResponsiveText className={cx(classes.currentValue, "s-currentValue")} max={theme.fontSize.kpi}>
                {currentValueFormatted}
            </ResponsiveText>
            {(rateIsValid || lastValueLabel) && (
                <div className={classes.details}>
                    {rateIsValid && (
                        <span className={cx(classes.rate, "s-rateFormatted")}>{rateFormatted}</span>
                    )}
                    &emsp;
                    <span className={cx(classes.lastMeasure, "s-lastMeasure")}>{lastValueLabel}</span>
                </div>
            )}
        </div>
    );
};

export default CustomHeadline;
