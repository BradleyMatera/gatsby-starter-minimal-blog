import * as React from "react";
import { Link } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import "../styles/store.css";

type DownloadItem = {
  product_id: string;
  name: string;
  quantity: number;
  download_url: string;
  expires_at: number;
};

type EntitlementResponse = {
  order_id: string;
  customer_email?: string;
  downloads: DownloadItem[];
};

const getFunctionsBase = () => {
  if (typeof window === "undefined") return "";
  const { hostname, port } = window.location;
  if (hostname === "localhost" && port === "8000") return "http://localhost:8888";
  return "";
};

const getFunctionsUrl = (path: string) => {
  const base = getFunctionsBase();
  return base ? `${base}/.netlify/functions/${path}` : `/.netlify/functions/${path}`;
};

const normalizeDownloadUrl = (url: string) => {
  const base = getFunctionsBase();
  if (!base) return url;
  try {
    const normalized = new URL(url, base);
    if (normalized.pathname.endsWith("/.netlify/functions/download/")) {
      normalized.pathname = normalized.pathname.replace(/\/$/, "");
    }
    return normalized.toString();
  } catch (error) {
    return url.replace("/.netlify/functions/download/?", "/.netlify/functions/download?");
  }
};

const SuccessPage = () => {
  const [attempt, setAttempt] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const [entitlements, setEntitlements] = React.useState<EntitlementResponse | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setMessage("Missing session_id. If you completed checkout, open the link from Stripe again.");
      return;
    }

    const load = async () => {
      setStatus("loading");
      try {
        const res = await fetch(getFunctionsUrl(`get_entitlements?session_id=${encodeURIComponent(sessionId)}`));
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Unable to verify payment.");
        }
        setEntitlements(data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to verify payment.");
      }
    };

    load();
  }, [attempt]);

  return (
    <Layout>
      <div className="store-shell">
        <header className="store-header">
          <h1 className="store-title">{status === "success" ? "Payment confirmed" : status === "error" ? "We couldn’t verify this payment" : "Checking your purchase"}</h1>
          <p className="store-subtitle">{status === "success" ? "Your verified purchase details are below." : "Download links appear after payment verification."}</p>
          <p className="store-legal">
            Direct digital downloads are sold by Bradley F. Matera, an Illinois sole proprietor. Affiliate products are sold by third-party merchants.
          </p>
        </header>

        {(status === "loading" || status === "idle") && <div className="store-status" role="status">Verifying payment…</div>}

        {status === "error" && (
          <div className="store-status store-error" role="alert">
            {message}
            <div className="store-actions u-mt-3">
              <button type="button" className="store-button" onClick={() => setAttempt((value) => value + 1)}>Check again</button>
              <Link className="store-link" to="/support/">Support & refunds</Link>
            </div>
          </div>
        )}

        {status === "success" && entitlements && (
          <div>
            <div className="store-meta">Order ID: {entitlements.order_id}</div>
            {entitlements.customer_email && (
              <div className="store-meta">Receipt sent to: {entitlements.customer_email}</div>
            )}
            {entitlements.downloads.length === 0 && <p className="store-status" role="status">No download links were returned. Open the customer portal or contact support for help.</p>}
            <div className="store-downloads">
              {entitlements.downloads.map((item) => (
                <div key={item.product_id} className="store-download-item">
                  <div><strong>{item.name}</strong></div>
                  <div className="store-meta">Quantity: {item.quantity}</div>
                  <a
                    href={normalizeDownloadUrl(item.download_url)}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download {item.name}
                  </a>
                  <div className="store-meta">
                    Link expires {new Date(item.expires_at * 1000).toLocaleString()}. Use the customer portal for a fresh link.
                  </div>
                </div>
              ))}
            </div>
            <div className="store-inline-links u-mt-6">
              <Link className="store-link" to="/store/">Back to store</Link>
              <span>
                <Link className="store-link" to="/purchases/">Customer portal</Link>
              </span>
            </div>
          </div>
        )}
        {status !== "success" && <div className="store-inline-links"><Link className="store-link" to="/store/">Back to store</Link><Link className="store-link" to="/purchases/">Customer portal</Link></div>}
      </div>
    </Layout>
  );
};

export default SuccessPage;

export const Head = () => (
  <Seo title="Purchase verification" description="Purchase confirmation page." pathname="/success/" robots="noindex,nofollow" />
);
