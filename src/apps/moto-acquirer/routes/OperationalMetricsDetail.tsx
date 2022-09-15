// (C) 2020 GoodData Corporation
import React from "react";
import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import { tallHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import { Row } from "react-grid-system";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import FilterBar from "../../../components/filters/FilterBar";
import { useFilters } from "../contexts/FilterStateContext";
import DateNotice from "../../../components/moto/DateInfo";
import BlockHeading from "../../../components/dashboardBlocks/BlockHeading";

const OperationalMetricsDetail: React.FC = () => {
    const projectId = useProjectId();
    const { filters, visFilters, clearFilters, applyFilters, resetFilters } = useFilters(
        "cidAndIca_parent",
        "cidAndIca_child",
        "country",
    );
    return (
        <Dashboard
            filterBar={
                <FilterBar
                    filters={filters.slice(1)}
                    projectId={projectId}
                    clearFilters={() => clearFilters(["cidAndIca_parent"])}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
            }
        >
            <DateNotice projectId={projectId} />
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>Top 5 decline reasons by % of declined transactions</BlockHeading>}
                    height={tallHeight}
                    size={12}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="abi9nsq9g8tn"
                />
            </Row>
            <Row>
                <VisualizationBlock
                    header={
                        <BlockHeading>Fraud Chargeback (BPS) and representment rate - MO/TO</BlockHeading>
                    }
                    height={tallHeight}
                    size={6}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="aaf9uMtsiqJl"
                />
                <VisualizationBlock
                    header={
                        <BlockHeading>Fraud Chargeback (BPS) and representment rate - Other CNP</BlockHeading>
                    }
                    height={tallHeight}
                    size={6}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="abe9r270gVgW"
                />
            </Row>
            <Row>
                <VisualizationBlock
                    header={<BlockHeading>All Chargeback (BPS) and representment rate - MO/TO</BlockHeading>}
                    height={tallHeight}
                    size={6}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="abu9niUhg2NX"
                />
                <VisualizationBlock
                    header={
                        <BlockHeading>All Chargeback (BPS) and representment rate - Other CNP</BlockHeading>
                    }
                    height={tallHeight}
                    size={6}
                    projectId={projectId}
                    filters={visFilters}
                    identifier="ace9q6Sghof1"
                />
            </Row>
        </Dashboard>
    );
};

export default OperationalMetricsDetail;
