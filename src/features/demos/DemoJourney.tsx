import * as React from "react";
import { Link } from "gatsby";

type Field = { key: string; label: string; options?: string[]; type?: "date" | "number"; min?: number; max?: number };
type Journey = { title: string; fields: Field[]; preparation: string };

const date: Field = { key: "date", label: "Sample preferred date", type: "date" };
const journeys: Record<string, Journey> = {
  restaurant: { title: "Find a sample table", fields: [date, { key: "party", label: "Party size", options: ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people"] }, { key: "time", label: "Sample time", options: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM — unavailable", "8:00 PM"] }], preparation: "A real reservation flow would confirm seating and any dietary requests with the restaurant." },
  landscaping: { title: "Plan a sample project", fields: [{ key: "service", label: "Service", options: ["Lawn care", "Landscape design", "Hardscaping", "Seasonal cleanup"] }, { key: "property", label: "Property size", options: ["Small garden", "Residential yard", "Large property", "Commercial grounds"] }, { key: "timing", label: "Timing", options: ["This season", "Next season", "Exploring options"] }], preparation: "A real quote would include a site visit, measurements, access requirements and an agreed scope." },
  hvac: { title: "Explore a sample service request", fields: [{ key: "service", label: "Service", options: ["Repair", "Replacement", "Maintenance"] }, { key: "system", label: "System", options: ["Furnace", "Air conditioning", "Heat pump", "Not sure"] }, date], preparation: "A real provider would ask for the equipment model, the issue and access arrangements. This preview cannot dispatch service." },
  "auto-repair": { title: "Preview a service appointment", fields: [{ key: "vehicle", label: "Sample vehicle", options: ["2019 Toyota Camry", "2021 Ford F-150", "2020 Honda Civic"] }, { key: "service", label: "Service", options: ["Oil change", "Brake service", "Diagnostics", "AC / heating", "Tire service"] }, date], preparation: "A real booking would confirm the vehicle details, service scope and drop-off arrangements." },
  "real-estate": { title: "Preview a sample viewing", fields: [{ key: "property", label: "Sample property", options: ["4 Bed Colonial in East Rockford", "3 Bed Ranch — Updated Kitchen", "5 Bed Luxury Home on 1.1 Acres", "2 Bed Condo — Downtown Rockford", "4 Bed New Build — Rockton", "3 Bed Split Level — Byron"] }, date, { key: "format", label: "Viewing format", options: ["In person", "Video walkthrough"] }], preparation: "All properties are fictional. A real agent would confirm access and availability before a viewing." },
  "beauty-salon": { title: "Build a sample appointment", fields: [{ key: "service", label: "Service", options: ["Haircut & Style · 45 min", "Color / Highlights · 120 min", "Balayage · 150 min", "Manicure / Pedicure · 60 min", "Facial · 60 min"] }, { key: "stylist", label: "Sample stylist", options: ["No preference", "Angela Rossi", "Lisa Chen", "Maya Kim", "Tina Santos"] }, date, { key: "time", label: "Sample time", options: ["9:00 AM", "11:00 AM", "1:00 PM — unavailable", "3:00 PM", "5:00 PM"] }], preparation: "Service durations are illustrative. A real salon would confirm the service, price and stylist availability." },
  manufacturing: { title: "Prepare a sample RFQ", fields: [{ key: "material", label: "Material", options: ["Mild Steel (A36)", "Stainless Steel (304)", "Aluminum (6061)"] }, { key: "process", label: "Process", options: ["Laser cutting", "CNC machining", "Welding", "Sheet metal forming"] }, { key: "quantity", label: "Quantity", type: "number", min: 1, max: 100000 }, { key: "finish", label: "Finish", options: ["As machined", "Powder coat", "Anodized", "To be confirmed"] }], preparation: "A real RFQ needs approved drawings, dimensions, tolerances and delivery requirements. Do not upload confidential files to a demo." },
  agriculture: { title: "Preview an equipment service request", fields: [{ key: "equipment", label: "Equipment", options: ["Tractor", "Combine", "Planter", "Hay equipment", "Other equipment"] }, { key: "service", label: "Service", options: ["Seasonal maintenance", "Repair assessment", "Parts inquiry"] }, { key: "timing", label: "Planning window", options: ["Before next season", "Within the next month", "Exploring availability"] }, date], preparation: "A real service provider would confirm the make, model, serial number and availability. No technician is dispatched by this demo." },
  "law-firm": { title: "Preview a consultation format", fields: [{ key: "practice", label: "Sample practice area", options: ["Business Counsel & Contracts", "Estate Planning & Probate", "Real Estate Closings & Title", "Business Succession"] }, { key: "format", label: "Format", options: ["In-person", "Video", "Phone"] }, date], preparation: "This is only an interface demonstration, not legal advice or a request to a law firm. Do not enter confidential case information." },
  dental: { title: "Preview an appointment format", fields: [{ key: "visit", label: "Sample visit", options: ["New patient visit", "Routine visit", "Consultation"] }, { key: "time", label: "Sample time", options: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM — unavailable"] }, date], preparation: "This is only an interface demonstration, not medical advice or a request to a dental practice. No personal health information is needed." },
};

const DemoJourney: React.FC<{ kind: string }> = ({ kind }) => {
  const config = journeys[kind];
  const id = React.useId();
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [stage, setStage] = React.useState<"choose" | "review" | "complete">("choose");
  const heading = React.useRef<HTMLHeadingElement>(null);
  const form = React.useRef<HTMLFormElement>(null);
  const hasInteracted = React.useRef(false);

  React.useEffect(() => {
    if (hasInteracted.current) heading.current?.focus();
  }, [stage]);

  const review = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    config.fields.forEach((field) => {
      const value = values[field.key] || "";
      if (!value) next[field.key] = `Choose ${field.label.toLowerCase()}.`;
      else if (value.includes("unavailable")) next[field.key] = "This sample slot is unavailable. Choose another time.";
      else if (field.type === "number" && (!Number.isInteger(Number(value)) || Number(value) < (field.min || 1) || Number(value) > (field.max || 100000))) next[field.key] = `Enter a whole number from ${field.min} to ${field.max}.`;
      else if (field.type === "date" && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)))) next[field.key] = "Choose a valid sample date.";
    });
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    hasInteracted.current = true;
    setStage("review");
  };

  const reset = () => {
    hasInteracted.current = true;
    setValues({});
    setErrors({});
    setStage("choose");
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>("select, input")?.focus());
  };

  return (
    <div className="demo-journey">
      <p className="demo-journey__eyebrow">Interactive concept · nothing is sent</p>
      <ol className="demo-journey__steps" aria-label="Sample workflow">
        {["choose", "review", "complete"].map((step, index) => <li key={step} aria-current={stage === step ? "step" : undefined}><span>{index + 1}</span>{step === "choose" ? "Choose" : step === "review" ? "Review" : "Preview"}</li>)}
      </ol>
      <h3 ref={heading} tabIndex={-1}>{stage === "choose" ? config.title : stage === "review" ? "Review your sample choices" : "Demo preview — nothing sent or booked"}</h3>
      <p id={`${id}-note`}>{config.preparation}</p>
      {stage === "choose" ? <form ref={form} onSubmit={review} noValidate aria-describedby={`${id}-note`}>
        <div className="demo-journey__fields">{config.fields.map((field) => <div key={field.key} className="demo-form__field">
          <label htmlFor={`${id}-${field.key}`} className="demo-form__label">{field.label} <span>(required)</span></label>
          {field.options ? <select id={`${id}-${field.key}`} value={values[field.key] || ""} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} className="demo-form__select" aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${id}-${field.key}-error` : undefined} required><option value="">Choose an option</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={`${id}-${field.key}`} type={field.type} value={values[field.key] || ""} min={field.min} max={field.max} step={field.type === "number" ? 1 : undefined} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} className="demo-form__input" aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${id}-${field.key}-error` : undefined} required />}
          {errors[field.key] && <p id={`${id}-${field.key}-error`} className="demo-journey__error">{errors[field.key]}</p>}
        </div>)}</div>
        {Object.keys(errors).length > 0 && <p role="alert">Check the highlighted choices before continuing.</p>}
        <div className="demo-journey__actions"><button className="demo-btn demo-btn--primary" type="submit">Review sample choices</button><button className="demo-btn demo-btn--ghost" type="button" onClick={reset}>Reset</button></div>
      </form> : <>
        <dl className="demo-journey__summary">{config.fields.map((field) => <div key={field.key}><dt>{field.label}</dt><dd>{values[field.key]}</dd></div>)}</dl>
        <div className="demo-journey__actions">{stage === "review" ? <><button type="button" className="demo-btn demo-btn--primary" onClick={() => setStage("complete")}>Finish demo preview</button><button type="button" className="demo-btn demo-btn--ghost" onClick={() => setStage("choose")}>Edit choices</button></> : <Link className="demo-btn demo-btn--primary" to={`/contact/?source=demo&demo=${encodeURIComponent(kind)}`}>Discuss a website with Bradley</Link>}<button type="button" className="demo-btn demo-btn--ghost" onClick={reset}>Start again</button></div>
      </>}
      <p className="demo-journey__status" role="status">{stage === "complete" ? "Preview complete. No reservation, appointment, quote or service request was sent." : "Sample choices stay in this page and are cleared when you leave."}</p>
    </div>
  );
};

export default DemoJourney;
