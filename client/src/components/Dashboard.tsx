import Navbar from "./Navbar";
import TripCard from "./TripCard";
import NewTripModal from "./NewTripModal";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 32px",
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.8rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Your Trips
            </p>

            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: "1",
              }}
            >
              Travel overview
            </h2>
          </div>

          <NewTripModal />
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          <TripCard />
          <TripCard />
        </div>
      </main>
    </div>
  );
}