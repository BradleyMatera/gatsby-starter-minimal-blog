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
      titleAs="h1"
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
          <h2 className="contact-info__headline">What to include in your message</h2>
          <ul className="contact-info__list">
            <li><strong>Your name</strong> and business name</li>
            <li><strong>Email or phone</strong> for follow-up</li>
            <li><strong>Existing website</strong> if you have one (optional)</li>
            <li><strong>Main goal</strong> — what should the website do for you?</li>
            <li><strong>Approximate budget range</strong> — packages start at $447</li>
            <li><strong>Desired launch window</strong> — when do you need this live?</li>
          </ul>
          <p className="contact-info__note">
            Keep it short. I will ask follow-up questions if needed. Do not send a 20-question discovery document — a few sentences is enough to start.
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
