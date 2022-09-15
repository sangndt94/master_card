// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import Dashboard from "../components/Dashboard";
import {
    bubbleChartHeight,
    customHeadlineRowHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";

const AcquirerGlobalFraudOverview: React.FC = () => {
    const projectId = useProjectId();
    const { currentQuarter, currentVsPreviousQuarter } = useQuarter();

    return (
        <Dashboard>
            <Container fluid className="s-dashboard-content">
                <Row>
                    <VisualizationRow size={12} minHeight={customHeadlineRowHeight} height="auto" count={4}>
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header="Gross fraud BPS"
                                        projectId={projectId}
                                        identifier="adZsmkdBhQcu"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header="Net Fraud BPS"
                                        projectId={projectId}
                                        identifier="acpV68FmiD7E"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header="Approval rate"
                                        projectId={projectId}
                                        identifier="aaFsxTdMhCnl"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header="Decline rate"
                                        projectId={projectId}
                                        identifier="abcsxx3oernH"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Regions by Net Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ae3VTKMYcvEe"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Corridors by Net Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acbVWkWfhn8I"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Channels by Net Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abRV01DbfVWx"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Products by Net Fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aa80pvFnbxnf"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Net Acquirer Fraud Change - Acquirer Region ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="acUVY7qOfBsi"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Net Acquirer Fraud Change - Corridor ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abXV0to4isdE"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Net Acquirer Fraud Change - Channel ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abbV1iHvfT8Q"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Net Acquirer Fraud Change - Product ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abYVZV1lhQ2P"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Top Fraud Channels by Net Acquirer Fraud USD ${currentQuarter}`}
                        size={12}
                        projectId={projectId}
                        identifier="abtV15MubXQL"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends by Acquirer Region - Gross Fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="ac1VZNKZa6KI"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends by Acquirer Region - Net Fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="acpV0eJOfuAi"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends by Acquirer Region - Approval Rate"
                        size={6}
                        projectId={projectId}
                        identifier="aeaVXWHNfvwU"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends by Acquirer Region - Indexed Approved USD"
                        size={6}
                        projectId={projectId}
                        identifier="ac6V0Wl6ecTZ"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends by Acquirer Region - Indexed Approved Count"
                        size={6}
                        projectId={projectId}
                        identifier="acBV1qkKfWqb"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends by Acquirer Region - Indexed Fraud USD"
                        size={6}
                        projectId={projectId}
                        identifier="abBV32Hygb02"
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerGlobalFraudOverview;
