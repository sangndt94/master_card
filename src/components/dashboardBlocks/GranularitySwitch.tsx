// (C) 2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import ButtonLink from "../utils/ButtonLink";
import theme from "../../utils/theme";

interface IGranularitySwitchProps {
    useFineGranularity: boolean;
    setUseFineGranularity: (value: boolean) => void;
    firstItemName?: string;
    secondItemName?: string;
}

const GranularitySwitch: React.FC<IGranularitySwitchProps> = ({
    useFineGranularity,
    setUseFineGranularity,
    firstItemName = "Monthly",
    secondItemName = "Quarterly",
}) => {
    return (
        <div className="GranularitySwitch">
            {/* language=CSS */}
            <style jsx>
                {`
                    .GranularitySwitch {
                        display: flex;
                        flex: 0 1 auto;
                        max-width: 50%;
                        flex-direction: row;
                        margin-left: ${theme.spacing}px;
                        margin-top: -${theme.spacing / 8}px;
                    }
                    .GranularitySwitch :global(.switchButton) {
                        flex: 0 1 auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding-left: 0;
                        padding-right: 0;
                        padding-bottom: ${theme.spacing / 4}px;
                        border-bottom: 3px solid ${theme.color.boxLink};
                        color: ${theme.color.text};
                        text-decoration: none;
                    }
                    .GranularitySwitch :global(.active) {
                        border-bottom-color: ${theme.color.link};
                    }
                `}
            </style>
            <ButtonLink
                className={cx("switchButton", "s-granularity-fine", { active: useFineGranularity })}
                onClick={() => setUseFineGranularity(true)}
                disabled={useFineGranularity}
            >
                {firstItemName}
            </ButtonLink>
            &emsp;
            <ButtonLink
                className={cx("switchButton", "s-granularity-coarse", {
                    active: !useFineGranularity,
                })}
                onClick={() => setUseFineGranularity(false)}
                disabled={!useFineGranularity}
            >
                {secondItemName}
            </ButtonLink>
        </div>
    );
};

export default GranularitySwitch;
