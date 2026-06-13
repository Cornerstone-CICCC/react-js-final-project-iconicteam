import fuji from "../assets/trips/fuji.jpg";
import chichenitza from "../assets/trips/chichenitza.jpg";
import { useState, useEffect } from "react";

type Props = {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}
export default function LoginScreen({ setIsLoginPage }: Props) {
  const images = [fuji, chichenitza];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 1s ease",
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
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "4.5rem",
              marginBottom: "12px",
            }}
          >
            Trip Atlas
          </h1>

          <p
            style={{
              color: "#d1d5db",
              marginBottom: "40px",
              letterSpacing: "3px",
            }}
          >
            PLAN • TRACK • EXPLORE
          </p>

          <button
            style={{
              background:
                "linear-gradient(135deg,#1fa4bb 0%, #5bad5b 100%)",
              border: "none",
              color: "white",
              padding: "18px 36px",
              borderRadius: "999px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
            }}
          >
            Continue with Google
          </button>
        </div>
      </div>
      <button onClick={() => setIsLoginPage(false)} >If you don't have an account, signup here</button>
    </>
  );
}