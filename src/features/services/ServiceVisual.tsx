import * as React from "react";
import { Link } from "gatsby";

type Kind = "small-business-web-design" | "website-redesign" | "website-repair" | "local-seo" | "website-accessibility" | "website-speed-optimization" | "website-care-plans";
const paths: Record<string, string[]> = {
  "website-repair": ["Diagnose", "Agree the scope", "Repair", "Verify"],
  "local-seo": ["Business details", "Service areas", "Local search", "Contact"],
  "website-accessibility": ["Keyboard", "Readable contrast", "Clear labels", "Useful feedback"],
  "website-speed-optimization": ["Measure", "Optimize images", "Reduce scripts", "Recheck"],
  "website-care-plans": ["Monitor", "Back up", "Update", "Support"],
};
export default function ServiceVisual({ kind }: { kind: Kind }) {
  const [comparison, setComparison] = React.useState(50);
  const inputId = React.useId();
  if (kind === "website-redesign") return <figure className="service-visual service-visual--comparison">
    <div className="service-comparison">
      <img src="/images/demos/previews/auto-repair.webp" alt="Modern auto repair concept website" width={1440} height={900} />
      <img className="service-comparison__before" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }} src="/assets/visuals/hero/before-after/before-auto-repair-fold.webp" alt="Illustrative outdated version of the same concept" width={1440} height={900} />
      <span className="service-comparison__line" style={{ left: `${comparison}%` }} aria-hidden="true" />
    </div>
    <div className="service-comparison__control"><label htmlFor={inputId}>Before / after</label><input id={inputId} type="range" min={0} max={100} value={comparison} onChange={event => setComparison(Number(event.target.value))} aria-valuetext={`${comparison}% before, ${100 - comparison}% after`} /></div>
    <figcaption>Concept demo · fictional business. <Link to="/demos/auto-repair/">Explore the interactive demo →</Link></figcaption>
  </figure>;
  if (kind === "small-business-web-design") return <figure className="service-visual service-visual--preview">
    <Link to="/demos/restaurant/" aria-label="Explore the Riverside Grill concept demo"><img src="/images/demos/previews/restaurant.webp" alt="Riverside Grill restaurant website concept preview" width={1440} height={1000} loading="lazy" /></Link>
    <figcaption>Concept demo · fictional business. <Link to="/demos/restaurant/">Explore the website →</Link></figcaption>
  </figure>;
  return <figure className={`service-visual service-visual--${kind}`}>
    <div className="service-diagram" role="img" aria-label={paths[kind].join(" → ")}>
      <svg viewBox="0 0 920 220" aria-hidden="true" focusable="false">
        <path d="M115 110H805" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
        {paths[kind].map((label, index) => <g key={label} transform={`translate(${115 + 230 * index} 110)`}>
          <circle r="47" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
          <rect x="-19" y="-22" width="38" height="44" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d={index % 2 ? "M-10 0L-2 8L12 -8" : "M-10 -8H10M-10 0H10M-10 8H4"} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>)}
      </svg>
      <ol>{paths[kind].map((label, index) => <li key={label}><span>0{index + 1}</span>{label}</li>)}</ol>
    </div>
    <figcaption>{kind === "local-seo" ? "Northwest Illinois and Southern Wisconsin" : "A clear process, from first check to follow-through"}</figcaption>
  </figure>;
}
