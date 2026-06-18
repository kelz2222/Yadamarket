// components/payment/PaymentModal.js
import { useState } from "react";
import { Modal, Button, Input } from "../ui";
import { PAYMENT_COUNTRIES, generateRef } from "../../lib/payments";

const C = {
  forest:  "#2D4A3E",
  terra:   "#E85D26",
  sand:    "#F7F3EE",
  border:  "#DDD8D0",
  green:   "#27AE60",
  muted:   "#6B7A6F",
  white:   "#FFFFFF",
  charcoal:"#1C2B22",
};

export default function PaymentModal({ open, onClose, product, country = "GH", onSuccess }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState("");
  const [ref] = useState(generateRef);

  const c = PAYMENT_COUNTRIES[country] || PAYMENT_COUNTRIES.GH;

  const reset = () => {
    setStep(1);
    setMethod(null);
    setPhone("");
    onClose();
  };

  const handlePay = () => {
    setStep(3);
    // ── Swap this timeout for your real payment SDK call ──────────
    // Flutterwave example:
    // FlutterwaveCheckout({
    //   public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    //   tx_ref: ref,
    //   amount: product.price,
    //   currency: c.currency,
    //   payment_options: method.id,
    //   customer: { phone_number: phone },
    //   callback: (response) => { setStep(4); onSuccess?.(response); },
    // });
    //
    // Paystack example:
    // const initializePayment = usePaystackPayment({
    //   reference: ref,
    //   email: userEmail,
    //   amount: product.price * 100,
    //   publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    // });
    // initializePayment(onSuccess, onClose);
    setTimeout(() => {
      setStep(4);
      onSuccess?.({ ref, method: method?.id, amount: product?.price });
    }, 2500);
  };

  return (
    <Modal
      open={open}
      onClose={reset}
      title={step === 4 ? "✅ Order Confirmed!" : `Checkout · ${c.symbol}${product?.price ?? 0}`}
    >

      {/* ── Step 4: Success ───────────────────────────────────── */}
      {step === 4 && (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
          <h3 style={{ color: C.green, fontSize: 18, marginBottom: 8 }}>
            Payment successful
          </h3>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65 }}>
            Your order for <strong>{product?.name}</strong> has been placed.<br />
            The vendor has been notified.
          </p>
          <div style={{
            background: C.sand, borderRadius: 10,
            padding: 16, margin: "18px 0", fontSize: 13,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.muted }}>Reference</span>
              <span style={{ fontWeight: 700, fontFamily: "monospace" }}>{ref}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: C.muted }}>Est. delivery</span>
              <span style={{ fontWeight: 700 }}>Today, 2–5 PM</span>
            </div>
          </div>
          <button
            onClick={reset}
            style={{
              width: "100%", background: C.forest, color: C.white,
              border: "none", borderRadius: 8, padding: "12px",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}
          >
            Track my order →
          </button>
        </div>
      )}

      {/* ── Step 3: Processing ────────────────────────────────── */}
      {step === 3 && (
        <div style={{ textAlign: "center", padding: 36 }}>
          <div style={{
            fontSize: 40, marginBottom: 16,
            animation: "spin 1.5s linear infinite",
            display: "inline-block",
          }}>⏳</div>
          <p style={{ color: C.charcoal, fontWeight: 600, marginBottom: 8 }}>
            Processing via {method?.label}…
          </p>
          {method?.type === "mobile_money" && (
            <p style={{ color: C.muted, fontSize: 13 }}>
              📲 Check your phone for the payment prompt
            </p>
          )}
          <p style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>
            Ref: <span style={{ fontFamily: "monospace" }}>{ref}</span>
          </p>
        </div>
      )}

      {/* ── Step 1: Choose method ─────────────────────────────── */}
      {step === 1 && (
        <div>
          <div style={{
            background: C.sand, borderRadius: 10,
            padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal }}>
              {product?.name}
            </div>
            <div style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>
              Sold by {product?.vendor}
            </div>
            <div style={{
              fontSize: 26, fontWeight: 800,
              color: C.forest, marginTop: 10,
            }}>
              {c.symbol}{product?.price}
            </div>
          </div>

          <p style={{ fontSize: 13, fontWeight: 600, color: C.forest, marginBottom: 12 }}>
            How would you like to pay?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {c.methods.map(m => (
              <label
                key={m.id}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                  border: `2px solid ${method?.id === m.id ? C.green : C.border}`,
                  background: method?.id === m.id ? C.green + "0A" : C.white,
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={m.id}
                  checked={method?.id === m.id}
                  onChange={() => setMethod(m)}
                  style={{ accentColor: C.green }}
                />
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <span style={{
                  fontSize: 14,
                  fontWeight: method?.id === m.id ? 700 : 400,
                  color: C.charcoal,
                }}>
                  {m.label}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={() => method && setStep(2)}
            disabled={!method}
            style={{
              width: "100%", marginTop: 20,
              background: method ? C.terra : C.border,
              color: C.white, border: "none",
              borderRadius: 8, padding: "13px",
              fontWeight: 700, fontSize: 15,
              cursor: method ? "pointer" : "not-allowed",
              transition: "background 0.15s",
            }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 2: Enter details ─────────────────────────────── */}
      {step === 2 && (
        <div>
          {/* Order summary */}
          <div style={{
            background: C.sand, borderRadius: 10,
            padding: 14, marginBottom: 20, fontSize: 13,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: C.muted }}>Item</span>
              <span style={{ fontWeight: 700 }}>{product?.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: C.muted }}>Method</span>
              <span style={{ fontWeight: 700 }}>{method?.icon} {method?.label}</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              borderTop: `1px solid ${C.border}`,
              paddingTop: 10, marginTop: 6,
            }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: C.forest }}>
                {c.symbol}{product?.price}
              </span>
            </div>
          </div>

          {/* Mobile money phone input */}
          {method?.requiresPhone && (
            <div style={{ marginBottom: 16 }}>
              <Input
                label={`${method.label} number`}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={country === "GH" ? "+233 XX XXX XXXX" : "+234 XXX XXX XXXX"}
                type="tel"
              />
            </div>
          )}

          {/* Card fields */}
          {method?.type === "card" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <Input label="Card number" placeholder="1234 5678 9012 3456" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVV" placeholder="123" />
              </div>
              <Input label="Name on card" placeholder="Kwame Mensah" />
            </div>
          )}

          {/* Bank transfer info */}
          {method?.type === "bank" && (
            <div style={{
              background: C.sand, borderRadius: 10,
              padding: 14, marginBottom: 16, fontSize: 13, lineHeight: 1.7,
            }}>
              <div style={{ fontWeight: 700, color: C.forest, marginBottom: 6 }}>Bank Transfer Details</div>
              <div><span style={{ color: C.muted }}>Bank:</span> <strong>First Bank Nigeria</strong></div>
              <div><span style={{ color: C.muted }}>Account:</span> <strong>0123456789</strong></div>
              <div><span style={{ color: C.muted }}>Name:</span> <strong>Yadamarket Ltd</strong></div>
              <div><span style={{ color: C.muted }}>Reference:</span> <strong style={{ fontFamily: "monospace" }}>{ref}</strong></div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: "11px 18px", borderRadius: 8,
                border: `1.5px solid ${C.border}`,
                background: C.white, color: C.forest,
                fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}
            >← Back</button>
            <button
              onClick={handlePay}
              style={{
                flex: 1, background: C.green, color: C.white,
                border: "none", borderRadius: 8, padding: "12px 20px",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6,
              }}
            >
              🔒 Pay {c.symbol}{product?.price}
            </button>
          </div>

          <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 12 }}>
            Secured · Your payment info is encrypted
          </p>
        </div>
      )}
    </Modal>
  );
}
