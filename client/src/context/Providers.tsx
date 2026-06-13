import type { ReactNode } from "react";
import { AuthContextProvider } from "./auth/authContextProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}

export default Providers