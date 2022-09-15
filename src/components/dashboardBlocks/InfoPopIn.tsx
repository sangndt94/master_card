// (C) 2020 GoodData Corporation
import { css, cx } from "emotion";
import React from "react";
import Button from "../controls/Button";
import styleGuide from "../styleGuide/styleGuide";
import { IconThickInfo } from "../icon";

const classes = {
    popIn: css({
        position: "fixed",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        background: "rgb(0, 0, 0, 0.3)",
        backdropFilter: "blur(4px)",
    }),
    innerPopIn: css({
        position: "absolute",
        top: "25%",
        left: "25%",
        right: "25%",
        bottom: "auto",
        width: "auto",
        margin: "auto",
        padding: styleGuide.spacing(2),
        borderRadius: styleGuide.borderRadius,
        background: styleGuide.color.white,
        boxShadow: styleGuide.shadow.low,
        display: "flex",
        flexDirection: "column",
    }),
    closeButton: css({
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
    }),
    icon: css({
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
        marginTop: "-40px",
        height: "25px",
        width: "25px",
        padding: "12.5px",
        borderRadius: "50%",
        backgroundColor: styleGuide.color.icons,
        color: styleGuide.color.white,
    }),
};

export interface IInfoPopInProps {
    setDisplayPopIn: (value: React.SetStateAction<boolean>) => void;
}

const InfoPopIn: React.FC<React.PropsWithChildren<IInfoPopInProps>> = ({ children, setDisplayPopIn }) => {
    const closePopIn = () => setDisplayPopIn(false);

    return (
        <div onClick={closePopIn} className={classes.popIn}>
            <div onClick={(e) => e.stopPropagation()} className={cx(classes.innerPopIn, "inner-pop-in")}>
                <IconThickInfo className={classes.icon} />
                {children}
                <Button onClick={closePopIn} variant="solid" className={classes.closeButton}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default InfoPopIn;
