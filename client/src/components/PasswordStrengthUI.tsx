type Props = {
  score: number;
};

const bars = [0, 1, 2, 3, 4];
const inactiveBarColor = "#ffedd5";

const getStrengthConfig = (score: number) => {
  if (score <= 0) {
    return {
      activeBars: 1,
      barColor: "#fb7185",
      label: "Too weak",
      labelColor: "#f43f5e",
    };
  }

  if (score === 1) {
    return {
      activeBars: 2,
      barColor: "#fb7185",
      label: "Weak",
      labelColor: "#fb7185",
    };
  }

  if (score === 2) {
    return {
      activeBars: 3,
      barColor: "#fbbf24",
      label: "Good",
      labelColor: "#f59e0b",
    };
  }

  if (score === 3) {
    return {
      activeBars: 4,
      barColor: "#a3e635",
      label: "Strong",
      labelColor: "#65a30d",
    };
  }

  return {
    activeBars: 5,
    barColor: "#10b981",
    label: "Very strong",
    labelColor: "#059669",
  };
};

const PasswordStrengthUI = ({ score }: Props) => {
  const { activeBars, barColor, label, labelColor } = getStrengthConfig(score);

  return (
    <div style={{ marginTop: "4px" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        {bars.map((bar) => (
          <span
            key={bar}
            style={{
              height: "8px",
              flex: 1,
              borderRadius: "999px",
              backgroundColor: bar < activeBars ? barColor : inactiveBarColor,
              display: "block",
            }}
          />
        ))}
      </div>

      <p
        style={{
          margin: "12px 0 0",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: labelColor,
        }}
      >
        {label}
      </p>
    </div>
  );
};

export default PasswordStrengthUI;
