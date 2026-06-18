import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { LiveBadge, StarRating, Badge, Button, PageWrapper } from "../../components/ui";
import PaymentModal from "../../components/payment/PaymentModal";

const C = { forest: "#2D4A3E", terra: "#E85D26", muted: "#6B7A6F", charcoal: "#1C2B22", border: "#DDD8D0", white: "#fff", sand: "#F7F3EE" };

const VENDORS = {
  1: { id: 1, name: "Abena's Fresh Produce", market: "Makola Market",    country: "GH", avatar: "👩🏾", viewers: 234, rating: 4.9, sales: 1240, products: [{ name: "Roma Tomatoes (1kg)", price: 5 }, { name: "Plantain Bunch", price: 3 }, { name: "Fresh Pepper (500g)", price: 4 }] },
  2: { id: 2, name: "Tech King Emeka",        market: "Computer Village", country: "NG", avatar: "👨🏿", viewers: 891, rating: 4.7, sales: 3200, products: [{ name: "iPhone Case",    price: 12 }, { name: "USB-C Cable",   price: 5 }, { name: "Screen Protector", price: 8  }] },
  3: { id: 3, name: "Kofi's Kente Corner",    market: "Makola Market",    country: "GH", avatar: "👨🏾", viewers: 567, rating: 4.6, sales: 2100, products: [{ name: "Kente Stole (3m)", price: 45 }, { name: "Kente Dashiki",    price: 35 }, { name: "Kente Bag",     price: 20 }] },
  4: { id: 4, name: "Fatou Art & Craft",      market: "Kumasi Central",   country: "GH", avatar: "👩🏾", viewers: 123, rating: 4.9, sales: 670,  products: [{ name: "Handwoven Basket", price: 22 }, { name: "Brass Necklace",    price: 18 }, { name: "Clay Mask",     price: 30 }] },
};

const SYMBOLS = { GH: "₵", NG: "₦" };

const AUTO_CHAT = ["How much for the red one?", "Is delivery available?", "❤️❤️❤️ love this!", "Do you ship to Kumasi?", "🔥🔥🔥", "I'll take 2!", "What's the quality like?", "Can I get a discount?"];

export default function StreamView({ session }) {
  const router = useRouter();
  const { id } = router.query;
  const vendor = VENDORS[id];

  const [messages, setMessages] = useState([
    { user: "Kwame", text: "How much for the first one?", id: 1 },
    { user: "Ngozi",  text: "Is delivery available?",      id: 2 },
    { user: "Aisha",  text: "❤️❤️ love this!",             id: 3 },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [buying, setBuying] = useState(false);
  const [buyProduct, setBuyProduct] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!vendor) return;
    const timer = setInterval(() => {
      const names = ["Tunde","Efua","Chidi","Amara","Yaw","Bisi","Kofi"];
      const name = names[Math.floor(Math.random() * names.length)];
      const text = AUTO_CHAT[Math.floor(Math.random() * AUTO_CHAT.length)];
      setMessages(prev => [...prev.slice(-30), { user: name, text, id: Date.now() }]);
    }, 3500);
    return () => clearInterval(timer);
  }, [vendor]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

  if (!vendor) return <div style={{ padding: 40, textAlign: "center" }}>Loading…</div>;

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { user: "You", text: chatInput, id: Date.now() }]);
    setChatInput("");
  };

  return (
    <>
      <Head><title>{vendor.name} — Yadamarket Live</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", color: C.forest, fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: 16 }}>← Back to streams</button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, color: C.forest, margin: "0 0 4px" }}>{vendor.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: C.muted, fontSize: 14 }}>{vendor.market}</span>
              <StarRating rating={vendor.rating} />
              <span style={{ color: C.muted, fontSize: 13 }}>· {vendor.sales} sales</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">❤️ Follow</Button>
            <Button variant="terra" size="sm" onClick={() => { setBuyProduct(vendor.products[0]); setBuying(true); }}>🛒 Buy Now</Button>
          </div>
        </div>

        {/* Stream + chat */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 0, height: 500, borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 28 }}>
          {/* Stream */}
          <div style={{ background: C.charcoal, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ fontSize: 90 }}>{vendor.avatar}</div>
            <p style={{ color: "#aaa", fontSize: 14, marginTop: 8 }}>📡 Live from {vendor.market}</p>
            <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8, alignItems: "center" }}>
              <LiveBadge viewers={vendor.viewers} />
              <span style={{ background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 11, padding: "3px 9px", borderRadius: 20 }}>👁 {vendor.viewers} watching</span>
            </div>
            <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {vendor.products.map(p => (
                <button key={p.name} onClick={() => { setBuyProduct(p); setBuying(true); }} style={{
                  background: "#E85D26", color: "#fff", border: "none", borderRadius: 7,
                  padding: "7px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>🛒 {p.name} — {SYMBOLS[vendor.country]}{p.price}</button>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div style={{ background: "#F9FAFB", display: "flex", flexDirection: "column", borderLeft: `1.5px solid ${C.border}` }}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, color: C.forest }}>Live Chat</div>
            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map(m => (
                <div key={m.id}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: m.user === "You" ? "#27AE60" : C.forest }}>{m.user}: </span>
                  <span style={{ fontSize: 12, color: C.charcoal }}>{m.text}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 6 }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="Say something…"
                style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "7px 10px", fontSize: 12, outline: "none" }} />
              <button onClick={sendMsg} style={{ background: C.forest, color: "#fff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, cursor: "pointer" }}>Send</button>
            </div>
          </div>
        </div>

        {/* Products */}
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, color: C.forest, marginBottom: 14 }}>Products available now</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
          {vendor.products.map(p => (
            <div key={p.name} style={{ background: C.white, borderRadius: 12, border: `1.5px solid ${C.border}`, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.forest, marginBottom: 12 }}>{SYMBOLS[vendor.country]}{p.price}</div>
              <button onClick={() => { setBuyProduct(p); setBuying(true); }} style={{
                width: "100%", background: C.terra, color: C.white, border: "none",
                borderRadius: 8, padding: "9px", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>Buy now</button>
            </div>
          ))}
        </div>
      </PageWrapper>

      <PaymentModal open={buying} onClose={() => setBuying(false)} product={buyProduct} country={vendor.country} />
      <Footer />
    </>
  );
}
