import { useAuth } from "../context/auth/useAuth";

type NavbarProps = {
  avatar?: string;
};

export default function Navbar({ avatar }: NavbarProps) {
  const { clearAuth } = useAuth()
  const handleLogout = () => {
    clearAuth()
  }
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
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {avatar && (
          <img
            src={avatar}
            alt="Google profile avatar"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          />
        )}

        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Trip Atlas</h1>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.9rem" }}>
            Plan. Track. Explore.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(11, 19, 12, 0.88)",
            color: "#f5f1e8",
            border: "1px solid rgba(164, 230, 196, 0.93)",
            borderRadius: "999px",
            padding: "10px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ↪ Logout
        </button>
      </div>
    </nav>
  );
}