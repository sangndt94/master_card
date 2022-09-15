// (C) 2020 GoodData Corporation
import React, { useState, useContext } from "react";
import useProjectId from "../hooks/useProjectId";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";
import Grid from "../../../components/utils/Grid";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateSwitch from "../../../components/dashboardBlocks/DateSwitch";
import { LoadingComponent } from "@gooddata/react-components";
import { UseTransactionDateContext, getDateFilter } from "../contexts/UseTransactionDateContext";
import { Container } from "react-grid-system";
import {
    getClearAndReinitializeFilters,
    useInitializeStatusFilter,
    SUCCESS_STATUS,
} from "../hooks/filtersHooks";

const Pos: React.FC = () => {
    const projectId = useProjectId();
    const { useTransactionDate, setUseTransactionDate } = useContext(UseTransactionDateContext);
    const dateFilter = getDateFilter(useTransactionDate);
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        `${dateFilter}_parent`,
        `${dateFilter}_child`,
        "fraudType",
        "merchantName",
        "acquirer",
        "issuer",
        "mcc",
        "usTransAmountBucket",
        "cardProduct",
        "securityCode",
        "cardholderPresence",
        "statusAndCardPresence_parent",
        "statusAndCardPresence_child",
        "posEntryMode",
    );

    const [isStatusLoading, setIsStatusLoading] = useState(true);

    useInitializeStatusFilter(projectId, [SUCCESS_STATUS], filters, setIsStatusLoading);

    const clearAndReinitializeFilters = getClearAndReinitializeFilters(
        clearFilters,
        projectId,
        [SUCCESS_STATUS],
        filters,
        setIsStatusLoading,
    );

    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters}
                    projectId={projectId}
                    clearFilters={clearAndReinitializeFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                    filterSwitch={
                        <DateSwitch
                            useTransactionDate={useTransactionDate}
                            setUseTransactionDate={setUseTransactionDate}
                        />
                    }
                />
            }
        >
            {isStatusLoading ? (
                <LoadingComponent />
            ) : (
                <Container fluid className="s-dashboard-content">
                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by CAT Level/POS Term Type</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaC4UfdphRUv"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Terminal Attendance</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aak4VyfvaQea"
                        />
                    </Grid>
                    <Grid lg={2}>
                        <VisualizationBlock
                            header={
                                <BlockHeading>Transactions by Terminal Operating Environment</BlockHeading>
                            }
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aaM4UKLdafzO"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Terminal Capability</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abe4RPg6gN92"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Card Presence</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa7qhZlQa5s7"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Cardholder Presence</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aboqgIp1ixK5"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Electronic Commerce</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abW4NWFjipiy"
                        />
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by Secure Code</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="aa9qgz8ccbZn"
                        />
                    </Grid>

                    <Grid lg={2}>
                        <VisualizationBlock
                            header={<BlockHeading>Transactions by POS Entry Mode</BlockHeading>}
                            projectId={projectId}
                            filters={visFilters}
                            identifier="abi4UvOfeF3F"
                        />
                    </Grid>
                </Container>
            )}
        </Dashboard>
    );
};

export default Pos;
