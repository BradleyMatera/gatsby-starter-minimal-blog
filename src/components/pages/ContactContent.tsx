import * as React from "react";
import { Section, Card, Link } from "../ui";

const ContactContent = () => (
  <>
    <Section
      eyebrow="Contact"
      title={
        <>
          <strong>Start your next project</strong> with a focused email.
        </>
      }
      description={
        <>
          <p>
            <strong>Send the essentials up front</strong> - the problem, desired outcomes, and any constraints - and I will reply within one business day with the next steps.
          </p>
          <p>bradmatera@gmail.com</p>
        </>
      }
    >
      <Card className="contact-card reveal-card">
        <div className="contact-info">
          <h3 className="contact-info__headline">
            Email details to <a href="mailto:bradmatera@gmail.com">bradmatera@gmail.com</a>
          </h3>
          <ul className="contact-info__list">
            <li>What you need built or improved and who it serves</li>
            <li>Key dates: launch window, milestones, or demo deadlines</li>
            <li>Constraints to respect - tech stack, compliance, stakeholders</li>
          </ul>
          <a className="contact-info__cta" href="mailto:bradmatera@gmail.com">
            <span>Email Bradley</span>
            <span>bradmatera@gmail.com</span>
          </a>
          <p className="contact-info__note">
            Typical response time: within one business day. Mention if you prefer Slack, Teams, or scheduled calls.
          </p>
        </div>
        <div className="contact-form">
          <h3 className="contact-info__headline">What you&rsquo;ll receive</h3>
          <ul className="contact-info__list">
            <li>A quick confirmation so you know the message landed</li>
            <li>Any clarifying questions to keep scope precise</li>
            <li>A proposed next step - async plan, live call, or paired session</li>
          </ul>
          <p className="contact-info__note">
            Need NDAs or procurement docs? Attach them to the email and I will return a countersigned copy with the kickoff notes.
          </p>
        </div>
      </Card>
    </Section>

    <Section
      eyebrow="Prefer async updates?"
      title={
        <>
          <strong>Stay in the loop</strong> however your team works.
        </>
      }
      description={
        <p>
          I regularly share progress on the channels below so you can monitor delivery even when we&rsquo;re not on a call.
        </p>
      }
    >
      <div className="grid-two project-gallery">
        <Card variant="outline">
          <h3 className="project-card__title">LinkedIn Updates</h3>
          <p className="project-card__description">
            <strong>Weekly retros</strong> covering shipped features, observability wins, and lessons learned from the build.
          </p>
          <div className="card-actions">
            <Link href="https://www.linkedin.com/in/bradmatera" data-variant="primary">
              Follow on LinkedIn
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="project-card__title">GitHub Activity</h3>
          <p className="project-card__description">
            <strong>Daily commits</strong> and documentation updates so you can review code paths or reference playbooks anytime.
          </p>
          <div className="card-actions">
            <Link href="https://github.com/BradleyMatera" data-variant="primary">
              Browse GitHub
            </Link>
          </div>
        </Card>
      </div>
    </Section>
  </>
);

export default ContactContent;
