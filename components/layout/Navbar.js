import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

const C = { forest: "#2D4A3E", terra: "#E85D26", border: "#DDD8D0", white: "#FFFFFF", muted: "#6B7A6F" };

export default function Navbar({ session }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/",        label: "Home"    },
    { href: "/markets", label: "Markets" },
    { href: "/streams", label: "🔴 Live" },
    { href: "/orders",  label: "Orders"  },
  ];
  const signOut = async () => { await supabase.auth.signOut(); router.push("/"); };

  return (
    <>
      <nav style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(45,74,62,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: C.forest }}>
            Yada<span style={{ color: C.terra }}>market</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desk-nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: router.pathname === l.href ? C.white : C.muted, background: router.pathname === l.href ? C.forest : "transparent" }}>{l.label}</Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {session
              ? <><Link href="/account" style={{ fontSize: 13, fontWeight: 600, color: C.forest, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${C.border}` }}>Account</Link>
                  <button onClick={signOut} style={{ fontSize: 13, fontWeight: 600, color: C.white, padding: "7px 14px", borderRadius: 8, background: C.terra, border: "none" }}>Sign out</button></>
              : <><Link href="/auth" style={{ fontSize: 13, fontWeight: 600, color: C.forest, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${C.border}` }}>Sign in</Link>
                  <Link href="/auth" style={{ fontSize: 13, fontWeight: 600, color: C.white, padding: "7px 16px", borderRadius: 8, background: C.terra }}>Join free</Link></>}
            <button onClick={() => setOpen(!open)} className="mob-btn" style={{ background: "none", border: "none", fontSize: 22, color: C.forest, display: "none" }}>☰</button>
          </div>
        </div>
        {open && (
          <div style={{ borderTop: `1px solid ${C.border}`, background: C.white, padding: "12px 20px 20px" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 15, fontWeight: 600, color: router.pathname === l.href ? C.terra : C.forest, borderBottom: `1px solid ${C.border}` }}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>
      <style>{`@media(max-width:640px){.desk-nav{display:none!important}.mob-btn{display:block!important}}`}</style>
    </>
  );
}
