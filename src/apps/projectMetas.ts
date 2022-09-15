// (C) 2019 GoodData Corporation
import digital from "./digital/projectMeta";
import issuerBenchmarkingPremium from "./issuer-benchmarking/premium/projectMeta";
import issuerBenchmarkingStandard from "./issuer-benchmarking/standard/projectMeta";
import acquirerBenchmarkingPremium from "./acquirer-benchmarking/premium/projectMeta";
import acquirerBenchmarkingStandard from "./acquirer-benchmarking/standard/projectMeta";
import fiSquared from "./fi-squared/projectMeta";
import motoIssuer from "./moto-issuer/projectMeta";
import motoAcquirer from "./moto-acquirer/projectMeta";
import nonEmvReport from "./non-emv-report/projectMeta";
import performanceAnalytics from "./performance-analytics/projectMeta";
import reportedFraudIssuer from "./reported-fraud-issuer/projectMeta";
import reportedFraudAcquirer from "./reported-fraud-acquirer/projectMeta";
import issuerFraudBpsStandard from "./issue-fraud-bps/projectMeta";
import acquirerFraudBpsStandard from "./acquirer-fraud-bps/standard/projectMeta";
import issuerCredentialOnFile from "./issuer-credential-on-file/projectMeta";
import acquirerCredentialOnFile from "./acquirer-credential-on-file/projectMeta";
import issuerDecisionIntelligenceStandard from "./issuer-decision-intelligence/standard/projectMeta";
import issuerDecisionIntelligencePremium from "./issuer-decision-intelligence/premium/projectMeta";

import { IAppProjectMeta } from "../types";

const projectMetas: IAppProjectMeta[] = [
    digital,
    issuerBenchmarkingPremium,
    issuerBenchmarkingStandard,
    acquirerBenchmarkingPremium,
    acquirerBenchmarkingStandard,
    fiSquared,
    motoIssuer,
    motoAcquirer,
    nonEmvReport,
    performanceAnalytics,
    reportedFraudIssuer,
    reportedFraudAcquirer,
    issuerFraudBpsStandard,
    acquirerFraudBpsStandard,
    issuerCredentialOnFile,
    acquirerCredentialOnFile,
    issuerDecisionIntelligenceStandard,
    issuerDecisionIntelligencePremium,
];

export default projectMetas;
