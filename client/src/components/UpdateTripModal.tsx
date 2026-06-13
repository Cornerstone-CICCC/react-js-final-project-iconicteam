type UpdateTripModalProps = {
  onClose: () => void;
};

export default function UpdateTripModal({ onClose }: UpdateTripModalProps) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ fontSize: "1.7rem", marginBottom: "10px" }}>
          Update Trip
        </h2>

        <p style={{ color: "#9ca3af", marginBottom: "20px" }}>
          Edit this trip information.
        </p>

        <div style={{ display: "grid", gap: "14px" }}>
          <input placeholder="Trip title" style={inputStyle} />
          <input placeholder="Currency" style={inputStyle} />
          <input placeholder="Budget" type="number" style={inputStyle} />
          <input type="date" style={inputStyle} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "26px",
          }}
        >
          <button onClick={onClose} style={secondaryButtonStyle}>
            Back
          </button>

          <button onClick={onClose} style={primaryButtonStyle}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  zIndex: 80,
};

const modalStyle = {
  width: "100%",
  maxWidth: "520px",
  background: "#070502",
  border: "1px solid rgba(165,219,152,0.7)",
  borderRadius: "28px",
  padding: "28px",
  boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "16px",
  border: "1px solid rgba(165,219,152,0.45)",
  background: "rgba(255,255,255,0.06)",
  color: "#f5f1e8",
  fontSize: "0.9rem",
};

const secondaryButtonStyle = {
  padding: "12px 20px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#f5f1e8",
  cursor: "pointer",
  fontWeight: 600,
};

const primaryButtonStyle = {
  padding: "12px 24px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};