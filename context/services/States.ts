import { useState } from "react";
import { Alert, StatesReturnType } from "../contex-type";

const States = (): StatesReturnType => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "info" });
  return {
    showLoginRegister,
    setShowLoginRegister,
    showLoginPage,
    setShowLoginPage,
    alert,
    setAlert,
  };
};

export default States;
