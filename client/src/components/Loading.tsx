import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import fuji from "../assets/trips/fuji.jpg";
import chichenitza from "../assets/trips/chichenitza.jpg";

const Loading = () => {
  const images = [fuji, chichenitza];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

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
          background:
            "linear-gradient(180deg, rgba(6,10,18,0.58) 0%, rgba(5,8,14,0.82) 100%)",
          backdropFilter: "blur(6px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          textAlign: "center",
        }}
      >
        <PuffLoader color="#7dd3fc" size={160} speedMultiplier={0.9} />
        <p
          style={{
            margin: 0,
            color: "white",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
