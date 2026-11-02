import * as React from "react";
import { Link } from "gatsby";
import ThemeToggle from "../../../site/components/ThemeToggle";
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

    const startChatCollapsed = () => {
      const chat = document.getElementById("bradley-chat");
      if (!chat || chat.dataset.recruiterInitialState) return;
      const minimize = chat.querySelector<HTMLButtonElement>(".projecthub-minimize-button");
      if (!minimize) return;
      if (!chat.classList.contains("projecthub-minimized")) minimize.click();
      chat.dataset.recruiterInitialState = "collapsed";
    };

    const unhideChat = () => {
      const chat = document.getElementById("bradley-chat");
      if (chat) chat.style.removeProperty("display");
      startChatCollapsed();
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
        startChatCollapsed();
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
    <div className="recruiter-page">
      <a className="recruiter-skip-link" href="#recruiter-main">Skip to recruiter content</a>
      <RecruiterCommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <header className="recruiter-portal-header">
        <div className="recruiter-portal-header__inner">
          <Link to="/" className="recruiter-brand">← <span>Bradley Matera</span></Link>
          <div className="recruiter-portal-header__actions">
            <button type="button" className="recruiter-nav-search" aria-label="Find a section" onClick={() => setCommandOpen(true)}>Find a section</button>
            <ThemeToggle />
            <VoiceNavButton />
            <a href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf" className="recruiter-btn recruiter-btn--primary">Resume <span className="recruiter-file-type">PDF</span></a>
          </div>
        </div>
        <ProgressRail />
      </header>
      <main id="recruiter-main" tabIndex={-1}>{children}</main>
      <footer className="recruiter-portal-footer">
        <Link to="/">← Back to Portfolio</Link>
        <p suppressHydrationWarning>© {new Date().getFullYear()} Bradley Matera · Recruiter Portal</p>
      </footer>
    </div>
  );
};

export default RecruiterLayout;
