import * as React from "react";
import { Link } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
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
  lookup_token?: string | null;
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
    return new URL(url, base).toString();
  } catch (error) {
    return url;
  }
};

const SuccessPage = () => {
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const [entitlements, setEntitlements] = React.useState<EntitlementResponse | null>(null);
  const [copied, setCopied] = React.useState(false);

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
  }, []);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <Layout>
      <div className="store-shell">
        <header className="store-header">
          <h1 className="store-title">Payment confirmed</h1>
          <p className="store-subtitle">Your download links are below.</p>
        </header>

        {status === "loading" && <div className="store-status">Verifying payment…</div>}

        {status === "error" && (
          <div className="store-status store-error">
            {message}
            <div style={{ marginTop: "0.75rem" }}>
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
            {entitlements.lookup_token && (
              <div className="store-lookup">
                <div className="store-meta">Order lookup code</div>
                <div className="store-lookup-row">
                  <strong className="store-lookup-code">{entitlements.lookup_token}</strong>
                  <button
                    className="store-button store-button--ghost"
                    type="button"
                    onClick={() => handleCopy(entitlements.lookup_token || "")}
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                {entitlements.customer_email && (
                  <div className="store-meta">
                    We emailed this code to {entitlements.customer_email}.
                  </div>
                )}
                <div className="store-meta">
                  Save this code to view purchases later in the <Link className="store-link" to="/purchases/">customer portal</Link>.
                </div>
              </div>
            )}
            <div className="store-downloads">
              {entitlements.downloads.map((item) => (
                <div key={item.product_id} className="store-download-item">
                  <div><strong>{item.name}</strong></div>
                  <div className="store-meta">Quantity: {item.quantity}</div>
                  <a href={normalizeDownloadUrl(item.download_url)}>Download</a>
                  <div className="store-meta">
                    Link expires at {new Date(item.expires_at * 1000).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <Link className="store-link" to="/store/">Back to store</Link>
              <span style={{ marginLeft: "1rem" }}>
                <Link className="store-link" to="/purchases/">Customer portal</Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SuccessPage;
