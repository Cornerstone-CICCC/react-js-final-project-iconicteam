import { useState, type ReactNode } from "react";
import type { User } from "../../types/user.type";
import { AuthContext, type AuthCheckResult } from "./authContext";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string>("")
  const [authStatus, setAuthStatus] = useState<"unauthenticated" | "authenticated" | "checking">("checking")

  const storeAuth = (user: User, token: string) => {
    setAccessToken(token)
    setUser(user)
    setAuthStatus("authenticated")
  }

  const clearAuth = () => {
    setAccessToken("")
    setUser(null)
    setAuthStatus("unauthenticated")
  }

  const checkUserAuthentication = async (token: string): Promise<AuthCheckResult> => {
    setAuthStatus("checking")
    try {
      const res = await fetch(`${BACKEND_URL}/users/me`, {
        method: "GET",
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (res.status === 200) {
        setAuthStatus("authenticated")
        return { result: "success", data: data }
      }
      setAuthStatus("unauthenticated")
      return { result: "failure", data: null }

    } catch (error) {
      console.error(error)
      return { result: "failure", data: null }
    }
  }

  const restoreAccessToken = async () => {
    setAuthStatus("checking")

    try {
      const res = await fetch(`${BACKEND_URL}/users/refresh`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      })

      if (res.status !== 200) {
        clearAuth()
        return
      }
      const data = await res.json()
      const user = await checkUserAuthentication(data.accessToken)
      if (user?.result === "success") {
        storeAuth(user.data, data.accessToken)
      } else {
        clearAuth()
      }
    } catch (error) {
      console.error(error)
      clearAuth()
    }
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, authStatus, storeAuth, clearAuth, checkUserAuthentication, restoreAccessToken }}>
      {children}
    </AuthContext.Provider>

  )
}