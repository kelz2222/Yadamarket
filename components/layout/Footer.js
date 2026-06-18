export default function Footer() {
  return (
    <footer style={{ background: "#2D4A3E", color: "rgba(255,255,255,0.7)", padding: "40px 20px 24px", marginTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 8 }}>
              Yada<span style={{ color: "#E85D26" }}>market</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65 }}>Market streaming live —<br />see it, buy it.</p>
          </div>
          {[
            { title: "Discover", links: ["Markets","Live Streams","Vendors","Products"] },
            { title: "Sell",     links: ["Become a Vendor","Start Streaming","Pricing","Vendor App"] },
            { title: "Support",  links: ["Help Centre","Privacy Policy","Terms","Contact Us"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>{col.title}</h4>
              {col.links.map(l => <div key={l} style={{ marginBottom: 8, fontSize: 13 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 18, fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>© 2026 Yadamarket. Built for African markets.</span>
          <span>🇬🇭 Ghana · 🇳🇬 Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
