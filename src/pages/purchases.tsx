import * as React from "react";
import { Link } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import "../styles/store.css";

type OrderItem = {
  product_id: string;
  name: string;
  slug: string;
  quantity: number;
  unit_price_cents: number;
};

type Order = {
  id: string;
  status: "paid" | "refunded";
  created_at: string;
  customer_email?: string | null;
  stripe_session_id?: string | null;
  items: OrderItem[];
};

type IdentityUser = {
  email?: string;
  jwt: () => Promise<string>;
};

type IdentityWidget = {
  init: () => void;
  open: (type?: "login" | "signup") => void;
  close: () => void;
  currentUser: () => IdentityUser | null;
  on: (event: "login" | "logout", handler: (user?: IdentityUser) => void) => void;
  off: (event: "login" | "logout", handler: (user?: IdentityUser) => void) => void;
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

const formatMoney = (amountCents: number, currency = "USD") => {
  const amount = amountCents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch (error) {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

const PurchasesPage = () => {
  const [email, setEmail] = React.useState("");
  const [lookupToken, setLookupToken] = React.useState("");
  const [identity, setIdentity] = React.useState<IdentityWidget | null>(null);
  const [user, setUser] = React.useState<IdentityUser | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let widget;
    let mounted = true;

    const initIdentity = async () => {
      const module = await import("netlify-identity-widget");
      widget = module.default;
      const hostname = window.location.hostname;
      const isLocal =
        hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
      const identityBase =
        (process.env.GATSBY_IDENTITY_URL || "").trim() || "https://bradleymatera.dev";

      if (isLocal) {
        widget.init({
          APIUrl: `${identityBase}/.netlify/identity`,
        });
      } else {
        widget.init();
      }
      if (!mounted) return;
      setIdentity(widget);
      setUser(widget.currentUser());

      const handleLogin = (loggedInUser?: IdentityUser) => {
        setUser(loggedInUser || null);
        widget.close();
      };

      const handleLogout = () => {
        setUser(null);
      };

      widget.on("login", handleLogin);
      widget.on("logout", handleLogout);

      return () => {
        widget.off("login", handleLogin);
        widget.off("logout", handleLogout);
      };
    };

    const cleanupPromise = initIdentity();

    return () => {
      mounted = false;
      if (cleanupPromise && typeof cleanupPromise.then === "function") {
        cleanupPromise.then((cleanup) => {
          if (cleanup) cleanup();
        });
      }
    };
  }, []);

  const loadOrders = async (options: { token?: string; email?: string; lookupToken?: string }) => {
    setStatus("loading");
    setMessage(null);
    setOrders([]);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (options.token) {
        headers.Authorization = `Bearer ${options.token}`;
      }

      const res = await fetch(getFunctionsUrl("get_orders_by_email"), {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: options.email,
          lookup_token: options.lookupToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Unable to fetch orders.");
      }
      setOrders(data.orders || []);
      setStatus("success");
      if (!data.orders || data.orders.length === 0) {
        setMessage("No orders found yet.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to fetch orders.");
    }
  };

  React.useEffect(() => {
    if (!user) return;
    user.jwt().then((token) => {
      loadOrders({ token });
    });
  }, [user]);

  const handleSendTestReceipt = async () => {
    if (!user) return;
    setStatus("loading");
    setMessage(null);
    try {
      const token = await user.jwt();
      const res = await fetch(getFunctionsUrl("send_test_receipt"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Unable to send test receipt.");
      }
      setStatus("success");
      setMessage("Test receipt sent to your email.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send test receipt.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await loadOrders({ email, lookupToken });
  };

  return (
    <Layout>
      <div className="store-shell">
        <header className="store-header">
          <h1 className="store-title">Purchases</h1>
          <p className="store-subtitle">Access your orders securely.</p>
        </header>

        <div className="store-access">
          <div className="store-access-card">
            <h3>Sign in for instant access</h3>
            <p className="store-meta">Use the same email you used at checkout.</p>
            {user?.email ? (
              <div>
                <div className="store-meta">Signed in as {user.email}</div>
                <button
                  className="store-button store-button--ghost"
                  type="button"
                  onClick={handleSendTestReceipt}
                  style={{ marginTop: "0.75rem" }}
                >
                  Send test receipt
                </button>
              </div>
            ) : (
              <button
                className="store-button"
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.sessionStorage.setItem("identity_redirect", "/purchases");
                  }
                  identity?.open("login");
                }}
                disabled={!identity}
              >
                {identity ? "Sign in" : "Loading sign-in…"}
              </button>
            )}
          </div>

          <div className="store-access-card">
            <h3>Use your access code</h3>
            <p className="store-meta">Paste the code from your purchase email.</p>
            <form className="store-form" onSubmit={handleSubmit}>
              <label className="store-label" htmlFor="purchase-email">
                Email
              </label>
              <input
                id="purchase-email"
                type="email"
                required
                className="store-input"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label className="store-label" htmlFor="purchase-token">
                Order lookup code
              </label>
              <input
                id="purchase-token"
                type="text"
                required
                className="store-input"
                placeholder="Paste the code from your purchase email"
                value={lookupToken}
                onChange={(event) => setLookupToken(event.target.value)}
              />
              <button className="store-button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Searching…" : "Find my orders"}
              </button>
            </form>
          </div>
        </div>

        {message && (
          <div className={`store-status ${status === "error" ? "store-error" : ""}`} style={{ marginTop: "1.25rem" }}>
            {message}
            {status === "error" && (
              <div style={{ marginTop: "0.75rem" }}>
                <Link className="store-link" to="/support/">Support & refunds</Link>
              </div>
            )}
          </div>
        )}

        {orders.length > 0 && (
          <div className="store-orders">
            {orders.map((order) => {
              const totalCents = order.items.reduce(
                (sum, item) => sum + item.unit_price_cents * item.quantity,
                0
              );
              return (
                <div key={order.id} className="store-order">
                  <div className="store-order-header">
                    <div>
                      <strong>Order {order.id}</strong>
                      <div className="store-meta">
                        {new Date(order.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className={`store-pill ${order.status === "refunded" ? "store-pill--warn" : ""}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="store-order-items">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.product_id}`} className="store-order-item">
                        <div>
                          <div><strong>{item.name}</strong></div>
                          <div className="store-meta">Qty {item.quantity}</div>
                        </div>
                        <div className="store-meta">{formatMoney(item.unit_price_cents * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="store-order-total">
                    <span>Total</span>
                    <span>{formatMoney(totalCents)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <Link className="store-link" to="/store/">Back to store</Link>
        </div>
      </div>
    </Layout>
  );
};

export default PurchasesPage;
