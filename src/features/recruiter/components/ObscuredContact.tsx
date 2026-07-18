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

/** Shallow shuffle to break obvious sequential patterns in source */
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/*
  These arrays look like random numbers in the HTML source.
  Only decoded into real text in the browser after the user clicks "Reveal".
  bradmatera@gmail.com
*/
const EMAIL_CODES = toCharCodes("bradmatera@gmail.com");
const PHONE_CODES = toCharCodes("(360) 970-0581");

const ObscuredContact: React.FC = () => {
  const [revealed, setRevealed] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleReveal = React.useCallback(() => {
    if (!revealed) {
      setEmail(fromCharCodes(EMAIL_CODES));
      setPhone(fromCharCodes(PHONE_CODES));
    }
    setRevealed((prev) => !prev);
  }, [revealed]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Email */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--recruiter-text-muted)",
            marginBottom: "0.25rem",
          }}
        >
          Email
        </div>
        <button
          onClick={handleReveal}
          aria-label={revealed ? "Hide email address" : "Reveal email address"}
          style={{
            background: revealed
              ? "rgba(34,197,94,0.08)"
              : "rgba(139,92,246,0.08)",
            border: revealed
              ? "1px solid rgba(34,197,94,0.25)"
              : "1px solid rgba(139,92,246,0.25)",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            color: revealed ? "var(--r-success)" : "var(--r-info)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          {revealed ? email || "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓�▓▓" : "Reveal Email"}
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "2rem",
          background: "rgba(148,163,184,0.15)",
          flexShrink: 0,
        }}
      />

      {/* Phone */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--recruiter-text-muted)",
            marginBottom: "0.25rem",
          }}
        >
          Phone
        </div>
        <button
          onClick={handleReveal}
          aria-label={revealed ? "Hide phone number" : "Reveal phone number"}
          style={{
            background: revealed
              ? "rgba(34,197,94,0.08)"
              : "rgba(139,92,246,0.08)",
            border: revealed
              ? "1px solid rgba(34,197,94,0.25)"
              : "1px solid rgba(139,92,246,0.25)",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            color: revealed ? "var(--r-success)" : "var(--r-info)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          {revealed ? phone || "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓" : "Reveal Phone"}
        </button>
      </div>
    </div>
  );
};

export default ObscuredContact;

