import { Box, Modal } from "@mui/material";
import React from "react";
import useStore from "../../context/hooks/useStore";
import InitialPage from "./components/InitialPage";
import LoginPage from "./components/LoginPage";
import OtpVarify from "./components/EmailOtpVarify";

const LoginRegister = () => {
  const store = useStore();
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
    display: "block",
  };

  return (
    <div>
      <Modal
        open={store?.State.showLoginRegister || false}
        onClose={() => store?.State.setShowLoginRegister(false)}
      >
        <Box sx={style} className='login-register-container'>
          {!store?.State.showMessage.otp && !store?.State.showMessage.email ? (
            !store?.State.showLoginPage ? (
              <InitialPage />
            ) : (
              <LoginPage />
            )
          ) : (
            <OtpVarify />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default LoginRegister;
