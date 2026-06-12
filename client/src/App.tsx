import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import GetStartedScreen from "./components/GetStartedScreen";
import Dashboard from "./components/Dashboard";

function App() {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return <LoginScreen onLogin={() => setStep(1)} />;
  }

  if (step === 1) {
    return (
      <GetStartedScreen
        onContinue={() => setStep(2)}
      />
    );
  }

  return <Dashboard />;
}

export default App;