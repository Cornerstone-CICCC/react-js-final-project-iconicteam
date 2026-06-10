export default function TripCard() {
  return (
    <div
      style={{
        background: "#1e1b4b",
        borderRadius: "24px",
        padding: "28px",
        border: "1px solid #4338ca",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        transition: "0.3s",
      }}
    >
      <p
        style={{
          color: "#a5b4fc",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Active Trip
      </p>

      <h2
        style={{
          marginTop: "16px",
          fontSize: "2rem",
        }}
      >
        ✈ Tokyo
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
        }}
      >
        <div>
          <p style={{ color: "#94a3b8" }}>Budget</p>
          <h3>¥50,000</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Start Date</p>
          <h3>29 Apr 2026</h3>
        </div>
      </div>
    </div>
  );
}