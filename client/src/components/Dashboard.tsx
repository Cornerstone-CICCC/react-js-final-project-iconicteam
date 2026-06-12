
import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import Navbar from "./Navbar";
import TripCard from "./TripCard";
import NewTripModal from "./NewTripModal";
import tokyo from "../assets/trips/tokyo.jpg";
import chapultepec from "../assets/trips/chapultepec.jpg";
import avila from "../assets/trips/avila.jpg";
import wellington from "../assets/trips/wellington.jpg";
import easter from "../assets/trips/easter.jpg";
import pinklake from "../assets/trips/pinklake.jpg";
const trips = [
  { title: "Ávila", currency: "€", budget: "4,000", startDate: "17 Jun 2026", image: avila },
  { title: "Wellington", currency: "$", budget: "4,550", startDate: "18 Jun 2026", image: wellington },
  { title: "Easter Island", currency: "$", budget: "3,200", startDate: "25 Jun 2026", image: easter },
  { title: "Pink Lake", currency: "$", budget: "5,100", startDate: "30 Jun 2026", image: pinklake },
  { title: "Tokyo", currency: "¥", budget: "50,000", startDate: "29 Apr 2026", image: tokyo },
  { title: "CDMX", currency: "$", budget: "2,500", startDate: "12 Aug 2026", image: chapultepec },
];
export default function Dashboard() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState<
  {
    date: string;
    money: string;
    currency: string;
    convertedAmount: string;
    details: string;
  }[]
>([]);

  if (selectedTrip) {
    return (
      <div>
        <Navbar avatar="https://i.pravatar.cc/150?img=47" />
        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px" }}>
          <button
            onClick={() => setSelectedTrip(null)}
            style={{
              marginBottom: "32px",
              background: "transparent",
              color: "#f5f1e8",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "999px",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {selectedTrip}
          </h1>
          <p style={{ color: "#9ca3af", marginTop: "12px" }}>
            Your travel budget overview
          </p>
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, #1fa4bb 0%, #69ca69 100%)",
              borderRadius: "999px",
              marginTop: "20px",
              marginBottom: "40px",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            {["Budget", "Spent", "Remaining"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#070502",
                  border: "1px solid rgba(165,219,152,0.7)",
                  borderRadius: "24px",
                  padding: "24px",
                }}
              >
                <p style={{ color: "#9ca3af", marginBottom: "12px" }}>{item}</p>
                <h3 style={{ fontSize: "2rem" }}>
                  {item === "Spent" ? "$0" : "$4,550"}
                </h3>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowExpenseModal(true)}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "1px solid #a5db98",
              background: "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 12px 35px rgba(31,164,187,0.25)",
              marginBottom: "32px",
            }}
          >
            + Add Expense
          </button>
          <div style={{ marginTop: "32px", display: "grid", gap: "14px" }}>
  {expenses.map((expense, index) => (
    <div
      key={index}
      style={{
        background: "#070502",
        border: "1px solid rgba(165,219,152,0.45)",
        borderRadius: "18px",
        padding: "18px",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <p>{expense.date}</p>
      <p>
        {expense.money} {expense.currency}
      </p>
      <p>{expense.convertedAmount}</p>
      <p>{expense.details}</p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => alert(expense.details)}
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "transparent",
            color: "#f5f1e8",
            cursor: "pointer",
          }}
        >
          Details
        </button>

        <button
          onClick={() => {
            setExpenses(expenses.filter((_, i) => i !== index));
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(255,80,80,0.35)",
            background: "rgba(255,80,80,0.08)",
            color: "#ffb4b4",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
          {showExpenseModal && (
            <AddExpenseModal
  onClose={() => setShowExpenseModal(false)}
  onAddExpense={(expense) => {
    setExpenses([...expenses, expense]);
  }}
/>
          )}
        </main>
      </div>
    );
  }
  return (
    <div>
      <Navbar avatar="https://i.pravatar.cc/150?img=47" />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px" }}>
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
                color: "silver",
                fontSize: "0.8rem",
                letterSpacing: "7px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Your Trips
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1" }}>
              Travel overview
            </h2>
          </div>
          <NewTripModal />
        </section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {trips.map((trip) => (
            <TripCard
              key={trip.title}
              title={trip.title}
              currency={trip.currency}
              budget={trip.budget}
              startDate={trip.startDate}
              image={trip.image}
              onClick={() => setSelectedTrip(trip.title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}