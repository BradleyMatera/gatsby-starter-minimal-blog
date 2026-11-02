import * as React from "react";
import "../article-visuals.css";

type VisualItem = { label: string; detail: string; value?: number };
export type ArticleVisualSpec = {
  id: string;
  kind: "flow" | "comparison" | "layers" | "timeline" | "checklist" | "bar-chart";
  title: string;
  summary: string;
  items: VisualItem[];
  caption: string;
  unit?: string;
  unitSingular?: string;
  sourceLabel?: string;
  sourceHref?: string;
};

const kindLabels = {
  flow: "Walkthrough", comparison: "Visual comparison", layers: "System overview",
  timeline: "Sequence", checklist: "At a glance", "bar-chart": "Data from the article",
};

const VisualIcon = ({ label }: { label: string }) => {
  const key = label.toLowerCase();
  const path = /search|audit|check|review|inspect|measure|diagnos/.test(key)
    ? "M17 17 22 22M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
    : /secure|protect|auth|owner|permission|trust|backup/.test(key)
      ? "M12 2 3 6v7c0 5 9 10 9 10s9-5 9-10V6L12 2Zm-4 10 3 3 5-6"
      : /compute|processor|cpu|gpu/.test(key)
        ? "M6 6h14v14H6V6Zm4 4h6v6h-6v-6M9 2v4m8-4v4M9 20v4m8-4v4M2 9h4m-4 8h4m14-8h4m-4 8h4"
      : /cloud|deploy|host|release|launch|publish/.test(key)
        ? "M7 18H6a4 4 0 0 1-.5-8A7 7 0 0 1 19 8a5 5 0 0 1 0 10h-2M12 22V10m-4 4 4-4 4 4"
        : /data|store|storage|database|file|resource|inventory/.test(key)
          ? "M3 6c0-5 18-5 18 0s-18 5-18 0Zm0 0v6c0 5 18 5 18 0V6M3 12v6c0 5 18 5 18 0v-6"
        : /transfer|route|connect|network|sync/.test(key)
          ? "M3 7h18m-5-5 5 5-5 5M23 19H5m5-5-5 5 5 5"
          : /contact|call|message|reply|customer|user|feedback/.test(key)
            ? "M3 4h18v13H9l-6 5V4Zm4 5h10M7 13h7"
            : /code|build|test|function|runtime|component|implement/.test(key)
              ? "m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18"
              : /local|location|map|city|area|directory/.test(key)
                ? "M20 9c0 6-8 14-8 14S4 15 4 9a8 8 0 1 1 16 0ZM15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                : "M4 3h16v18H4V3Zm4 5h8M8 12h8M8 16h5";
  return <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={path} /></svg>;
};

const LayerGraphic = ({ count }: { count: number }) => (
  <svg className="article-visual__layer-graphic" viewBox={`0 0 300 ${190 + (count - 1) * Math.min(39, 180 / Math.max(count - 1, 1))}`} aria-hidden="true" focusable="false">
    <path d="M150 16V305M24 166 150 242 276 166M24 222 150 298 276 222" fill="none" stroke="currentColor" strokeOpacity=".25" strokeDasharray="4 6" />
    {Array.from({ length: count }, (_, index) => {
      const y = 42 + (count - index - 1) * Math.min(39, 180 / Math.max(count - 1, 1));
      return <g key={index} transform={`translate(0 ${y})`}>
        <path className="article-visual__layer-side" d="m30 53 120 67 120-67v14l-120 67L30 67Z" />
        <path className="article-visual__layer-top" d="m30 53 120-67 120 67-120 67Z" />
        <path d="m70 53 80-44 80 44-80 44Z" fill="none" stroke="currentColor" strokeOpacity=".55" />
        <circle cx="150" cy="53" r="8" fill="currentColor" />
        <text x="16" y="68" textAnchor="end" fontSize="14" fontWeight="700" fill="currentColor">{count - index}</text>
      </g>;
    })}
  </svg>
);

const ArticleVisual = ({ spec }: { spec: ArticleVisualSpec }) => {
  const titleId = React.useId();
  const captionId = React.useId();
  const kind = spec.kind === "bar-chart" && !spec.items.every(item => typeof item.value === "number" && Number.isFinite(item.value) && item.value >= 0) ? "comparison" : spec.kind;
  const List = kind === "flow" || kind === "timeline" ? "ol" : "ul";
  const maximum = Math.max(1, ...spec.items.map(item => item.value || 0));
  return (
    <figure className={`article-visual article-visual--${kind}${kind === "flow" && spec.items.length > 3 ? " article-visual--long-flow" : ""}`} aria-labelledby={titleId} aria-describedby={captionId} data-visual-id={spec.id}>
      <figcaption className="article-visual__heading">
        <span className="article-visual__eyebrow"><span aria-hidden="true">◈</span> {kindLabels[kind]}</span>
        <strong id={titleId} className="article-visual__title">{spec.title}</strong>
        <span className="article-visual__summary">{spec.summary}</span>
      </figcaption>
      <div className="article-visual__canvas">
        {kind === "layers" && <LayerGraphic count={spec.items.length} />}
        <List className="article-visual__items" style={{ "--visual-items": Math.min(spec.items.length, 3) } as React.CSSProperties}>
          {spec.items.map((item, index) => (
            <li className="article-visual__item" key={`${spec.id}-${index}`}>
              <span className="article-visual__marker" aria-hidden="true"><VisualIcon label={item.label} /><span>{String(index + 1).padStart(2, "0")}</span></span>
              <div className="article-visual__item-copy">
                <strong className="article-visual__item-title">{item.label}</strong>
                {kind === "bar-chart" && <div className="article-visual__bar-row"><span className="article-visual__bar-track" aria-hidden="true"><span style={{ width: `${((item.value || 0) / maximum) * 100}%` }} /></span><span className="article-visual__value">{item.value} {item.value === 1 ? spec.unitSingular || spec.unit : spec.unit}</span></div>}
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </List>
      </div>
      <div className="article-visual__caption" id={captionId}>
        <p>{spec.caption}</p>
        {spec.sourceHref && <a href={spec.sourceHref}>{spec.sourceLabel || "Source"}</a>}
      </div>
    </figure>
  );
};

export default ArticleVisual;
