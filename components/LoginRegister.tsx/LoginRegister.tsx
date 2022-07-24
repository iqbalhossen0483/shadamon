import { Box, Modal } from "@mui/material";
import React from "react";
import useStore from "../../context/hooks/useStore";
import InitialPage from "./components/InitialPage";
import LoginPage from "./components/LoginPage";

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
          {!store?.State.showLoginPage ? <InitialPage /> : <LoginPage />}
        </Box>
      </Modal>
    </div>
  );
};

export default LoginRegister;
