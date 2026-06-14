import { useId, useRef, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyCombobox from "./CurrencyCombobox";
import {
  CreateTripSchema,
  type CreateTripFormData,
} from "../schema/trip.schema";

type NewTripModalProps = {
  onCreateTrip: (trip: CreateTripFormData) => Promise<void>;
};

const MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024;

export default function NewTripModal({ onCreateTrip }: NewTripModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState("");
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetForm = () => {
    setTitle("");
    setCurrency("USD");
    setBudget("");
    setStartDay(null);
    setImageName("");
    setImagePreview("");
    setIsDragging(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const readFileAsDataUrl = async (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Failed to read the image file"));
      reader.readAsDataURL(file);
    });

  const handleImageSelect = async (file: File | null) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("Image size must be 3MB or less.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImageName(file.name);
      setImagePreview(dataUrl);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load the image.");
    }
  };

  const handleSubmit = async () => {
    const parsedBudget = Number(budget);
    const formattedStartDay = startDay
      ? [
          startDay.getFullYear(),
          String(startDay.getMonth() + 1).padStart(2, "0"),
          String(startDay.getDate()).padStart(2, "0"),
        ].join("-")
      : "";
    const parsed = CreateTripSchema.safeParse({
      title,
      startDay: formattedStartDay,
      budget: parsedBudget,
      img: imagePreview,
      yourCurrency: currency,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid trip data.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateTrip(parsed.data);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save the trip.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{datePickerStyles}</style>
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
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                style={inputStyle}
              />

              <CurrencyCombobox
                value={currency}
                onChange={setCurrency}
                placeholder="Select currency"
              />

              <input
                placeholder="Budget"
                type="number"
                min="1"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                style={inputStyle}
              />

              <DatePicker
                selected={startDay}
                onChange={(date: Date | null) => setStartDay(date)}
                placeholderText="Start date"
                dateFormat="dd MMM yyyy"
                minDate={new Date()}
                wrapperClassName="new-trip-date-picker-wrapper"
                className="new-trip-date-picker-input"
                calendarClassName="new-trip-date-picker-calendar"
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  void handleImageSelect(event.dataTransfer.files[0] ?? null);
                }}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  borderRadius: "18px",
                  border: isDragging
                    ? "1px solid rgba(105,202,105,0.9)"
                    : "1px dashed rgba(160,255,190,0.35)",
                  background: isDragging
                    ? "rgba(105,202,105,0.08)"
                    : "rgba(255,255,255,0.04)",
                  padding: "18px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  id={fileInputId}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    void handleImageSelect(event.target.files?.[0] ?? null);
                  }}
                  style={{ display: "none" }}
                />

                <div style={{ display: "grid", gap: "8px" }}>
                  <strong style={{ fontSize: "0.95rem" }}>Trip image</strong>
                  <span style={{ color: "#9ca3af", fontSize: "0.88rem" }}>
                    Drag and drop an image here, or click to browse.
                  </span>
                  {imageName ? (
                    <span style={{ color: "#d1d5db", fontSize: "0.85rem" }}>
                      {imageName}
                    </span>
                  ) : null}
                </div>

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Trip preview"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      marginTop: "14px",
                    }}
                  />
                ) : null}
              </div>
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
                onClick={closeModal}
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
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isSubmitting}
                style={{
                  padding: "12px 24px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  cursor: isSubmitting ? "wait" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "16px",
  border: "1px solid rgba(29, 97, 71, 0.78)",
  background: "rgba(255,255,255,0.06)",
  color: "#f5f1e8",
  fontSize: "0.95rem",
  boxSizing: "border-box" as const,
};

const datePickerStyles = `
.new-trip-date-picker-wrapper {
  width: 100%;
}

.new-trip-date-picker-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(29, 97, 71, 0.78);
  background: rgba(255,255,255,0.06);
  color: #f5f1e8;
  font-size: 0.95rem;
  box-sizing: border-box;
  outline: none;
}

.new-trip-date-picker-calendar {
  background: #101720;
  border: 1px solid rgba(160,255,190,0.2);
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(0,0,0,0.42);
  overflow: hidden;
  font-family: inherit;
}

.new-trip-date-picker-calendar .react-datepicker__header {
  background: #0b0f14;
  border-bottom: 1px solid rgba(160,255,190,0.16);
}

.new-trip-date-picker-calendar .react-datepicker__current-month,
.new-trip-date-picker-calendar .react-datepicker-time__header,
.new-trip-date-picker-calendar .react-datepicker-year-header,
.new-trip-date-picker-calendar .react-datepicker__day-name,
.new-trip-date-picker-calendar .react-datepicker__day,
.new-trip-date-picker-calendar .react-datepicker__navigation-icon::before {
  color: #f5f1e8;
}

.new-trip-date-picker-calendar .react-datepicker__day:hover,
.new-trip-date-picker-calendar .react-datepicker__day--keyboard-selected {
  background: rgba(31,164,187,0.24);
  border-radius: 999px;
}

.new-trip-date-picker-calendar .react-datepicker__day--selected {
  background: linear-gradient(135deg, #1fa4bb 0%, #69ca69 100%);
  border-radius: 999px;
  color: #ffffff;
}

.new-trip-date-picker-calendar .react-datepicker__day--outside-month,
.new-trip-date-picker-calendar .react-datepicker__day--disabled {
  color: #6b7280;
}
`;
