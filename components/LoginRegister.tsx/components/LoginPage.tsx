import { Button } from "@mui/material";
import React, { useState } from "react";
import Input from "../../utilitize/Input";
import CloseBack from "./CloseBack";
import TopPart from "./TopPart";

const LoginPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className='login-container'>
      <CloseBack />
      <TopPart title={login ? "Login" : "Sign Up"} />
      <form>
        {!login && <Input label='Name' />}
        <Input label='Email or Phone number' />
        <Input label='Password' />
        <Button variant='contained'>{login ? "Login" : "Sign Up"}</Button>
      </form>

      <div className='bottom-part'>
        <p className='text-gray-400 italic mb-1'>
          {!login ? "Already have a account" : "Don't have a account yet?"}
        </p>
        <Button onClick={() => setLogin(!login)} variant='outlined'>
          {!login ? "Login" : "Sign Up"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
