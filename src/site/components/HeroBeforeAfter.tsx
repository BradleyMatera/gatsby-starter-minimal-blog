import * as React from "react";
import { Link } from "gatsby";
import { useReducedMotion } from "../../utils/useReducedMotion";

export type HeroExample = {
  id: string;
  label: string;
  beforeImage: string;
  afterImage: string;
  afterMobileImage?: string;
  afterAlt?: string;
  beforeAlt?: string;
  browserUrl?: string;
  demoLink?: string;
};

export type HeroBeforeAfterProps = {
  label: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  proofPoints?: string[];
  examples: HeroExample[];
  /** Auto-rotate interval in ms. 0 = disabled. Default 7000. */
  rotateInterval?: number;
  /** Image height in px (both before & after must match). Default 3600. */
  imageHeight?: number;
};

const HeroBeforeAfter = ({
  label,
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  proofPoints = [],
  examples,
  rotateInterval = 7000,
  imageHeight = 3600,
}: HeroBeforeAfterProps) => {
  const reducedMotion = useReducedMotion();
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const phoneScrollRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [pos, setPos] = React.useState(88); // horizontal divider 0-100 — start with bad site visible
  const [scrollY, setScrollY] = React.useState(0); // vertical scroll in px
  const [phoneScrollY, setPhoneScrollY] = React.useState(0); // phone vertical scroll in px
  const [stopped, setStopped] = React.useState(reducedMotion);
  const [viewportH, setViewportH] = React.useState(0);

  // Refs for animation loop
  const posRef = React.useRef(88);
  const scrollRef = React.useRef(0);
  const phoneScrollRef2 = React.useRef(0);
  const sweepDirRef = React.useRef<1 | -1>(-1); // sweep left first — good site covers bad
  const scrollDirRef = React.useRef<1 | -1>(1);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);
  const rotateTimerRef = React.useRef<number | null>(null);
  const stoppedRef = React.useRef(stopped);

  React.useEffect(() => { stoppedRef.current = stopped; }, [stopped]);
  React.useEffect(() => { posRef.current = pos; }, [pos]);
  React.useEffect(() => { scrollRef.current = scrollY; }, [scrollY]);
  React.useEffect(() => { phoneScrollRef2.current = phoneScrollY; }, [phoneScrollY]);

  const active = examples[activeIdx] ?? examples[0];
  const maxScroll = Math.max(0, imageHeight - viewportH);

  // Measure viewport height
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportH(el.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reset when example changes
  React.useEffect(() => {
    if (reducedMotion) {
      setPos(50); posRef.current = 50;
      setScrollY(0); scrollRef.current = 0;
      setPhoneScrollY(0); phoneScrollRef2.current = 0;
      return;
    }
    setPos(88); posRef.current = 88;
    setScrollY(0); scrollRef.current = 0;
    setPhoneScrollY(0); phoneScrollRef2.current = 0;
    sweepDirRef.current = -1; // good site sweeps left to cover the bad one
    scrollDirRef.current = 1;
  }, [activeIdx, reducedMotion]);

  // Native wheel listener for reliable scroll-after-stop
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (!stoppedRef.current) {
        setStopped(true);
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const ms = Math.max(0, imageHeight - el.clientHeight);
      let ns = scrollRef.current + e.deltaY;
      ns = Math.max(0, Math.min(ms, ns));
      scrollRef.current = ns;
      setScrollY(ns);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [imageHeight, activeIdx]);

  // Main animation loop: horizontal sweep + vertical scroll
  React.useEffect(() => {
    if (reducedMotion || stopped) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const SWEEP_MIN = 12;
    const SWEEP_MAX = 88;
    const SWEEP_SPEED = 8; // %/sec — slow, gentle sweep
    const SCROLL_SPEED = 60; // px/sec — slow vertical scroll
    lastTimeRef.current = 0;

    const tick = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000); // cap at 50ms
      lastTimeRef.current = now;

      // Horizontal sweep
      let p = posRef.current + sweepDirRef.current * SWEEP_SPEED * dt;
      if (p >= SWEEP_MAX) { p = SWEEP_MAX; sweepDirRef.current = -1; }
      if (p <= SWEEP_MIN) { p = SWEEP_MIN; sweepDirRef.current = 1; }
      posRef.current = p;
      setPos(p);

      // Vertical scroll (main browser)
      const ms = Math.max(0, imageHeight - viewportRef.current?.clientHeight ?? viewportH);
      let s = scrollRef.current + scrollDirRef.current * SCROLL_SPEED * dt;
      if (s >= ms) { s = ms; scrollDirRef.current = -1; }
      if (s <= 0) { s = 0; scrollDirRef.current = 1; }
      scrollRef.current = s;
      setScrollY(s);

      // Phone scroll (slow, always downward, loops back to top)
      const PHONE_SPEED = 40; // px/sec — slow gentle scroll
      const phoneEl = phoneScrollRef.current;
      if (phoneEl) {
        const phoneMax = Math.max(0, phoneEl.scrollHeight - phoneEl.clientHeight);
        let ps = phoneScrollRef2.current + PHONE_SPEED * dt;
        if (ps >= phoneMax) { ps = 0; } // loop back to top
        phoneScrollRef2.current = ps;
        setPhoneScrollY(ps);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [reducedMotion, stopped, activeIdx, viewportH, imageHeight]);

  // Auto-rotate between examples
  React.useEffect(() => {
    if (rotateInterval <= 0 || examples.length <= 1 || stopped) return;
    rotateTimerRef.current = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % examples.length);
    }, rotateInterval);
    return () => {
      if (rotateTimerRef.current) window.clearTimeout(rotateTimerRef.current);
    };
  }, [rotateInterval, examples.length, stopped, activeIdx]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rotateTimerRef.current) window.clearTimeout(rotateTimerRef.current);
    };
  }, []);

  // --- Interaction handlers ---

  // Track interaction state
  const draggingRef = React.useRef(false);
  const lastTouchYRef = React.useRef(0);
  const touchScrollingRef = React.useRef(false);
  // For touch direction detection
  const touchStartXRef = React.useRef(0);
  const touchStartYRef = React.useRef(0);
  const touchModeRef = React.useRef<"none" | "horizontal" | "vertical">("none");

  // Click/touch = STOP everything permanently
  const onPointerDown = (e: React.PointerEvent) => {
    setStopped(true);
    if (e.pointerType === "touch") {
      // For touch: record start position, decide direction on first move
      touchStartXRef.current = e.clientX;
      touchStartYRef.current = e.clientY;
      lastTouchYRef.current = e.clientY;
      touchModeRef.current = "none";
      touchScrollingRef.current = false;
      draggingRef.current = false;
    } else {
      // For mouse: start dragging the divider immediately
      draggingRef.current = true;
      touchScrollingRef.current = false;
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const np = Math.max(0, Math.min(100, pct));
      setPos(np); posRef.current = np;
    }
  };

  // Only move while pointer is DOWN
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      // Determine direction on first significant movement
      if (touchModeRef.current === "none") {
        const dx = Math.abs(e.clientX - touchStartXRef.current);
        const dy = Math.abs(e.clientY - touchStartYRef.current);
        if (dx > 8 || dy > 8) {
          if (dx > dy) {
            // Horizontal swipe → drag divider
            touchModeRef.current = "horizontal";
            draggingRef.current = true;
          } else {
            // Vertical swipe → scroll
            touchModeRef.current = "vertical";
            touchScrollingRef.current = true;
          }
        }
      }

      if (touchModeRef.current === "horizontal") {
        // Drag divider
        const el = viewportRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        const np = Math.max(0, Math.min(100, pct));
        setPos(np); posRef.current = np;
      } else if (touchModeRef.current === "vertical") {
        // Scroll vertically
        const dy = lastTouchYRef.current - e.clientY;
        lastTouchYRef.current = e.clientY;
        const ms = Math.max(0, imageHeight - (viewportRef.current?.clientHeight ?? viewportH));
        let ns = scrollRef.current + dy;
        ns = Math.max(0, Math.min(ms, ns));
        setScrollY(ns); scrollRef.current = ns;
      }
    } else if (draggingRef.current) {
      // Mouse: drag divider horizontally
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const np = Math.max(0, Math.min(100, pct));
      setPos(np); posRef.current = np;
    }
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    touchScrollingRef.current = false;
    touchModeRef.current = "none";
  };

  // Mouse wheel = scroll up/down after stopped
  const onWheel = (e: React.WheelEvent) => {
    if (!stopped) {
      setStopped(true);
      return;
    }
    const ms = Math.max(0, imageHeight - (viewportRef.current?.clientHeight ?? viewportH));
    let ns = scrollRef.current + e.deltaY;
    ns = Math.max(0, Math.min(ms, ns));
    setScrollY(ns); scrollRef.current = ns;
  };

  // Keyboard on the divider
  const onKeyDown = (e: React.KeyboardEvent) => {
    setStopped(true);
    if (e.key === "ArrowLeft") { const np = Math.max(0, posRef.current - 4); setPos(np); posRef.current = np; e.preventDefault(); }
    if (e.key === "ArrowRight") { const np = Math.min(100, posRef.current + 4); setPos(np); posRef.current = np; e.preventDefault(); }
    if (e.key === "Home") { setPos(0); posRef.current = 0; e.preventDefault(); }
    if (e.key === "End") { setPos(100); posRef.current = 100; e.preventDefault(); }
    if (e.key === "ArrowUp") { const ns = Math.max(0, scrollRef.current - 80); setScrollY(ns); scrollRef.current = ns; e.preventDefault(); }
    if (e.key === "ArrowDown") { const ns = Math.min(maxScroll, scrollRef.current + 80); setScrollY(ns); scrollRef.current = ns; e.preventDefault(); }
    if (e.key === "PageUp") { const ns = Math.max(0, scrollRef.current - 300); setScrollY(ns); scrollRef.current = ns; e.preventDefault(); }
    if (e.key === "PageDown") { const ns = Math.min(maxScroll, scrollRef.current + 300); setScrollY(ns); scrollRef.current = ns; e.preventDefault(); }
  };

  const selectExample = (idx: number) => {
    setStopped(true);
    setActiveIdx(idx);
  };

  // After (good) image is clipped to show only from the divider rightward,
  // so as the divider sweeps right, the good site covers the bad one.
  const afterClipPath = `inset(0 0 0 ${pos}%)`;

  return (
    <section className="hero-ba section-surface" aria-label="Website before and after examples">
      <div className="hero-ba__inner">
        <div className="hero-ba__text">
          <p className="hero-ba__label">{label}</p>
          <h1 className="hero-ba__title">{title}</h1>
          <p className="hero-ba__subtitle">{subtitle}</p>
          <div className="hero-ba__actions">
            <Link className="hero-ba__cta hero-ba__cta--primary" to={ctaLink}>
              <span>{ctaText}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {secondaryCtaText && secondaryCtaLink ? (
              <Link className="hero-ba__cta hero-ba__cta--secondary" to={secondaryCtaLink}>
                <span>{secondaryCtaText}</span>
              </Link>
            ) : null}
          </div>
          {proofPoints.length > 0 ? (
            <ul className="hero-ba__proof" aria-label="Key promises">
              {proofPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="hero-ba__visual">
          <div className="hero-ba__browser" key={active.id}>
            <div className="hero-ba__browser-bar" aria-hidden="true">
              <span className="hero-ba__dot" />
              <span className="hero-ba__dot" />
              <span className="hero-ba__dot" />
              <span className="hero-ba__url">{active.browserUrl ?? "your-business.com"}</span>
            </div>
            <div
              className="hero-ba__viewport"
              ref={viewportRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onPointerLeave={onPointerUp}
              onWheel={onWheel}
            >
              <img
                className="hero-ba__img hero-ba__img--before"
                src={active.beforeImage}
                alt={active.beforeAlt ?? "Outdated 2010-era website"}
                loading="eager"
                decoding="async"
                draggable={false}
                style={{ transform: `translateY(${-scrollY}px)` }}
              />
              <img
                className="hero-ba__img hero-ba__img--after"
                src={active.afterImage}
                alt={active.afterAlt ?? "Modern website built by Bradley Matera"}
                loading="eager"
                decoding="async"
                draggable={false}
                style={{
                  transform: `translateY(${-scrollY}px)`,
                  clipPath: afterClipPath,
                  WebkitClipPath: afterClipPath,
                }}
              />
              <div
                className="hero-ba__divider"
                style={{ left: `${pos}%` }}
                role="slider"
                tabIndex={0}
                aria-label="Drag to compare the old website with the new one"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={onKeyDown}
              >
                <span className="hero-ba__handle" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" fill="currentColor" />
                    <path d="M10 9l-4 5 4 5M18 9l4 5-4 5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <span className="hero-ba__tag hero-ba__tag--before">Before</span>
              <span className="hero-ba__tag hero-ba__tag--after">After</span>
              {!stopped ? (
                <span className="hero-ba__hint" aria-hidden="true">Click to stop &amp; explore</span>
              ) : null}
            </div>
          </div>

          <div className="hero-ba__below">
            {active.afterMobileImage ? (
              <div className="hero-ba__phone" aria-hidden="true">
                <div className="hero-ba__phone-label">Mobile version</div>
                <div className="hero-ba__phone-frame" ref={phoneScrollRef}>
                  <img
                    src={active.afterMobileImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ transform: `translateY(${-phoneScrollY}px)` }}
                  />
                </div>
              </div>
            ) : null}

            {examples.length > 1 ? (
              <div className="hero-ba__tabs-wrap">
                <div className="hero-ba__tabs-label">View another industry:</div>
                <div className="hero-ba__tabs" role="tablist" aria-label="Choose an example">
                  {examples.map((ex, i) => (
                    <button
                      key={ex.id}
                      className={`hero-ba__tab${i === activeIdx ? " hero-ba__tab--active" : ""}`}
                      role="tab"
                      aria-selected={i === activeIdx}
                      onClick={() => selectExample(i)}
                      type="button"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
                {active.demoLink ? (
                  <Link className="hero-ba__demo-link" to={active.demoLink}>
                    Explore the live demo →
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBeforeAfter;
