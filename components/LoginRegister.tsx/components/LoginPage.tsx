import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../context/hooks/useStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Input from "../../utilitize/Input";
import CloseBack from "./CloseBack";
import TopPart from "./TopPart";

type User = {
  name: string;
  email: string;
  password: string;
};

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
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
  function validateEmail(email: string) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePhone(phone: string) {
    var re = /^(?:(?:\+|00)88|01)?\d{11}$/;
    return re.test(phone);
  }

  async function signUp(user: User, number: boolean) {
    if (store) {
      if (number) {
        user.email = user.email + "@gmail.com";
      }
      const { error } = await store.auth.emailSignUp(
        user.name,
        user.email,
        user.password
      );
      handleError(error);
    }
    setLoading(false);
  }
  async function signIn(user: User, number: boolean) {
    if (store) {
      if (number) {
        user.email = user.email + "@gmail.com";
      }
      const { error } = await store.auth.emailSingIn(user.email, user.password);
      if (error) setError(error);
      else setError(null);
      handleError(error);
      setLoading(false);
    }
  }

  async function onSubmit(user: User) {
    setLoading(true);
    const email = validateEmail(user.email);
    const number = validatePhone(user.email);

    if (!number && !email) {
      store?.State.setAlert({
        msg: "Please Enter a valid email or Number",
        type: "error",
      });
      return;
    }

    if (login) {
      signIn(user, number);
    } else {
      signUp(user, number);
    }
  }

  async function resetPassword() {
    if (store) {
      const { error } = await store?.auth.resetPassword(email);
      if (error) {
        store?.State.setAlert({
          msg: "Ops!, Try again Please.",
          type: "error",
        });
      } else {
        store?.State.setAlert({
          msg: "An email sent your eamil address.",
          type: "success",
        });
      }
    }
  }

  return (
    <>
      <div className='login-container'>
        <CloseBack />
        <TopPart title={login ? "Login" : "Sign Up"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {!login && <Input {...register("name")} required label='Name' />}
          <Input
            {...register("email")}
            required
            onChange={(e) => setEmail(e.target.value)}
            label='Email or Phone number'
          />
          <div className='relative'>
            <Input
              {...register("password")}
              fullWidth
              type={passwordVisible ? "text" : "password"}
              required
              label='Password'
            />
            <div
              onClick={() => setPasswordVisible((prev) => !prev)}
              className='visibility-icon'
            >
              {!passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <Button disabled={loading} type='submit' variant='contained'>
            {login ? "Login" : "Sign Up"}
          </Button>

          {error && error?.includes("auth/wrong-password") && (
            <p className='forgot-password' onClick={resetPassword}>
              Forgot Password?
            </p>
          )}
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
    </>
  );
};

export default LoginPage;
