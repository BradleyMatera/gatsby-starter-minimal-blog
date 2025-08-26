import React, { useEffect, useRef, useState } from "react";
import "./style.css";

// TerminalWrapper will show the original content immediately (so the page is readable)
// and animate a typing effect for the first `introParagraphs` paragraphs only. This
// provides a fast page load while keeping the terminal typing aesthetic.
export default function TerminalWrapper({ children, speed = 20, introParagraphs = 2, paragraphDelay = 400 }) {
  const originalRef = useRef(null);
  const overlayRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const original = originalRef.current;
    const overlay = overlayRef.current;
    if (!original || !overlay) return;

    // Normalize text and split into paragraph chunks (separated by two newlines)
    const raw = original.innerText.replace(/\r\n/g, "\n");
    const paragraphs = raw.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    overlay.innerText = "";

    // Only animate the first N paragraphs; the rest of the content is already visible
    const toAnimate = paragraphs.slice(0, introParagraphs);

    let cancelled = false;

    const typeParagraph = (paragraph, base) => {
      return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
          // Build the visible overlay from base (already completed paragraphs) + current slice
          const current = paragraph.slice(0, i);
          overlay.innerText = base + (base ? '\n\n' : '') + current;
          i += 1;
          // keep overlay scrolled to bottom
          overlay.scrollTop = overlay.scrollHeight;
          if (i > paragraph.length || cancelled) {
            clearInterval(timer);
            resolve();
          }
        }, speed);
      });
    };

    const run = async () => {
      try {
        let base = "";
        for (const p of toAnimate) {
          if (cancelled) break;
          await typeParagraph(p, base);
          // ensure base contains the fully-typed paragraph
          base = overlay.innerText;
          await new Promise(r => setTimeout(r, paragraphDelay));
        }
        if (!cancelled) setDone(true);
      } catch (e) {
        // ignore
      }
    };

    // allow clicks/scrolls to pass through the overlay so users can scroll while it types
    overlay.style.pointerEvents = 'none';

    run();

    return () => {
      // clear overlay / state on unmount
      cancelled = true;
      overlay.innerText = "";
      setDone(false);
    };
  }, [speed, introParagraphs, paragraphDelay]);

  return (
    <div className="terminal-root">
      {/* original content is rendered immediately so users (and crawlers) can read it */}
      <div ref={originalRef} className="terminal-original">
        {children}
      </div>

      {/* overlay types the intro paragraphs as a cosmetic effect; aria-hidden until done */}
      <pre aria-hidden={!done} ref={overlayRef} className={`terminal-overlay ${done ? 'terminal-done' : ''}`}>
      </pre>
    </div>
  );
}
