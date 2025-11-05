import { useRef, useEffect, useState } from "react";

export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(() => typeof window === "undefined");

  useEffect(() => {
    if (revealed) {
      return undefined;
    }

    if (typeof window === "undefined") {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      const timeout = globalThis.setTimeout(() => setRevealed(true), 0);
      return () => globalThis.clearTimeout(timeout);
    }

    const element = ref.current;
    if (!element) {
      const timeout = globalThis.setTimeout(() => setRevealed(true), 0);
      return () => globalThis.clearTimeout(timeout);
    }

    let timeoutId: number | null = null;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            setRevealed(true);
            observer.unobserve(entry.target);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [delay, revealed]);

  return { ref, revealed };
}
