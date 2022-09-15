// (C) 2019-2020 GoodData Corporation

import digital from "./digital/meta";
import issuerBenchmarkingPremium from "./issuer-benchmarking/premium/meta";
import issuerBenchmarkingStandard from "./issuer-benchmarking/standard/meta";
import acquirerBenchmarkingPremium from "./acquirer-benchmarking/premium/meta";
import acquirerBenchmarkingStandard from "./acquirer-benchmarking/standard/meta";
import fiSquared from "./fi-squared/meta";
import motoIssuer from "./moto-issuer/meta";
import motoAcquirer from "./moto-acquirer/meta";
import nonEmvReport from "./non-emv-report/meta";
import performanceAnalytics from "./performance-analytics/meta";
import reportedFraudIssuer from "./reported-fraud-issuer/meta";
import reportedFraudAcquirer from "./reported-fraud-acquirer/meta";
import issuerFraudBpsStandard from "./issue-fraud-bps/meta";
import acquirerFraudBpsStandard from "./acquirer-fraud-bps/standard/meta";
import issuerCredentialOnFile from "./issuer-credential-on-file/meta";
import acquirerCredentialOnFile from "./acquirer-credential-on-file/meta";
import issuerDecisionIntelligenceStandard from "./issuer-decision-intelligence/standard/meta";
import issuerDecisionIntelligencePremium from "./issuer-decision-intelligence/premium/meta";
import { IAppMeta } from "../types";

const appMetas: IAppMeta[] = [
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

export default appMetas;
