import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, StatusBadge, PageWrapper } from "../components/ui";

const C = { forest: "#2D4A3E", muted: "#6B7A6F", charcoal: "#1C2B22", border: "#DDD8D0", sand: "#F7F3EE", green: "#27AE60", terra: "#E85D26" };

const ORDERS = [
  { id: "YDA-8821", product: "Kente Stole (3m)",   vendor: "Kofi's Kente Corner",   status: "in_transit", eta: "Today, 3–5 PM",      amount: 45, symbol: "₵",  date: "Jun 16, 2026", steps: 3 },
  { id: "YDA-8814", product: "Roma Tomatoes (1kg)", vendor: "Abena's Fresh Produce", status: "delivered",  eta: "Delivered Jun 15",    amount: 5,  symbol: "₵",  date: "Jun 15, 2026", steps: 4 },
  { id: "YDA-8803", product: "Handwoven Basket",    vendor: "Fatou Art & Craft",      status: "processing", eta: "Est. Jun 18",         amount: 22, symbol: "₵",  date: "Jun 16, 2026", steps: 1 },
  { id: "YDA-8790", product: "iPhone 14 Case",      vendor: "Tech King Emeka",        status: "delivered",  eta: "Delivered Jun 14",    amount: 12, symbol: "₦",  date: "Jun 14, 2026", steps: 4 },
];

const STEPS = ["Placed", "Packed", "In Transit", "Delivered"];

export default function OrdersPage({ session }) {
  return (
    <>
      <Head><title>My Orders — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: C.forest, marginBottom: 6 }}>My Orders</h1>
        <p style={{ color: C.muted, marginBottom: 28, fontSize: 15 }}>Track and manage all your Yadamarket purchases</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ORDERS.map(o => (
            <Card key={o.id}>
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.charcoal }}>{o.product}</div>
                    <div style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{o.vendor} · {o.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 20, color: C.forest }}>{o.symbol}{o.amount}</div>
                    <div style={{ marginTop: 4 }}><StatusBadge status={o.status} /></div>
                  </div>
                </div>

                <div style={{ background: C.sand, borderRadius: 8, padding: "10px 14px", fontSize: 13, display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ color: C.muted }}>📦 {o.eta}</span>
                  <span style={{ color: C.muted, fontFamily: "monospace" }}>#{o.id}</span>
                </div>

                {/* Progress tracker */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    {STEPS.map((s, i) => (
                      <div key={s} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: i < o.steps ? C.green : C.border, margin: "0 auto 4px", border: i === o.steps - 1 ? `2px solid ${C.green}` : "none", boxShadow: i === o.steps - 1 ? `0 0 0 3px ${C.green}22` : "none" }} />
                        <div style={{ fontSize: 10, color: i < o.steps ? C.forest : C.muted, fontWeight: i < o.steps ? 600 : 400 }}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 3, background: C.border, borderRadius: 2, position: "relative", margin: "0 5px" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", background: C.green, borderRadius: 2, width: `${((o.steps - 1) / 3) * 100}%`, transition: "width 0.5s" }} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
