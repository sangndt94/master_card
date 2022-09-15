// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import ButtonLink from "../utils/ButtonLink";
import theme from "../../utils/theme";
import styleGuide from "../styleGuide/styleGuide";

interface IGranularitySwitchByItem {
    item?: any;
    useGranularity?: any;
    setUseGranularity: any;
}

const GranularitySwitchByItem: React.FC<IGranularitySwitchByItem> = ({
    item,
    useGranularity,
    setUseGranularity,
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
                        border-bottom-color: ${styleGuide.color.main};
                    }
                `}
            </style>
            <ButtonLink
                className={cx("switchButton", "s-granularity-fine", {
                    active: useGranularity === item.title,
                })}
                onClick={() => setUseGranularity(item.title)}
                disabled={useGranularity === item.title}
            >
                {item.title}
            </ButtonLink>
        </div>
    );
};

export default GranularitySwitchByItem;
