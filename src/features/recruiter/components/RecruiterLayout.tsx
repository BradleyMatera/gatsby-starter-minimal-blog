import * as React from "react";
import { Link } from "gatsby";
import { GlobalScrollEffects } from "../../../site/components";
import { RecruiterProgressProvider } from "../hooks/useRecruiterProgress";
import ProgressRail from "./ProgressRail";
import RecruiterCommandPalette from "./RecruiterCommandPalette";
import VoiceNavButton from "./VoiceNavButton";

/* --------------------------------------------------------------------------
   RecruiterLayout — Warm, editorial portal. No glass, no neon.
   -------------------------------------------------------------------------- */

const PROJECTHUB_VERSION = process.env.GATSBY_PROJECTHUB_VERSION;
const PROJECTHUB_SCRIPT_URL = `https://bradleymatera.github.io/ProjectHub/ProjectHub.js${
  PROJECTHUB_VERSION ? `?v=${PROJECTHUB_VERSION}` : ""
}`;

declare global {
  interface Window {
    __projectHubLoaded?: boolean;
    initProjectHub?: () => void;
  }
}

// ProjectHub.js declares top-level `const`s in global scope, so it can only
// be injected once per session. On subsequent recruiter visits we simply
// unhide the existing widget; on unmount we hide it instead of removing it.
const useProjectHubChat = () => {
  React.useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const unhideChat = () => {
      const chat = document.getElementById("bradley-chat");
      if (chat) chat.style.removeProperty("display");
      return chat;
    };

    const hideChat = () => {
      const chat = document.getElementById("bradley-chat");
      if (chat) chat.style.setProperty("display", "none", "important");
    };

    const existingChat = document.getElementById("bradley-chat");
    if (existingChat) {
      // Widget already exists (e.g. prior visit in this session); just unhide it.
      unhideChat();
    } else if (window.__projectHubLoaded && typeof window.initProjectHub === "function") {
      // Script already injected once and Core initializer is available, but the
      // widget may have failed to render on an earlier visit. Retry by invoking
      // the initializer, then unhide the widget if it was created.
      try {
        window.initProjectHub();
      } catch (e) {
        // Core re-init failed; a future mount can call initProjectHub again or
        // the host can fall through to script injection next time. Do not crash.
      }
      unhideChat();
    } else if (!window.__projectHubLoaded) {
      // First visit: inject ProjectHub.js once.
      window.__projectHubLoaded = true;
      const script = document.createElement("script");
      script.src = PROJECTHUB_SCRIPT_URL;
      script.async = true;
      script.id = "projecthub-chat-script";
      script.onload = () => {
        // The widget auto-initializes; Core also exposes window.initProjectHub
        // for re-init. If the user navigated away while the script was
        // downloading, keep the freshly created widget hidden.
        if (!window.location.pathname.startsWith("/recruiter")) {
          hideChat();
        }
      };
      script.onerror = () => {
        // Allow a retry on the next visit if the network request failed.
        window.__projectHubLoaded = false;
        script.remove();
      };
      document.body.appendChild(script);
    }

    return () => hideChat();
  }, []);
};

const RecruiterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useProjectHubChat();
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <RecruiterProgressProvider>
      <div className="recruiter-page" style={{ minHeight: "100vh" }}>
      {/* Command Palette */}
      <RecruiterCommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Cursor Spotlight */}
      <div className="cursor-spotlight" id="cursor-spotlight" aria-hidden="true" />

      <GlobalScrollEffects />

      <header className="recruiter-portal-header">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0.75rem clamp(1rem, 4vw, 2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--r-text)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              fontFamily: "var(--r-font-heading)",
            }}
          >
            <span style={{ fontSize: "1.125rem" }}>←</span>
            <span>BradleyMatera.dev</span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              fontSize: "0.8125rem",
              color: "var(--r-text-secondary)",
            }}
          >
            <span style={{ display: "none" }} className="recruiter-nav-desktop">
              Recruiter Portal
            </span>
            <a
              href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="recruiter-btn magnetic-btn recruiter-btn--primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
            >
              Resume
            </a>
            <VoiceNavButton />
          </div>
        </div>
      </header>

      <div className="recruiter-progress-rail__container">
        <ProgressRail />
      </div>
      <main>{children}</main>

      <footer className="recruiter-portal-footer">
        <div style={{ marginBottom: "0.75rem" }}>
          <Link
            to="/"
            style={{
              color: "var(--r-accent)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← Back to Portfolio
          </Link>
        </div>
        <div style={{ color: "var(--r-text-muted)" }} suppressHydrationWarning>
          © {new Date().getFullYear()} Bradley Matera · Recruiter Portal
        </div>
      </footer>
    </div>
    </RecruiterProgressProvider>
  );
};

export default RecruiterLayout;
