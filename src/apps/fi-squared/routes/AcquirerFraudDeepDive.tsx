// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import Dashboard from "../components/Dashboard";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";
import { customHeadlineRowHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";

import Eur from "../../../components/utils/regionLabels/Eur";
import Ap from "../../../components/utils/regionLabels/Ap";
import Lac from "../../../components/utils/regionLabels/Lac";
import Mea from "../../../components/utils/regionLabels/Mea";
import Us from "../../../components/utils/regionLabels/Us";
import Can from "../../../components/utils/regionLabels/Can";
import HeadlineVisualization from "../../../components/visualization/HeadlineVisualization";

const eurHeader = <Eur />;
const apHeader = <Ap />;
const lacHeader = <Lac />;
const meaHeader = <Mea />;
const usHeader = <Us />;
const canHeader = <Can />;

const AcquirerFraudDeepDive: React.FC = () => {
    const projectId = useProjectId();

    return (
        <Dashboard>
            <Container fluid className="s-dashboard-content">
                <Row>
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        header="Gross fraud BPS"
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={eurHeader}
                                        projectId={projectId}
                                        identifier="aaf1jm8BgNO1"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="aaw1iP6YcIRi"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="aaj1jWQ9fTW6"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="abP1f2kpepyC"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="adr1bQODbXkM"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="ab71goeoit0I"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
                <Row>
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        header="Net Fraud BPS"
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={eurHeader}
                                        projectId={projectId}
                                        identifier="abq1iMi9avPW"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="abp1h9U6bIyd"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="abn1j9tLaYUz"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="aa61h2ztfazX"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="aae1mAazdg8Z"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="aaZ1kcl8cmio"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
                <Row>
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        header="CNP gross fraud BPS"
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={eurHeader}
                                        projectId={projectId}
                                        identifier="abW2U0pNcwm7"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="aau2ZQrIcNvJ"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="aeU2QfwqhgLp"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="aao2ZP9XdUJm"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="aaZ2XQ4KfFAM"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="acO2Ud9fgcvO"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
                <Row>
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        header="Domestic gross fraud BPS"
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={eurHeader}
                                        projectId={projectId}
                                        identifier="aaK2XLPefgos"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="adM2UzQRh5M6"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="abg2ZOCPdDL5"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="abh2Yxd6bUh9"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="aa720DZ1hJIj"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="aa92YAaRdq5f"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
                <Row>
                    <VisualizationRow
                        size={12}
                        minHeight={customHeadlineRowHeight}
                        height="auto"
                        count={6}
                        header="Credit gross fraud BPS"
                    >
                        {({ onLoadingChanged }) => {
                            return (
                                <>
                                    <HeadlineVisualization
                                        header={eurHeader}
                                        projectId={projectId}
                                        identifier="acg2Yuv3eVXF"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="acd2ZBcNdxNH"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="aaw22a0Ciizw"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="acZ2YprvgVRE"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="acz2WxArcfmL"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="abV2ZEltdr4G"
                                        onLoadingChanged={onLoadingChanged}
                                    />
                                </>
                            );
                        }}
                    </VisualizationRow>
                </Row>
            </Container>
        </Dashboard>
    );
};

export default AcquirerFraudDeepDive;
