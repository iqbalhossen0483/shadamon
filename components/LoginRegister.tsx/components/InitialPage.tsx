import { Button } from "@mui/material";
import React from "react";
import useStore from "../../../context/hooks/useStore";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import CloseBack from "./CloseBack";
import TopPart from "./TopPart";

const InitialPage = () => {
  const store = useStore();

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
    <>
      {/* close button */}
      <CloseBack />

      <TopPart />
      <main>
        <Button onClick={googleLogIn} variant='outlined'>
          <GoogleIcon /> Continue with Google
        </Button>
        <Button onClick={facebookLogin} variant='contained'>
          <FacebookIcon /> Continue with Facebook
        </Button>
        <Button
          onClick={() => store?.State.setShowLoginPage(true)}
          variant='contained'
        >
          <EmailIcon />
          Continue with Email or Phone number
        </Button>
      </main>
      <hr />
      <div className='bottom-part'>
        <p className='text-gray-400 italic mb-1'>Already Have a Account</p>
        <Button
          onClick={() => store?.State.setShowLoginPage(true)}
          variant='outlined'
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default InitialPage;
