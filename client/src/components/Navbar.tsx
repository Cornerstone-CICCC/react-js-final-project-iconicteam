export default function Navbar() {
  return (
    <nav
      style={{
        padding: "30px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          letterSpacing: "-1px",
        }}
      >
        Trip Atlas
      </h1>

      <p
        style={{
          color: "#8b8b95",
          marginTop: "4px",
        }}
      >
        Plan. Track. Explore.
      </p>
    </nav>
  );
}