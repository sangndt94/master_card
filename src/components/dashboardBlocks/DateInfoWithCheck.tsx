// (C) 2020 GoodData Corporation
import React from "react";
import DateInfo, { IDateInfoProps } from "../moto/DateInfo";
import sdk from "../../sdk";
import { Kpi } from "@gooddata/react-components";
import InlineError from "../utils/InlineError";
import CustomLoading from "../utils/CustomLoading";
import { AFM } from "@gooddata/typings";

const InlineLoading = () => <CustomLoading inline height="0.7em" />;

interface IDateInfoWithCheckProps extends IDateInfoProps {
    filters?: AFM.FilterItem[];
}

const DateInfoWithCheck: React.FC<IDateInfoWithCheckProps> = (props) => {
    return (
        <DateInfo
            {...props}
            additionalContent={
                <>
                    .<br />
                    <Kpi
                        sdk={sdk}
                        projectId={props.projectId}
                        filters={props.filters}
                        measure="_svc_benchmark_check"
                        ErrorComponent={InlineError}
                        LoadingComponent={InlineLoading}
                    />
                </>
            }
        />
    );
};

export default DateInfoWithCheck;
