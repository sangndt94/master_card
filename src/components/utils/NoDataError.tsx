// (C) 2007-2019 GoodData Corporation
import React from "react";
import { ErrorComponent } from "@gooddata/react-components";
import { IErrorProps } from "@gooddata/react-components/dist/components/simple/ErrorComponent";

const NoDataError: React.FC<{ Component?: React.ComponentType<IErrorProps> }> = ({
    Component = ErrorComponent,
    ...restProps
}) => <Component icon="icon-filter" message="No data" code="204" {...restProps} />;

export default NoDataError;
