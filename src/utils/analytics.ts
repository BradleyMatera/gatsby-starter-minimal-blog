declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "pricing_view"
  | "case_study_view"
  | "form_start"
  | "form_error"
  | "form_submit"
  | "phone_click"
  | "email_click"
  | "calendar_start"
  | "qualified_lead"
  | "proposal_sent"
  | "closed_won";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
  if (typeof window.dataLayer !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}

export function trackCTAClick(label: string, location: string): void {
  trackEvent("cta_click", { label, location });
}

export function trackPhoneClick(): void {
  trackEvent("phone_click", { source: window.location.pathname });
}

export function trackEmailClick(): void {
  trackEvent("email_click", { source: window.location.pathname });
}

export function trackFormStart(formName: string): void {
  trackEvent("form_start", { form_name: formName });
}

export function trackFormSubmit(formName: string): void {
  trackEvent("form_submit", { form_name: formName });
}

export function trackPricingView(): void {
  trackEvent("pricing_view", { source: window.location.pathname });
}

export function trackCaseStudyView(slug: string): void {
  trackEvent("case_study_view", { slug });
}
