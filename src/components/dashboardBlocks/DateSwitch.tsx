// (C) 2019 GoodData Corporation
import React from "react";
import { css } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import { RadioInput } from "../utils/inputs";
import Typography from "../utils/Typography";
import ContextDescription from "../controls/ContextDescription";
import { IconInfo } from "../icon";

const classes = {
    dateSwitch: css({
        display: "flex",
        flex: "0 1 auto",
        maxWidth: "50%",
        flexDirection: "column",
        marginLeft: styleGuide.spacing(1),
    }),
    dateSwitchHeader: css({
        marginBottom: styleGuide.spacing(0.5),
        display: "flex",
        position: "relative",
    }),
    dateSwitchLabel: css({
        fontWeight: "bold",
    }),
    contextDescription: css({
        marginLeft: styleGuide.spacing(2),
    }),
};

interface IDateSwitchProps {
    useTransactionDate: boolean;
    setUseTransactionDate: (value: boolean) => void;
}

const DateSwitch: React.FC<IDateSwitchProps> = ({ useTransactionDate, setUseTransactionDate }) => {
    const selectedItems = useTransactionDate ? ["transaction"] : ["entered"];

    return (
        <div className={classes.dateSwitch}>
            <div className={classes.dateSwitchHeader}>
                <Typography variant="label" className={classes.dateSwitchLabel}>
                    Calculate insight from
                </Typography>
                <ContextDescription
                    icon={<IconInfo height="1em" width="1em" />}
                    className={classes.contextDescription}
                >
                    Presented insights will be calculated based on the selected date type
                </ContextDescription>
            </div>
            <div>
                <RadioInput
                    value="entered"
                    selected={selectedItems.includes("entered")}
                    onChange={() => {
                        setUseTransactionDate(false);
                    }}
                >
                    Entered Date
                </RadioInput>
                &emsp;
                <RadioInput
                    value="transaction"
                    selected={selectedItems.includes("transaction")}
                    onChange={() => {
                        setUseTransactionDate(true);
                    }}
                >
                    Transaction Date
                </RadioInput>
            </div>
        </div>
    );
};

export default DateSwitch;
