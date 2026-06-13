import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/auth/useAuth";
import AuthPage from "./components/AuthPage";

function App() {
  const { authStatus, accessToken, checkUserAuthentication } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      await checkUserAuthentication(accessToken)
    }
    checkAuth()
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