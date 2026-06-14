/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AddExpenseModal from "./AddExpenseModal";
import Loading from "./Loading";
import Navbar from "./Navbar";
import TripCard from "./TripCard";
import NewTripModal from "./NewTripModal";
import { useAuth } from "../context/auth/useAuth";
import type { CreateTripFormData } from "../schema/trip.schema";
import type { ExpenseFormData } from "./AddExpenseModal";
import type { ApiEvent } from "../types/event.type";
import type { ApiTrip } from "../types/trip.type";

type DisplayTrip = {
  id: string;
  title: string;
  currency: string;
  budget: string;
  budgetAmount: number;
  startDate: string;
  image: string;
  apiId: number | null;
};

const formatBudgetValue = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);

const getCurrencySymbol = (currencyCode: string) => {
  try {
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value ?? currencyCode
    );
  } catch {
    return currencyCode;
  }
};

const formatStartDate = (dateInput: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateInput));

const mapApiTripToDisplayTrip = (trip: ApiTrip): DisplayTrip => ({
  id: `api-${trip.id}`,
  title: trip.title,
  currency: getCurrencySymbol(trip.yourCurrency),
  budget: formatBudgetValue(trip.budget),
  budgetAmount: trip.budget,
  startDate: formatStartDate(trip.startDay),
  image: trip.img,
  apiId: trip.id,
});

type DisplayExpense = {
  id: number;
  date: string;
  money: string;
  currency: string;
  convertedAmount: string;
  convertedAmountValue: number;
  details: string;
};

export default function Dashboard() {
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
  const { accessToken } = useAuth();
  const [selectedTrip, setSelectedTrip] = useState<DisplayTrip | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [savedTrips, setSavedTrips] = useState<DisplayTrip[]>([]);
  const [expenses, setExpenses] = useState<DisplayExpense[]>([]);
  const allTrips = useMemo(() => savedTrips, [savedTrips]);
  const spentAmount = useMemo(
    () =>
      expenses.reduce(
        (total, expense) => total + expense.convertedAmountValue,
        0,
      ),
    [expenses],
  );
  const remainingAmount = selectedTrip
    ? Math.max(selectedTrip.budgetAmount - spentAmount, 0)
    : 0;

  const mapApiEventToDisplayExpense = (event: ApiEvent): DisplayExpense => ({
    id: event.id,
    date: formatStartDate(event.date),
    money: formatBudgetValue(event.priceLocalCurrency),
    currency: event.localCurrency,
    convertedAmount: formatBudgetValue(event.priceYourCurrency),
    convertedAmountValue: event.priceYourCurrency,
    details: event.detail,
  });

  useEffect(() => {
    if (!accessToken) {
      setIsLoadingTrips(false);
      return;
    }

    const fetchTrips = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/trips`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.status}`);
        }

        const result: ApiTrip[] = await response.json();
        setSavedTrips(result.map(mapApiTripToDisplayTrip));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load saved trips.");
      } finally {
        setIsLoadingTrips(false);
      }
    };

    void fetchTrips();
  }, [BACKEND_URL, accessToken]);

  useEffect(() => {
    if (!selectedTrip?.apiId || !accessToken) {
      setExpenses([]);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/trips/${selectedTrip.apiId}/events`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const result: ApiEvent[] = await response.json();
        setExpenses(result.map(mapApiEventToDisplayExpense));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load expenses.");
      }
    };

    void fetchEvents();
  }, [BACKEND_URL, accessToken, selectedTrip?.apiId]);

  if (isLoadingTrips) {
    return <Loading />;
  }

  const handleCreateTrip = async (trip: CreateTripFormData) => {
    const response = await fetch(`${BACKEND_URL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(trip),
    });

    if (!response.ok) {
      throw new Error(`Failed to save trip: ${response.status}`);
    }

    const createdTrip: ApiTrip = await response.json();
    setSavedTrips((currentTrips) => [
      mapApiTripToDisplayTrip(createdTrip),
      ...currentTrips,
    ]);
    toast.success("Trip saved successfully.");
  };

  const handleDeleteTrip = async (trip: DisplayTrip) => {
    if (!trip.apiId) {
      toast.error("Sample trips cannot be deleted.");
      return;
    }

    if (!window.confirm("Are you sure to delete?")) {
      return;
    }

    const response = await fetch(`${BACKEND_URL}/trips/${trip.apiId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete trip: ${response.status}`);
    }

    setSavedTrips((currentTrips) =>
      currentTrips.filter((currentTrip) => currentTrip.id !== trip.id),
    );

    if (selectedTrip?.id === trip.id) {
      setSelectedTrip(null);
    }

    toast.success("Trip deleted successfully.");
  };

  const handleAddExpense = async (expense: ExpenseFormData) => {
    if (!selectedTrip?.apiId) {
      throw new Error("No selected trip.");
    }

    const response = await fetch(
      `${BACKEND_URL}/trips/${selectedTrip.apiId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          date: expense.date,
          title: expense.details.trim() || "Expense",
          detail: expense.details,
          localCurrency: expense.currency,
          priceLocalCurrency: Number(expense.money),
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to save expense: ${response.status}`);
    }

    const createdEvent: ApiEvent = await response.json();
    setExpenses((currentExpenses) => [
      mapApiEventToDisplayExpense(createdEvent),
      ...currentExpenses,
    ]);
    toast.success("Expense saved successfully.");
  };

  const handleConvertExpense = async ({
    money,
    currency,
  }: {
    money: string;
    currency: string;
  }) => {
    if (!selectedTrip?.apiId) {
      throw new Error("No selected trip.");
    }

    const response = await fetch(
      `${BACKEND_URL}/trips/${selectedTrip.apiId}/events/exchange-rate-preview?localCurrency=${encodeURIComponent(currency)}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to get exchange rate preview: ${response.status}`);
    }

    const preview: {
      localCurrency: string;
      yourCurrency: string;
      appliedExchangeRate: number;
    } = await response.json();

    const convertedAmount = Math.round(Number(money) * preview.appliedExchangeRate);
    return formatBudgetValue(convertedAmount);
  };

  const handleDeleteExpense = async (expenseId: number) => {
    const response = await fetch(`${BACKEND_URL}/events/${expenseId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete expense: ${response.status}`);
    }

    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    );
    toast.success("Expense deleted successfully.");
  };

  if (selectedTrip) {
    return (
      <div>
        <Navbar />
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
            {selectedTrip.title}
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
                  {item === "Budget"
                    ? `${selectedTrip.currency}${selectedTrip.budget}`
                    : item === "Spent"
                      ? `${selectedTrip.currency}${formatBudgetValue(spentAmount)}`
                      : `${selectedTrip.currency}${formatBudgetValue(remainingAmount)}`}
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
            {expenses.map((expense) => (
              <div
                key={expense.id}
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
                      void handleDeleteExpense(expense.id).catch((error) => {
                        console.error(error);
                        toast.error("Failed to delete the expense.");
                      });
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
              onAddExpense={handleAddExpense}
              onConvertExpense={handleConvertExpense}
            />
          )}
        </main>
      </div>
    );
  }
  return (
    <div>
      <style>{dashboardGridStyles}</style>
      <Navbar />
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <NewTripModal onCreateTrip={handleCreateTrip} />
          </div>
        </section>
        <div className="dashboard-trip-grid">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              currency={trip.currency}
              budget={trip.budget}
              startDate={trip.startDate}
              image={trip.image}
              onClick={() => setSelectedTrip(trip)}
              onDelete={() => {
                void handleDeleteTrip(trip).catch((error) => {
                  console.error(error);
                  toast.error("Failed to delete the trip.");
                });
              }}
              canDelete={trip.apiId !== null}
            />
          ))}
        </div>
      </main>

      <footer
        style={{
          marginTop: "50px",
          padding: "40px 32px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#f5f1e8" }}>
          Trip Atlas
        </h3>

        <p style={{ color: "#9ca3af" }}>
          Plan. Track. Explore.
        </p>

        <p
          style={{
            marginTop: "20px",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          Original concept by Hiroki
          <br />
          Frontend redesign  by Karla
        </p>

        <p
          style={{
            marginTop: "16px",
            color: "#4b5563",
            fontSize: "0.8rem",
          }}
        >
          © 2026 Trip Atlas
        </p>
      </footer>

    </div>
  );
}

const dashboardGridStyles = `
.dashboard-trip-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 1100px) {
  .dashboard-trip-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .dashboard-trip-grid {
    grid-template-columns: 1fr;
  }
}
`;
