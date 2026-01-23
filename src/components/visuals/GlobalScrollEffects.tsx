import * as React from "react";

const GlobalScrollEffects = () => {
  React.useEffect(() => {
    let isMounted = true;
    let ScrollTriggerRef: { getAll: () => { kill: () => void }[] } | null = null;

    const setup = async () => {
      if (typeof window === "undefined") {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if ("paintWorklet" in CSS) {
        CSS.paintWorklet.addModule("/worklets/hero-spotlight.js").catch(() => {});
      }

      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (!isMounted) {
        return;
      }

      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTriggerRef = ScrollTrigger;

      const layer = document.querySelector<HTMLDivElement>(".scroll-color-layer");
      if (!layer) {
        return;
      }

      const computed = getComputedStyle(document.documentElement);
      const palette = [
        computed.getPropertyValue("--scroll-layer-1").trim(),
        computed.getPropertyValue("--scroll-layer-2").trim(),
        computed.getPropertyValue("--scroll-layer-3").trim(),
      ].filter(Boolean);

      const sections = Array.from(document.querySelectorAll<HTMLElement>(".site-content > *")).filter(
        (section) => !section.classList.contains("section-divider")
      );

      sections.forEach((section, index) => {
        const color = palette[index % palette.length];

        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => {
            gsap.to(layer, { backgroundColor: color, duration: 0.8, overwrite: "auto" });
            section.classList.add("is-snap-active");
          },
          onEnterBack: () => {
            gsap.to(layer, { backgroundColor: color, duration: 0.8, overwrite: "auto" });
            section.classList.add("is-snap-active");
          },
          onLeave: () => {
            section.classList.remove("is-snap-active");
          },
          onLeaveBack: () => {
            section.classList.remove("is-snap-active");
          },
        });
      });
    };

    setup();

    return () => {
      isMounted = false;
      if (ScrollTriggerRef) {
        ScrollTriggerRef.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return null;
};

export default GlobalScrollEffects;
