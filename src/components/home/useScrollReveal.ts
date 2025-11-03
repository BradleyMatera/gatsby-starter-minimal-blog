import { useRef, useEffect, useState } from "react";

export function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setRevealed(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      setRevealed(true);
      return;
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
  }, [delay]);

  return { ref, revealed };
}
