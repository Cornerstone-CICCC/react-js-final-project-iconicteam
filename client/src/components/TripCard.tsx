type TripCardProps = {
  title: string;
  currency: string;
  budget: string;
  startDate: string;
  image: string;
  onClick?: () => void;
  onUpdate?: () => void;
};

export default function TripCard({
  title,
  currency,
  budget,
  startDate,
  image,
  onClick,
  onUpdate,
}: TripCardProps) {
  return (
    
    
    <div
      onClick={onClick}
      style={{
        background: "#070502",
        borderRadius: "24px",
        padding: "20px",
        border: "1px solid #a5db98",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        transition: "0.3s ease",
        cursor: "pointer",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "18px",
          marginBottom: "20px",
        }}
      />

      <p style={{ color: "#a5b4fc", fontSize: "12px", letterSpacing: "5px", textTransform: "uppercase", marginBottom: "10px" }}>
        Active Trip
      </p>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px" }}>
        ✈️ {title}
      </h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
        <div>
          <p style={{ color: "#94a3b8" }}>Currency</p>
          <h3>{currency}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Budget</p>
          <h3>{budget}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Start</p>
          <h3>{startDate}</h3>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate?.();
          }}
          style={smallButtonStyle}
        >
          Update
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            ...smallButtonStyle,
            border: "1px solid rgba(255,80,80,0.45)",
            color: "#ffb4b4",
          }}
        >
          Delete
        </button>
        
      </div>
    </div>
  );
}

const smallButtonStyle = {
  padding: "8px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(165,219,152,0.6)",
  background: "transparent",
  color: "#f5f1e8",
  cursor: "pointer",
  fontWeight: 600,
};

