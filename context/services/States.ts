import React, { useState } from "react";

const States = (): StatesReturnType => {
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  return {
    showLoginRegister,
    setShowLoginRegister,
    showLoginPage,
    setShowLoginPage,
  };
};

export default States;
