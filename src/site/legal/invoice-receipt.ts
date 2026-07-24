/**
 * Invoice and receipt template helpers.
 *
 * These functions generate structured invoice and receipt objects that can be
 * rendered as HTML, sent via email, or exported for bookkeeping.
 *
 * Seller identity is always Bradley F. Matera, Illinois sole proprietor.
 * EIN is never included on public invoices or customer receipts.
 */

const SELLER = {
  legalName: "Bradley F. Matera",
  entityType: "Illinois sole proprietor",
  email: "bradmatera@gmail.com",
  phone: "(608) 313-5373",
  disclosure: "Website services and digital products are provided by Bradley F. Matera, an Illinois sole proprietor.",
};

export type InvoiceStatus = "draft" | "sent" | "partially_paid" | "paid" | "refunded" | "cancelled";

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPriceCents: number;
};

export type Invoice = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerBusiness?: string;
  customerEmail?: string;
  projectName: string;
  milestone?: string;
  lineItems: InvoiceLineItem[];
  paymentMethod?: string;
  notes?: string;
  status: InvoiceStatus;
  termsUrl: string;
};

export type Receipt = {
  receiptNumber: string;
  invoiceOrOrderNumber: string;
  datePaid: string;
  customerName: string;
  customerEmail?: string;
  lineItems: InvoiceLineItem[];
  amountPaidCents: number;
  paymentProvider: "stripe" | "paypal" | "zelle";
  transactionReference: string;
  remainingBalanceCents: number;
  seller: typeof SELLER;
  supportEmail: string;
};

export const generateInvoiceNumber = (sequenceNumber: number, year = new Date().getFullYear()): string => {
  return `INV-${year}-${String(sequenceNumber).padStart(4, "0")}`;
};

export const generateReceiptNumber = (sequenceNumber: number, year = new Date().getFullYear()): string => {
  return `RCP-${year}-${String(sequenceNumber).padStart(4, "0")}`;
};

export const calculateInvoiceTotal = (lineItems: InvoiceLineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
};

export const formatCurrency = (cents: number, currency = "USD"): string => {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  }
};

export const buildInvoice = (params: {
  sequenceNumber: number;
  customerName: string;
  customerBusiness?: string;
  customerEmail?: string;
  projectName: string;
  milestone?: string;
  lineItems: InvoiceLineItem[];
  paymentMethod?: string;
  notes?: string;
  termsUrl: string;
  dueDate?: string;
}): Invoice => {
  const issueDate = new Date().toISOString().split("T")[0];
  const defaultDueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return {
    invoiceNumber: generateInvoiceNumber(params.sequenceNumber),
    issueDate,
    dueDate: params.dueDate || defaultDueDate,
    customerName: params.customerName,
    customerBusiness: params.customerBusiness,
    customerEmail: params.customerEmail,
    projectName: params.projectName,
    milestone: params.milestone,
    lineItems: params.lineItems,
    paymentMethod: params.paymentMethod,
    notes: params.notes,
    status: "draft",
    termsUrl: params.termsUrl,
  };
};

export const buildReceipt = (params: {
  sequenceNumber: number;
  invoiceOrOrderNumber: string;
  customerName: string;
  customerEmail?: string;
  lineItems: InvoiceLineItem[];
  amountPaidCents: number;
  paymentProvider: "stripe" | "paypal" | "zelle";
  transactionReference: string;
  remainingBalanceCents?: number;
}): Receipt => {
  return {
    receiptNumber: generateReceiptNumber(params.sequenceNumber),
    invoiceOrOrderNumber: params.invoiceOrOrderNumber,
    datePaid: new Date().toISOString().split("T")[0],
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    lineItems: params.lineItems,
    amountPaidCents: params.amountPaidCents,
    paymentProvider: params.paymentProvider,
    transactionReference: params.transactionReference,
    remainingBalanceCents: params.remainingBalanceCents || 0,
    seller: SELLER,
    supportEmail: SELLER.email,
  };
};

export { SELLER };
