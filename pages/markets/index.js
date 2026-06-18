import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Card, StarRating, Badge, LiveBadge, PageWrapper } from "../../components/ui";

const C = { forest: "#2D4A3E", terra: "#E85D26", muted: "#6B7A6F", charcoal: "#1C2B22", liveRed: "#E8323C" };

const MARKETS = [
  { id: 1, name: "Makola Market",    city: "Accra",  country: "GH", flag: "🇬🇭", distance: "0.8km", vendors: 142, liveCount: 8,  icon: "🏪", rating: 4.8, category: "General",     desc: "Accra's largest and most vibrant open-air market." },
  { id: 2, name: "Kumasi Central",   city: "Kumasi", country: "GH", flag: "🇬🇭", distance: "1.2km", vendors: 95,  liveCount: 6,  icon: "🎨", rating: 4.6, category: "Crafts",      desc: "Heart of Ashanti commerce — crafts, kente, and daily essentials." },
  { id: 3, name: "Computer Village", city: "Lagos",  country: "NG", flag: "🇳🇬", distance: "2.1km", vendors: 89,  liveCount: 12, icon: "💻", rating: 4.7, category: "Electronics", desc: "West Africa's largest electronics and tech accessories hub." },
  { id: 4, name: "Balogun Market",   city: "Lagos",  country: "NG", flag: "🇳🇬", distance: "3.4km", vendors: 210, liveCount: 5,  icon: "👗", rating: 4.5, category: "General",     desc: "Lagos's iconic textile, fashion, and general goods market." },
  { id: 5, name: "Wuse Market",      city: "Abuja",  country: "NG", flag: "🇳🇬", distance: "0.5km", vendors: 67,  liveCount: 3,  icon: "🥬", rating: 4.4, category: "Food",        desc: "Abuja's premier market for fresh food and clothing." },
];

const CATEGORIES = ["All", "General", "Crafts", "Electronics", "Food"];

export default function MarketsPage({ session }) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = MARKETS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.city.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === "All" || m.country === country;
    const matchCat = category === "All" || m.category === category;
    return matchSearch && matchCountry && matchCat;
  });

  return (
    <>
      <Head><title>Markets — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: C.forest, marginBottom: 6 }}>Markets</h1>
        <p style={{ color: C.muted, marginBottom: 24, fontSize: 15 }}>Browse live markets across Ghana and Nigeria</p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search markets…"
            style={{ flex: 1, minWidth: 200, padding: "9px 14px", borderRadius: 8, border: "1.5px solid #DDD8D0", fontSize: 14, outline: "none" }} />
          <select value={country} onChange={e => setCountry(e.target.value)}
            style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #DDD8D0", fontSize: 14, color: C.forest, background: "#fff", cursor: "pointer" }}>
            <option value="All">🌍 All countries</option>
            <option value="GH">🇬🇭 Ghana</option>
            <option value="NG">🇳🇬 Nigeria</option>
          </select>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                borderColor: category === cat ? C.forest : "#DDD8D0",
                background: category === cat ? C.forest : "#fff",
                color: category === cat ? "#fff" : C.muted,
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
          {filtered.map(m => (
            <Link key={m.id} href={`/markets/${m.id}`}>
              <Card>
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontSize: 42 }}>{m.icon}</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <Badge color={C.liveRed}>{m.liveCount} LIVE</Badge>
                      <span style={{ fontSize: 12, color: C.muted }}>{m.flag} {m.country === "GH" ? "Ghana" : "Nigeria"}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, color: C.charcoal, margin: "0 0 5px" }}>{m.name}</h3>
                  <p style={{ color: C.muted, fontSize: 13, margin: "0 0 10px" }}>📍 {m.city} · {m.distance}</p>
                  <p style={{ color: C.charcoal, fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>{m.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <StarRating rating={m.rating} />
                    <span style={{ fontSize: 12, color: C.muted }}>{m.vendors} vendors</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
