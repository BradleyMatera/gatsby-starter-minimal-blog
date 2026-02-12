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
  sessionId,
  items,
  totalCents,
  currency,
  purchasesUrl,
  successUrl,
  supportEmail,
  purchaseDate,
}) => {
  const subject = "Your receipt — Bradley Matera";
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

  const text = `Thanks for your purchase!\n\nOrder ID: ${orderId}\nDate: ${purchaseDate}\n\nItems:\n${lines}\n\nTotal: ${formatMoney(totalCents, currency)}\n\n${downloadsText}\nRe-download anytime in your customer portal: ${purchasesUrl}\n\nSupport: ${supportEmail}\n\n${sellerDisclosure}\n`;

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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; background: #f5f6fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e6f0;">
        <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #7c7c9a;">
          Bradley Matera — Digital Goods
        </p>
        <h2 style="margin: 0 0 12px;">Thanks for your purchase!</h2>
        <p style="margin: 0 0 6px;">Order ID: <strong>${orderId}</strong></p>
        <p style="margin: 0 0 16px;">Date: ${purchaseDate}</p>
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
      <p style="margin: 0 0 16px; font-weight: bold;">Total: ${formatMoney(totalCents, currency)}</p>
      ${
        successUrl
          ? `<p style="margin: 0 0 10px;">
        <a href="${successUrl}" target="_blank" rel="noopener noreferrer" style="color: #2f4cc8;">Access your downloads</a>
      </p>`
          : ""
      }
        <p style="margin: 0 0 16px;">
          Re-download anytime in your customer portal:
          <a href="${purchasesUrl}" target="_blank" rel="noopener noreferrer" style="color: #2f4cc8;">View your purchases</a>
        </p>
        <p style="margin: 0;">Support: <a href="mailto:${supportEmail}" style="color: #2f4cc8;">${supportEmail}</a></p>
        <p style="margin: 16px 0 0; font-size: 12px; color: #666;">
          Affiliate products are sold by third-party merchants. Bradley Matera is not the seller or creator of affiliate products.
          Direct digital downloads are sold by Bradley Matera.
        </p>
      </div>
    </div>
  `;

  return { subject, text, html };
};

const sendReceiptEmail = async ({
  to,
  orderId,
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

const buildDownloadReadyEmail = ({
  orderId,
  purchasesUrl,
  successUrl,
  supportEmail,
  purchaseDate,
}) => {
  const subject = "Your downloads are ready — Bradley Matera";
  const downloadsText = successUrl
    ? `Access your downloads: ${successUrl}`
    : `Access your downloads in the customer portal: ${purchasesUrl}`;
  const text = `Your downloads are ready.\n\nOrder ID: ${orderId}\nDate: ${purchaseDate}\n\n${downloadsText}\nNote: Download links are time-limited. If they expire, re-generate them in your customer portal.\n\nSupport: ${supportEmail}\n`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; background: #f5f6fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e6f0;">
        <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #7c7c9a;">
          Bradley Matera — Digital Goods
        </p>
        <h2 style="margin: 0 0 12px;">Your downloads are ready</h2>
        <p style="margin: 0 0 6px;">Order ID: <strong>${orderId}</strong></p>
        <p style="margin: 0 0 16px;">Date: ${purchaseDate}</p>
        ${
          successUrl
            ? `<p style="margin: 0 0 10px;">
          <a href="${successUrl}" target="_blank" rel="noopener noreferrer" style="color: #2f4cc8;">Access your downloads</a>
        </p>`
            : ""
        }
        <p style="margin: 0 0 16px;">
          Re-download anytime in your customer portal:
          <a href="${purchasesUrl}" target="_blank" rel="noopener noreferrer" style="color: #2f4cc8;">View your purchases</a>
        </p>
        <p style="margin: 0 0 16px; font-size: 12px; color: #666;">
          Download links are time-limited. If they expire, re-generate them in your customer portal.
        </p>
        <p style="margin: 0;">Support: <a href="mailto:${supportEmail}" style="color: #2f4cc8;">${supportEmail}</a></p>
      </div>
    </div>
  `;

  return { subject, text, html };
};

const buildRefundEmail = ({
  orderId,
  purchasesUrl,
  supportEmail,
  refundDate,
}) => {
  const subject = "Your refund is processed — Bradley Matera";
  const text = `Your refund has been processed.\n\nOrder ID: ${orderId}\nRefund date: ${refundDate}\n\nView purchases: ${purchasesUrl}\nSupport: ${supportEmail}\n`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; background: #f5f6fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e6f0;">
        <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #7c7c9a;">
          Bradley Matera — Digital Goods
        </p>
        <h2 style="margin: 0 0 12px;">Refund processed</h2>
        <p style="margin: 0 0 6px;">Order ID: <strong>${orderId}</strong></p>
        <p style="margin: 0 0 16px;">Refund date: ${refundDate}</p>
        <p style="margin: 0 0 16px;">
          <a href="${purchasesUrl}" target="_blank" rel="noopener noreferrer" style="color: #2f4cc8;">View your purchases</a>
        </p>
        <p style="margin: 0;">Support: <a href="mailto:${supportEmail}" style="color: #2f4cc8;">${supportEmail}</a></p>
      </div>
    </div>
  `;

  return { subject, text, html };
};

const sendDownloadReadyEmail = async ({ to, orderId, sessionId, purchaseDate }) => {
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
  const receipt = buildDownloadReadyEmail({
    orderId,
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

const sendRefundEmail = async ({ to, orderId, refundDate }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  const supportEmail = process.env.ORDER_SUPPORT_EMAIL || "bradmatera@gmail.com";
  if (!apiKey || !from) {
    console.warn("Email sending skipped: RESEND_API_KEY or ORDER_EMAIL_FROM not set.");
    return false;
  }

  const siteUrl = process.env.SITE_URL || process.env.URL || "";
  const purchasesUrl = siteUrl ? `${siteUrl}/purchases` : "/purchases";
  const receipt = buildRefundEmail({
    orderId,
    purchasesUrl,
    supportEmail,
    refundDate,
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

module.exports = { sendReceiptEmail, sendDownloadReadyEmail, sendRefundEmail };
