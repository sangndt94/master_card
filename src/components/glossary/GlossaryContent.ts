// (C) 2020 GoodData Corporation
import HtmlToText from "html-to-text";

export interface IContentItem {
    htmlCode: string;
    plainText: string;
}

export interface IContentGroup {
    title: string;
    content: Array<IContentItem | IContentGroup>;
    icon?: string;
}

export const isIContentItem = (node: IContentItem | IContentGroup): node is IContentItem =>
    !("content" in node);

export const isIContentGroup = (node: IContentItem | IContentGroup): node is IContentGroup =>
    "content" in node;

const getContentItem = (htmlCode: string): IContentItem => ({
    htmlCode,
    plainText: HtmlToText.fromString(htmlCode),
});

export const glossaryContentGlossary: IContentGroup = {
    title: "Glossary",
    icon: "glossary",
    content: [
        {
            title: "Address Verification System (AVS)",
            content: [
                `AVS protects against fraudulent card use in non-face-to-face transactions by verifying the cardholder's billing
                address during the authorization process, to the billing address on file with the card issuer.`,
            ].map(getContentItem),
        },
        {
            title: "AFD",
            content: [`Acronym for "Automated Fuel Dispenser".`].map(getContentItem),
        },
        {
            title: "Card",
            content: [
                "A card issued by a Customer that provides access to a Mastercard account in accordance with the Standards.",
            ].map(getContentItem),
        },
        {
            title: "Card Present (CP) Transaction",
            content: [
                `A transaction authorized and settled electronically where full magnetic stripe track data or full chip track equivalent
                data is read by a POS Terminal and transmitted in its entirety to the Issuer, or in the offline authorization
                transmitted to the Issuer.`,
            ].map(getContentItem),
        },
        {
            title: "Card Not Present (CNP) Transaction",
            content: [
                `A transaction authorized and settled electronically where full magnetic stripe track data or full chip track equivalent
                data is not transmitted to the Issuer, or in the offline authorization transmitted to the Issuer.`,
            ].map(getContentItem),
        },
        {
            title: "Card Not Present Fraud (CNP)",
            content: [
                `A fraudulent transaction that occurs with the use of credit or debit account information including pseudo-account
                information without the physical card or other device being involved, via the phone, mail, Internet, or other electronic
                means without the actual, implied, or apparent authority of the cardholder.`,
            ].map(getContentItem),
        },
        {
            title: "Card Validation Code (CVC)",
            content: [
                `<b>Card Validation Code 1 (CVC1)</b> - A three-digit value encoded on Tracks 1 and 2 in three contiguous positions in the discretionary data field
                of a magnetic stripe on a Mastercard card, Maestro branded card, or Cirrus branded card. Chip CVC is a three-digit
                value encoded in the Track 2 Equivalent Data field in three contiguous positions within the discretionary data field
                of the chip on a Mastercard card, Maestro branded card, or Cirrus branded card. The CVC is intended to inhibit the
                alteration or misuse of card data and enhance the authentication of the card.`,
                `<b>Card Validation Code 2 (CVC2)</b> - A three-digit value uniquely derived for each account and indent printed, not embossed, on the
                tamper evident signature panel of all Mastercard cards. This is one way that a merchant can verify that the
                cardholder physically has the card in their possession in a card-not-present environment.`,
                `<b>Card Validation Code 3 (CVC3)</b> - The value used in place of the CVC1 in the discretionary data field of the Track 1 & 2 data for Mastercard
                contactless transactions.`,
            ].map(getContentItem),
        },
        {
            title: "Cardholder-Activated Terminal (CAT)",
            content: [
                `A cardholder-activated terminal is usually unattended, and dispenses a product or provides a service when activated by a cardholder. The Cardholder-Activated Terminal Level indicates whether the cardholder activated the terminal with the use of the card, and Indicates The security level:
                <ul>
                    <li><b>Authorized Level 1 CAT</b>: Automated dispensing machine with PIN (includes ATMs)</li>
                    <li><b>Authorized Level 2 CAT</b>: Self-service terminal</li>
                    <li><b>Authorized Level 3 CAT</b>: Limited-amount terminal</li>
                    <li><b>Authorized Level 4 CAT</b>: In-flight commerce</li>
                    <li><b>Authorized Level 6 CAT</b>: Electronic commerce</li>
                    <li><b>Authorized Level 7 CAT</b>: Transponder transaction</li>
                    <li><b>Authorized Level 9 CAT</b>: Mobile Point-of-Sale (MPOS) Acceptance Device (unique in that MPOS Acceptance Devices are usually not Unattended)</li>
                </ul>`,
            ].map(getContentItem),
        },
        {
            title: "Category",
            content: [
                `Refers to Merchant Category code (MCC). A Merchant Category Code is a four-digit number listed in ISO 18245 for retail financial services. An MCC is used to classify a business by the types of goods or services it provides.`,
            ].map(getContentItem),
        },
        {
            title: "Cleared Volume (Fraud)",
            content: ["Transactions that have cleared through the transaction process."].map(getContentItem),
        },
        {
            title: "Consumer",
            content: ["The authorized user of a card issued by a Customer."].map(getContentItem),
        },
        {
            title: "Corridor",
            content: ["Passage way by which transaction occurred."].map(getContentItem),
        },
        {
            title: "Counterfeit Card Fraud (CF)",
            content: [
                `The use of altered or illegally reproduced credit or debit card (or other physical device accessing a credit or debit card account - for example, convenience and balance transfer checks) including the replication or alteration of the magnetic stripe or embossing.`,
            ].map(getContentItem),
        },
        {
            title: "Cross border transaction",
            content: [
                "Transactions where issuer and merchants are registered in different countries . Transactions within same region are considered intra regional and transactions with countries outside the region are considered international transactions.",
            ].map(getContentItem),
        },
        {
            title: "Domestic transaction",
            content: ["Transactions where issuer and merchants are registered in same country."].map(
                getContentItem,
            ),
        },
        {
            title: "Electronic Commerce (e-commerce) Transaction",
            content: [
                `A Non-face-to-face Transaction that uses electronic media over a public network (such as the Internet) or a private
                network (such as an extranet) and is initiated through a personal computer, a tablet, or mobile telephone. An
                Electronic Commerce Transaction is a Card-Not-Present Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "EMV Chip Fall to Mag Stripe (Entry code: 80)",
            content: [
                `Chip card at chip-capable terminal was unable to process transaction using data on the chip; therefore, the
                terminal defaulted to the magnetic stripe-read pan.`,
            ].map(getContentItem),
        },
        {
            title: "Face-to-Face Transaction",
            content: [
                `A Transaction where the Card, the Consumer, and the Merchant representative are all present in the same location
                at the time of the Transaction. A Face-to-face Transaction is a Card-Present Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "Lost/Stolen (L/S)",
            content: [
                `<b>Lost Fraud</b> - A fraudulent transaction that occurs with the use of a lost credit or debit card (or other
                device accessing a credit or debit card account—for example, convenience and balance transfer checks)
                without the actual, implied, or apparent authority of the cardholder.`,
                `<b>Stolen Fraud</b> - A fraudulent transaction that occurs with the use of a stolen credit or debit card (or other
                device accessing a credit or debit card account—for example, convenience and balance transfer checks)
                without the actual, implied, or apparent authority of the cardholder.`,
                `<b>Card Not Present Fraud (CNP)</b> - A fraudulent transaction that occurs with the use of credit or debit account information including
                pseudo-account information without the physical card or other device being involved, via the phone,
                mail, Internet, or other electronic means without the actual, implied, or apparent authority of the
                cardholder.`,
                `<b>Counterfeit Card Fraud (CF)</b> - The use of altered or illegally reproduced credit or debit card (or other physical device accessing a credit
                or debit card account—for example, convenience and balance transfer checks) including the replication
                or alteration of the magnetic stripe or embossing.`,
            ].map(getContentItem),
        },
        {
            title: "Mag Stripe Fallback to Pan key Entered (Entry code: 79)",
            content: [
                `A hybrid terminal with an online connection to the acquirer failed in sending a chip fallback transaction to issuer`,
            ].map(getContentItem),
        },
        {
            title: "Mail Order/Telephone Order (MO/TO) Transaction",
            content: [
                `A non-face-to-face transaction initiated by the Consumer via mail or telephone. A MO/TO Transaction is a Card-Not-Present Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "Manual Account Entry (MAE)",
            content: [
                `A face-to-face or non-face-to-face transaction where the PAN is manually key entered into the terminal either by
                the merchant or the cardholder. The card may or may not be present, and no initial attempt at EMV or Magnetic
                Stripe was made.`,
            ].map(getContentItem),
        },
        {
            title: "Mastercard 3DS",
            content: [
                `Mastercard 3DS is a cardholder authentication technology that is specially designed for E-Commerce transactions
                to uniquely identify a cardholder to the issuer and substantiate that the transaction has been verified.`,
            ].map(getContentItem),
        },
        {
            title: "Mobile Payment Device",
            content: [
                `A Consumer-controlled mobile phone containing a payment application that is compliant with the Standards. A
                Mobile Payment Device uses an integrated keyboard and screen to access a credit or debit Mastercard Account.`,
            ].map(getContentItem),
        },
        {
            title: "Mobile Remote Payments",
            content: [
                `A payment functionality that is initiated by an enrolled Consumer, from the Consumer’s Mobile Device for Personal
                PIN Entry, to facilitate a financial Transaction. Mobile Remote Payments are Card-Not-Present Transactions.`,
            ].map(getContentItem),
        },
        {
            title: "Non-face-to-face Transaction",
            content: [
                `A Transaction where the Card, the Consumer, or the Merchant representative
                are not present in the same location at the time of the Transaction. Mail Order, Telephone Order, Consumer-
                activated Terminal (CAT), Electronic Commerce (e-commerce), and Transponder are examples of Non-face-to-
                face Transactions. A Non-face-to-face Transaction is a Card Not Present Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "PAN Key-Entry Fallback (PKE) Transaction",
            content: [
                `A Face-to-face Transaction where the Merchant key-enters the PAN,
                due to the failure of the Card or the POI Terminal and therefore the full magnetic track data cannot be read by a
                POI Terminal for transmission in its entirety to the Issuer. A PKE Transaction is a Card-Present Transaction, as the
                imprint of the Card, taken at the time of Transaction, is considered proof of card presence.`,
            ].map(getContentItem),
        },
        {
            title: "Point of Interaction (POI) Terminal",
            content: [
                `Any attended or unattended apparatus that meets the Corporation
                requirements and permits the initiation of a Transaction in accordance with the Standards. POI Terminals
                include POS Terminals, ATMs, PIN-based In-branch Terminals, and any apparatus that facilitates Card Present
                Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "Point of Sale (POS) Terminal",
            content: [
                `Any attended or unattended apparatus located in or at a Merchant’s premises
                that meets the Corporation’s requirements permits the initiation of a Transaction with a Card for the purchase of
                goods or services sold by such Merchant, in accordance with the Standards.`,
            ].map(getContentItem),
        },
        {
            title: "Recurring Payment Transaction",
            content: [
                `A Non-face-to-face Transaction initiated on behalf of a Consumer who has
                authorized a Merchant to bill that Consumer’s Mastercard account on a recurring basis (such as monthly or
                quarterly). The amount of each payment may be the same or may fluctuate. A Recurring Payments Transaction
                is a Card-Not-Present Transaction.`,
            ].map(getContentItem),
        },
        {
            title: "Rejected",
            content: [`Refers to a "rejected" transaction to the Fraud and Loss database.`].map(
                getContentItem,
            ),
        },
        {
            title: "Stolen Fraud",
            content: [
                `A fraudulent transaction that occurs with the use of a stolen credit or debit card (or other device accessing a credit or debit card account—for example, convenience and balance transfer checks) without the actual, implied, or apparent authority of the cardholder.`,
            ].map(getContentItem),
        },
        {
            title: "Submitted",
            content: [`Refers to a submitted transaction to the Fraud and Loss Database.`].map(
                getContentItem,
            ),
        },
        {
            title: "Suspended",
            content: [
                `Refers to a transaction to the Fraud and Loss Database that is in a suspended status.`,
            ].map(getContentItem),
        },
        {
            title: "Terminal",
            content: [
                `An attended or unattended device that meets the Corporation requirements and that permits a
                Cardholder to initiate and effect a Transaction at an ATM or PIN-Based In-Branch Terminal with a Card in
                accordance with the Standards.`,
            ].map(getContentItem),
        },
        {
            title: "Other (OTH)",
            content: [
                `<b>Never Received Issue (NRI)</b> - The interception and use of a credit or debit card (or other device accessing
                credit or debit card account—for example, convenience and balance transfer checks) before receipt by
                the cardholder by a person without the actual, implied, or apparent authority of the cardholder.`,
                `<b>Fraudulent Application (FA)</b> - A fraudulent transaction that occurs with the use of a credit or debit card
                that was obtained with an application using a false name or other false identification information.`,
                `<b>Account Takeover Fraud (ATO)</b> - An existing credit or debit account is used without the actual, implied,
                or apparent authority of the cardholder, by a person who gains access to and use of the account through
                an unauthorized means, such as a change of address or request for re-issuance of credit or debit cards
                (or other device for accessing a credit or debit account—for example, convenience and balance transfer
                checks) but not lost or stolen cards.`,
                `<b>Multiple Imprint Fraud (MI)</b> - A fraudulent transaction that occurs with a credit or debit card where the
                merchant, having completed a legitimate face-to-face transaction, deposits one or more additional
                transactions without the actual, implied, or apparent authority of the cardholder. For example, the
                merchant makes several imprints of a card on paper formsets or produces terminal receipts upon
                receiving additional online or offline card-read authorization approvals.`,
                `<b>Bust-Out Collusive Merchant (BO)</b> - A collusive cardholder engaging in transactions with a collusive
                merchant as defined in the Cardholder-Merchant Collusion Program.`,
            ].map(getContentItem),
        },
    ],
};

export const glossaryContentCalculations: IContentGroup = {
    title: "Calculations",
    icon: "calculator",
    content: [
        {
            title: "Fraud Basis Point calculations in the Fraud Intelligence Section",
            content: [
                `<b>Gross</b> = Fraud on processed transactions / Total Processed Transactions x 10,000`,
                `<b>Issuer Net (Fraud BPS)</b> = (Fraud on processed transactions – 1st Chargebacks + 2nd Presentments – Arbitrations) / Total Processed
                Transactions x 10,000`,
                `<b>Acquirer Net (Fraud BPS)</b> = (1st Chargebacks – 2nd Presentments + Arbitrations) / Total Processed Transactions x 10,000`,
            ].map(getContentItem),
        },
        {
            title: "Other calculations",
            content: [
                `<b>EMV transaction volume %</b> = number of approved chip contact transactions / (number of approved chip contact
                transactions + number of approved mag stripe contact transactions)`,
                `<b>Decline rate</b> - Shows how many transactions are declined out of total transactions. It is calculated as Declined transaction/total authorized transactions`,
                `<b>Approval rate</b> - Shows how many transactions are approved out of total transactions. It is calculated as approved transaction/total authorized transactions`,
                `<b>NB</b> - Percentages of Processed Volume and Fraud Volume Throughout this Document may not Total 100% due to the
                Occasional Exclusion of Certain Data Categories from this Report`,
            ].map(getContentItem),
        },
    ],
};

export const glossaryContentHowToAccess: IContentGroup = {
    title: "How to access",
    icon: "settings",
    content: [
        {
            title: "Register for Mastercard Connect™",
            content: [
                `To gain access to the site, your company must have a pre-existing relationship with Mastercard.
                <ol type="a">
                    <li>Navigate to <a href="http://www.mastercardconnect.com">www.mastercardconnect.com</a>. The Sign In page will appear as shown below.</li>
                    <li>If you are a new user, click <b>Sign Up</b>.</li>
                    <li>Provide the requested information to complete the registration process.</li>
                </ol>
                <image>howToAccess/register.png</image>`,
            ].map(getContentItem),
        },
        {
            title: "Register and Provision a Company",
            content: [
                `You must be provisioned through the Business Administration application available on Mastercard ConnectTM to access
                the Issuer Security Solutions products and to have access to the data (account ranges) that will be viewable in The
                Fraud Center application. The Business Administration (Register and Provision a Company) application enables the
                Business Administrator (BA) to manage access to their applications and data for their own company and their
                associated companies (such as, service providers, affiliates).<br/>
                For more information about the Business Administration application go to <b>Mastercard Connect</b> > <b>Support</b> > <b>My Apps</b>
                > <b>Business Administration</b>.
                <ol type="a">
                    <li>Navigate to <a href="http://www.mastercardconnect.com">www.mastercardconnect.com</a> and sign in using your user id and Secure ID token.</li>
                    <li>From the Home/My Apps landing page, click <b>Open</b> on The Fraud Center application card.</li>
                    <li>Enter in Fraud Insights – You may need to <b>select Issuer or Acquirer Insights respectively depending which
                    segment you are accessing</b>.</li>
                </ol>`,
            ].map(getContentItem),
        },
        {
            title: "Request Access to The Fraud Center",
            content: [
                `The Fraud Center is a centralized online management portal that provides users with a centralized, single point of
                access to Mastercard’s security utilities, enabling the ability to combat flash fraud attacks, manage fraud cases,
                report fraudulent transactions, author strategic fraud rules, perform fraud/risk reporting, and more.<br/>
                You must have access to The Fraud Center to use Fraud Insights. Register for The Fraud Center by enrolling through
                the Store on Mastercard Connect™.
                <ol type="a">
                    <li>Navigate to <a href="http://www.mastercardconnect.com">www.mastercardconnect.com</a>.</li>
                    <li>Enter your User ID and password credentials, and then click <b>Sign In</b>.</li>
                    <li>Click <b>Store</b></li>
                    <li>Scroll to locate and select <b>The Fraud Center</b> or alternately enter <b>“The Fraud Center”</b> in the search box as shown
                    below.</li>
                    <li>Click <b>Order</b> on The Fraud Center application card. The Order Details window appears and presents all of The
                    Fraud Center tools that can be ordered.</li>
                </ol>
                <image>howToAccess/request.png</image>`,
            ].map(getContentItem),
        },
        {
            title: "Upgrading from Standard to Premium Tier",
            content: [
                `All users have standard access that comes at no cost. Premium Tier information is paid for content. Please check
                Mastercard Consolidated Billing Manual for further details.<br/>
                Issuers and Acquirers can upgrade Fraud Insights access from Standard tier to Premium tier from within the Upgrade
                Tab within the Fraud Insights application.
                <image>howToAccess/upgrade1.png</image>
                <ol type="a">
                    <li>Select <b>Premium Tier</b> in the Order Details window choose either Acquiring / Issuing / or both if you perform both
                    functions.</li>
                    <li>Place order – submit.</li>
                    <li>Click <b>Place Order</b> after completing the information above. A confirmation of your order displays.<br/>
                    NOTE: Until your order for The Fraud Center has been approved from your company’s internal Security Administrator for
                    Mastercard Connect, your access to The Fraud Center application displays as ‘Access Pending’ upon signing into
                    Mastercard Connect.</li>
                </ol>
                <image>howToAccess/upgrade2.png</image>`,
            ].map(getContentItem),
        },
    ],
};

export const glossaryContentProductOverviewDigital: IContentGroup = {
    title: "Digital",
    icon: "product",
    content: [
        `Premium users can gain insights into <b>digital</b> payments and fraud.
        <ul>
            <li>Offers extensive digital insights for card provisioning and tokenized transaction processing</li>
            <li>Includes a detailed view of digital market growth, wallet recommendations, issuer decisioning and fraud within
            card provisioning</li>
            <li>Elaborates on tokenized transaction fraud trends to promote a better digital economy</li>
        </ul>
        <productdetails>digital</productdetails>`,
    ].map(getContentItem),
};

export const glossaryContentProductOverviewBenchmarking: IContentGroup = {
    title: "Benchmarking",
    icon: "product",
    content: [
        `Users can <b>benchmark</b> fraud performance relative to peers.
        <ul>
            <li>
                Informs strategic decisions based on competitive position across peers,
                best-in-class, countries, regions and the world
            </li>
            <li>
                Identifies performance gaps and areas of improvement in business areas with high
                fraud rates and decline rates across channels, corridors and transaction types
            </li>
            <li>Provides insight into successful strategies used by peers to prevent fraud</li>
        </ul>
        Benchmarking (Standard) insights is available as part of both standard and premium tiers for both issuers and
        acquirers.&ensp;
        <productdetails>benchmarking</productdetails>`,
    ].map(getContentItem),
};

export const glossaryContentProductOverviewBenchmarkingPremium: IContentGroup = {
    title: "Benchmarking Premium",
    icon: "product",
    content: [
        `Users can <b>benchmark</b> fraud performance relative to peers.
        <ul>
            <li>
                Informs strategic decisions based on competitive position across peers,
                best-in-class, countries, regions and the world
            </li>
            <li>
                Identifies performance gaps and areas of improvement in business areas with high
                fraud rates and decline rates across channels, corridors and transaction types
            </li>
            <li>Provides insight into successful strategies used by peers to prevent fraud</li>
        </ul>
        Benchmarking (Premium) insights is available as part of the premium tier for both issuers and acquirers.&ensp;
        <productdetails>benchmarking-premium</productdetails>`,
    ].map(getContentItem),
};

export const glossaryContentProductOverviewFraudIntelligenceInsights: IContentGroup = {
    title: "Fraud Intelligence Insights",
    icon: "product",
    content: [
        `Users can gather market <b>fraud intelligence</b> from a global network.
        <ul>
            <li>Provides a detailed view of global fraud trends</li>
            <li>Provides better understanding of market vulnerabilities in regions and markets around the world</li>
            <li>Helps identify opportunities for new product concepts and modification of existing products</li>
        </ul>
        <productdetails>fraud-intelligence-insights</productdetails>`,
    ].map(getContentItem),
};

export const glossaryContentProductOverview: IContentGroup = {
    title: "Product Overview",
    icon: "product",
    content: [
        glossaryContentProductOverviewDigital,
        glossaryContentProductOverviewBenchmarking,
        glossaryContentProductOverviewBenchmarkingPremium,
        glossaryContentProductOverviewFraudIntelligenceInsights,
    ],
};

export const glossaryContent: IContentGroup[] = [
    glossaryContentGlossary,
    glossaryContentCalculations,
    glossaryContentHowToAccess,
    glossaryContentProductOverview,
];
