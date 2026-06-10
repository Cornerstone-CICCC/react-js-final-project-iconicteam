import Navbar from "./Navbar";
import TripCard from "./TripCard";
import NewTripModal from "./NewTripModal";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "40px" }}>
        <NewTripModal />

        <TripCard />

        <TripCard />
      </main>
    </div>
  );
}