// (C) 2007-2019 GoodData Corporation
import React from "react";
import { cx } from "emotion";
import { makeStyles } from "@material-ui/styles";

import styleGuide from "../styleGuide/styleGuide";
import { IIconProps } from "../icon/Icon";
import { IconError } from "../icon";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    readOnly?: boolean;
    Icon?: React.ComponentType<IIconProps>;
    Component?: React.ElementType<React.InputHTMLAttributes<HTMLInputElement>>;
    inputClassName?: string;
    onIconClick?: () => void;
    iconClassName?: string;
}

const inputBorderSize = 1;

const useStyles = makeStyles<typeof styleGuide, IInputProps>({
    root: {
        position: "relative",
    },
    input: ({ readOnly, error, Icon }) => {
        const readOnlyProps = readOnly
            ? {
                  backgroundColor: styleGuide.color.bodyBackground,
                  borderColor: styleGuide.color.borderMuted,
                  color: styleGuide.color.textMuted,
                  "&:hover, &:focus": {
                      borderColor: styleGuide.color.borderMuted,
                  },
              }
            : {};
        const errorProps = error
            ? {
                  borderColor: styleGuide.color.alert,
              }
            : {};
        const iconProps = Icon ? { paddingRight: `calc(1.5em + ${styleGuide.spacing(2)})` } : {};
        return {
            ...styleGuide.typography.variant.label,
            width: "100%",
            borderRadius: styleGuide.borderRadius,
            backgroundColor: styleGuide.color.mainBackground,
            color: styleGuide.color.textMain,
            borderWidth: inputBorderSize,
            borderStyle: "solid",
            borderColor: styleGuide.color.border,
            padding: styleGuide.spacingUnit - inputBorderSize,
            boxSizing: "border-box",
            "&::placeholder": {
                color: styleGuide.color.textFieldFiller,
            },
            "&:hover, &:focus": {
                borderColor: styleGuide.color.textMain,
            },
            ...readOnlyProps,
            ...errorProps,
            ...iconProps,
        };
    },
    icon: ({ error, onIconClick }) => {
        return {
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            right: styleGuide.spacing(1),
            height: "1.5em",
            width: "1.5em",
            color: error ? styleGuide.color.negative : styleGuide.color.icons,
            cursor: onIconClick ? "pointer" : "default",
        };
    },
});

const Input: React.FC<IInputProps> = ({
    className = null,
    inputClassName,
    readOnly = false,
    error = null,
    Component = "input",
    children,
    Icon = error && IconError,
    onIconClick,
    iconClassName,
    ...restProps
}) => {
    const classes = useStyles({ readOnly, error, Icon, onIconClick });
    return (
        <div className={cx(classes.root, className)}>
            <Component className={cx(classes.input, inputClassName)} readOnly={readOnly} {...restProps} />
            {Icon && <Icon onIconClick={onIconClick} className={cx(classes.icon, iconClassName)} />}
        </div>
    );
};

export default Input;
