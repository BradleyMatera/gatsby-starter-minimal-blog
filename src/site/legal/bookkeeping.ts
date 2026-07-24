/**
 * Bookkeeping export support (admin-only).
 *
 * Generates a CSV or JSON export of transaction data for tax and accounting
 * purposes. This is never exposed to customers.
 *
 * Includes a configurable estimated-tax reserve suggestion (default 32%)
 * that is clearly labeled as a planning estimate only.
 */

export type TransactionRecord = {
  date: string;
  customer: string;
  invoiceOrOrderNumber: string;
  grossAmountCents: number;
  processorFeeCents: number;
  refundsCents: number;
  netReceivedCents: number;
  paymentProvider: string;
  productOrService: string;
  transactionId: string;
  status: string;
};

export type BookkeepingExport = {
  transactions: TransactionRecord[];
  summary: {
    totalGrossCents: number;
    totalFeesCents: number;
    totalRefundsCents: number;
    totalNetCents: number;
    estimatedTaxReserveCents: number;
    estimatedTaxReserveNote: string;
  };
  format: "csv" | "json";
};

const DEFAULT_TAX_RESERVE_PERCENT = 32;

export const TAX_RESERVE_NOTE =
  "Planning estimate only. Taxes are generally calculated from net profit and individual circumstances. This is not a tax calculation.";

export const buildBookkeepingExport = (
  transactions: TransactionRecord[],
  format: "csv" | "json" = "csv",
  taxReservePercent = DEFAULT_TAX_RESERVE_PERCENT
): BookkeepingExport => {
  const totalGrossCents = transactions.reduce((sum, t) => sum + t.grossAmountCents, 0);
  const totalFeesCents = transactions.reduce((sum, t) => sum + t.processorFeeCents, 0);
  const totalRefundsCents = transactions.reduce((sum, t) => sum + t.refundsCents, 0);
  const totalNetCents = transactions.reduce((sum, t) => sum + t.netReceivedCents, 0);
  const estimatedTaxReserveCents = Math.round(totalNetCents * (taxReservePercent / 100));

  return {
    transactions,
    summary: {
      totalGrossCents,
      totalFeesCents,
      totalRefundsCents,
      totalNetCents,
      estimatedTaxReserveCents,
      estimatedTaxReserveNote: TAX_RESERVE_NOTE,
    },
    format,
  };
};

export const transactionsToCSV = (transactions: TransactionRecord[]): string => {
  const headers = [
    "Date",
    "Customer",
    "Invoice/Order Number",
    "Gross Amount (cents)",
    "Processor Fee (cents)",
    "Refunds (cents)",
    "Net Received (cents)",
    "Payment Provider",
    "Product/Service",
    "Transaction ID",
    "Status",
  ];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.customer.replace(/"/g, '""')}"`,
    t.invoiceOrOrderNumber,
    String(t.grossAmountCents),
    String(t.processorFeeCents),
    String(t.refundsCents),
    String(t.netReceivedCents),
    t.paymentProvider,
    `"${t.productOrService.replace(/"/g, '""')}"`,
    t.transactionId,
    t.status,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
};
