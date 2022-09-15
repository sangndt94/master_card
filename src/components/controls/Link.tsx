// (C) 2007-2020 GoodData Corporation
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button, { IButtonProps } from "./Button";

const Link: React.FC<{
    to: string;
    onClick?: () => void;
    variant?: IButtonProps["variant"];
    textVariant?: IButtonProps["textVariant"];
    className?: string;
}> = ({ to, children, onClick, variant, textVariant, className, ...restProps }) => {
    return (
        <RouterLink to={to} {...restProps}>
            <Button className={className} variant={variant} textVariant={textVariant} onClick={onClick}>
                {children}
            </Button>
        </RouterLink>
    );
};

export default Link;
