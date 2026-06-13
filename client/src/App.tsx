import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/auth/useAuth";
import AuthPage from "./components/AuthPage";

function App() {
  const { authStatus, accessToken, checkUserAuthentication, restoreAccessToken } = useAuth();

  useEffect(() => {
    // check user's access token, otherwise try to generate it from refresh token
    const authCheck = async () => {
      if (accessToken) {
        const res = await checkUserAuthentication(accessToken)
        if (res.result === "failure") {
          void restoreAccessToken()
        }
      } else {
        void restoreAccessToken()
      }
    }
    authCheck()
  }, [accessToken])

  if (authStatus === "checking") {
    return <>Loading</>
  }

  if (authStatus === "unauthenticated") {
    return <AuthPage />
  }

  return <Dashboard />;
}

export default App;