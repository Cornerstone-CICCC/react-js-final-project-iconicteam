import fuji from "../assets/trips/fuji.jpg";
import chichenitza from "../assets/trips/chichenitza.jpg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignupSchema, type SignupFormType } from "../schema/user.schema";
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from "zxcvbn";
import toast from "react-hot-toast";
import PasswordStrengthUI from "./PasswordStrengthUI";

type Props = {
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GetStartedScreen({ setIsLoginPage }: Props) {
  const images = [fuji, chichenitza];
  const [currentImage, setCurrentImage] = useState(0);
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, watch } = useForm<SignupFormType>({ mode: "onChange", resolver: zodResolver(SignupSchema) })
  const password = watch("password") ?? ""
  const score = zxcvbn(password).score
  const isSignupDisabled = !isValid || isSubmitting || score <= 2

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const signup = async (data: SignupFormType) => {
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password
    }
    try {
      const res = await fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      const result = await res.json()
      if (res.ok) {
        toast.success(`${result.displayName} successfully signup`)
        setIsLoginPage(true)
        return
      }
      toast.error(`${result.message}`)

    } catch (error) {
      console.error(error)
      toast.error("Network error")
    }
  }

  return (
    <>
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

          <form
            onSubmit={handleSubmit(signup)}
            style={{
              width: "min(420px, calc(100vw - 40px))",
              margin: "28px auto 0",
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
                  color: "#a5db98",
                  letterSpacing: "3px",
                  fontSize: "0.78rem",
                }}
              >
                SIGN UP
              </p>
            </div>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#d1d5db", fontSize: "0.9rem" }}>Display Name</span>
              <input
                type="text"
                {...register("displayName")}
                style={inputStyle}
              />
              {errors.displayName?.message && <p style={{ color: "red" }}>{errors.displayName?.message}</p>}
            </label>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#d1d5db", fontSize: "0.9rem" }}>Email</span>
              <input
                type="email"
                {...register("email")}
                style={inputStyle}
              />
              {errors.email?.message && <p style={{ color: "red" }}>{errors.email?.message}</p>}
            </label>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#d1d5db", fontSize: "0.9rem" }}>Password</span>
              <input
                type="password"
                {...register("password")}
                style={inputStyle}
              />
              {errors.password?.message && <p style={{ color: "red" }}>{errors.password?.message}</p>}
              {password && <PasswordStrengthUI score={score} />}
            </label>


            <button
              type="submit"
              disabled={isSignupDisabled}
              style={{
                marginTop: "8px",
                background: isSignupDisabled
                  ? "linear-gradient(135deg,rgba(120,130,145,0.9) 0%, rgba(85,94,106,0.9) 100%)"
                  : "linear-gradient(135deg,#1fa4bb 0%, #5a7a5a 100%)",
                border: "none",
                color: "white",
                padding: "18px 46px",
                borderRadius: "999px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: isSubmitting ? "wait" : isSignupDisabled ? "not-allowed" : "pointer",
                boxShadow: isSignupDisabled
                  ? "0 10px 24px rgba(0,0,0,0.2)"
                  : "0 15px 40px rgba(0,0,0,0.35)",
                opacity: isSignupDisabled ? 0.6 : 1,
              }}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={() => setIsLoginPage(true)}
              style={switchButtonStyle}
            >
              You have account? Login here
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
