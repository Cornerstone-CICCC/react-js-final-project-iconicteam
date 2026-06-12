import { useState } from "react";

export default function NewTripModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "40px",
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "999px",
            padding: "16px 32px",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "1px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 12px 35px rgba(31,164,187,0.35)",
          }}
        >
          ✈ Create New Trip
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "#0b0f14",
              border: "1px solid rgba(160,255,190,0.25)",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "8px" ,width: "100%", textAlign: "center"
            }}>
              New Trip
            </h2>

            <p style={{ color: "#9ca3af", marginBottom: "15px", letterSpacing: "0.5px" }}>
              Create a new travel budget plan.
            </p>
<div
  style={{
    width: "10rem",
    height: "1px",
    background:
      "linear-gradient(90deg, #1fa4bb 0%, #69ca69 100%)",
    borderRadius: "999px",
    marginBottom: "28px",
  }}
/>
            <div style={{ display: "grid", gap: "16px" }}>
              <input
                placeholder="Trip title"
                style={inputStyle}
              />

              <select style={inputStyle}>
                <option>Currency</option>
                <option>USD</option>
                <option>CAD</option>
                <option>MXN</option>
                <option>YEN</option>
                <option>EUR</option>
              </select>

              <input
                placeholder="Budget"
                type="number"
                style={inputStyle}
              />

              <input
                type="date"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "transparent",
                  color: "#f5f1e8",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                style={{
                  padding: "12px 24px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle = {
  width: "95%",
  padding: "12px 14px",
  borderRadius: "16px",
  border: "1px solid rgba(29, 97, 71, 0.78)",
  background: "rgba(255,255,255,0.06)",
  color: "#f5f1e8",
  fontSize: "0.95rem",
};