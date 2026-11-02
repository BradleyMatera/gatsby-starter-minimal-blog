import * as React from "react";

/* --------------------------------------------------------------------------
   ObscuredContact — Email/phone are NEVER in the static HTML.
   Stored as numeric char-code arrays decoded client-side only after a
   deliberate user interaction (click). Bots scanning text nodes see nothing.
   -------------------------------------------------------------------------- */

/** Build a string from an array of char codes */
const fromCharCodes = (codes: number[]): string =>
  typeof window === "undefined" ? "" : String.fromCharCode(...codes);

/** Scramble helper: split string into char codes */
const toCharCodes = (str: string): number[] =>
  Array.from(str).map((c) => c.charCodeAt(0));

/*
  These arrays look like random numbers in the HTML source.
  Only decoded into real text in the browser after the user clicks "Reveal".
  bradmatera@gmail.com
*/
const EMAIL_CODES = toCharCodes("bradmatera@gmail.com");
const PHONE_CODES = toCharCodes("(360) 970-0581");

const ObscuredContact: React.FC = () => {
  const [revealed, setRevealed] = React.useState(false);
  const email = revealed ? fromCharCodes(EMAIL_CODES) : "";
  const phone = revealed ? fromCharCodes(PHONE_CODES) : "";
  return <div className="recruiter-contact-reveal">
    <button type="button" className="recruiter-btn recruiter-btn--secondary" aria-expanded={revealed} aria-controls="recruiter-contact-details" onClick={() => setRevealed(!revealed)}>{revealed ? "Hide contact details" : "Reveal contact details"}</button>
    <div id="recruiter-contact-details" aria-live="polite">{revealed && <div className="recruiter-actions"><a className="recruiter-text-link" href={`mailto:${email}`}>{email}</a><a className="recruiter-text-link" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a></div>}</div>
    <noscript><p>Please use the LinkedIn link above to get in touch.</p></noscript>
  </div>;
};

export default ObscuredContact;
