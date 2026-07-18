import * as React from "react";

/* --------------------------------------------------------------------------
   Dashboard Preview — Illustrative recruiter dashboard.
   Shows the kind of metrics a recruiter portal might track.
   -------------------------------------------------------------------------- */

const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({
  target,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="recruiter-stat__value">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: string;
}>
= ({ label, value, suffix, prefix, trend }) => (
  <div className="recruiter-glass reveal-child" style={{ padding: "1.5rem", textAlign: "center" }}>
    <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
    <div className="recruiter-stat__label">{label}</div>
    {trend && (
      <div style={{ fontSize: "0.75rem", color: "var(--r-success)", marginTop: "0.25rem" }}>
        {trend}
      </div>
    )}
  </div>
);

const BarChart: React.FC = () => {
  const bars = [
    { label: "Mon", height: 40 },
    { label: "Tue", height: 65 },
    { label: "Wed", height: 85 },
    { label: "Thu", height: 55 },
    { label: "Fri", height: 95 },
    { label: "Sat", height: 45 },
    { label: "Sun", height: 60 },
  ];

  return (
    <div className="recruiter-glass reveal-child" style={{ padding: "1.5rem" }}>
      <h4
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--recruiter-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        Weekly Profile Views
      </h4>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 120 }}>
        {bars.map((bar) => (
          <div key={bar.label} style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                height: `${bar.height}%`,
                background: "var(--recruiter-gradient-2)",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.8s ease",
                minHeight: 4,
              }}
            />
            <div
              style={{
                fontSize: "0.625rem",
                color: "var(--recruiter-text-muted)",
                marginTop: "0.25rem",
              }}
            >
              {bar.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillRadar: React.FC = () => {
  const skills = [
    { label: "Frontend", value: 85 },
    { label: "Backend", value: 72 },
    { label: "Cloud", value: 75 },
    { label: "DevOps", value: 65 },
    { label: "Documentation", value: 90 },
    { label: "Debugging", value: 82 },
  ];

  return (
    <div className="recruiter-glass reveal-child" style={{ padding: "1.5rem" }}>
      <h4
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--recruiter-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        Skill Distribution
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {skills.map((s) => (
          <div key={s.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
                color: "var(--recruiter-text-secondary)",
              }}
            >
              <span>{s.label}</span>
              <span>{s.value}%</span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${s.value}%`,
                  height: "100%",
                  borderRadius: 3,
                  background: "var(--recruiter-gradient-2)",
                  transition: "width 1.2s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPreview: React.FC = () => {
  return (
    <section id="dashboard-preview" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Live Metrics</div>
        <h2 className="recruiter-section__title">
          Recruiter <span className="recruiter-gradient-text">Dashboard Preview</span>
        </h2>
        <p className="recruiter-section__subtitle">
          An illustrative view of how I track and present my own progress. Metrics are representative examples, not live analytics.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top metrics row */}
        <div className="recruiter-grid reveal-child recruiter-grid--4" style={{ marginBottom: "1.5rem" }}>
          <MetricCard label="Resume Views" value={1247} trend="↑ 12% this week" />
          <MetricCard label="Project Views" value={892} trend="↑ 8% this week" />
          <MetricCard label="GitHub Clicks" value={456} trend="↑ 23% this week" />
          <MetricCard label="Cert Views" value={234} trend="↑ 5% this week" />
        </div>

        {/* Middle row */}
        <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ marginBottom: "1.5rem" }}>
          <BarChart />
          <SkillRadar />
        </div>

        {/* Bottom quick stats */}
        <div className="recruiter-grid reveal-child recruiter-grid--3">
          <div className="recruiter-glass reveal-child" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.5rem" }}>
              Portfolio Completion
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--recruiter-purple)" }}>98%</div>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-secondary)", marginTop: "0.25rem" }}>
              All sections documented
            </div>
          </div>
          <div className="recruiter-glass reveal-child" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.5rem" }}>
              Avg. Session Time
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--recruiter-blue)" }}>14m 32s</div>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-secondary)", marginTop: "0.25rem" }}>
              Above industry avg
            </div>
          </div>
          <div className="recruiter-glass reveal-child" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.5rem" }}>
              Interview Downloads
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--recruiter-indigo)" }}>67</div>
            <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-secondary)", marginTop: "0.25rem" }}>
              Packets generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
