import TableScroll from "../../demos/TableScroll";
import * as React from "react";
import { Section, Card, Link } from "../../../ui";

const ContactContent = () => {
  const sending = React.useRef(false);
  const [ready, setReady] = React.useState(false);
  const statusRef = React.useRef<HTMLDivElement>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [attribution, setAttribution] = React.useState({
    source: "",
    sourceCity: "",
    landingPage: "",
    packageInterest: "",
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      source: params.get("source") || "",
      sourceCity: params.get("city") || "",
      landingPage: params.get("landing") || "",
      packageInterest: params.get("package") || "",
    });
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const errors: Record<string, string> = {};
    ["name", "business", "contact"].forEach(key => {
      if (!String(formData.get(key) || "").trim()) errors[key] = `Please enter your ${key === "contact" ? "email or phone number" : key === "business" ? "business name" : "name"}.`;
    });
    const contact = String(formData.get("contact") || "").trim();
    if (contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && contact.replace(/\D/g, "").length < 7) errors.contact = "Enter a valid email address or phone number.";
    const website = String(formData.get("website") || "").trim();
    if (website) {
      try { if (!["https:", "http:"].includes(new URL(website).protocol)) errors.website = "Use a website address beginning with https:// or http://."; }
      catch { errors.website = "Use a complete website address, such as https://example.com."; }
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      const first = form.elements.namedItem(Object.keys(errors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    sending.current = true;
    setStatus("submitting");
    try {
      const data: Record<string, string> = {};
      formData.forEach((value, key) => { data[key] = value.toString(); });
      const response = await fetch("/.netlify/functions/contact-submit", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      if (response.ok) { setStatus("success"); form.reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  };

  return (
  <div className="contact-page">
    <Section
      eyebrow="Contact"
      title={
        <>
          <strong>Get a free website plan</strong>
        </>
      }
      titleAs="h2"
      description={
        <>
          <p className="direct-answer">
            <strong>How do I contact Bradley Matera?</strong> Call (608) 313-5373 or send a message through the form below. Typical response time is within 24 hours. Bradley serves Durand, Davis, Rockford, Freeport, and nearby Northwest Illinois communities.
          </p>
          <p>
            Tell me about your business and what you need. I will reply with honest feedback on whether I am the right fit, and if so, what the next step looks like. No pressure, no sales pitch.
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+16083135373">(608) 313-5373</a><br />
            <strong>Email:</strong> <a href="mailto:bradmatera@gmail.com">bradmatera@gmail.com</a>
          </p>
        </>
      }
    >
      <Card className="contact-card">
        <div className="contact-form">
          <h2 className="contact-info__headline">Send a message</h2>
          {status === "success" ? (
            <div ref={statusRef} tabIndex={-1} role="status" className="contact-result contact-result--success">
              <h3 style={{ margin: "0 0 0.5rem", color: "var(--color-accent)" }}>Thanks — your message is on its way.</h3>
              <p style={{ margin: 0 }}>I will get back to you within 1 business day. Check your email (and spam folder) for a reply from bradmatera@gmail.com.</p>
            </div>
          ) : (
          <form
            name="website-plan"
            method="POST"
            noValidate
            aria-busy={status === "submitting"}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            data-analytics-form="website_plan"
          >
            <input type="hidden" name="source" value={attribution.source} />
            <input type="hidden" name="landingPage" value={attribution.landingPage} />
            {(attribution.sourceCity || attribution.packageInterest) && <fieldset className="contact-context">
              <legend>Your project context</legend>
              <label htmlFor="sourceCity">City</label>
              <input id="sourceCity" name="sourceCity" value={attribution.sourceCity} onChange={e => setAttribution({ ...attribution, sourceCity: e.target.value })} />
              <label htmlFor="packageInterest">Service or package</label>
              <input id="packageInterest" name="packageInterest" value={attribution.packageInterest} onChange={e => setAttribution({ ...attribution, packageInterest: e.target.value })} />
            </fieldset>}
            <p style={{ display: "none" }}>
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="name" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Name *</label>
              <input type="text" id="name" name="name" autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
              {fieldErrors.name && <span className="contact-field-error" id="name-error">{fieldErrors.name}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="business" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Business name *</label>
              <input type="text" id="business" name="business" autoComplete="organization" aria-invalid={Boolean(fieldErrors.business)} aria-describedby={fieldErrors.business ? "business-error" : undefined} required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
              {fieldErrors.business && <span className="contact-field-error" id="business-error">{fieldErrors.business}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="contact" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email or phone *</label>
              <input type="text" id="contact" name="contact" aria-invalid={Boolean(fieldErrors.contact)} aria-describedby={fieldErrors.contact ? "contact-error" : undefined} required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
              {fieldErrors.contact && <span className="contact-field-error" id="contact-error">{fieldErrors.contact}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="website" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Existing website (optional)</label>
              <input type="url" id="website" name="website" autoComplete="url" aria-invalid={Boolean(fieldErrors.website)} aria-describedby={fieldErrors.website ? "website-error" : undefined} placeholder="https://" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
              {fieldErrors.website && <span className="contact-field-error" id="website-error">{fieldErrors.website}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="goal" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Main goal — what should the website do for you?</label>
              <textarea id="goal" name="goal" rows={3} style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="range" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Approximate project range</label>
              <select id="range" name="range" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }}>
                <option value="">Select a range</option>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-1500">$1,000 - $1,500</option>
                <option value="1500-plus">$1,500+</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="launch" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Desired launch window</label>
              <select id="launch" name="launch" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }}>
                <option value="">Select a timeframe</option>
                <option value="asap">As soon as possible</option>
                <option value="1-month">Within 1 month</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="no-rush">No rush, just exploring</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={!ready || status === "submitting"}
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-inverse)",
                border: "none",
                borderRadius: "999px",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
              data-analytics-click="form_submit"
            >
              {status === "submitting" ? "Sending your message…" : "Get my free website plan"}
            </button>
          </form>
          )}
          {status === "error" && (
            <div ref={statusRef} tabIndex={-1} role="alert" className="contact-result contact-result--error">
              Something went wrong. Please try again, or email me directly at bradmatera@gmail.com.
            </div>
          )}
          {status !== "success" && (
          <p className="contact-info__note" style={{ marginTop: "0.75rem" }}>
            Typical response time: within 24 hours. No obligation, no long-term contract.
          </p>
          )}
        </div>
        <div className="contact-info">
          <h2 className="contact-info__headline">
            Free 5-point website review
          </h2>
          <p className="contact-info__note">
            One-page review covering clarity, mobile usability, speed, local search, and the most important next step. This is a concise pre-sales review, not a complete unpaid consulting engagement.
          </p>
          <ul className="contact-info__list">
            <li><strong>Clarity:</strong> Can visitors understand what you do in 5 seconds?</li>
            <li><strong>Mobile:</strong> Does the site work on phones without pinching and zooming?</li>
            <li><strong>Speed:</strong> How fast does the page load on a mid-tier phone?</li>
            <li><strong>Local search:</strong> Can people in your area find you on Google?</li>
            <li><strong>Next step:</strong> The single most important thing to fix first</li>
          </ul>
          <a className="contact-info__cta" href="mailto:bradmatera@gmail.com">
            <span>Email Bradley:</span>
            <span>bradmatera@gmail.com</span>
          </a>
          <a className="contact-info__cta" href="tel:+16083135373" style={{ marginTop: "0.5rem" }}>
            <span>Call Bradley:</span>
            <span>(608) 313-5373</span>
          </a>
          <p className="contact-info__note">
            Typical response time: within 24 hours. No obligation, no long-term contract.
          </p>
        </div>
      </Card>
    </Section>

    <Section
      eyebrow="What happens next"
      title="Your free consultation, step by step"
      description={
        <p>
          Here is exactly what happens after you reach out — no mystery, no pressure.
        </p>
      }
    >
      <Card variant="outline">
        <ol className="feature-list" style={{ paddingLeft: "1.5rem" }}>
          <li><strong>You fill out the form or call</strong> — I respond within 1 business day, usually sooner.</li>
          <li><strong>We talk for 15-30 minutes</strong> — a quick call about your business, your goals, and what you need from a website.</li>
          <li><strong>I send a written proposal</strong> — scope, price, and timeline in writing. No verbal-only quotes.</li>
          <li><strong>You decide</strong> — no pressure, no obligation. Take the proposal and think it over.</li>
        </ol>
      </Card>
    </Section>

    <Section
      eyebrow="Trust"
      title="What you can expect"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/contact-phone.svg" alt="No obligation illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">No obligation</h3>
            <p className="pkg-card__desc">The free website plan is exactly that — free. You are not committing to anything by asking for one.</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/contact-email.svg" alt="Honest assessment illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Honest assessment</h3>
            <p className="pkg-card__desc">If I am not the right fit for your project, I will tell you and suggest alternatives. No upselling, no pressure.</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/contact-form.svg" alt="Direct contact illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Direct contact</h3>
            <p className="pkg-card__desc">You talk to the person who will actually build your site. No account managers, no handoffs.</p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Contact methods"
      title="Which contact method is right for you?"
    >
      <TableScroll label="Contact methods"><table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Method</th>
            <th scope="col" style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Best for</th>
            <th scope="col" style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Response time</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Email</td><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Project inquiries, detailed scope</td><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Within 24 hours</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Phone</td><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Quick questions, urgent issues</td><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Same day (leave message)</td></tr>
          <tr><td style={{ padding: "0.5rem" }}>LinkedIn</td><td style={{ padding: "0.5rem" }}>Professional networking, referrals</td><td style={{ padding: "0.5rem" }}>1-2 days</td></tr>
        </tbody>
      </table></TableScroll>
    </Section>

    <Section
      eyebrow="Explore"
      title="Related pages"
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/contact-phone.svg" alt="Pricing illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Pricing</h3>
            <p className="pkg-card__desc">See all package options, care plans, and what is included.</p>
            <div className="card-actions"><Link data-variant="primary" to="/pricing/">View pricing</Link></div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/contact-email.svg" alt="Services illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Services</h3>
            <p className="pkg-card__desc">Web design, redesign, local SEO, repair, accessibility, and care plans.</p>
            <div className="card-actions"><Link data-variant="primary" to="/services/">View services</Link></div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/contact-form.svg" alt="Website examples illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website examples</h3>
            <p className="pkg-card__desc">Full clickable sample websites built for real industries.</p>
            <div className="card-actions"><Link data-variant="primary" to="/demos/">See demos</Link></div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/contact-phone.svg" alt="Process illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Process</h3>
            <p className="pkg-card__desc">How a website project works from first call to launch.</p>
            <div className="card-actions"><Link data-variant="primary" to="/process/">View process</Link></div>
          </div>
        </div>
      </div>
    </Section>
  </div>
  );
};

export default ContactContent;
