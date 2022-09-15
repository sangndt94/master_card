// (C) 2020 GoodData Corporation

import React, { ReactNode, useState } from "react";
import VisualizationBlockBase from "./VisualizationBlockBase";
import Grid from "../utils/Grid";
import { css, cx } from "emotion";
import styleGuide from "../styleGuide/styleGuide";
import VisualizationBlock, { IVisualizationBlockProps } from "./VisualizationBlock";

const classes = {
    valueSelection: css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    }),
    selection: css({
        width: "1rem",
        height: "1rem",
        lineHeight: "1rem",
        padding: styleGuide.spacing(0.5),
        borderStyle: "solid",
        borderWidth: 2,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
    }),
    selectionFirst: css({
        borderRadius: `${styleGuide.borderRadius}px 0 0 ${styleGuide.borderRadius}px`,
    }),
    selectionLast: css({
        borderRadius: `0 ${styleGuide.borderRadius}px ${styleGuide.borderRadius}px 0`,
    }),
    activeValue: css({
        color: styleGuide.color.main,
        borderColor: styleGuide.color.main,
    }),
    inactiveValue: css({
        color: styleGuide.color.icons,
        borderColor: styleGuide.color.icons,
    }),
};

const defaultVisualization = (props: IVisualizationBlockProps) => (identifier: string): ReactNode => (
    <VisualizationBlock {...props} identifier={identifier} />
);

interface SelectionArray extends Array<SelectionArray | SelectionValue> {}

export interface SelectionValue {
    identifier: string;
    visualizationOverride?: (string) => ReactNode;
}

export interface IIdentifierSelectorProps extends Partial<IVisualizationBlockProps> {
    headerLeft?: ReactNode;
    headerRight?: ReactNode;
    values: ReactNode[][];
    selectionMap: SelectionArray;
}

export const IdentifierSelector: React.FC<IIdentifierSelectorProps> = ({
    headerLeft,
    headerRight,
    values,
    selectionMap,
    ...props
}) => {
    const [active, setActive] = useState<number[]>(Array(values.length).fill(0));

    const valueSelection = (
        <div className={classes.valueSelection}>
            {values.map((group, groupIndex) =>
                group.map((value, index) => (
                    <div
                        key={`${groupIndex}-${index}`}
                        className={cx(
                            classes.selection,
                            index === active[groupIndex] ? classes.activeValue : classes.inactiveValue,
                            index === 0 && classes.selectionFirst,
                            index === values[groupIndex].length - 1 && classes.selectionLast,
                        )}
                        onClick={() =>
                            setActive(
                                active.map((a, activeIndex) => (activeIndex === groupIndex ? index : a)),
                            )
                        }
                    >
                        {value}
                    </div>
                )),
            )}
        </div>
    );

    let current: SelectionArray | SelectionValue = selectionMap[active[0]];
    for (let i = 1; i < active.length; i++) {
        current = current[active[i]];
    }

    const selected = current as SelectionValue;
    const visualization = selected.visualizationOverride
        ? selected.visualizationOverride
        : defaultVisualization({
              header: "",
              projectId: "",
              identifier: "",
              ...props,
          });

    return (
        <VisualizationBlockBase height="auto">
            <Grid md={(headerRight ? 1 : 0) + (headerLeft ? 1 : 0) + active.length}>
                {headerLeft}
                {valueSelection}
                {headerRight}
            </Grid>

            {visualization(selected.identifier)}
        </VisualizationBlockBase>
    );
};
