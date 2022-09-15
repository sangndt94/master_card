// (C) 2007-2019 GoodData Corporation
import React, { useEffect } from "react";
import { css, cx } from "emotion";
import Card from "../components/utils/Card";
import Typography from "../components/utils/Typography";
import Button from "../components/controls/Button";
import { IconWarning } from "../components/icon";
import styleGuide from "../components/styleGuide/styleGuide";
import { dataLayer, userData } from "../components/utils/GoogleTagManager";
import { useAuth } from "../contexts/AuthContext";

export interface IDisclaimerPageProps {
    className?: string;
    onConfirm: () => void;
}

const classes = {
    root: css({
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: styleGuide.color.bodyBackground,
    }),
    card: css({
        maxWidth: 800,
    }),
    columns: css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }),
    iconWrapper: css({
        flex: "0 0 20%",
        height: "100%",
        padding: styleGuide.spacing(4),
    }),
    reconsiderIconWrapper: css({
        flex: "0 0 10%",
    }),
    icon: css({
        color: styleGuide.color.icons,
    }),
    reconsiderIcon: css({
        color: styleGuide.color.negative,
    }),
    text: css({
        flex: "1 1 auto",
    }),
    heading: css({
        marginBottom: styleGuide.spacing(1),
    }),
    actions: css({
        marginTop: styleGuide.spacing(1),
        textAlign: "right",
    }),
};
export const DisclaimerPage: React.FC<IDisclaimerPageProps> = ({ onConfirm, className }) => {
    const authState = useAuth();
    const user = authState.data;

    useEffect(() => {
        dataLayer({
            ...userData(user),
            event: "pageview",
            page: {
                path: "/disclaimer",
                title: "Disclaimer",
            },
        });
    }, []);

    return (
        <div className={cx(classes.root, className)}>
            <Card className={classes.card} padding={2}>
                <div className={classes.columns}>
                    <div className={classes.iconWrapper}>
                        <IconWarning className={classes.icon} height="100%" width="100%" />
                    </div>
                    <div className={classes.text}>
                        <Typography variant="productTitle" className={classes.heading}>
                            Disclaimer
                        </Typography>
                        <Typography variant="body">
                            Please note that this application contains Confidential Customer Data, and this
                            Customer Data is prohibited from being shared with any entity not contractually
                            obligated to receive it, unless it has been approved as sufficiently aggregated
                            and anonymized. If you have any questions on this process, please reach out to
                            your assigned Data Privacy Counsel or Data Strategy Lead. Alternatively, you may
                            send your request to <strong>Privacy and Data Protection (Analytics)</strong>{" "}
                            <Button Component="a" href="mailto:PDPanalytics@mastercard.com" variant="text">
                                PDPanalytics@mastercard.com
                            </Button>
                        </Typography>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button onClick={onConfirm}>Agree</Button>
                </div>
            </Card>
        </div>
    );
};

export default DisclaimerPage;
