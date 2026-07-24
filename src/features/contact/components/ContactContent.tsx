import * as React from "react";
import { Section, Card, Link } from "../../../ui";

const ContactContent = () => (
  <>
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
      <Card className="contact-card reveal-card">
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
        <div className="contact-form">
          <h2 className="contact-info__headline">Send a message</h2>
          <form
            name="website-plan"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/contact/?submitted=true"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            data-analytics-form="website_plan"
          >
            <input type="hidden" name="form-name" value="website-plan" />
            <p style={{ display: "none" }}>
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="name" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Name *</label>
              <input type="text" id="name" name="name" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="business" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Business name *</label>
              <input type="text" id="business" name="business" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="contact" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email or phone *</label>
              <input type="text" id="contact" name="contact" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label htmlFor="website" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Existing website (optional)</label>
              <input type="url" id="website" name="website" placeholder="https://" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "1rem" }} />
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
              Get my free website plan
            </button>
          </form>
          <p className="contact-info__note" style={{ marginTop: "0.75rem" }}>
            Typical response time: within 24 hours. No obligation, no long-term contract.
          </p>
        </div>
      </Card>
    </Section>

    <Section
      eyebrow="Trust"
      title="What you can expect"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">No obligation</h3>
          <p className="feature-card__body">The free website plan is exactly that — free. You are not committing to anything by asking for one.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Honest assessment</h3>
          <p className="feature-card__body">If I am not the right fit for your project, I will tell you and suggest alternatives. No upselling, no pressure.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Direct contact</h3>
          <p className="feature-card__body">You talk to the person who will actually build your site. No account managers, no handoffs.</p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Contact methods"
      title="Which contact method is right for you?"
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
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
      </table>
    </Section>

    <Section
      eyebrow="Explore"
      title="Related pages"
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Pricing</h3>
          <p className="feature-card__body">See all package options, care plans, and what is included.</p>
          <div className="card-actions"><Link data-variant="primary" to="/pricing/">View pricing</Link></div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Services</h3>
          <p className="feature-card__body">Web design, redesign, local SEO, repair, accessibility, and care plans.</p>
          <div className="card-actions"><Link data-variant="primary" to="/services/">View services</Link></div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Website examples</h3>
          <p className="feature-card__body">Full clickable sample websites built for real industries.</p>
          <div className="card-actions"><Link data-variant="primary" to="/demos/">See demos</Link></div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Process</h3>
          <p className="feature-card__body">How a website project works from first call to launch.</p>
          <div className="card-actions"><Link data-variant="primary" to="/process/">View process</Link></div>
        </Card>
      </div>
    </Section>
  </>
);

export default ContactContent;
