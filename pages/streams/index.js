import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Card, LiveBadge, StarRating, Badge, PageWrapper } from "../../components/ui";

const C = { forest: "#2D4A3E", muted: "#6B7A6F", charcoal: "#1C2B22", border: "#DDD8D0" };

const VENDORS = [
  { id: 1, name: "Abena's Fresh Produce", market: "Makola Market",    country: "GH", avatar: "👩🏾", isLive: true,  viewers: 234, rating: 4.9, products: ["Tomatoes","Plantain","Pepper"] },
  { id: 2, name: "Tech King Emeka",        market: "Computer Village", country: "NG", avatar: "👨🏿", isLive: true,  viewers: 891, rating: 4.7, products: ["Phones","Cables","Cases"]      },
  { id: 3, name: "Kofi's Kente Corner",    market: "Makola Market",    country: "GH", avatar: "👨🏾", isLive: true,  viewers: 567, rating: 4.6, products: ["Kente","Dashikis","Beads"]     },
  { id: 4, name: "Fatou Art & Craft",      market: "Kumasi Central",   country: "GH", avatar: "👩🏾", isLive: true,  viewers: 123, rating: 4.9, products: ["Masks","Jewelry","Baskets"]    },
  { id: 5, name: "Bola Electronics",       market: "Computer Village", country: "NG", avatar: "👨🏿", isLive: false, viewers: 0,   rating: 4.5, products: ["Laptops","TVs","Batteries"]    },
  { id: 6, name: "Mama Wanjiku Fabrics",   market: "Balogun Market",   country: "NG", avatar: "👩🏿", isLive: false, viewers: 0,   rating: 4.8, products: ["Fabrics","Lace","Ankara"]      },
];

export default function StreamsPage({ session }) {
  const live = VENDORS.filter(v => v.isLive);
  const offline = VENDORS.filter(v => !v.isLive);

  return (
    <>
      <Head><title>Live Streams — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: C.forest, marginBottom: 6 }}>Live Streams</h1>
        <p style={{ color: C.muted, marginBottom: 30, fontSize: 15 }}>Vendors broadcasting right now from markets across Ghana and Nigeria</p>

        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, color: C.forest, marginBottom: 14 }}>🔴 Live Now ({live.length})</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18, marginBottom: 40 }}>
          {live.map(v => (
            <Link key={v.id} href={`/streams/${v.id}`}>
              <Card>
                <div style={{ background: C.charcoal, height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative" }}>
                  {v.avatar}
                  <div style={{ position: "absolute", top: 10, left: 10 }}><LiveBadge viewers={v.viewers} /></div>
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 20 }}>👁 {v.viewers}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal }}>{v.name}</div>
                      <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{v.market}</div>
                    </div>
                    <StarRating rating={v.rating} />
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {v.products.map(p => <Badge key={p}>{p}</Badge>)}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, color: C.muted, marginBottom: 14 }}>Offline Vendors</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
          {offline.map(v => (
            <Card key={v.id} style={{ opacity: 0.7 }}>
              <div style={{ background: "#333", height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
                {v.avatar}
                <div style={{ position: "absolute", top: 8, left: 8, background: "#555", color: "#ccc", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>OFFLINE</div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>{v.name}</div>
                <div style={{ color: C.muted, fontSize: 12 }}>{v.market}</div>
              </div>
            </Card>
          ))}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
          }
