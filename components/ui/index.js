// components/ui/index.js
// Shared UI primitives — all styled with Harmattan Fresh tokens

const C = {
  forest:      "#2D4A3E",
  forestLight: "#3D6B57",
  terra:       "#E85D26",
  terraDark:   "#C44A18",
  sunlight:    "#F9C846",
  sand:        "#F7F3EE",
  sandDark:    "#EDE8E1",
  liveRed:     "#E8323C",
  green:       "#27AE60",
  muted:       "#6B7A6F",
  border:      "#DDD8D0",
  white:       "#FFFFFF",
  charcoal:    "#1C2B22",
};

// ── Button ─────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = "terra", size = "md", style: s = {}, disabled = false }) {
  const sizes = {
    sm: { padding: "6px 14px",  fontSize: 13 },
    md: { padding: "10px 20px", fontSize: 14 },
    lg: { padding: "13px 28px", fontSize: 15 },
  };
  const variants = {
    terra:   { background: C.terra,   color: C.white },
    forest:  { background: C.forest,  color: C.white },
    green:   { background: C.green,   color: C.white },
    ghost:   { background: "transparent", color: C.forest, border: `1.5px solid ${C.border}` },
    danger:  { background: "#E53E3E", color: C.white },
    outline: { background: "transparent", color: C.terra, border: `1.5px solid ${C.terra}` },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        transition: "all 0.15s",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        opacity: disabled ? 0.6 : 1,
        ...sizes[size],
        ...variants[variant],
        ...s,
      }}
    >
      {children}
    </button>
  );
}

// ── Card ──────────────────────────────────────────────────────────
export function Card({ children, style: s = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.white,
        borderRadius: 14,
        border: `1.5px solid ${C.border}`,
        boxShadow: "0 2px 8px rgba(45,74,62,0.08)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.18s, transform 0.18s",
        ...s,
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,74,62,0.15)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(45,74,62,0.08)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </div>
  );
}

// ── LiveBadge ─────────────────────────────────────────────────────
export function LiveBadge({ viewers }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: C.liveRed,
      color: C.white,
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 4,
      letterSpacing: 1,
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: C.white,
        animation: "livePulse 1.2s ease-in-out infinite",
        display: "inline-block",
        flexShrink: 0,
      }} />
      LIVE {viewers > 0 && `· ${viewers}`}
    </span>
  );
}

// ── StarRating ────────────────────────────────────────────────────
export function StarRating({ rating, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      <span style={{ color: C.sunlight, fontSize: size }}>
        {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      </span>
      <span style={{ color: C.muted, fontSize: size - 2, marginLeft: 2 }}>
        {rating}
      </span>
    </span>
  );
}

// ── Badge ─────────────────────────────────────────────────────────
export function Badge({ children, color = C.forest }) {
  return (
    <span style={{
      background: color + "18",
      color,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 9px",
      borderRadius: 20,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

// ── Input ─────────────────────────────────────────────────────────
export function Input({ label, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: C.forest }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          border: `1.5px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          width: "100%",
          background: C.white,
          color: C.charcoal,
          transition: "border-color 0.15s",
          ...props.style,
        }}
        onFocus={e => e.target.style.borderColor = C.forest}
        onBlur={e => e.target.style.borderColor = C.border}
      />
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,20,15,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white,
          borderRadius: 18,
          padding: 28,
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.2s ease",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 19,
            color: C.forest,
            fontFamily: "'Syne', sans-serif",
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: 22,
              cursor: "pointer",
              color: C.muted,
              lineHeight: 1,
            }}
          >×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────
const STATUS_COLORS = {
  pending:    "#F9C846",
  processing: "#3D6B57",
  packed:     "#3D6B57",
  in_transit: "#E85D26",
  delivered:  "#27AE60",
  cancelled:  "#E53E3E",
  unpaid:     "#E8323C",
  paid:       "#27AE60",
};

export function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || C.muted;
  const label = status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  return (
    <span style={{
      background: color + "20",
      color,
      fontSize: 12,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
    }}>
      {label}
    </span>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────
export function SectionTitle({ children, action }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    }}>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 20,
        color: C.forest,
        margin: 0,
      }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

// ── PageWrapper ───────────────────────────────────────────────────
export function PageWrapper({ children }) {
  return (
    <div style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "32px 16px",
    }}>
      {children}
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────
export function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "3px solid #DDD8D0",
        borderTopColor: "#2D4A3E",
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}
