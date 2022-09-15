// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import VisualizationBlock from "../../../components/dashboardBlocks/VisualizationBlock";
import {
    bubbleChartHeight,
    customHeadlineRowHeight,
} from "../../../components/dashboardBlocks/VisualizationBlockBase";
import Dashboard from "../components/Dashboard";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";
import useQuarter from "../hooks/useQuarter";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";

const IssuerGlobalFraudOverview: React.FC = () => {
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
                                        identifier="ad6sm6VWfdSO"
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
                        header={`Regions by gross fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abArrCKBer3Q"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />
                    <VisualizationBlock
                        header={`Corridors by gross fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ab4rqn5Bg5nx"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Channels by gross fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ab0rpMsLaiiG"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Products by gross fraud BPS ${currentQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aaerxMNCelkW"
                        height={bubbleChartHeight}
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Fraud USD change - Issuer region ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="ab1rrKT1driD"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Fraud USD change - Corridor ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="abZrsVsndeAw"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Fraud USD change - Channel ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="adHrq72XaKtS"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header={`Fraud USD change - Product ${currentVsPreviousQuarter}`}
                        size={6}
                        projectId={projectId}
                        identifier="aa6rxeohbcwT"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header={`Top fraud channels by report fraud amount ($) ${currentQuarter}`}
                        size={12}
                        projectId={projectId}
                        identifier="aacrErGgfKYH"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends for issuer region - gross fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="aaorEnCGeGwW"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends for issuer region - net fraud BPS"
                        size={6}
                        projectId={projectId}
                        identifier="aaRrC5PThdpj"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends for issuer region - approval rate"
                        size={6}
                        projectId={projectId}
                        identifier="aavrDR86fwNd"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends for issuer region - indexed approved usd"
                        size={6}
                        projectId={projectId}
                        identifier="abIrDsdsanpX"
                        enableExports={true}
                    />
                </Row>
                <Row>
                    <VisualizationBlock
                        header="Trends for issuer region - indexed approved count"
                        size={6}
                        projectId={projectId}
                        identifier="aaXrGNFsfdk6"
                        enableExports={true}
                    />

                    <VisualizationBlock
                        header="Trends for issuer region - indexed fraud USD"
                        size={6}
                        projectId={projectId}
                        identifier="abQrDp85h4Ho"
                        enableExports={true}
                    />
                </Row>
            </Container>
        </Dashboard>
    );
};

export default IssuerGlobalFraudOverview;
