const formatMoney = (cents, currency) => {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  } catch (error) {
    return `${amount.toFixed(2)} ${currency || "USD"}`;
  }
};

const buildReceiptEmail = ({
  orderId,
  lookupToken,
  sessionId,
  items,
  totalCents,
  currency,
  purchasesUrl,
  successUrl,
  supportEmail,
  purchaseDate,
}) => {
  const subject = "Your receipt from Bradley Matera";
  const lines = items
    .map(
      (item) =>
        `${item.name} x${item.quantity} — ${formatMoney(item.unit_price_cents * item.quantity, currency)}`
    )
    .join("\n");

  const downloadsText = successUrl
    ? `Access your downloads: ${successUrl}`
    : `Access your downloads in the customer portal: ${purchasesUrl}`;
  const sellerDisclosure =
    "Affiliate products are sold by third-party merchants. Bradley Matera is not the seller or creator of affiliate products. Direct digital downloads are sold by Bradley Matera.";

  const text = `Thanks for your purchase!\n\nOrder ID: ${orderId}\nDate: ${purchaseDate}\nLookup code: ${lookupToken}\n\nItems:\n${lines}\n\nTotal: ${formatMoney(totalCents, currency)}\n\n${downloadsText}\nView purchases: ${purchasesUrl}\n\nSupport: ${supportEmail}\n\n${sellerDisclosure}\n`;

  const htmlItems = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 6px 0;">${item.name} × ${item.quantity}</td>
          <td style="padding: 6px 0; text-align: right;">${formatMoney(
            item.unit_price_cents * item.quantity,
            currency
          )}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 12px;">Thanks for your purchase!</h2>
      <p style="margin: 0 0 10px;">Order ID: <strong>${orderId}</strong></p>
      <p style="margin: 0 0 10px;">Date: ${purchaseDate}</p>
      <p style="margin: 0 0 12px;">Lookup code:</p>
      <div style="font-size: 18px; font-weight: bold; letter-spacing: 1px; margin: 0 0 16px;">
        ${lookupToken}
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
        <thead>
          <tr>
            <th style="text-align: left; padding-bottom: 6px;">Item</th>
            <th style="text-align: right; padding-bottom: 6px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${htmlItems}
        </tbody>
      </table>
      <p style="margin: 0 0 12px; font-weight: bold;">Total: ${formatMoney(totalCents, currency)}</p>
      ${
        successUrl
          ? `<p style="margin: 0 0 8px;">
        <a href="${successUrl}" target="_blank" rel="noopener noreferrer">Access your downloads</a>
      </p>`
          : ""
      }
      <p style="margin: 0 0 16px;">
        <a href="${purchasesUrl}" target="_blank" rel="noopener noreferrer">View your purchases</a>
      </p>
      <p style="margin: 0;">Support: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
      <p style="margin: 16px 0 0; font-size: 12px; color: #666;">
        Affiliate products are sold by third-party merchants. Bradley Matera is not the seller or creator of affiliate products.
        Direct digital downloads are sold by Bradley Matera.
      </p>
    </div>
  `;

  return { subject, text, html };
};

const sendReceiptEmail = async ({
  to,
  orderId,
  lookupToken,
  sessionId,
  items,
  totalCents,
  currency,
  purchaseDate,
}) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  const supportEmail = process.env.ORDER_SUPPORT_EMAIL || "bradmatera@gmail.com";

  if (!apiKey || !from) {
    console.warn("Email sending skipped: RESEND_API_KEY or ORDER_EMAIL_FROM not set.");
    return false;
  }

  const siteUrl = process.env.SITE_URL || process.env.URL || "";
  const purchasesUrl = siteUrl ? `${siteUrl}/purchases` : "/purchases";
  const successUrl = siteUrl && sessionId ? `${siteUrl}/success?session_id=${sessionId}` : "";
  const receipt = buildReceiptEmail({
    orderId,
    lookupToken,
    sessionId,
    items,
    totalCents,
    currency,
    purchasesUrl,
    successUrl,
    supportEmail,
    purchaseDate,
  });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: supportEmail,
      subject: receipt.subject,
      text: receipt.text,
      html: receipt.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend email failed", response.status, body);
    return false;
  }

  return true;
};

module.exports = { sendReceiptEmail };
