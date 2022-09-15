// (C) 2020 GoodData Corporation
import React from "react";
import { css } from "emotion";
import useElements, { IUseElementsState } from "../../hooks/useElements";
import { AFM } from "@gooddata/typings";
import { LoadingComponent } from "@gooddata/react-components";
import styleGuide from "../styleGuide/styleGuide";
import InfoBox from "../dashboardBlocks/InfoBox";
import { IconChart } from "../icon";

const classes = {
    loadingIndicator: css({
        display: "inline-block",
        marginRight: styleGuide.spacing(1),
    }),
    date: css({
        color: styleGuide.typography.color.main,
    }),
};

export interface IDateInfoProps {
    className?: string;
    size?: number;
    projectId: string;
    dateAttributeDFIdentifier?: string;
    lastMonthMeasureIdentifier?: string;
    laggedMonthMeasureIdentifier?: string;
    lastMonthOnly?: boolean;
    laggedMonthOnly?: boolean;
    isDateRange?: boolean;
    displayProvisioningTransaction?: boolean;
    additionalContent?: React.ReactNode;
}

const defaultDateAttributeDFIdentifier = "period.acx81lMifn6q";
const defaultLastMonthMeasureIdentifier = "_svc_last_month";
const defaultLaggedMonthMeasureIdentifier = "_svc_lagged_month";

const getCardText = (
    lastMonthState: IUseElementsState,
    laggedMonthState: IUseElementsState,
    lastMonthOnly: boolean,
    laggedMonthOnly: boolean,
    isDateRange: boolean,
    displayProvisioningTransaction: boolean,
): React.ReactNode => {
    const { isPending: lastMonthIsPending, error: lastMonthError, value: lastMonthValue } = lastMonthState;
    const {
        isPending: laggedMonthIsPending,
        error: laggedMonthError,
        value: laggedMonthValue,
    } = laggedMonthState;
    const dateRange = isDateRange ? "up to" : "for";

    if (lastMonthIsPending || laggedMonthIsPending) {
        return (
            <>
                <div className={classes.loadingIndicator}>
                    <LoadingComponent className={classes.loadingIndicator} />
                </div>{" "}
                Loading date range.
            </>
        );
    }

    if (lastMonthError || laggedMonthError) {
        return "Error retrieving data. Try refreshing the page.";
    }

    const lastMonth = lastMonthValue.items.length > 0 ? lastMonthValue.items[0].element.title : "(no data)";
    const laggedMonth =
        laggedMonthValue.items.length > 0 ? laggedMonthValue.items[0].element.title : "(no data)";

    const lastMonthDataLabel = displayProvisioningTransaction ? "provisioning data" : "non-fraud data";
    const laggedMonthDataLabel = displayProvisioningTransaction ? "fraud transaction data" : "fraud data";

    if (lastMonthOnly) {
        return (
            <>
                Displaying {lastMonthDataLabel} for <span className={classes.date}>{lastMonth}</span>
            </>
        );
    } else if (laggedMonthOnly) {
        return (
            <>
                Displaying {laggedMonthDataLabel} for <span className={classes.date}>{laggedMonth}</span>
            </>
        );
    }

    return (
        <>
            Displaying {lastMonthDataLabel} {dateRange} <span className={classes.date}>{lastMonth}</span> and{" "}
            {laggedMonthDataLabel} {dateRange} <span className={classes.date}>{laggedMonth}</span>
        </>
    );
};

const getDateInfoAfm = (dateAttributeDFIdentifier: string, monthMeasureIdentifier: string): AFM.IAfm => ({
    attributes: [
        {
            localIdentifier: "date",
            displayForm: {
                identifier: dateAttributeDFIdentifier,
            },
        },
    ],
    measures: [
        {
            localIdentifier: monthMeasureIdentifier,
            definition: {
                measure: {
                    item: { identifier: monthMeasureIdentifier },
                },
            },
        },
    ],
    filters: [],
});

const defaultState: IUseElementsState = {
    error: null,
    isPending: false,
    value: {
        elementsMeta: null,
        paging: null,
        items: [],
    },
};

const DateInfo: React.FC<IDateInfoProps> = ({
    className,
    size,
    projectId,
    dateAttributeDFIdentifier = defaultDateAttributeDFIdentifier,
    lastMonthMeasureIdentifier = defaultLastMonthMeasureIdentifier,
    laggedMonthMeasureIdentifier = defaultLaggedMonthMeasureIdentifier,
    lastMonthOnly = false,
    laggedMonthOnly = false,
    isDateRange = false,
    displayProvisioningTransaction = false,
    additionalContent,
}) => {
    let lastMonthState = defaultState;
    let laggedMonthState = defaultState;

    if (!laggedMonthOnly) {
        const lastMonthAfm = getDateInfoAfm(dateAttributeDFIdentifier, lastMonthMeasureIdentifier);
        lastMonthState = useElements(projectId, dateAttributeDFIdentifier, lastMonthAfm);
    }

    if (!lastMonthOnly) {
        const laggedMonthAfm = getDateInfoAfm(dateAttributeDFIdentifier, laggedMonthMeasureIdentifier);
        laggedMonthState = useElements(projectId, dateAttributeDFIdentifier, laggedMonthAfm);
    }

    return (
        <InfoBox
            size={size}
            icon={<IconChart height="25px" width="25px" color={styleGuide.color.textSecondary} />}
            className={className}
        >
            {getCardText(
                lastMonthState,
                laggedMonthState,
                lastMonthOnly,
                laggedMonthOnly,
                isDateRange,
                displayProvisioningTransaction,
            )}
            {additionalContent}
        </InfoBox>
    );
};

export default DateInfo;
