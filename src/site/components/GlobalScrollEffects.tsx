import * as React from "react";

type CSSWithPaintWorklet = typeof CSS & {
  paintWorklet?: {
    addModule: (url: string) => Promise<void>;
  };
};

const GlobalScrollEffects = () => {
  React.useEffect(() => {
    let isMounted = true;
    let ScrollTriggerRef: { getAll: () => { kill: () => void }[] } | null = null;

    const setup = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* ---- Paint Worklet ---- */
      const cssWithPaintWorklet = CSS as CSSWithPaintWorklet;
      if (cssWithPaintWorklet.paintWorklet) {
        cssWithPaintWorklet.paintWorklet.addModule("/worklets/hero-spotlight.js").catch(() => {});
      }

      /* ---- GSAP + ScrollTrigger ---- */
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTriggerRef = ScrollTrigger;

      /* ---- Section Color Layer Transitions ---- */
      const layer = document.querySelector<HTMLDivElement>(".scroll-color-layer");
      if (layer) {
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
            onLeave: () => section.classList.remove("is-snap-active"),
            onLeaveBack: () => section.classList.remove("is-snap-active"),
          });
        });
      }

      /* ---- Recruiter Hub Card Entrances ---- */
      const animatedRecruiterCards = new Set<HTMLElement>();

      document.querySelectorAll<HTMLElement>(".recruiter-section .recruiter-grid").forEach((grid) => {
        const parentSection = grid.closest<HTMLElement>(".recruiter-section");
        if (parentSection?.dataset.staticVisibility === "true") return;

        const cards = Array.from(grid.children).filter((child): child is HTMLElement => child instanceof HTMLElement);

        if (!cards.length) return;

        cards.forEach((card) => animatedRecruiterCards.add(card));

        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid.closest(".recruiter-section") || grid,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      document.querySelectorAll<HTMLElement>(".recruiter-section .recruiter-glass, .recruiter-section .recruiter-card").forEach((card) => {
        if (animatedRecruiterCards.has(card)) return;
        if (card.closest<HTMLElement>(".recruiter-section")?.dataset.staticVisibility === "true") return;

        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card.closest(".recruiter-section") || card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ---- Recruiter Hero Parallax ---- */
      const recruiterHero = document.querySelector<HTMLElement>(".recruiter-hero");
      if (recruiterHero) {
        gsap.to(recruiterHero, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: recruiterHero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ---- Recruiter Section Reveals (proper viewport entry) ---- */
      document.querySelectorAll<HTMLElement>(".recruiter-section.reveal-section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          section.classList.add("is-revealed");
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => section.classList.add("is-revealed"),
          onEnterBack: () => section.classList.add("is-revealed"),
        });
      });

      /* ---- Recruiter Timeline Item Stagger Reveals ---- */
      document.querySelectorAll<HTMLElement>(".recruiter-timeline__item").forEach((item) => {
        const isLeft = item.classList.contains("recruiter-timeline__item--left");
        const startX = isLeft ? -60 : 60;

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => item.classList.add("is-revealed"),
          onEnterBack: () => item.classList.add("is-revealed"),
        });

        gsap.fromTo(
          item,
          { opacity: 0, x: startX },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ---- Recruiter Section Number Stagger ---- */
      document.querySelectorAll<HTMLElement>(".recruiter-section").forEach((section) => {
        const eyebrow = section.querySelector<HTMLElement>(".recruiter-section__eyebrow");
        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      /* ---- Section Divider Parallax ---- */
      document.querySelectorAll<HTMLElement>(".section-divider img").forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".section-divider") || img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* ---- Card Scroll Tilt on Home Page ---- */
      document.querySelectorAll<HTMLElement>(".home-section .feature-card, .home-section .build-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ---- Magnetic Button Effect ---- */
      const magneticBtns = document.querySelectorAll<HTMLElement>(".magnetic-btn, a[data-variant]");
      magneticBtns.forEach((btn) => {
        const handleMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          (btn as HTMLElement).style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
          (btn as HTMLElement).style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
          (btn as HTMLElement).style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
        };
        const handleLeave = () => {
          (btn as HTMLElement).style.transform = "translate(0,0)";
        };
        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);
        // Cleanup stored on element for later
        (btn as any).__magneticCleanup = () => {
          btn.removeEventListener("mousemove", handleMove);
          btn.removeEventListener("mouseleave", handleLeave);
        };
      });

      /* ---- Cursor Spotlight ---- */
      const spotlight = document.getElementById("cursor-spotlight");
      if (spotlight) {
        const moveSpotlight = (e: MouseEvent) => {
          spotlight.style.left = `${e.clientX}px`;
          spotlight.style.top = `${e.clientY}px`;
        };
        window.addEventListener("mousemove", moveSpotlight);
        (window as any).__spotlightCleanup = () => window.removeEventListener("mousemove", moveSpotlight);
      }

      /* ---- Scroll-Speed Aware Tilt on Section Strips ---- */
      document.querySelectorAll<HTMLElement>(".section-strip img").forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".section-strip") || img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
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
      // Clean up magnetic listeners
      document.querySelectorAll<HTMLElement>(".magnetic-btn, a[data-variant]").forEach((btn) => {
        if ((btn as any).__magneticCleanup) (btn as any).__magneticCleanup();
      });
      if ((window as any).__spotlightCleanup) (window as any).__spotlightCleanup();
    };
  }, []);

  return null;
};

export default GlobalScrollEffects;
