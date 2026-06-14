

type TripCardProps = {
  title: string;
  currency: string;
  budget: string;
  startDate: string;
  image: string;
  onClick?: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
};

export default function TripCard({
  title,
  currency,
  budget,
  startDate,
  image,
  onClick,
  onDelete,
  canDelete = true,
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

      <h2
  style={{
    fontSize: "1.8rem",
    marginBottom: "24px",
  }}
>
  ✈ {title}
</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "18px",
        }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.();
          }}
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            border: canDelete
              ? "1px solid rgba(255,80,80,0.35)"
              : "1px solid rgba(255,255,255,0.14)",
            background: canDelete
              ? "rgba(255,80,80,0.08)"
              : "rgba(255,255,255,0.04)",
            color: canDelete ? "#ffb4b4" : "#9ca3af",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Delete
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#94a3b8" }}>Budget</p>
          <h3>{currency}{budget}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Start Date</p>
          <h3>{startDate}</h3>
        </div>
      </div>
    </div>
  );
}
