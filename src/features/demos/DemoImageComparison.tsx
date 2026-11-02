import * as React from "react";

const DemoImageComparison: React.FC<{ before: string; after: string; title: string }> = ({ before, after, title }) => {
  const [view, setView] = React.useState("both");
  return <div className="demo-image-comparison">
    <div className="demo-image-comparison__controls" role="group" aria-label={`${title} image view`}>
      {["both", "before", "after"].map((value) => <button type="button" key={value} aria-pressed={view === value} onClick={() => setView(value)}>{value === "both" ? "Both images" : value === "before" ? "Before example" : "After example"}</button>)}
    </div>
    <div className={`demo-image-comparison__images${view === "both" ? "" : " is-single"}`}>
      {view !== "after" && <figure><img src={before} alt={`${title}: illustrative before photograph`} loading="lazy" /><figcaption>Before example</figcaption></figure>}
      {view !== "before" && <figure><img src={after} alt={`${title}: illustrative after photograph`} loading="lazy" /><figcaption>After example</figcaption></figure>}
    </div>
    <p>Illustrative photographs; they may show different properties.</p>
  </div>;
};
export default DemoImageComparison;
