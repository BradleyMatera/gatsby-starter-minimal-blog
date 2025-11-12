import { useRef, useEffect, useState } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  failSafeDelay?: number;
};

export function useScrollReveal(delay = 0, options?: ScrollRevealOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(() => typeof window === "undefined");
  const { threshold = 0.1, rootMargin = "0px 0px -10% 0px", failSafeDelay = 1200 } = options ?? {};

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
