import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import useStore from "../../context/hooks/useStore";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LoginPage from "./components/LoginPage";
import CloseBack from "./components/CloseBack";
import TopPart from "./components/TopPart";

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(false);
  const store = useStore();
  const style = {
    position: "absolute" as "absolute",
    overflow: "auto",
    display: "block",
  };

  async function googleLogIn() {
    if (store) {
      const { error } = await store?.auth.googleLogin();
      if (error) {
        store.State.setAlert({ msg: error, type: "error" });
      } else {
        store?.State.setShowLoginRegister(false);
      }
    }
  }

  async function facebookLogin() {
    if (store) {
      const { error } = await store?.auth.facebookLogin();
      if (error) {
        store.State.setAlert({ msg: error, type: "error" });
      } else {
        store?.State.setShowLoginRegister(false);
      }
    }
  }

  return (
    <div>
      <Modal
        open={store?.State.showLoginRegister || false}
        onClose={() => store?.State.setShowLoginRegister(false)}
      >
        <Box sx={style} className='login-register-container'>
          {/* close button */}
          <CloseBack showLogin={showLogin} setShowLogin={setShowLogin} />

          <TopPart />
          <main>
            <Button onClick={googleLogIn} variant='outlined'>
              <GoogleIcon /> Continue with Google
            </Button>
            <Button onClick={facebookLogin} variant='contained'>
              <FacebookIcon /> Continue with Facebook
            </Button>
            <Button onClick={() => setShowLogin(true)} variant='contained'>
              <EmailIcon />
              Continue with Email or Phone number
            </Button>
          </main>
          <hr />
          <div className='bottom-part'>
            <p className='text-gray-400 italic mb-1'>Already Have a Account</p>
            <Button onClick={() => setShowLogin(true)} variant='outlined'>
              Login
            </Button>
          </div>

          <LoginPage showLogin={showLogin} setShowLogin={setShowLogin} />
        </Box>
      </Modal>
    </div>
  );
};

export default LoginRegister;
