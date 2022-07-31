import { useState } from "react";
import { Alert, StatesReturnType } from "../contex-type";

const States = (): StatesReturnType => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showMyAccountPage, setShowMyAccountPage] = useState(false);
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "info" });
  const [showProductModal, setShowProductModal] = useState(false);
  return {
    showLoginRegister,
    setShowLoginRegister,
    alert,
    setAlert,
    showMyAccountPage,
    setShowMyAccountPage,
    showProductModal,
    setShowProductModal,
  };
};

export default States;
