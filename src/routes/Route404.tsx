// (C) 2007-2019 GoodData Corporation
import React from "react";
import { ErrorComponent } from "@gooddata/react-components";

export const Route404: React.FC = () => (
    <ErrorComponent
        icon="icon-ghost"
        className="s-default-Error"
        message="The requested page could not be found"
        height={200}
    />
);

export default Route404;
