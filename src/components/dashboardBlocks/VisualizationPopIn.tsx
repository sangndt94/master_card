// (C) 2020 GoodData Corporation
import { css, cx } from "emotion";
import React, { useContext } from "react";
import { Global } from "@emotion/core";
import Button from "../controls/Button";
import styleGuide from "../styleGuide/styleGuide";
import MessagesBase from "@gooddata/goodstrap/lib/Messages/MessagesBase";
import { MessagesContext } from "../../contexts/MessagesContext";

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
        width: "fit-content",
        margin: "auto",
        padding: styleGuide.spacing(4),
        borderRadius: styleGuide.borderRadius,
        background: styleGuide.color.white,
        boxShadow: styleGuide.shadow.low,
    }),
    closeButton: css({
        float: "right",
        marginTop: "10px",
    }),
};

export interface IVisualizationPopInProps {
    setDisplayPopIn: (value: React.SetStateAction<boolean>) => void;
}

const VisualizationPopIn: React.FC<IVisualizationPopInProps> = ({ setDisplayPopIn, children }) => {
    const closePopIn = () => setDisplayPopIn(false);
    const { messages, removeMessage } = useContext(MessagesContext);
    const displayedMessages = messages.filter((message) => message.isPopIn);

    return (
        <div onClick={closePopIn} className={classes.popIn}>
            <Global
                styles={{
                    ".gd-message": {
                        transform: "translateY(-50%)",
                    },
                }}
            />
            <div onClick={(e) => e.stopPropagation()} className={cx(classes.innerPopIn, "inner-pop-in")}>
                <MessagesBase onMessageClose={removeMessage} messages={displayedMessages} />
                {children}
                <Button onClick={closePopIn} variant="solid" className={classes.closeButton}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default VisualizationPopIn;
