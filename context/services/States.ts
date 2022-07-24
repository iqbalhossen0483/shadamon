import React, { useState } from "react";
import { Alert, StatesReturnType } from "../contex-type";

const States = (): StatesReturnType => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "info" });
  const [showMessage, setShowMessage] = useState({ otp: false, email: false });
  return {
    showLoginRegister,
    setShowLoginRegister,
    showLoginPage,
    setShowLoginPage,
    alert,
    setAlert,
    showMessage,
    setShowMessage,
  };
};

export default States;
