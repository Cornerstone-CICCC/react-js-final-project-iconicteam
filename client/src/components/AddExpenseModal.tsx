import { useState } from "react";

type Expense = {
  date: string;
  money: string;
  currency: string;
  convertedAmount: string;
  details: string;
};

type AddExpenseModalProps = {
  onClose: () => void;
  onAddExpense: (expense: Expense) => void;
};

export default function AddExpenseModal({
  onClose,
  onAddExpense,
}: AddExpenseModalProps) {
  const [date, setDate] = useState("");
  const [money, setMoney] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [details, setDetails] = useState("");

  const handleAdd = () => {
    onAddExpense({
      date,
      money,
      currency,
      convertedAmount,
      details,
    });

    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ fontSize: "1.7rem", marginBottom: "10px" }}>
          Add Expense
        </h2>

        <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
          Track a new expense for this trip.
        </p>

        <div style={lineStyle} />

        <div style={{ display: "grid", gap: "14px" }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Money"
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            style={inputStyle}
          />

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={inputStyle}
          >
            <option>USD</option>
            <option>CAD</option>
            <option>MXN</option>
            <option>YEN</option>
            <option>EUR</option>
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Converted amount"
              value={convertedAmount}
              onChange={(e) => setConvertedAmount(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={() => setConvertedAmount("8240")}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(165,219,152,0.45)",
                background: "rgba(255,255,255,0.08)",
                color: "#f5f1e8",
                padding: "0 16px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Convert
            </button>
          </div>

          <input
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={buttonRowStyle}>
          <button onClick={onClose} style={backButtonStyle}>
            Back
          </button>

          <button onClick={handleAdd} style={addButtonStyle}>
            Add
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
  zIndex: 50,
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

const lineStyle = {
  width: "80px",
  height: "2px",
  background: "linear-gradient(90deg, #1fa4bb 0%, #69ca69 100%)",
  borderRadius: "999px",
  marginBottom: "24px",
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

const buttonRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "26px",
};

const backButtonStyle = {
  padding: "12px 20px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#f5f1e8",
  cursor: "pointer",
  fontWeight: 600,
};

const addButtonStyle = {
  padding: "12px 24px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};