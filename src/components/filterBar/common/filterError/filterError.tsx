// (C) 2020 GoodData Corporation

import React, { FC } from "react";
import { IProps } from "./interface";
import { FilterMessage } from "../filterMessage";
import IconButton from "../../../controls/IconButton";
import { css } from "emotion";
import styleGuide from "../../../styleGuide/styleGuide";
import { IconError } from "../../../icon";

export const FilterError: FC<IProps> = ({ id, error, clearFilters }) => {
    return (
        <FilterMessage
            className="s-error"
            afterContent={
                <IconButton
                    className={css({ color: styleGuide.color.negative })}
                    onClick={() => clearFilters([id], false)}
                    variant="text"
                    Icon={IconError}
                    iconSize={32}
                    color="negative"
                />
            }
        >
            {error.message}
        </FilterMessage>
    );
};
