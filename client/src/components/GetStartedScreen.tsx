import fuji from "../assets/trips/fuji.jpg";
import chichenitza from "../assets/trips/chichenitza.jpg";
import { useEffect, useState } from "react";

export default function GetStartedScreen({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const images = [fuji, chichenitza];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 1.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(5px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{ color: "#a5db98", letterSpacing: "5px", marginBottom: "18px" }}>
          WELCOME 
        </p>

        <h1 style={{ fontSize: "3.5rem", color: "white", marginBottom: "18px" }}>
          Your next adventure is waiting.
        </h1>

        <button
          onClick={onContinue}
          style={{
            marginTop: "28px",
            background: "linear-gradient(135deg,#1fa4bb 0%, #5a7a5a 100%)",
            border: "none",
            color: "white",
            padding: "18px 46px",
            borderRadius: "999px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}