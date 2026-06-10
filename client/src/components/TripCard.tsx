

type TripCardProps = {
  title: string;
  currency: string;
  budget: string;
  startDate: string;
  image: string;
};

export default function TripCard({
  title,
  currency,
  budget,
  startDate,
  image,
}: TripCardProps) {
  return (
 <div
  style={{
    background: "#1e1b4b",
    borderRadius: "24px",
    padding: "20px",
    border: "1px solid #4338ca",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    transition: "0.3s",
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

      <p style={{ color: "#a5b4fc", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
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