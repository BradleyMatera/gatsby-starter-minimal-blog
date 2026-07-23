import * as React from "react";
import { Link } from "gatsby";
import { ArrowLeftIcon } from "../../site/icons";

type DemoBannerProps = {
  /** Name of the demo, e.g. "Riverside Grill Restaurant" */
  demoName: string;
  /** Industry label, e.g. "Restaurant" */
  industry: string;
  /** Where to go back to. Defaults to /demos/ */
  backHref?: string;
  /** Label for the back button. Defaults to "All Demos" */
  backLabel?: string;
};

/**
 * Sticky banner that sits at the top of every demo page.
 * Lets visitors know this is a demo and provides a way back.
 */
const DemoBanner: React.FC<DemoBannerProps> = ({
  demoName,
  industry,
  backHref = "/demos/",
  backLabel = "All Demos",
}) => {
  return (
    <div className="demo-banner" role="banner" aria-label="Demo notification">
      <div className="demo-banner__inner">
        <Link to={backHref} className="demo-banner__back">
          <ArrowLeftIcon size={16} />
          <span>{backLabel}</span>
        </Link>
        <div className="demo-banner__info">
          <span className="demo-banner__badge">DEMO</span>
          <span className="demo-banner__text">
            <strong>{demoName}</strong> — {industry} website demo by Bradley Matera
          </span>
        </div>
        <Link to="/contact/" className="demo-banner__cta">
          Get a site like this →
        </Link>
      </div>
    </div>
  );
};

export default DemoBanner;
