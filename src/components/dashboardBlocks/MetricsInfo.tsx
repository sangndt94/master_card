// (C) 2020 GoodData Corporation
import InfoBox from "./InfoBox";
import { IconThickInfo } from "../icon";
import styleGuide from "../styleGuide/styleGuide";
import Button from "../controls/Button";
import React, { useState } from "react";
import InfoPopIn from "./InfoPopIn";
import Typography from "../utils/Typography";
import { headers, texts } from "./metricsDesc";
import { css } from "emotion";

const classes = {
    gap: css({
        marginBottom: styleGuide.spacing(1),
    }),
};

interface IMetricsInfoProps {
    size?: number;
    metricKeys: string[];
}

const MetricsInfo: React.FC<IMetricsInfoProps> = ({ size, metricKeys }) => {
    const [infoPopIn, setInfoPopIn] = useState(false);

    return (
        <>
            <InfoBox
                size={size}
                icon={<IconThickInfo height="25px" width="25px" color={styleGuide.color.textSecondary} />}
            >
                For more information on how the displayed measures are calculated,
                <Button onClick={() => setInfoPopIn(true)} variant="text" color="main" colorActive="textMain">
                    &nbsp;<b>click here</b>
                </Button>
                .
            </InfoBox>
            {infoPopIn && (
                <InfoPopIn setDisplayPopIn={setInfoPopIn}>
                    {metricKeys.map((key) => (
                        <div key={key}>
                            <Typography variant="caption" className={classes.gap}>
                                {headers[key]}
                            </Typography>
                            <Typography variant="body" className={classes.gap}>
                                {texts[key]}
                            </Typography>
                        </div>
                    ))}
                </InfoPopIn>
            )}
        </>
    );
};

export default MetricsInfo;
