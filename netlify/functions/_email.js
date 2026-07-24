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

const buildContactNotificationEmail = ({ name, business, contact, website, goal, range, launch }) => {
  const subject = `New website plan request — ${name || business || "Unknown"}`;
  const rangeLabels = {
    "under-500": "Under $500",
    "500-1000": "$500 - $1,000",
    "1000-1500": "$1,000 - $1,500",
    "1500-plus": "$1,500+",
    "not-sure": "Not sure yet",
  };
  const launchLabels = {
    asap: "As soon as possible",
    "1-month": "Within 1 month",
    "1-3-months": "1-3 months",
    "3-6-months": "3-6 months",
    "no-rush": "No rush, just exploring",
  };
  const rangeText = rangeLabels[range] || range || "Not specified";
  const launchText = launchLabels[launch] || launch || "Not specified";
  const websiteText = website ? website : "No existing website";

  const text = `New website plan request from the contact form.

Name: ${name}
Business: ${business}
Email/Phone: ${contact}
Existing website: ${websiteText}
Main goal: ${goal || "Not specified"}
Project range: ${rangeText}
Launch window: ${launchText}

Reply directly to this email or call them back.`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; background: #f5f6fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e6f0;">
        <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #7c7c9a;">
          Bradley Matera — Contact Form
        </p>
        <h2 style="margin: 0 0 16px;">New website plan request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Business</td><td style="padding: 6px 0;">${business}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email/Phone</td><td style="padding: 6px 0;">${contact}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Website</td><td style="padding: 6px 0;">${websiteText}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Project range</td><td style="padding: 6px 0;">${rangeText}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Launch window</td><td style="padding: 6px 0;">${launchText}</td></tr>
        </table>
        <h3 style="margin: 16px 0 6px;">Main goal</h3>
        <p style="margin: 0 0 16px;">${goal || "Not specified"}</p>
        <p style="margin: 16px 0 0; font-size: 12px; color: #666;">
          Reply directly to this email or call them back.
        </p>
      </div>
    </div>
  `;

  return { subject, text, html };
};

const sendContactNotification = async (data) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO || process.env.ORDER_SUPPORT_EMAIL || "bradmatera@gmail.com";

  if (!apiKey || !from) {
    console.warn("Contact notification skipped: RESEND_API_KEY or ORDER_EMAIL_FROM not set.");
    return false;
  }

  const email = buildContactNotificationEmail(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.contact || undefined,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend contact notification failed", response.status, body);
    return false;
  }

  return true;
};

module.exports = { sendReceiptEmail, sendDownloadReadyEmail, sendRefundEmail, sendContactNotification };
