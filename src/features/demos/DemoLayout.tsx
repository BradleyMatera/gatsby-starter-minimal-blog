import * as React from "react";
import { Global } from "@emotion/react";
import DemoBanner from "./DemoBanner";

type DesignSystem = "elegant" | "organic" | "industrial" | "garage" | "luxury" | "soft";

type DemoLayoutProps = {
  children: React.ReactNode;
  demoName: string;
  industry: string;
  backHref?: string;
  backLabel?: string;
  /** CSS theme override — each demo can have its own color scheme */
  themeColor?: string;
  /** Design system name — controls fonts, colors, border-radius, spacing */
  designSystem?: DesignSystem;
};

/**
 * Minimal layout for demo pages.
 * Does NOT include the main site header, footer, or cyberpunk effects.
 * Each demo looks like a standalone business website with its own design system.
 */
const DemoLayout: React.FC<DemoLayoutProps> = ({
  children,
  demoName,
  industry,
  backHref,
  backLabel,
  themeColor,
  designSystem = "elegant",
}) => {
  return (
    <>
      <Global
        styles={{
          body: {
            backgroundColor: "var(--demo-bg, #ffffff)",
            color: "var(--demo-text, #1a1a1a)",
            margin: 0,
            padding: 0,
            lineHeight: 1.5,
          },
        }}
      />
      <DemoBanner
        demoName={demoName}
        industry={industry}
        backHref={backHref}
        backLabel={backLabel}
      />
      <main
        className={`demo-page demo-theme--${designSystem}`}
        style={themeColor ? ({ ["--demo-accent" as string]: themeColor } as React.CSSProperties) : undefined}
      >
        {children}
      </main>
    </>
  );
};

export default DemoLayout;
