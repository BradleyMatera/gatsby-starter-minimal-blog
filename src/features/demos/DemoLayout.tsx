import * as React from "react";
import { Global } from "@emotion/react";
import DemoBanner from "./DemoBanner";

type DemoLayoutProps = {
  children: React.ReactNode;
  demoName: string;
  industry: string;
  backHref?: string;
  backLabel?: string;
  /** CSS theme override — each demo can have its own color scheme */
  themeColor?: string;
};

/**
 * Minimal layout for demo pages.
 * Does NOT include the main site header, footer, or cyberpunk effects.
 * Each demo looks like a standalone business website.
 */
const DemoLayout: React.FC<DemoLayoutProps> = ({
  children,
  demoName,
  industry,
  backHref,
  backLabel,
  themeColor,
}) => {
  return (
    <>
      <Global
        styles={{
          body: {
            backgroundColor: "var(--demo-bg, #ffffff)",
            color: "var(--demo-text, #1a1a1a)",
          },
        }}
      />
      <DemoBanner
        demoName={demoName}
        industry={industry}
        backHref={backHref}
        backLabel={backLabel}
      />
      <div
        className="demo-page"
        style={themeColor ? ({ ["--demo-accent" as string]: themeColor } as React.CSSProperties) : undefined}
      >
        {children}
      </div>
    </>
  );
};

export default DemoLayout;
