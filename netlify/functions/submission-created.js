const { sendContactNotification } = require("./_email");

exports.handler = async (event) => {
  const formName = event.body
    ? new URLSearchParams(event.body).get("form-name")
    : null;

  if (formName !== "website-plan") {
    return { statusCode: 200, body: "ok" };
  }

  try {
    const params = new URLSearchParams(event.body || "");
    const data = {
      name: params.get("name") || "",
      business: params.get("business") || "",
      contact: params.get("contact") || "",
      website: params.get("website") || "",
      goal: params.get("goal") || "",
      range: params.get("range") || "",
      launch: params.get("launch") || "",
    };

    await sendContactNotification(data);
  } catch (error) {
    console.error("submission-created error", error);
  }

  return { statusCode: 200, body: "ok" };
};
