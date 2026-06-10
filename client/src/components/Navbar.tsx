import avila from "../assets/trips/avila.jpg";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <img
          src={avila}
          alt="User avatar"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        />

        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Trip Atlas</h1>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.9rem" }}>
            Plan. Track. Explore.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#f5f1e8",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "10px 16px",
            fontWeight: 600,
          }}
        >
          🌐 Language
        </button>

        <button
          style={{
            background: "rgba(124,58,237,0.16)",
            color: "#f5f1e8",
            border: "1px solid rgba(124,58,237,0.45)",
            borderRadius: "999px",
            padding: "10px 16px",
            fontWeight: 600,
          }}
        >
          ↪ Logout
        </button>
      </div>
    </nav>
  );
}