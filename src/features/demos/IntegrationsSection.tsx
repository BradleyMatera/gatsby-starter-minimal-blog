import * as React from "react";
import { ApiIcon, ExternalLinkIcon } from "../../site/icons";

export interface Integration {
  name: string;
  category: string;
  description: string;
  freeTier?: string;
  url?: string;
  status: "live" | "mocked" | "available";
}

interface IntegrationsSectionProps {
  industry: string;
  integrations: Integration[];
}

const statusLabels: Record<Integration["status"], string> = {
  live: "Live in this demo",
  mocked: "Mocked in this demo",
  available: "Available for production",
};

const statusClasses: Record<Integration["status"], string> = {
  live: "demo-integration__status--live",
  mocked: "demo-integration__status--mocked",
  available: "demo-integration__status--available",
};

/**
 * Explains the real-world APIs, tools, and integrations that power each industry's website.
 * Each integration shows: name, category, what it does, free tier info, and whether
 * it's live in this demo, mocked, or available for production.
 */
const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ industry, integrations }) => (
  <section className="demo-section demo-section--alt">
    <div className="demo-section__inner">
      <h2 className="demo-section__title">
        <ApiIcon size={28} /> Technology &amp; Integrations
      </h2>
      <p className="demo-section__subtitle">
        Real APIs and tools that power {industry} websites. This demo shows which ones are live,
        which are mocked, and which are available for your production site.
      </p>
      <div className="demo-integrations">
        {integrations.map((integration) => (
          <div key={integration.name} className="demo-integration">
            <div className="demo-integration__header">
              <h3 className="demo-integration__name">{integration.name}</h3>
              <span className={`demo-integration__status ${statusClasses[integration.status]}`}>
                {statusLabels[integration.status]}
              </span>
            </div>
            <div className="demo-integration__category">{integration.category}</div>
            <p className="demo-integration__desc">{integration.description}</p>
            {integration.freeTier && (
              <div className="demo-integration__free-tier">
                <strong>Free tier:</strong> {integration.freeTier}
              </div>
            )}
            {integration.url && (
              <a
                href={integration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-integration__link"
                aria-label={`${integration.name} — documentation and pricing`}
              >
                {integration.name} docs <ExternalLinkIcon size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="demo-integrations__note">
        Every integration listed above is a real, production-ready API or platform. Your site can
        use any combination of these — costs scale with usage, and most have generous free tiers
        for small businesses.
      </div>
    </div>
  </section>
);

export default IntegrationsSection;
