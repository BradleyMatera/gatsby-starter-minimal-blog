import { useRef, useEffect, useState } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  failSafeDelay?: number;
  initiallyVisible?: boolean;
};

const isElementInViewport = (el: HTMLElement) => {
  if (typeof window === "undefined") {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
};

export function useScrollReveal(delay = 0, options?: ScrollRevealOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const isServer = typeof window === "undefined";
  const { threshold = 0.1, rootMargin = "0px 0px -10% 0px", failSafeDelay = 1200, initiallyVisible = false } = options ?? {};
  const [revealed, setRevealed] = useState(() => isServer || initiallyVisible);

  useEffect(() => {
    if (revealed || typeof window === "undefined") {
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      const timeout = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const revealNow = () => setRevealed(true);

    const elementCurrentlyVisible = isElementInViewport(element);
    if (elementCurrentlyVisible) {
      if (delay > 0) {
        const immediateTimeout = window.setTimeout(revealNow, delay);
        return () => window.clearTimeout(immediateTimeout);
      }
      revealNow();
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      const fallback = window.setTimeout(revealNow, delay);
      return () => window.clearTimeout(fallback);
    }

    let timeoutId: number | null = null;
    let failSafeId: number | null = null;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            revealNow();
            observer.unobserve(entry.target);
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    if (failSafeDelay >= 0) {
      failSafeId = window.setTimeout(() => {
        revealNow();
        observer.disconnect();
      }, failSafeDelay + Math.max(delay, 0));
    }

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (failSafeId !== null) {
        window.clearTimeout(failSafeId);
      }
      observer.disconnect();
    };
  }, [delay, failSafeDelay, rootMargin, threshold, revealed]);

  return { ref, revealed };
}
