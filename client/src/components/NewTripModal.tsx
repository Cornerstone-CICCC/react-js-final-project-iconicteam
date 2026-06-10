export default function NewTripModal() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "32px",
      }}
    >
      <button
        style={{
          background: "#7c3aed",
          color: "#ffffff",
          border: "none",
          borderRadius: "999px",
          padding: "14px 28px",
          fontSize: "0.9rem",
          fontWeight: "600",
          letterSpacing: "1px",
          cursor: "pointer",
          transition: "0.3s",
          boxShadow: "0 10px 30px rgba(124,58,237,0.25)",
        }}
      >
        ✈ New Trip
      </button>
    </div>
  );
}