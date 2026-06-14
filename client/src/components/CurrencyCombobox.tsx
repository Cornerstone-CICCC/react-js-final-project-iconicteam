import { useEffect, useMemo, useRef, useState } from "react";
import {
  getLocalizedCurrencyOptions,
  type LocalizedCurrencyOption,
} from "../locales/currencies";

type CurrencyComboboxProps = {
  value: string;
  onChange: (currencyCode: string) => void;
  placeholder?: string;
};

const containerStyle = {
  position: "relative" as const,
  width: "100%",
};

const fieldStyle = {
  width: "100%",
  padding: "12px 44px 12px 14px",
  borderRadius: "16px",
  border: "1px solid rgba(29, 97, 71, 0.78)",
  background: "rgba(255,255,255,0.06)",
  color: "#f5f1e8",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box" as const,
};

const iconStyle = {
  position: "absolute" as const,
  top: "50%",
  right: "16px",
  transform: "translateY(-50%)",
  color: "#9ca3af",
  pointerEvents: "none" as const,
  fontSize: "0.9rem",
};

const listStyle = {
  position: "absolute" as const,
  top: "calc(100% + 10px)",
  left: 0,
  right: 0,
  maxHeight: "260px",
  overflowY: "auto" as const,
  borderRadius: "18px",
  border: "1px solid rgba(160,255,190,0.2)",
  background: "#101720",
  boxShadow: "0 20px 45px rgba(0,0,0,0.42)",
  padding: "8px",
  zIndex: 70,
};

const optionStyle = {
  width: "100%",
  border: "none",
  background: "transparent",
  color: "#f5f1e8",
  padding: "10px 12px",
  borderRadius: "12px",
  textAlign: "left" as const,
  cursor: "pointer",
};

const metaTextStyle = {
  color: "#9ca3af",
  fontSize: "0.8rem",
  marginTop: "3px",
};

export default function CurrencyCombobox({
  value,
  onChange,
  placeholder = "Search currency",
}: CurrencyComboboxProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const options = useMemo(
    () => getLocalizedCurrencyOptions("en"),
    [],
  );
  const selectedOption = useMemo(
    () => options.find((option) => option.code === value) ?? null,
    [options, value],
  );
  const [query, setQuery] = useState(selectedOption?.label ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [selectedOption]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) =>
      option.searchText.includes(normalizedQuery),
    );
  }, [options, query]);
  const safeHighlightedIndex =
    filteredOptions.length === 0
      ? -1
      : Math.min(highlightedIndex, filteredOptions.length - 1);

  const handleSelect = (option: LocalizedCurrencyOption) => {
    onChange(option.code);
    setQuery("");
    setIsOpen(false);
  };

  const inputValue = isOpen ? query : (selectedOption?.label ?? "");

  return (
    <div ref={rootRef} style={containerStyle}>
      <input
        ref={inputRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="currency-combobox-listbox"
        placeholder={placeholder}
        value={inputValue}
        onFocus={() => {
          setIsOpen(true);
          setQuery("");
          setHighlightedIndex(0);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        onKeyDown={(event) => {
          if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
            event.preventDefault();
            setIsOpen(true);
            setQuery("");
            setHighlightedIndex(0);
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((current) =>
              Math.min(current + 1, filteredOptions.length - 1),
            );
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((current) => Math.max(current - 1, 0));
            return;
          }

          if (event.key === "Enter" && filteredOptions[safeHighlightedIndex]) {
            event.preventDefault();
            handleSelect(filteredOptions[safeHighlightedIndex]);
            return;
          }

          if (event.key === "Escape") {
            setIsOpen(false);
            setQuery("");
          }
        }}
        style={fieldStyle}
      />
      <span style={iconStyle}>⌄</span>

      {isOpen && (
        <div id="currency-combobox-listbox" role="listbox" style={listStyle}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isActive = index === safeHighlightedIndex;
              const isSelected = option.code === value;

              return (
                <button
                  key={option.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelect(option)}
                  style={{
                    ...optionStyle,
                    background: isActive
                      ? "rgba(105,202,105,0.14)"
                      : isSelected
                        ? "rgba(31,164,187,0.14)"
                        : "transparent",
                  }}
                >
                  <div>{option.code}</div>
                  <div style={metaTextStyle}>{option.currencyName}</div>
                  <div style={metaTextStyle}>{option.countryNames.join(", ")}</div>
                </button>
              );
            })
          ) : (
            <div
              style={{
                padding: "12px 14px",
                color: "#9ca3af",
                fontSize: "0.9rem",
              }}
            >
              No currencies found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
