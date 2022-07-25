import { useState } from "react";
import { Alert, StatesReturnType } from "../contex-type";

const States = (): StatesReturnType => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showMyAccountPage, setShowMyAccountPage] = useState(false);
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "info" });
  return {
    showLoginRegister,
    setShowLoginRegister,
    alert,
    setAlert,
    showMyAccountPage,
    setShowMyAccountPage,
  };
};

export default States;
