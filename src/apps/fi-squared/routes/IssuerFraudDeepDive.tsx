// (C) 2007-2019 GoodData Corporation
import React from "react";
import { Container, Row } from "react-grid-system";

import useProjectId from "../hooks/useProjectId";
import { customHeadlineRowHeight } from "../../../components/dashboardBlocks/VisualizationBlockBase";
import Dashboard from "../components/Dashboard";
import VisualizationRow from "../../../components/dashboardBlocks/VisualizationRow";

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

const IssuerFraudDeepDive: React.FC = () => {
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
                                        identifier="aegslXVtdi9C"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="acysorg1eyQN"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="adjsnsqMg79u"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="aeCslJaLgfoA"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="abLsrKuniu3c"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="acWsnfnehY80"
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
                                        identifier="adNsp4tLgmYS"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="ac0sp20SirwP"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="aeNsoe0SfXtU"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="adwsn5tqfKju"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="aacsxNSJdy3Q"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="acWsp6NRirzB"
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
                                        identifier="aaEsBnP8dUxC"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="acdswZqNhoRC"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="aeTsrl4tg3zZ"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="aatsBpXvdCEb"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="abOsxvFDfMtE"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="ab6sxzTAaWsd"
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
                                        identifier="acZsDepJgCAJ"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="ac8sC7PrgAj0"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="abVsDogqfynH"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="acNsEkRpinEO"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="adfsCq9deK3V"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="acLsC8WLfPQA"
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
                                        identifier="aaXsN5gnb91X"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={apHeader}
                                        projectId={projectId}
                                        identifier="aaYsOuLobhqN"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={lacHeader}
                                        projectId={projectId}
                                        identifier="abesMC1Yfcks"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={meaHeader}
                                        projectId={projectId}
                                        identifier="aeAsFgwzgpzd"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={usHeader}
                                        projectId={projectId}
                                        identifier="acdsDklbc3u6"
                                        onLoadingChanged={onLoadingChanged}
                                    />

                                    <HeadlineVisualization
                                        header={canHeader}
                                        projectId={projectId}
                                        identifier="aawsO3aths82"
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

export default IssuerFraudDeepDive;
