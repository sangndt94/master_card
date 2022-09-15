// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { numberFormat } from "@gooddata/numberjs";
import styleGuide, { TypographyVariant } from "../styleGuide/styleGuide";
import { makeStyles } from "@material-ui/styles";
import { defaultNumberFormat } from "./CustomHeadline";
import ResponsiveText from "../utils/ResponsiveText";
import { IColorFormatStyle, parseTextWithColorFormat } from "../../utils/format";

export interface IKpiProps {
    value: number | null;
    format?: string;
    className?: string;
    kpiClassName?: string;
    Component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    fontSize?: number;
    typographyVariant?: TypographyVariant;
    responsive?: boolean;
    beforeContent?: string | React.ReactElement;
    afterContent?: string | React.ReactElement;
}

const useStyles = makeStyles<
    typeof styleGuide,
    { valueStyle: IColorFormatStyle } & IKpiProps,
    "root" | "valueStyle" | "responsive"
>({
    root: {
        textAlign: "center",
    },
    responsive: {
        height: "100%",
    },
    valueStyle: ({ valueStyle = {}, fontSize, typographyVariant }) => ({
        display: "inline-block",
        position: "relative",
        ...styleGuide.typography.variant[typographyVariant],
        height: styleGuide.typography.variant[typographyVariant]
            ? styleGuide.typography.variant[typographyVariant].lineHeight
            : styleGuide.typography.variant.kpi.lineHeight,
        fontSize,
        ...valueStyle,
    }),
});

const Kpi = <T extends {}>(props: IKpiProps & T): JSX.Element => {
    const {
        value,
        format = defaultNumberFormat,
        className,
        kpiClassName,
        Component = "div",
        typographyVariant = "kpi",
        fontSize = styleGuide.typography.fontSize[typographyVariant] || styleGuide.typography.fontSize.kpi,
        responsive = false,
        beforeContent,
        afterContent,
        ...restProps
    } = props;
    const isNoData = value === null;
    const { valueFormatted, valueStyle } = isNoData
        ? {
              valueFormatted: "NO DATA",
              valueStyle: {
                  color: styleGuide.color.goodDataErrorColor,
              },
          }
        : parseTextWithColorFormat(numberFormat(value, format));
    const classes = useStyles({
        ...props,
        valueStyle,
        // props with defaults need to be forwarded individually
        typographyVariant,
        Component,
        format,
        fontSize,
        responsive,
    });

    const content = responsive ? (
        <ResponsiveText max={fontSize} className={classes.responsive}>
            {valueFormatted}
        </ResponsiveText>
    ) : (
        valueFormatted
    );

    return (
        <Component className={cx(classes.root, className, "s-Kpi")} {...restProps}>
            {beforeContent}
            <span className={cx(classes.valueStyle, kpiClassName, "s-Kpi-value")} {...restProps}>
                {content}
            </span>
            {afterContent}
        </Component>
    );
};

export default Kpi;
