// (C) 2019-2020 GoodData Corporation
import React from "react";
import { cx } from "emotion";

import { IVisualizationBlockBaseProps } from "./VisualizationBlockBase";
import Heading from "../utils/Heading";
import styleGuide from "../styleGuide/styleGuide";
import ContextDescription from "../controls/ContextDescription";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<typeof styleGuide, IBlockContentProps>({
    HeadingWrapper: {
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "end",
        marginBottom: styleGuide.spacing(2),
    },
    Heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: "1 1 auto",
        marginBottom: "0 !important", // overrule global "Heading" class
    },
    DescriptionSpacing: {
        marginLeft: styleGuide.spacing(2),
    },
    Padding: {
        width: styleGuide.spacing(3),
    },
    Subtitle: {
        fontSize: styleGuide.typography.fontSize.body,
        marginTop: styleGuide.spacing(-1.75),
        marginBottom: styleGuide.spacing(1),
        color: styleGuide.color.textMain,
    },
});

interface IBlockContentProps {
    className?: string;
    header?: IVisualizationBlockBaseProps["header"];
    footer?: React.ReactNode;
    switchTab?: React.ReactNode;
    description?: IVisualizationBlockBaseProps["description"];
    controls?: React.ReactElement;
    alignCenter?: boolean;
    subtitle?: string | React.ReactNode;
}

const BlockContent: React.FC<IBlockContentProps> = ({
    header,
    footer,
    switchTab,
    description,
    controls,
    subtitle,
    children,
    alignCenter,
}) => {
    const classes = useStyles({ controls });
    return (
        <>
            {(header || controls || description) && (
                <div className={classes.HeadingWrapper}>
                    <Heading level={4} className={cx("Heading", classes.Heading)} center={alignCenter}>
                        {header}
                        {description && (
                            <ContextDescription className={cx(header && classes.DescriptionSpacing)}>
                                {description}
                            </ContextDescription>
                        )}
                    </Heading>
                    {switchTab}
                    {controls && (
                        <>
                            <div className={classes.Padding} />
                            {controls}
                        </>
                    )}
                </div>
            )}
            {subtitle && <div className={classes.Subtitle}>{subtitle}</div>}
            {children}
            {footer && (
                <Heading level={4} className={cx("Heading", classes.Heading)}>
                    {footer}
                </Heading>
            )}
        </>
    );
};

export default BlockContent;
