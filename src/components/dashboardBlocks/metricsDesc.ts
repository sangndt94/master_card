// (C) 2020 GoodData Corporation

// This file is generated and maintained by Lukas Fiala

export const headers = {
    "bmk.declinerate": "Decline rate",
    "bmk.grossfraudrate": "Gross fraud rate (BPS)",
    "bmk.netfraudrateiss": "Net fraud rate (BPS)",
    "bmk.clearedvolume": "Cleared volume",
    "bmk.netfraudrateacq": "Net fraud rate (BPS)",
    "bmk.grossfraudvolume": "Gross fraud volume",
    "bmk.emvfallbackrate": "EMV fallback rate",
    "bmk.netfraudvolumeacq": "Net fraud volume",
};

export const texts = {
    "bmk.declinerate":
        "Shows how many transactions are declined out of total transactions. It is calculated as Declined transactions / Total authorized transactions",
    "bmk.grossfraudrate":
        "Calculated as (Reported fraud USD on processed transactions / Processed USD) × 10,000",
    "bmk.netfraudrateiss":
        "Calculated as ((Fraud USD on processed transactions − 1st Chargebacks + 2nd Presentments − Arbitrations) / Total Processed USD) × 10,000",
    "bmk.clearedvolume": "Total amount (USD) of transactions that have been cleared by Mastercard system",
    "bmk.netfraudrateacq":
        "Calculated as ((1st Chargebacks − 2nd Presentments + Arbitrations) / Total Processed Transactions) × 10,000",
    "bmk.grossfraudvolume": "Total amount (USD) of transactions that have been reported as fraud.",
    "bmk.emvfallbackrate":
        "Calculated as (Approved transactions where chip capable transaction could not process or read the chip so the terminal defaulted to magstripe read PAN / Total approved transactions for all PAN entry modes)",
    "bmk.netfraudvolumeacq":
        "The total amount (USD) of fraud at the expense of the Acquirer. Calculated as (1st Chargebacks − 2nd Presentments + Arbitrations)",
};
