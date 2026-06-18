import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";

export default function AuthPage({ session }) {
  const router = useRouter();
  useEffect(() => { if (session) router.push("/"); }, [session, router]);

  return (
    <>
      <Head><title>Sign in — Yadamarket</title></Head>
      <Navbar session={session} />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 18, padding: 36, width: "100%", maxWidth: 420, boxShadow: "0 8px 32px rgba(45,74,62,0.12)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26, color: "#2D4A3E" }}>
              Yada<span style={{ color: "#E85D26" }}>market</span>
            </div>
            <p style={{ color: "#6B7A6F", fontSize: 14, marginTop: 6 }}>Market streaming live — see it, buy it.</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#2D4A3E",
                    brandAccent: "#E85D26",
                  },
                },
              },
            }}
            providers={["google"]}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/`}
          />
        </div>
      </div>
    </>
  );
}
