import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../context/hooks/useStore";
import Input from "../../utilitize/Input";
import CloseBack from "./CloseBack";
import TopPart from "./TopPart";

type User = {
  name: string;
  email: string;
  password: string;
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const { register, handleSubmit } = useForm<User>();
  const store = useStore();

  function handleError(error: null | string) {
    if (!error) {
      store?.State.setShowLoginPage(false);
      store?.State.setShowLoginRegister(false);
    } else {
      store?.State.setAlert({ msg: error, type: "error" });
    }
  }

  async function onSubmit(user: User) {
    setLoading(true);
    if (!login) {
      if (store) {
        const { error } = await store.auth.emailSignUp(
          user.name,
          user.email,
          user.password
        );
        handleError(error);
      }
    } else {
      if (store) {
        const { error } = await store.auth.emailSingIn(
          user.email,
          user.password
        );
        handleError(error);
      }
    }
    setLoading(false);
  }

  return (
    <div className='login-container'>
      <CloseBack />
      <TopPart title={login ? "Login" : "Sign Up"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {!login && <Input {...register("name")} required label='Name' />}
        <Input {...register("email")} required label='Email or Phone number' />
        <Input
          {...register("password")}
          type='password'
          required
          label='Password'
        />
        <Button disabled={loading} type='submit' variant='contained'>
          {login ? "Login" : "Sign Up"}
        </Button>
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
