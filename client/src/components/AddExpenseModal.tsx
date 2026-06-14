import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyCombobox from "./CurrencyCombobox";
import toast from "react-hot-toast";

export type ExpenseFormData = {
  date: string;
  money: string;
  currency: string;
  convertedAmount: string;
  details: string;
};

type AddExpenseModalProps = {
  onClose: () => void;
  onAddExpense: (expense: ExpenseFormData) => Promise<void>;
  onConvertExpense: (params: {
    money: string;
    currency: string;
  }) => Promise<string>;
};

export default function AddExpenseModal({
  onClose,
  onAddExpense,
  onConvertExpense,
}: AddExpenseModalProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [money, setMoney] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!money.trim()) {
      toast.error("Please enter the amount first.");
      return;
    }

    setIsConverting(true);
    try {
      const result = await onConvertExpense({ money, currency });
      setConvertedAmount(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to convert the amount.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleAdd = async () => {
    const formattedDate = date
      ? [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-")
      : "";

    if (!formattedDate || !money.trim() || !details.trim()) {
      toast.error("Please fill out date, amount, and details.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddExpense({
        date: formattedDate,
        money,
        currency,
        convertedAmount,
        details,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save the expense.");
      setIsSubmitting(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <style>{datePickerStyles}</style>
      <div style={modalStyle}>
        <h2 style={{ fontSize: "1.7rem", marginBottom: "10px" }}>
          Add Expense
        </h2>

        <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
          Track a new expense for this trip.
        </p>

        <div style={lineStyle} />

        <div style={{ display: "grid", gap: "14px" }}>
          <DatePicker
            selected={date}
            onChange={(selectedDate: Date | null) => setDate(selectedDate)}
            placeholderText="Expense date"
            dateFormat="dd MMM yyyy"
            wrapperClassName="expense-date-picker-wrapper"
            className="expense-date-picker-input"
            calendarClassName="expense-date-picker-calendar"
          />

          <input
            placeholder="Money"
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            style={inputStyle}
          />

          <CurrencyCombobox
            value={currency}
            onChange={setCurrency}
            placeholder="Select currency"
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Converted amount"
              value={convertedAmount}
              onChange={(e) => setConvertedAmount(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={() => void handleConvert()}
              disabled={isConverting}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(165,219,152,0.45)",
                background: "rgba(255,255,255,0.08)",
                color: "#f5f1e8",
                padding: "0 16px",
                cursor: isConverting ? "wait" : "pointer",
                fontWeight: 700,
                opacity: isConverting ? 0.7 : 1,
              }}
            >
              {isConverting ? "..." : "Convert"}
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

          <button
            onClick={() => void handleAdd()}
            disabled={isSubmitting}
            style={{
              ...addButtonStyle,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "wait" : "pointer",
            }}
          >
            {isSubmitting ? "Saving..." : "Add"}
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
  boxSizing: "border-box" as const,
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

const datePickerStyles = `
.expense-date-picker-wrapper {
  width: 100%;
}

.expense-date-picker-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(165,219,152,0.45);
  background: rgba(255,255,255,0.06);
  color: #f5f1e8;
  font-size: 0.9rem;
  box-sizing: border-box;
  outline: none;
}

.expense-date-picker-calendar {
  background: #101720;
  border: 1px solid rgba(160,255,190,0.2);
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(0,0,0,0.42);
  overflow: hidden;
  font-family: inherit;
}

.expense-date-picker-calendar .react-datepicker__header {
  background: #0b0f14;
  border-bottom: 1px solid rgba(160,255,190,0.16);
}

.expense-date-picker-calendar .react-datepicker__current-month,
.expense-date-picker-calendar .react-datepicker-time__header,
.expense-date-picker-calendar .react-datepicker-year-header,
.expense-date-picker-calendar .react-datepicker__day-name,
.expense-date-picker-calendar .react-datepicker__day,
.expense-date-picker-calendar .react-datepicker__navigation-icon::before {
  color: #f5f1e8;
}

.expense-date-picker-calendar .react-datepicker__day:hover,
.expense-date-picker-calendar .react-datepicker__day--keyboard-selected {
  background: rgba(31,164,187,0.24);
  border-radius: 999px;
}

.expense-date-picker-calendar .react-datepicker__day--selected {
  background: linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%);
  border-radius: 999px;
  color: #ffffff;
}

.expense-date-picker-calendar .react-datepicker__day--outside-month,
.expense-date-picker-calendar .react-datepicker__day--disabled {
  color: #6b7280;
}
`;
