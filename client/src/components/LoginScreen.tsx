import fuji from "../assets/trips/fuji.jpg";
import chichenitza from "../assets/trips/chichenitza.jpg";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/auth/useAuth";
import { LoginSchema, type LoginFormType } from "../schema/user.schema";
import toast from "react-hot-toast";

type Props = {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}
export default function LoginScreen({ setIsLoginPage }: Props) {
  const images = [fuji, chichenitza];
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
  const { storeAuth } = useAuth();

  const [currentImage, setCurrentImage] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const isLoginDisabled = !isValid || isSubmitting;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const login = async (data: LoginFormType) => {

    try {
      const response = await fetch(`${BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Username or Password is wrong")
        return;
      }

      storeAuth(
        {
          id: result.id,
          displayName: result.displayName,
        },
        result.accessToken,
      );
    } catch (error) {
      console.error(error);
      toast.error("Network error")
    }
  };

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
              marginBottom: "28px",
              letterSpacing: "3px",
            }}
          >
            PLAN • TRACK • EXPLORE
          </p>

          <form
            onSubmit={handleSubmit(login)}
            style={{
              width: "min(420px, calc(100vw - 40px))",
              margin: "0 auto",
              padding: "28px 24px",
              borderRadius: "28px",
              background: "rgba(10, 10, 18, 0.58)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
              backdropFilter: "blur(10px)",
              display: "grid",
              gap: "14px",
              textAlign: "left",
            }}
          >
            <div style={{ marginBottom: "4px" }}>
              <p
                style={{
                  margin: 0,
                  color: "#9dd8de",
                  letterSpacing: "3px",
                  fontSize: "0.78rem",
                }}
              >
                LOGIN
              </p>
            </div>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#d1d5db", fontSize: "0.9rem" }}>Email</span>
              <input
                type="email"
                {...register("email")}
                autoComplete="email"
                style={inputStyle}
              />
              {errors.email?.message &&
                <p style={{ color: "red" }}>
                  {errors.email?.message}
                </p>}
            </label>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#d1d5db", fontSize: "0.9rem" }}>Password</span>
              <input
                type="password"
                {...register("password")}
                autoComplete="current-password"
                style={inputStyle}
              />
            </label>


            <button
              type="submit"
              disabled={isLoginDisabled}
              style={{
                background: isLoginDisabled
                  ? "linear-gradient(135deg,rgba(120,130,145,0.9) 0%, rgba(85,94,106,0.9) 100%)"
                  : "linear-gradient(135deg,#1fa4bb 0%, #5bad5b 100%)",
                border: "none",
                color: "white",
                padding: "18px 36px",
                borderRadius: "999px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: isSubmitting ? "wait" : isLoginDisabled ? "not-allowed" : "pointer",
                boxShadow: isLoginDisabled
                  ? "0 10px 24px rgba(0,0,0,0.2)"
                  : "0 15px 40px rgba(0,0,0,0.35)",
                opacity: isLoginDisabled ? 0.6 : 1,
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setIsLoginPage(false)}
              style={switchButtonStyle}
            >
              If you don&apos;t have an account, signup here
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  padding: "14px 16px",
  fontSize: "1rem",
  outline: "none",
};



const switchButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#d1d5db",
  fontSize: "0.95rem",
  padding: "6px 0 0",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};
