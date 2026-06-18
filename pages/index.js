import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, LiveBadge, StarRating, Badge, SectionTitle, PageWrapper } from "../components/ui";
import PaymentModal from "../components/payment/PaymentModal";
import { useState } from "react";

const C = { forest: "#2D4A3E", terra: "#E85D26", sand: "#F7F3EE", border: "#DDD8D0", sunlight: "#F9C846", muted: "#6B7A6F", white: "#fff", charcoal: "#1C2B22", green: "#27AE60", liveRed: "#E8323C" };

const MARKETS = [
  { id: 1, name: "Makola Market",    city: "Accra",  country: "GH", distance: "0.8km", vendors: 142, liveCount: 8,  icon: "🏪", rating: 4.8, category: "General"     },
  { id: 2, name: "Kumasi Central",   city: "Kumasi", country: "GH", distance: "1.2km", vendors: 95,  liveCount: 6,  icon: "🎨", rating: 4.6, category: "Crafts"      },
  { id: 3, name: "Computer Village", city: "Lagos",  country: "NG", distance: "2.1km", vendors: 89,  liveCount: 12, icon: "💻", rating: 4.7, category: "Electronics" },
  { id: 4, name: "Balogun Market",   city: "Lagos",  country: "NG", distance: "3.4km", vendors: 210, liveCount: 5,  icon: "👗", rating: 4.5, category: "General"     },
  { id: 5, name: "Wuse Market",      city: "Abuja",  country: "NG", distance: "0.5km", vendors: 67,  liveCount: 3,  icon: "🥬", rating: 4.4, category: "Food"        },
];

const LIVE_VENDORS = [
  { id: 1, name: "Abena's Fresh Produce", market: "Makola Market",    avatar: "👩🏾", viewers: 234, country: "GH", products: ["Tomatoes","Plantain","Pepper"] },
  { id: 2, name: "Tech King Emeka",       market: "Computer Village", avatar: "👨🏿", viewers: 891, country: "NG", products: ["Phones","Cables","Cases"]      },
  { id: 3, name: "Kofi's Kente Corner",   market: "Makola Market",    avatar: "👨🏾", viewers: 567, country: "GH", products: ["Kente","Dashikis","Beads"]     },
  { id: 4, name: "Fatou Art & Craft",     market: "Kumasi Central",   avatar: "👩🏾", viewers: 123, country: "GH", products: ["Masks","Jewelry","Baskets"]    },
];

const PRODUCTS = [
  { id: 1, name: "Roma Tomatoes (1kg)", price: 5,  vendor: "Abena's Fresh Produce", country: "GH", icon: "🍅", inStock: true,  rating: 4.8 },
  { id: 2, name: "Kente Stole (3m)",   price: 45, vendor: "Kofi's Kente Corner",   country: "GH", icon: "🧣", inStock: true,  rating: 4.9 },
  { id: 3, name: "iPhone 14 Case",     price: 12, vendor: "Tech King Emeka",        country: "NG", icon: "📱", inStock: true,  rating: 4.6 },
  { id: 4, name: "Handwoven Basket",   price: 22, vendor: "Fatou Art & Craft",      country: "GH", icon: "🧺", inStock: false, rating: 4.7 },
  { id: 5, name: "Plantain Bunch",     price: 3,  vendor: "Abena's Fresh Produce",  country: "GH", icon: "🍌", inStock: true,  rating: 4.5 },
  { id: 6, name: "Laptop Charger",     price: 18, vendor: "Tech King Emeka",        country: "NG", icon: "🔌", inStock: true,  rating: 4.4 },
];

const SYMBOLS = { GH: "₵", NG: "₦" };

function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 44, textAlign: "center", marginBottom: 10 }}>{product.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal, marginBottom: 3 }}>{product.name}</div>
          <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>{product.vendor}</div>
          <StarRating rating={product.rating} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 20, color: C.forest }}>{SYMBOLS[product.country]}{product.price}</span>
            {product.inStock
              ? <button onClick={() => setOpen(true)} style={{ background: C.terra, color: C.white, border: "none", borderRadius: 7, padding: "7px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Buy</button>
              : <span style={{ fontSize: 12, color: C.muted }}>Out of stock</span>}
          </div>
        </div>
      </Card>
      <PaymentModal open={open} onClose={() => setOpen(false)} product={product} country={product.country} />
    </>
  );
}

export default function Home({ session }) {
  const [search, setSearch] = useState("");
  const filtered = MARKETS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head><title>Yadamarket — Market streaming live, see it, buy it</title></Head>
      <Navbar session={session} />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2D4A3E 0%, #3D6B57 100%)", padding: "60px 20px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <LiveBadge viewers={48} />
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, padding: "3px 12px", borderRadius: 20 }}>1,240+ vendors · Ghana & Nigeria</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px,6vw,54px)", color: "#fff", margin: "0 0 10px", lineHeight: 1.1 }}>
            Market streaming live.<br />
            <span style={{ color: "#F9C846" }}>See it, buy it.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.65, margin: "0 auto 28px" }}>
            Watch vendors showcase real products live from Makola, Computer Village, and markets across Ghana and Nigeria. Pay with Mobile Money, OPay, or card.
          </p>
          <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto", flexWrap: "wrap" }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search markets or vendors…"
              style={{ flex: 1, minWidth: 200, padding: "13px 18px", borderRadius: 10, border: "none", fontSize: 15, outline: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
            />
            <button style={{ background: "#E85D26", color: "#fff", border: "none", borderRadius: 10, padding: "13px 22px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Search</button>
          </div>
        </div>
      </div>

      <PageWrapper>
        {/* Live now */}
        <section style={{ margin: "36px 0 0" }}>
          <SectionTitle action={<Link href="/streams" style={{ fontSize: 13, fontWeight: 600, color: C.green }}>See all →</Link>}>🔴 Live Right Now</SectionTitle>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
            {LIVE_VENDORS.map(v => (
              <Link key={v.id} href={`/streams/${v.id}`}>
                <Card style={{ minWidth: 155, flexShrink: 0 }}>
                  <div style={{ background: C.charcoal, height: 96, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }}>
                    {v.avatar}
                    <div style={{ position: "absolute", top: 7, right: 7 }}><LiveBadge viewers={v.viewers} /></div>
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.charcoal }}>{v.name}</div>
                    <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{v.market}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Nearby markets */}
        <section style={{ margin: "40px 0" }}>
          <SectionTitle action={<Link href="/markets" style={{ fontSize: 13, fontWeight: 600, color: C.green }}>All markets →</Link>}>📍 Markets Near You</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
            {filtered.map(m => (
              <Link key={m.id} href={`/markets/${m.id}`}>
                <Card>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <span style={{ fontSize: 38 }}>{m.icon}</span>
                      <Badge color={C.liveRed}>{m.liveCount} LIVE</Badge>
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, color: C.charcoal, margin: "0 0 4px" }}>{m.name}</h3>
                    <p style={{ color: C.muted, fontSize: 13, margin: "0 0 10px" }}>📍 {m.city} · {m.distance}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <StarRating rating={m.rating} />
                      <span style={{ fontSize: 12, color: C.muted }}>{m.vendors} vendors</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section style={{ margin: "40px 0" }}>
          <SectionTitle>🛍️ Featured Products</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 14 }}>
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </PageWrapper>

      <Footer />
    </>
  );
}
