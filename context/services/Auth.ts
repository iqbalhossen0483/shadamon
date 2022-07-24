import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthReturnType } from "../contex-type";
import initialization from "../firebase/initialization";

initialization();

const Auth = (): AuthReturnType => {
  const [user, setUser] = useState<User | null>(null);
  const [isfacebookLogin, setIsFacebookLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  //manage user;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("outside", user);
      if (user?.emailVerified || user?.phoneNumber || isfacebookLogin) {
        console.log("inside", user);
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  //google sing up / in;
  async function googleLogin(): Promise<{ error: null | string }> {
    try {
      await signInWithPopup(auth, googleProvider);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till

  //facebook sing up
  async function facebookLogin(): Promise<{ error: null | string }> {
    try {
      setIsFacebookLogin(true);
      await signInWithPopup(auth, facebookProvider);
      return { error: null };
    } catch (err: any) {
      setIsFacebookLogin(false);
      return { error: err.message };
    }
  } //till

  //sign out ouser;
  async function singOut(): Promise<{ error: boolean }> {
    try {
      await signOut(auth);
      setUser(null);
      setIsFacebookLogin(false);
      return { error: false };
    } catch (err) {
      return { error: true };
    }
  }

  //email singup
  async function emailSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateUser(name);
      await varifyEmail(user);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till

  //varify email;
  async function varifyEmail(user: User) {
    try {
      await sendEmailVerification(user);
      return { error: null };
    } catch (error: any) {
      return error;
    }
  }

  //email sing in;
  async function emailSingIn(
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified || user.phoneNumber) {
        return { error: null };
      } else {
        window.user = user;
        return { error: "Email isn't varified, Please varify your email" };
      }
    } catch (err: any) {
      return { error: err.message };
    }
  } //till;

  //update user info;
  async function updateUser(
    name: string
  ): Promise<{ error: boolean } | undefined> {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        return { error: false };
      } catch (err) {
        return { error: true };
      }
    }
  } //till;

  //phone number login
  async function singUpWihPhone(
    number: string,
    name: string
  ): Promise<{ error: any }> {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, number, appVerifier);
      window.confirmationResult = result;
      window.userName = name;

      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }
  async function varifyOtp(otp: string): Promise<{ error: any }> {
    try {
      const confimationResult = window.confirmationResult;
      const result = await confimationResult.confirm(otp);
      setUser(result.user);
      await updateUser(window.userName!);
      delete window.userName;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  } //till

  //reset password
  async function resetPassword(email: string): Promise<{ error: any }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  } //till;

  return {
    googleLogin,
    user,
    singOut,
    facebookLogin,
    emailSignUp,
    emailSingIn,
    singUpWihPhone,
    varifyOtp,
    resetPassword,
    varifyEmail,
    isfacebookLogin,
  };
};

export default Auth;
