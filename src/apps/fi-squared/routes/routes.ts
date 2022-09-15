// (C) 2007-2019 GoodData Corporation
import IssuerGlobalFraudOverview from "./IssuerGlobalFraudOverview";
import IssuerFraudDeepDive from "./IssuerFraudDeepDive";
import IssuerGrossFraudBPS from "./IssuerGrossFraudBPS";
import IssuerNetFraudBPS from "./IssuerNetFraudBPS";
import IssuerCorridors from "./IssuerCorridors";
import IssuerProducts from "./IssuerProducts";
import IssuerChannels from "./IssuerChannels";
import AcquirerGlobalFraudOverview from "./AcquirerGlobalFraudOverview";
import AcquirerFraudDeepDive from "./AcquirerFraudDeepDive";
import AcquirerGrossFraudBPS from "./AcquirerGrossFraudBPS";
import AcquirerNetFraudBPS from "./AcquirerNetFraudBPS";
import AcquirerCorridors from "./AcquirerCorridors";
import AcquirerProducts from "./AcquirerProducts";
import AcquirerChannels from "./AcquirerChannels";
import IssuerRegionFraudDeepDive from "./IssuerRegionFraudDeepDive";
import AcquirerRegionFraudDeepDive from "./AcquirerRegionFraudDeepDive";
import POSEntryModeDeepDive from "./POSEntryModeDeepDive";
import ChannelDeepDive from "./ChannelDeepDive";
import CardNotPresentAddressVerificationSystemAVS from "./CardNotPresentAddressVerificationSystemAVS";
import POSEMVChip from "./POSEMVChip";
import ContactlessAnalysis from "./ContactlessAnalysis";
import AutomaticFuelDispenserIssuerRegion from "./AutomaticFuelDispenserIssuerRegion";

import theme from "../../../utils/theme";
import { IRouteDefinition } from "../../../types";
import AutomaticFuelDispenserAcquirerRegion from "./AutomaticFuelDispenserAcquirerRegion";
import IssuingRegionOverview from "./IssuingRegionOverview";
import AcquiringRegionOverview from "./AcquiringRegionOverview";
import ATMEMVChipFallbackToMagStripeEntryMode80 from "./ATMEMVChipFallbackToMagStripeEntryMode80";
import CardholderActivatedTerminalNonATMAFD from "./CardholderActivatedTerminalNonATMAFD";
import POSEMVChipFallbackToVoiceEntryMode79 from "./POSEMVChipFallbackToVoiceEntryMode79";
import POSPANKeyEnteredEntryMode01 from "./POSPANKeyEnteredEntryMode01";
import POSEMVChipFallbackToMagStripeEntryMode80 from "./POSEMVChipFallbackToMagStripeEntryMode80";

export const routeDefinitions: IRouteDefinition[] = [
    {
        path: "/global-fraud-overview",
        title: "Global Fraud Overview",
        heading: "Issuer Executive Summary",
        component: IssuerGlobalFraudOverview,
    },
    {
        path: "/issuer-fraud-deep-dive",
        title: "Fraud Deep Dive",
        component: IssuerFraudDeepDive,
    },
    {
        path: "/issuer-gross-fraud-bps",
        title: "Gross Fraud BPS",
        component: IssuerGrossFraudBPS,
    },
    {
        path: "/issuer-net-fraud-bps",
        title: "Net Fraud BPS",
        component: IssuerNetFraudBPS,
    },
    {
        path: "/issuer-corridors",
        title: "Corridors",
        component: IssuerCorridors,
    },
    {
        path: "/issuer-products",
        title: "Products",
        component: IssuerProducts,
    },
    {
        path: "/issuer-channels",
        title: "Channels",
        component: IssuerChannels,
    },
    {
        path: "/issuing-region-overview",
        title: "Issuing Region Overview",
        component: IssuingRegionOverview,
        omitFromMenu: true,
    },
    {
        path: "/acquirer-global-fraud-overview",
        title: "Global Fraud Overview",
        heading: "Acquirer Executive Summary",
        component: AcquirerGlobalFraudOverview,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-fraud-deep-dive",
        title: "Fraud Deep Dive",
        component: AcquirerFraudDeepDive,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-gross-fraud-bps",
        title: "Gross Fraud BPS",
        component: AcquirerGrossFraudBPS,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-net-fraud-bps",
        title: "Net Fraud BPS",
        component: AcquirerNetFraudBPS,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-corridor",
        title: "Corridors",
        component: AcquirerCorridors,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-products",
        title: "Products",
        component: AcquirerProducts,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquirer-channels",
        title: "Channels",
        component: AcquirerChannels,
        groupColor: theme.color.primary,
    },
    {
        path: "/acquiring-region-overview",
        title: "Acquiring Region Overview",
        component: AcquiringRegionOverview,
        omitFromMenu: true,
    },
    {
        path: "/issuer-region-fraud-deep-dive",
        title: "Issuer region fraud deep dive",
        heading: "Fraud Deep Dive",
        component: IssuerRegionFraudDeepDive,
        groupColor: theme.color.deepDive,
    },
    {
        path: "/acquirer-region-fraud-deep-dive",
        title: "Acquirer region fraud deep dive",
        component: AcquirerRegionFraudDeepDive,
        groupColor: theme.color.deepDive,
    },
    {
        path: "/pos-entry-mode-deep-dive",
        title: "POS entry mode deep dive",
        component: POSEntryModeDeepDive,
        groupColor: theme.color.deepDive,
    },
    {
        path: "/channel-deep-dive",
        title: "Channel deep dive",
        component: ChannelDeepDive,
        groupColor: theme.color.deepDive,
    },
    {
        path: "/card-not-present-address-verification-system-avs",
        title: "Card not present - Address verification system (AVS)",
        component: CardNotPresentAddressVerificationSystemAVS,
        groupColor: theme.color.deepDive,
    },
    {
        path: "/pos-emv-chip",
        title: "POS EMV chip",
        heading: "Channel Deep Dive",
        component: POSEMVChip,
        groupColor: theme.color.gooddataBlue,
    },
    {
        path: "/contactless-analysis",
        title: "Contactless analysis",
        component: ContactlessAnalysis,
        groupColor: theme.color.gooddataBlue,
    },
    {
        path: "/automatic-fuel-dispenser-issuer-region",
        title: "Automatic fuel dispenser - Issuer region",
        component: AutomaticFuelDispenserIssuerRegion,
        groupColor: theme.color.gooddataBlue,
    },
    {
        path: "/automatic-fuel-dispenser-acquirer-region",
        title: "Automatic fuel dispenser - Acquirer region",
        component: AutomaticFuelDispenserAcquirerRegion,
        groupColor: theme.color.gooddataBlue,
    },
    {
        path: "/cardholder-activated-terminal-non-atm-afd",
        title: "Cardholder activated terminal (non - ATM/AFD)",
        component: CardholderActivatedTerminalNonATMAFD,
    },
    {
        path: "/atm-emv-chip-fallback-to-mag-stripe-entry-mode-80",
        title: "ATM EMV chip Fallback to mag stripe (entry mode 80)",
        component: ATMEMVChipFallbackToMagStripeEntryMode80,
    },
    {
        path: "/pos-emv-chip-fallback-to-mag-stripe-entry-mode-80",
        title: "POS EMV chip Fallback to mag stripe (entry mode 80)",
        component: POSEMVChipFallbackToMagStripeEntryMode80,
    },
    {
        path: "/pos-emv-chip-fallback-to-voice-entry-mode-79",
        title: "POS EMV chip Fallback to voice (entry mode 79)",
        component: POSEMVChipFallbackToVoiceEntryMode79,
    },
    {
        path: "/pos-pan-key-entered-entry-mode-01",
        title: "POS PAN key entered (entry mode 01)",
        component: POSPANKeyEnteredEntryMode01,
    },
];
