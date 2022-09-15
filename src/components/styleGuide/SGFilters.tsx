// (C) 2020 GoodData Corporation
import React, { FC } from "react";
import { css } from "emotion";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import createUseFilters from "../../complexFilters/createUseFilters";
import { IFilterDeclarationMap } from "../../complexFilters/filterTypes";
import { FilterBar } from "../filterBar";
import { Headline, Model } from "@gooddata/react-components";
import { IHeadlineProps } from "@gooddata/react-components/dist/components/Headline";
import { FilterMessage } from "../filterBar/common";
import IconButton from "../controls/IconButton";
import { IconError } from "../icon";
import { RadioInput, CheckboxInput } from "../utils/inputs";

const primaryMeasure = Model.measure("aaKqhDetbb3D").localIdentifier("9a179b7cb6cb462f8f8f6b05bbc590db");

const classes = {
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
        gridGap: styleGuide.spacing(2),
        marginBottom: styleGuide.spacing(2),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
};

const filterDeclarations: IFilterDeclarationMap = {
    fraudType: {
        id: "fraudType",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "label.transaction.fraudtype.fraudtypeidanddesc",
        label: "Fraud Type",
        Component: "singleOptionFilter",
    },
    month: {
        id: "month",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "transactiondate.act81lMifn6q",
        isMultiSelect: true,
        restrictedByMeasureIdentifiers: ["_svc_min_date"],
        autoSelect: {
            index: 0,
        },
        order: "desc",
        label: "Transaction month",
        Component: "radioFilter",
    },
    date: {
        id: "date",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "transactiondate.date.mmddyyyy",
        isMultiSelect: true,
        restrictedByMeasureIdentifiers: ["_svc_min_date"],
        restrictedByFilterIds: ["month"],
        label: "Transaction date",
        Component: "checkboxFilter",
    },
    merchantName: {
        id: "merchantName",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "label.transaction.merchantname",
        isMultiSelect: true,
        label: "Merchant Name",
        Component: "multiOptionFilter",
    },
    usTransAmountBucket: {
        id: "usTransAmountBucket",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "label.ustransamountbucket.ustransamountbucket",
        label: "US Trans Amount Bucket",
        Component: "sliderFilter",
    },
    // This filter will always show an error
    error: {
        id: "error",
        projectId: "z8e5g55ryfetce6if845bb8ht8iynwfa",
        attributeDisplayFormIdentifier: "label.issuerbenchmarking.country",
        restrictedByMeasureIdentifiers: ["invalidIdentifier"],
        label: "error",
    },
};

const { useFiltersState, FilterStateProvider, useFilterElements, useVisualizationFilters } = createUseFilters(
    filterDeclarations,
);
const selectedFilterIds = ["month", "date", "fraudType", "merchantName", "usTransAmountBucket"];

const SGFiltersPure: FC<{}> = () => {
    const { visualizationFilters: visFilters, areAppliedFiltersReady } = useVisualizationFilters(
        selectedFilterIds,
    );
    // TODO: Keep this during development to track unnecessary re-renders
    // tslint:disable-next-line: no-console
    console.log("SGFilters rerender");

    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Filters
            </Typography>

            <FilterBar
                useFiltersState={useFiltersState}
                useFilterElements={useFilterElements}
                usedFilterIds={selectedFilterIds}
            />

            <div>{areAppliedFiltersReady ? "Filters are ready" : "There are pending filters"}</div>

            <div className={classes.list}>
                {areAppliedFiltersReady && (
                    <Headline
                        primaryMeasure={primaryMeasure}
                        projectId="z8e5g55ryfetce6if845bb8ht8iynwfa"
                        filters={visFilters as IHeadlineProps["filters"]}
                    />
                )}
            </div>
            <div className={classes.list}>
                <pre style={{ fontSize: "0.85em", lineHeight: 1, overflow: "auto" }}>
                    {JSON.stringify(visFilters, null, 2)}
                </pre>
            </div>

            <Typography variant="menuGroupTitle" Component="h2" className={classes.headline}>
                Filter Message
            </Typography>

            <div className={classes.list}>
                <FilterMessage
                    messageColor="negative"
                    afterContent={
                        <IconButton iconSize={32} variant="text" color="negative" Icon={IconError} />
                    }
                >
                    Sample error
                </FilterMessage>
                <FilterMessage
                    messageColor="info"
                    afterContent={
                        <Typography
                            variant="menuGroupTitle"
                            className={css({ color: styleGuide.color.info })}
                        >
                            ⌛
                        </Typography>
                    }
                >
                    Waiting for CID
                </FilterMessage>
            </div>

            <Typography variant="menuGroupTitle" Component="h2" className={classes.headline}>
                RadioInput
            </Typography>

            <div>
                <RadioInput
                    value="abc"
                    selected
                    onChange={(newValue) =>
                        // tslint:disable-next-line: no-console
                        console.log("RadioInput onClick", newValue)
                    }
                >
                    abc
                </RadioInput>
                &emsp;
                <RadioInput
                    selected={false}
                    value="def"
                    onChange={(newValue) =>
                        // tslint:disable-next-line: no-console
                        console.log("RadioInput onClick", newValue)
                    }
                >
                    def
                </RadioInput>
            </div>

            <Typography variant="menuGroupTitle" Component="h2" className={classes.headline}>
                CheckboxInput
            </Typography>

            <div>
                <CheckboxInput
                    checked
                    onChange={(value) =>
                        // tslint:disable-next-line: no-console
                        console.log("CheckboxInput onChange", value)
                    }
                >
                    abc
                </CheckboxInput>
                &emsp;
                <CheckboxInput
                    checked={false}
                    onChange={(value) =>
                        // tslint:disable-next-line: no-console
                        console.log("CheckboxInput onChange", value)
                    }
                >
                    def
                </CheckboxInput>
                &emsp;
                <CheckboxInput
                    checked
                    disabled
                    onChange={(value) =>
                        // tslint:disable-next-line: no-console
                        console.log("CheckboxInput onChange", value)
                    }
                >
                    abc
                </CheckboxInput>
            </div>
        </div>
    );
};

export const SGFilters: FC = () => (
    <FilterStateProvider>
        <SGFiltersPure />
    </FilterStateProvider>
);
