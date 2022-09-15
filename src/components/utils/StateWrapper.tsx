// (C) 2007-2019 GoodData Corporation
import React from "react";
import { css } from "emotion";
import CustomLoading from "./CustomLoading";
import { IState as IUsePromiseState } from "../../hooks/usePromise";
import { ErrorComponent as RCErrorComponent } from "@gooddata/react-components";
import NoDataError from "./NoDataError";
import { IErrorProps } from "@gooddata/react-components/dist/components/simple/ErrorComponent";
import Typography from "./Typography";
import styleGuide from "../styleGuide/styleGuide";

export interface IStateWrapperProps<V> extends IUsePromiseState<V> {
    children: JSX.Element;
    ErrorComponent?: React.ComponentType<IErrorProps>;
    LoadingComponent?: React.ComponentType;
    title?: string;
}

const classes = {
    title: css({
        marginBottom: styleGuide.spacing(1),
        textAlign: "center",
    }),
};

const StateWrapper = <V, _>({
    isPending,
    error,
    value = null,
    ErrorComponent = RCErrorComponent,
    LoadingComponent = CustomLoading,
    title,
    children,
}: IStateWrapperProps<V>): JSX.Element => {
    if (isPending) {
        return <LoadingComponent />;
    }
    if (error) {
        return <ErrorComponent message={error.message} />;
    }
    if (value === null) {
        return title ? (
            <>
                <Typography variant="kpiCaption" className={classes.title}>
                    {title}
                </Typography>
                <NoDataError Component={ErrorComponent} />
            </>
        ) : (
            <NoDataError Component={ErrorComponent} />
        );
    }
    return children;
};

export default StateWrapper;
