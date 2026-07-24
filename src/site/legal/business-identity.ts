/**
 * Single source of truth for Bradley Matera's business identity.
 *
 * Legal facts:
 * - Legal seller: Bradley F. Matera
 * - Entity type: Illinois sole proprietor
 * - "Matera Digital" is an informal trade name only (IRS trade name entered;
 *   Winnebago County DBA registration not yet completed).
 * - Matera Digital LLC does NOT exist. Never display "Matera Digital LLC" or
 *   imply an LLC, corporation, or registered agency.
 * - Never publish EIN, SSN, or residential street address.
 *
 * These constants are imported by the footer, policy pages, checkout,
 * structured data, and invoice/receipt templates so the legal identity
 * cannot drift between pages.
 */

export const SELLER_LEGAL_NAME = "Bradley F. Matera";
export const SELLER_ENTITY_TYPE = "Illinois sole proprietor";
export const SELLER_TRADE_NAME = "Matera Digital"; // informal brand only — NOT a legal entity
export const SELLER_PUBLIC_DESCRIPTION =
  "Web development and related digital services";

/** Short disclosure used in footer, checkout, and invoices. */
export const SELLER_DISCLOSURE_SHORT =
  "Website services and digital products are provided by Bradley F. Matera, an Illinois sole proprietor.";

/** One-line identity used in footer bottom bar and structured data. */
export const SELLER_IDENTITY_LINE = `${SELLER_LEGAL_NAME} · ${SELLER_ENTITY_TYPE}`;

export const SELLER_EMAIL = "bradmatera@gmail.com";
export const SELLER_PHONE = "(608) 313-5373";
export const SELLER_PHONE_HREF = "tel:+16083135373";

// No residential street address is published.
// Only city/state is used for local SEO and structured data.
export const SELLER_ADDRESS_CITY = "Durand";
export const SELLER_ADDRESS_STATE = "IL";
export const SELLER_ADDRESS_COUNTRY = "US";

export const POLICY_LAST_UPDATED = "July 2026";

/**
 * Canonical policy page paths. Used by the footer, checkout acceptance,
 * and cross-links between policy pages.
 */
export const POLICY_LINKS = [
  { label: "Privacy Policy", path: "/privacy/" },
  { label: "Terms of Service", path: "/terms/" },
  { label: "Payment Terms", path: "/payment-terms/" },
  { label: "Refund and Cancellation Policy", path: "/refund-policy/" },
  { label: "Digital Product License", path: "/digital-product-license/" },
  { label: "Service Scope", path: "/service-scope/" },
  { label: "Contact", path: "/contact/" },
] as const;

/**
 * Canonical package definitions. All pricing, terms, and service-scope
 * displays should import from here to avoid contradictions.
 */
export interface PackageDefinition {
  id: "starter" | "growth" | "lead-engine";
  name: string;
  buildPrice: number;
  monthlyPrice: number;
  monthlyPlanName: string;
  maxPages: string;
  revisionRounds: number;
  buildTime: string;
  description: string;
  features: string[];
  notIncluded: string[];
}

export const PACKAGES: PackageDefinition[] = [
  {
    id: "starter",
    name: "Starter Presence",
    buildPrice: 447,
    monthlyPrice: 37,
    monthlyPlanName: "Essential Care",
    maxPages: "Up to 5 pages",
    revisionRounds: 1,
    buildTime: "Approximately 14 days after required content is received",
    description:
      "A clean, conversion-focused website for new businesses or solo operators.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic SEO and local business structured data",
      "Accessibility baseline",
      "Contact form",
      "Hosting setup",
      "Analytics setup",
      "1 revision round",
      "30-day post-launch warranty",
    ],
    notIncluded: [
      "E-commerce functionality",
      "Google Business Profile setup",
      "Advanced schema markup",
    ],
  },
  {
    id: "growth",
    name: "Local Growth",
    buildPrice: 797,
    monthlyPrice: 67,
    monthlyPlanName: "Growth Care",
    maxPages: "Up to 10 pages",
    revisionRounds: 2,
    buildTime: "Approximately 3–4 weeks after required content is received",
    description:
      "An established service business ready to compete in local search.",
    features: [
      "Up to 10 pages",
      "Everything in Starter Presence",
      "Local SEO foundations",
      "Analytics and conversion tracking setup",
      "Google Business Profile alignment assistance",
      "Advanced schema markup (Service + FAQ)",
      "2 revision rounds",
      "30-day post-launch warranty",
    ],
    notIncluded: [
      "E-commerce functionality",
      "Custom integrations",
      "AI integrations",
    ],
  },
  {
    id: "lead-engine",
    name: "Lead Engine",
    buildPrice: 1497,
    monthlyPrice: 97,
    monthlyPlanName: "Search Care",
    maxPages: "Final page count defined in the written scope",
    revisionRounds: 3,
    buildTime: "Timeline defined in the written scope",
    description:
      "A comprehensive site for businesses focused on dominating their local market.",
    features: [
      "Final page count and timeline defined in the written scope",
      "Everything in Local Growth",
      "Advanced integrations (custom quoted)",
      "Custom conversion planning",
      "Service-area architecture",
      "Technical SEO and structured data",
      "Post-launch measurement review",
      "3 revision rounds",
      "30-day post-launch warranty",
    ],
    notIncluded: [
      "E-commerce (custom quoted separately)",
      "AI integrations (custom quoted separately)",
      "Advertising management",
      "Accessibility certification",
      "Regulatory compliance",
    ],
  },
];

export const HOURLY_RATE = 65;
export const SITE_REFRESH_PRICE = 597;

/**
 * Canonical payment terms. Used by Terms, Payment Terms, and pricing pages.
 */
export const PAYMENT_TERMS = {
  depositPercent: 50,
  depositDescription:
    "A 50% deposit schedules the project. Work begins only after the service agreement, scope, and deposit are received.",
  finalBalanceDescription:
    "The remaining balance is due after client approval and before public launch or final transfer.",
  monthlyBillingDescription:
    "Monthly plans are billed in advance and may be cancelled before the next billing period.",
  feePolicy:
    "Payment-processing fees are not added unless clearly disclosed before payment and legally permitted.",
  currency: "All prices are in U.S. dollars unless otherwise stated.",
};

/**
 * Canonical refund policy text. Used by Terms, Refund Policy, and pricing pages.
 */
export const REFUND_POLICY = {
  depositRefund:
    "Project deposits are refundable until the first revision round is delivered. After that milestone, payments are applied to completed and reserved work as described in the signed service agreement.",
  refundMethod:
    "Any approved refund is returned through the original payment method.",
  nonwaivableRights:
    "Nothing in this policy limits rights that cannot legally be waived.",
};

/**
 * Canonical intellectual property wording.
 */
export const IP_WORDING = {
  ownership:
    "Ownership of custom final deliverables specifically identified in the signed scope transfers after full payment. Bradley retains ownership of pre-existing materials, general knowledge, reusable tools, frameworks and components not created exclusively for the client. Third-party materials remain governed by their original licenses.",
  domains:
    "Domains and client-specific accounts should be registered in the client's name whenever practical. Bradley does not claim ownership of domains or accounts owned by third parties.",
};

/**
 * No-contracts replacement language.
 */
export const NO_CONTRACTS_REPLACEMENT =
  "No long-term commitment. Website care plans are month-to-month. Every website project still uses a written service agreement and scope of work.";

/**
 * Zelle payment language (invoice only, not public).
 */
export const ZELLE_LANGUAGE =
  "Zelle may be available for established clients after a written agreement and numbered invoice have been issued. Availability depends on the participating financial institutions. Include the invoice number in the payment memo.";

/**
 * Response time clarification.
 */
export const RESPONSE_TIME_CLARIFICATION =
  "Response time means acknowledging a support request, not necessarily resolving it.";
