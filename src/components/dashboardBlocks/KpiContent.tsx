// (C) 2019 GoodData Corporation
import React from "react";
import { Kpi } from "@gooddata/react-components";
import { SDK } from "@gooddata/gooddata-js";
import cx from "classnames";

import theme from "../../utils/theme";
import InlineError from "../utils/InlineError";
import Heading from "../utils/Heading";
import CustomLoading from "../utils/CustomLoading";

const InlineLoading = () => <CustomLoading inline height="0.7em" />;

interface IKpiContentProps {
    sdk: SDK;
    projectId: string;
    header: string;
    measureIdentifier: string;
    filters?: any[];
    className?: string;
}

const KpiContent: React.FC<IKpiContentProps> = ({
    sdk,
    projectId,
    header,
    measureIdentifier,
    filters = [],
    className,
}) => {
    return (
        <div className={cx("KpiContent", className, "s-kpi-block", `s-kpi-block-${measureIdentifier}`)}>
            {/* language=CSS */}
            <style jsx>{`
                .KpiContent {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: center;
                }
                .KpiContent :global(.DashboardBlock) {
                    min-height: ${theme.fontSize.body * 5}px;
                }
                .Kpi {
                    font-size: ${theme.fontSize.kpi}px;
                    font-weight: bold;
                    margin: 0;
                    padding: 0;
                    height: auto;
                    line-height: ${theme.lineHeight.kpi};
                    white-space: nowrap;
                }
                .box :global(.Heading) {
                    text-transform: uppercase;
                    margin: 0 0 ${theme.spacing / 2}px 0;
                }
            `}</style>
            <Heading level={4} className="Heading">
                {header}
            </Heading>
            <div className="Kpi">
                <Kpi
                    sdk={sdk}
                    projectId={projectId}
                    filters={filters}
                    measure={measureIdentifier}
                    ErrorComponent={InlineError}
                    LoadingComponent={InlineLoading}
                />
            </div>
        </div>
    );
};

export default KpiContent;
