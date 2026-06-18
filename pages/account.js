import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, Badge, StarRating, PageWrapper } from "../components/ui";
import { supabase } from "../lib/supabase";
import { PAYMENT_COUNTRIES } from "../lib/payments";

const C = { forest: "#2D4A3E", terra: "#E85D26", muted: "#6B7A6F", charcoal: "#1C2B22", border: "#DDD8D0", sand: "#F7F3EE", green: "#27AE60" };

export default function AccountPage({ session }) {
  const router = useRouter();
  useEffect(() => { if (!session) router.push("/auth"); }, [session, router]);
  if (!session) return null;

  const country = PAYMENT_COUNTRIES.GH;
  const user = session.user;

  return (
    <>
      <Head><title>My Account — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        {/* Profile header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, #2D4A3E, #E85D26)`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
            {user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} style={{ width: 80, height: 80, borderRadius: "50%" }} alt="avatar" /> : "👤"}
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, color: C.forest, margin: "0 0 4px" }}>
            {user.user_metadata?.full_name || user.email?.split("@")[0] || "Yadamarket User"}
          </h2>
          <p style={{ color: C.muted, fontSize: 14 }}>{user.email}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 600, margin: "0 auto" }}>
          {/* Stats */}
          <Card>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, color: C.forest, marginBottom: 16 }}>📊 My Activity</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, textAlign: "center" }}>
                {[{ label: "Orders", value: "14" }, { label: "Following", value: "8" }, { label: "Reviews", value: "11" }].map(s => (
                  <div key={s.label} style={{ background: C.sand, borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: C.forest }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Payment methods */}
          <Card>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, color: C.forest, marginBottom: 14 }}>💳 Payment Methods — Ghana</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {country.methods.map(m => (
                  <Badge key={m.id} color={C.forest}>{m.icon} {m.label}</Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, color: C.forest, marginBottom: 16 }}>⭐ My Reviews</h3>
              {[
                { vendor: "Abena's Fresh Produce", rating: 5, text: "Super fresh tomatoes, delivered really fast!", date: "Jun 15" },
                { vendor: "Kofi's Kente Corner",   rating: 5, text: "Beautiful kente, high quality weaving.",        date: "Jun 12" },
              ].map((r, i, arr) => (
                <div key={i} style={{ paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>{r.vendor}</span>
                    <span style={{ fontSize: 12, color: C.muted }}>{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p style={{ fontSize: 13, color: C.charcoal, marginTop: 6, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Sign out */}
          <button onClick={() => supabase.auth.signOut()} style={{
            width: "100%", padding: "12px", borderRadius: 10,
            border: "1.5px solid #DDD8D0", background: "#fff",
            color: "#E53E3E", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>Sign out</button>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
