// (C) 2020 GoodData Corporation
import React from "react";
import { css, cx } from "emotion";
import Card from "../utils/Card";
import Typography from "../utils/Typography";
import styleGuide from "../styleGuide/styleGuide";
import { Col } from "react-grid-system";

const classes = {
    outerBox: css({
        paddingLeft: styleGuide.spacing(1),
        paddingRight: styleGuide.spacing(1),
        marginBottom: styleGuide.spacing(2),
        marginLeft: 0,
        marginRight: 0,
        display: "flex",
    }),
    info: css({
        padding: styleGuide.spacing(1, 2),
        flex: 1,
        display: "flex",
    }),
    icon: css({
        display: "inline-block",
        width: "auto",
        marginRight: styleGuide.spacing(2),
        verticalAlign: "middle",
        flex: "0 1 0%",
    }),
    text: css({
        color: styleGuide.typography.color.secondary,
        verticalAlign: "middle",
    }),
};

interface IInfoBoxProps {
    className?: string;
    size?: number;
    icon: React.ReactNode;
}

const InfoBox: React.FC<React.PropsWithChildren<IInfoBoxProps>> = ({
    className,
    size = 12,
    children,
    icon,
}) => {
    return (
        <Col lg={size} className={classes.outerBox}>
            <Card color="mainBackground" className={cx(classes.info, className)}>
                <div className={classes.icon}>{icon}</div>
                <Typography variant="label" className={classes.text} Component="span">
                    {children}
                </Typography>
            </Card>
        </Col>
    );
};

export default InfoBox;
