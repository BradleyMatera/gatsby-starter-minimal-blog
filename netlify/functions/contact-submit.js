const { sendContactNotification } = require("./_email");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "method_not_allowed" }),
    };
  }

  let data;
  try {
    const contentType = event.headers["content-type"] || "";
    if (contentType.includes("application/json")) {
      data = JSON.parse(event.body || "{}");
    } else {
      const params = new URLSearchParams(event.body || "");
      data = {
        name: params.get("name") || "",
        business: params.get("business") || "",
        contact: params.get("contact") || "",
        website: params.get("website") || "",
        goal: params.get("goal") || "",
        range: params.get("range") || "",
        launch: params.get("launch") || "",
        "bot-field": params.get("bot-field") || "",
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "invalid_input" }),
    };
  }

  if (data["bot-field"]) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  }

  if (!data.name || !data.business || !data.contact) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "missing_required_fields" }),
    };
  }

  try {
    const sent = await sendContactNotification(data);
    if (!sent) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "email_not_configured",
          message: "RESEND_API_KEY or ORDER_EMAIL_FROM not set in Netlify env vars.",
        }),
      };
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("contact-submit error", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "server_error" }),
    };
  }
};
